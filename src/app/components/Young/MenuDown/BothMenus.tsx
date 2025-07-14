"use client";

import { useState, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import styles from "./css/styles.module.css";
import { DesktopMenu } from "./DesktopMenu";
import { MobileMenu } from "./MobileMenu";

export function BothMenus() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const routingItems = [
    { path: "/", label: "Products" },
    { path: "/account", label: "Risk Warning" },
    { path: "/dashboard", label: "FAQ" },
    { path: "/cart", label: "Verification" },
    { path: "/admin", label: "Terms & Condiitons" },
    { path: "/contacts", label: "Contacts" },
    { path: "/page-young", label: "Home" },
  ];

  const singlePageItems = useMemo(
    () => [
      { id: "motto", label: "Mission" },
      { id: "services", label: "Services" },
      { id: "register", label: "register" },
      { id: "auth", label: "Auths" },
      { id: "cart", label: "Cart" },
      { id: "product", label: "Product" },
      { id: "contact", label: "Contacts" },
      { id: "address", label: "Address" },
    ],
    []
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Section detection logic
      const scrollPosition = window.scrollY + 100;
      singlePageItems.forEach((item) => {
        const section = document.getElementById(item.id);
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(item.id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname, singlePageItems]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 0 * 100,
        behavior: "smooth",
      });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Main Navigation */}
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <DesktopMenu pathname={pathname} routingItems={routingItems} singlePageItems={singlePageItems} activeSection={activeSection} scrollToSection={scrollToSection} />

        <button className={styles.mobileMenuButton} onClick={() => setMobileMenuOpen(true)} aria-label="Open mobile menu">
          ☰
        </button>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        pathname={pathname}
        routingItems={routingItems}
        singlePageItems={singlePageItems}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />
    </>
  );
}
