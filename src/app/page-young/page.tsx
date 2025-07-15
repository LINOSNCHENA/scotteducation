import { ExchangeSummary } from "@/app/components/Ntemba/LandingPages/ExchangeSummary";
import { S12AddressFooter } from "@/app/components/Foundation/P12FooterAddress";
import OfficeDirections from "@/app/components/Foundation/P13OfficeDirection";
import S13Footer from "@/app/components/Foundation/P14FooterSmall";
import { BothMenus } from "@/app/components/Young/MenuDown/BothMenus";
import CryptoWalletBalance from "@/app/components/Young/LandingPages/CryotpWalletBalance";
import CryptoNewsCard from "@/app/components/Young/LandingPages/CryptoNewsCard";
import CryptoPriceTicker from "@/app/components/Young/LandingPages/CryptoPriceTicker";
import { HowItWorks } from "@/app/components/Young/LandingPages/HowItWorks";
import { LegalNote } from "@/app/components/Young/LandingPages/LegalNote";
import { PricingTable } from "@/app/components/Young/LandingPages/PrincingTable";
import ReviewSelect from "@/app/components/Young/RoutingPages/P1Reviews/ReviewsTopSix";
import NewsletterSubscription from "@/app/components/Young/RoutingPages/P3Subsriptions/NewsLetter";
import CryptoExchange from "@/app/components/Young/LandingPages/ShopBTC";
import { COMP_NAME } from "@/app/utils/Branding/DataYoung";
import styles from "@/app/HomePage.module.css";
import AboutCrypto from "@/app/components/Young/LandingPages/AboutCrypto";

export default function HomePage() {
  return (
    <div className={`${styles.landingPage} dark-mode`}>
      <BothMenus />

      {/* Hero Section */}
      <section className={`${styles.heroSection} dark:bg-gray-900 dark:text-white`}>
        <div className={styles.heroContent}>
          <h1 className={`${styles.heroTitle} dark:text-primary-400`}>Welcome to {COMP_NAME}</h1>
          <p className={`${styles.heroSubtitle} dark:text-gray-300`}>Your gateway to the decentralized financial future</p>
          <button className={`${styles.ctaButton} dark:bg-primary-600 dark:hover:bg-primary-700`}>Explore Crypto</button>
        </div>
      </section>

      <section className="dark:bg-gray-800">
        {/* <S2AboutUs /> */}
        <AboutCrypto />
      </section>

      {/* Market Data Section */}
      <section className={`${styles.marketSection} dark:bg-gray-900`}>
        <div className={styles.container}>
          <h2 className={`${styles.sectionTitle} dark:text-white`}>Live Market Data</h2>
          <div className={styles.tickerContainer}>
            <CryptoPriceTicker />
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className={`${styles.mainContent} dark:bg-gray-800`}>
        <div className={styles.container}>
          <div className={styles.gridLayout}>
            <div className={`${styles.card} dark:bg-gray-700 dark:border-gray-600`}>
              <h3 className={`${styles.cardTitle} dark:text-white`}>Latest Crypto News</h3>
              <CryptoNewsCard />
            </div>

            <div className={`${styles.card} dark:bg-gray-700 dark:border-gray-600`}>
              <h3 className={`${styles.cardTitle} dark:text-white`}>Wallet Portfolio</h3>
              <CryptoWalletBalance />
            </div>
          </div>
        </div>
      </section>

      <section className="dark:bg-gray-900 py-16 px-4 md:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 dark:text-white">Buy USDT (TRC20) with CARDEUR Instantly</h2>
          <ExchangeSummary />
          <PricingTable />
          <HowItWorks />
          <LegalNote />
        </div>
      </section>

      {/* Existing Components */}
      <div className="dark:bg-gray-800">
        <CryptoExchange />
      </div>

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
