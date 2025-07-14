import { ExchangeSummary } from "../components/ExchangeSummary";
import { S12AddressFooter } from "../components/Ntemba/P12FooterAddress";
import OfficeDirections from "../components/Ntemba/P13OfficeDirection";
import S13Footer from "../components/Ntemba/P14FooterSmall";
import S2AboutUs from "../components/Ntemba/P2AboutUs";
import { BothMenus } from "../components/Young/MenuDown/BothMenus";
import CryptoWalletBalance from "../components/Young/CryotpWalletBalance";
import CryptoNewsCard from "../components/Young/CryptoNewsCard";
import CryptoPriceTicker from "../components/Young/CryptoPriceTicker";
import { HowItWorks } from "../components/Young/HowItWorks";
import { LegalNote } from "../components/Young/LegalNote";
import { PricingTable } from "../components/Young/PrincingTable";
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

      <section>
        <S2AboutUs />
      </section>

      {/* Market Data Section */}
      <section className={styles.marketSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Live Market Data</h2>
          <div className={styles.tickerContainer}>
            <CryptoPriceTicker />
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className={styles.mainContent}>
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
      </section>

      <section className="bg-white py-16 px-4 md:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Buy USDT (TRC20) with CARDEUR Instantly</h2>
          <ExchangeSummary />
          <PricingTable />
          <HowItWorks />
          <LegalNote />
        </div>
      </section>

      {/* Existing Components */}

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
