import Link from "next/link";

export interface Crumb {
  name: string;
  href: string;
}

/** Visible breadcrumb trail; the matching BreadcrumbList JSON-LD is added by each page. */
export default function Breadcrumbs({ items, label }: { items: Crumb[]; label: string }) {
  return (
    <nav aria-label={label}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm text-white/60">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-2">
              {isLast ? (
                <span aria-current="page" className="text-white/90">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link href={item.href} className="hover:text-gold transition-colors duration-300">
                    {item.name}
                  </Link>
                  <span aria-hidden="true" className="text-gold/60">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
