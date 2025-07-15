import { S12AddressFooter } from "../components/Foundation/P12FooterAddress";
import OfficeDirections from "../components/Foundation/P13OfficeDirection";
import S13Footer from "../components/Foundation/P14FooterSmall";
import { BothMenus } from "../components/Ntemba/MenuDown/BothMenus";
import ReviewSelect from "../components/Ntemba/RoutingPages/P1Reviews/ReviewsTopSix";
import NewsletterSubscription from "../components/Young/RoutingPages/P3Subsriptions/NewsLetter";
import styles from "./HomePage.module.css";
import LandingPage from "./LandingPage";

export default function HomePage() {
  return (
    <div className={`${styles.landingPage} dark-mode`}>
      <BothMenus />

      <section className="dark:bg-gray-800">
        <LandingPage />
      </section>

      <div className="dark:bg-gray-900">
        <ReviewSelect />
      </div>

      {/* Newsletter CTA */}
      <section className={`${styles.newsletterCta} dark:bg-gray-800`}>
        <div className={styles.container}>
          <h2 className={`${styles.ctaTitle} dark:text-white`}>Stay Updated with Crypto Trends</h2>
          <NewsletterSubscription />
        </div>
      </section>

      <div className="dark:bg-gray-900">
        <S12AddressFooter />
        <OfficeDirections />
        <S13Footer />
      </div>
    </div>
  );
}
