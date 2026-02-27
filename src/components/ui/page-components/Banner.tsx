import React from "react";
import styles from "../styles/banner.module.css";

interface BannerProps {
  title: string;
}

function Banner({ title }: BannerProps) {
  return (
    <div className={styles.banner}>
      <h1>{title}</h1>
      {/* <div className={styles.iconWrapper}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
          viewBox="0 0 24 24"
          fill="#c52810"
          stroke="white"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="34"
          height="44"
          viewBox="0 0 24 24"
          fill="white"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.cross}
        >
          <path d="M5 12h14" />
          <path d="M12 5v40" />
        </svg>
      </div> */}
    </div>
  );
}

export default Banner;
