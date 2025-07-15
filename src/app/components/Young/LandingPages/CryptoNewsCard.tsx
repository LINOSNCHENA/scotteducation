"use client";


import Link from "next/link";
import styles from "./CryptoNewsCard.module.css";

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
}

export default function CryptoNewsCard() {
  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: "Bitcoin ETF Approval Expected This Quarter",
      excerpt: "Analysts predict SEC will approve first spot Bitcoin ETF by November.",
      date: "Oct 15, 2023",
      category: "Regulation",
    },
    {
      id: 2,
      title: "Ethereum Layer 2 Solutions See Record Growth",
      excerpt: "Transaction volume on L2 networks surpasses mainnet for first time.",
      date: "Oct 12, 2023",
      category: "Technology",
    },
    {
      id: 3,
      title: "Chia Network Announces New Partnership",
      excerpt: "Enterprise adoption of Chia blockchain continues to expand globally.",
      date: "Oct 10, 2023",
      category: "Business",
    },
  ];

  return (
    <div className={styles.newsContainer}>
      <h2 className={styles.sectionTitle}>Latest Crypto News</h2>
      <div className={styles.newsGrid}>
        {newsItems.map((item) => (
          <div key={item.id} className={styles.newsCard}>
            <div className={styles.newsHeader}>
              <span className={styles.category}>{item.category}</span>
              <span className={styles.date}>{item.date}</span>
            </div>
            <h3 className={styles.newsTitle}>{item.title}</h3>
            <p className={styles.newsExcerpt}>{item.excerpt}</p>
            <Link href={`/news/${item.id}`} className={styles.readMore}>
              Read More →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
