import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import axios from "../../api/axios";
import requests from "../../api/request";

const Banner = () => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ],
      );
      return request;
    };
    fetchData();
  }, []);

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  return (
    <header
      className={styles.banner}
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className={styles.banner__contents}>
        <h1 className={styles.banner__title}>
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className={styles.banner__buttons}>
          <button className={styles.banner__button}>Play</button>
          <button className={styles.banner__button}>My list</button>
        </div>
        <h1 className={styles.banner__description}>
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
      <div className={styles.banner__fadeBottom}></div>
    </header>
  );
};

export default Banner;
