"use client";

import type { ReactNode } from "react";
import { trackContactClick } from "@/lib/tracking";

/** A direct WhatsApp or phone link that records the tap before leaving the page. */
export default function ContactLink({
  href,
  method,
  placement,
  locale,
  className,
  ariaLabel,
  tabIndex,
  children,
}: {
  href: string;
  method: "whatsapp" | "phone";
  placement: string;
  locale: string;
  className?: string;
  ariaLabel?: string;
  tabIndex?: number;
  children: ReactNode;
}) {
  const external = method === "whatsapp";
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label={ariaLabel}
      tabIndex={tabIndex}
      onClick={() => trackContactClick({ method, placement, locale })}
      className={className}
    >
      {children}
    </a>
  );
}
