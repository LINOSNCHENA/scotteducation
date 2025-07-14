import { S12AddressFooter } from "../components/Ntemba/P12FooterAddress";
import OfficeDirections from "../components/Ntemba/P13OfficeDirection";
import S13Footer from "../components/Ntemba/P14FooterSmall";
import S2AboutUs from "../components/Ntemba/P2AboutUs";
import { BothMenus } from "../components/Pascal/MenuDown/BothMenus";
import ReviewSelect from "../components/Young/RoutingPages/P1Reviews/ReviewsTopSix";
import NewsletterSubscription from "../components/Young/RoutingPages/P3Subsriptions/NewsLetter";
import CryptoExchange from "../components/Young/ShopBTC";
import { COMP_NAME } from "../utils/Branding/DataYoung";
import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <div className={styles.landingPage}>
      <BothMenus />

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Welcome to {COMP_NAME}</h1>
          <p className={styles.heroSubtitle}>Your gateway to the decentralized financial future</p>
          <button className={styles.ctaButton}>Explore Crypto</button>
        </div>
      </section>

      {/* Market Data Section */}
      {/* <section className={styles.marketSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Live Market Data</h2>
          <div className={styles.tickerContainer}>
            <CryptoPriceTicker />
          </div>
        </div>
      </section> */}

      {/* Main Content Grid */}
      {/* <section className={styles.mainContent}>
        <div className={styles.container}>
          <div className={styles.gridLayout}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Latest Crypto News</h3>
              <CryptoNewsCard />
            </div>

            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Wallet Portfolio</h3>
              <CryptoWalletBalance />
            </div>
          </div>
        </div>
      </section> */}

      {/* Existing Components */}
      <S2AboutUs />
      <CryptoExchange />
      <ReviewSelect />

      {/* Newsletter CTA */}
      <section className={styles.newsletterCta}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>Stay Updated with Crypto Trends</h2>
          <NewsletterSubscription />
        </div>
      </section>

      <S12AddressFooter />
      <OfficeDirections />
      <S13Footer />
    </div>
  );
}
