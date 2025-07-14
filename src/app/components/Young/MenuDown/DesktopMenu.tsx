// "use client";

"use client";
import Link from "next/link";
import styles from "./css/styles.module.css";

export function DesktopMenu({
  pathname,
  routingItems,
  singlePageItems,
  activeSection,
  scrollToSection,
}: {
  pathname: string;
  routingItems: Array<{ path: string; label: string }>;
  singlePageItems: Array<{ id: string; label: string }>;
  activeSection: string;
  scrollToSection: (id: string) => void;
}) {
  return (
    <div className={styles.mainNav}>
      <nav className={styles.routingMenu}>
        {routingItems.map((item) => (
          <Link key={item.path} href={item.path} className={`${styles.routingLink} ${pathname === item.path ? styles.activeRoute : ""}`}>
            {item.label}
          </Link>
        ))}
      </nav>

      {pathname === "/" && (
        <nav className={styles.singlePageMenu}>
          {singlePageItems.map((item) => (
            <button key={item.id} onClick={() => scrollToSection(item.id)} className={`${styles.singlePageLink} ${activeSection === item.id ? styles.active : ""}`}>
              {item.label}
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}
