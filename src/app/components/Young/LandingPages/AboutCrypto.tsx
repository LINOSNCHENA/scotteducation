//
//
//

import styles from "./AboutCrypto.module.css";
import Image from "next/image";

export default function AboutCrypto() {
  return (
    <div className={`${styles.aboutPage} dark-mode`}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Understanding Cryptocurrency</h1>
          <p className={styles.heroSubtitle}>The digital revolution of money</p>
        </div>
      </section>

      {/* What is Crypto Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>What is Cryptocurrency?</h2>
            <div className={styles.divider}></div>
          </div>
          <div className={styles.contentGrid}>
            <div className={styles.textContent}>
              <p className={styles.paragraph}>
                Cryptocurrency is a digital or virtual form of currency that uses cryptography for security. Unlike traditional currencies issued by governments (fiat money),
                cryptocurrencies operate on decentralized networks based on blockchain technology.
              </p>
              <p className={styles.paragraph}>
                The first and most well-known cryptocurrency, Bitcoin, was created in 2009 by an anonymous person or group using the pseudonym Satoshi Nakamoto. Since then,
                thousands of alternative cryptocurrencies with various functions have been created.
              </p>
            </div>
            <div className={styles.imageContainer}>
              <Image src="/images/ux_young/3.png" alt="Cryptocurrency concept" className={styles.contentImage} height={300} width={300} />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={`${styles.section} ${styles.darkSection}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>How Cryptocurrency Works</h2>
            <div className={styles.divider}></div>
          </div>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🔗</div>
              <h3 className={styles.featureTitle}>Blockchain Technology</h3>
              <p className={styles.featureText}>
                Cryptocurrencies operate on a distributed public ledger called blockchain, a record of all transactions updated and held by currency holders.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>⛏️</div>
              <h3 className={styles.featureTitle}>Mining Process</h3>
              <p className={styles.featureText}>
                Cryptocurrencies are created through mining, which involves using computer power to solve complicated mathematical problems that generate coins.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>💰</div>
              <h3 className={styles.featureTitle}>Digital Wallets</h3>
              <p className={styles.featureText}>Users store cryptocurrencies in digital wallets with unique keys that allow them to access their funds and make transactions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Benefits of Cryptocurrency</h2>
            <div className={styles.divider}></div>
          </div>
          <div className={styles.benefitsGrid}>
            <div className={styles.benefitItem}>
              <h3 className={styles.benefitTitle}>Decentralization</h3>
              <p className={styles.benefitText}>
                No central authority controls the cryptocurrency network, making it theoretically immune to government interference or manipulation.
              </p>
            </div>
            <div className={styles.benefitItem}>
              <h3 className={styles.benefitTitle}>Security</h3>
              <p className={styles.benefitText}>
                Cryptocurrency transactions are secured by military-grade cryptography, making them highly resistant to fraud and counterfeiting.
              </p>
            </div>
            <div className={styles.benefitItem}>
              <h3 className={styles.benefitTitle}>Accessibility</h3>
              <p className={styles.benefitText}>Anyone with internet access can participate in the cryptocurrency economy, providing financial services to unbanked populations.</p>
            </div>
            <div className={styles.benefitItem}>
              <h3 className={styles.benefitTitle}>Transparency</h3>
              <p className={styles.benefitText}>All confirmed transactions are publicly available on the blockchain, creating unprecedented transparency in financial systems.</p>
            </div>
            <div className={styles.benefitItem}>
              <h3 className={styles.benefitTitle}>Lower Fees</h3>
              <p className={styles.benefitText}>
                Cryptocurrency transactions typically have lower fees than traditional financial systems, especially for international transfers.
              </p>
            </div>
            <div className={styles.benefitItem}>
              <h3 className={styles.benefitTitle}>Speed</h3>
              <p className={styles.benefitText}>
                Transactions can be completed in minutes regardless of the location of participants, much faster than traditional banking systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Cryptocurrencies */}
      <section className={`${styles.section} ${styles.darkSection}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Major Cryptocurrencies</h2>
            <div className={styles.divider}></div>
          </div>
          <div className={styles.cryptoGrid}>
            <div className={styles.cryptoCard}>
              <div className={styles.cryptoLogo}>₿</div>
              <h3 className={styles.cryptoName}>Bitcoin (BTC)</h3>
              <p className={styles.cryptoDesc}>The first and most valuable cryptocurrency, designed as a store of value and medium of exchange.</p>
            </div>
            <div className={styles.cryptoCard}>
              <div className={styles.cryptoLogo}>Ξ</div>
              <h3 className={styles.cryptoName}>Ethereum (ETH)</h3>
              <p className={styles.cryptoDesc}>A decentralized platform that enables smart contracts and decentralized applications to be built.</p>
            </div>
            <div className={styles.cryptoCard}>
              <div className={styles.cryptoLogo}>₮</div>
              <h3 className={styles.cryptoName}>Tether (USDT)</h3>
              <p className={styles.cryptoDesc}>A stablecoin pegged to the US dollar, designed to combine crypto benefits with fiat stability.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>Ready to Start Your Crypto Journey?</h2>
          <p className={styles.ctaText}>Join millions of users worldwide who are already part of the financial revolution.</p>
          <button className={styles.ctaButton}>Get Started</button>
        </div>
      </section>

      {/* <S12AddressFooter />
      <S13Footer /> */}
    </div>
  );
}
