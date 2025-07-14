import { BothMenus } from "../components/Pascal/MenuDown/BothMenus";
import ReviewSelect from "../components/RoutingPages/P1Reviews/ReviewsTopSix";
import NewsletterSubscription from "../components/RoutingPages/P3Subsriptions/NewsLetter";
// import CryptoWalletBalance from "../components/Young/CryotpWalletBalance";
// import CryptoNewsCard from "../components/Young/CryptoNewsCard";
// import CryptoPriceTicker from "../components/Young/CryptoPriceTicker";
import CryptoExchange from "../components/Young/ShopBTC";
import { S12AddressFooter } from "../components/Zambian/P12FooterAddress";
import OfficeDirections from "../components/Zambian/P13OfficeDirection";
import S13Footer from "../components/Zambian/P14FooterSmall";
import S2AboutUs from "../components/Zambian/P2AboutUs";
import { COMP_NAME } from "../utils/NexusData";
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
