// Screenshot of a page (or of one element) in headless Chrome, to check a layout
// at phone or desktop width.
//   node scripts/screenshot.mjs <url> <out.png> [width] [css-selector]
//   node scripts/screenshot.mjs http://localhost:3123/tarifs tarifs.png 390
// Width defaults to 390px (a phone). Needs Google Chrome (CHROME_PATH to override).
import { spawn } from "node:child_process";
import { writeFileSync, mkdtempSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

const CHROME = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";

const [url, out, width = "390", selector] = process.argv.slice(2);
if (!url || !out) {
  console.log("usage: node scripts/screenshot.mjs <url> <out.png> [width] [css-selector]");
  process.exit(1);
}
const port = 9800 + Math.floor(Math.random() * 100);
const chrome = spawn(
  CHROME,
  ["--headless=new", "--disable-gpu", `--remote-debugging-port=${port}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), "shot-"))}`, "about:blank"],
  { stdio: "ignore" }
);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let targets;
for (let i = 0; i < 160; i++) {
  try {
    targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
    if (targets.some((t) => t.type === "page")) break;
  } catch {}
  await sleep(250);
}
const ws = new WebSocket(targets.find((t) => t.type === "page").webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r));
let id = 0;
const pending = new Map();
ws.addEventListener("message", (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) {
    pending.get(m.id)(m);
    pending.delete(m.id);
  }
});
const send = (method, params = {}) =>
  new Promise((r) => {
    const i = ++id;
    pending.set(i, r);
    ws.send(JSON.stringify({ id: i, method, params }));
  });

await send("Emulation.setDeviceMetricsOverride", { width: Number(width), height: 900, deviceScaleFactor: 2, mobile: Number(width) < 600 });
await send("Page.enable");
await send("Page.navigate", { url });
await sleep(3500);
let clip;
if (selector) {
  const res = await send("Runtime.evaluate", {
    expression: `(() => { const el = document.querySelector(${JSON.stringify(selector)}); el.scrollIntoView(); const r = el.getBoundingClientRect(); return JSON.stringify({ x: r.x + scrollX, y: r.y + scrollY, width: r.width, height: Math.min(r.height, 1400) }); })()`,
    returnByValue: true,
  });
  clip = { ...JSON.parse(res.result.result.value), scale: 1 };
  await sleep(3000);
}
const shot = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true, ...(clip ? { clip } : {}) });
writeFileSync(out, Buffer.from(shot.result.data, "base64"));
ws.close();
chrome.kill();
console.log("saved", out);
