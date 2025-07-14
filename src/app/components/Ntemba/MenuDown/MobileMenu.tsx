"use client";

import Link from "next/link";
import { FaPhoneAlt, FaEnvelope, FaTimes } from "react-icons/fa";
import Image from "next/image";
import styles from "./css/stylesMobile.module.css";
import { COMP_ICON_LOGO } from "@/app/utils/Branding/ApiRoutes";
import { COMP_EMAIL, COMP_MOBILE, COMP_NAME } from "@/app/utils/Branding/DataPascal";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
  routingItems: Array<{ path: string; label: string }>;
  singlePageItems: Array<{ id: string; label: string }>;
  activeSection?: string;
  scrollToSection?: (id: string) => void;
}

export function MobileMenu({ isOpen, onClose, pathname, routingItems, singlePageItems, activeSection, scrollToSection }: MobileMenuProps) {
  // Close menu when clicking on a link
  const handleNavigation = () => {
    onClose();
  };

  return (
    <div className={`${styles.mobileMenu} ${isOpen ? styles.open : ""}`}>
      {/* Mobile Menu Header */}
      <div className={styles.mobileMenuHeader}>
        <Image src={COMP_ICON_LOGO} alt="BISL Logo" width={40} height={40} className={styles.mobileLogo} />
        <h3 className={styles.mobileMenuTitle}>{COMP_NAME}</h3>
        <button onClick={onClose} className={styles.mobileCloseButton} aria-label="Close menu">
          <FaTimes />
        </button>
      </div>

      {/* Mobile Menu Content */}
      <div className={styles.mobileMenuContent}>
        {/* Single Page Sections (only shown on homepage) */}
        {pathname === "/" && (
          <div className={styles.mobileMenuSection}>
            <h4 className={styles.mobileMenuSubtitle}>Page Sections</h4>
            {singlePageItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  scrollToSection?.(item.id);
                  handleNavigation();
                }}
                className={`${styles.mobileLink} ${activeSection === item.id ? styles.active : ""}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}

        {/* Regular Routing Links */}
        <div className={styles.mobileMenuSection}>
          <h4 className={styles.mobileMenuSubtitle}>Site Navigation</h4>
          {routingItems.map((item) => (
            <Link key={item.path} href={item.path} className={`${styles.mobileLink} ${pathname === item.path ? styles.activeRoute : ""}`} onClick={handleNavigation}>
              {item.label}
            </Link>
          ))}
        </div>

        {/* Contact Information */}
        <div className={styles.mobileMenuFooter}>
          <div className={styles.mobileContactItem}>
            <FaPhoneAlt className={styles.mobileContactIcon} />
            <span>{COMP_MOBILE}</span>
          </div>
          <div className={styles.mobileContactItem}>
            <FaEnvelope className={styles.mobileContactIcon} />
            <span>{COMP_EMAIL}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
