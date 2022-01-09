import { useState, useEffect } from "react";
import axios from "../../api/axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import styles from "./styles.module.css";

const BASE_URL = "https://image.tmdb.org/t/p/original";
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const opts = {
  height: "390",
  width: "100%",
  playerVars: {
    autoplay: 1,
  },
};

const Row = ({ title, fetchUrl, isLargeRow = false }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    };
    fetchData();
  }, [fetchUrl]);

  const handleMovieClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      const movieDate = movie.first_air_date || movie.release_date;
      const year = new Date(Date.parse(movieDate)).getFullYear();
      movieTrailer(null, {
        apiKey: API_KEY,
        id: true,
        tmdbId: movie.id,
        year: year.toString(),
      })
        .then((url) => {
          // const urlParams = new URLSearchParams(new URL(url).search);
          // urlSearchParam.get("v")
          setTrailerUrl(url);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className={styles.row}>
      <h2>{title}</h2>
      <div className={styles.row__posters}>
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`${styles.row__poster} ${
              isLargeRow && styles.row__posterLarge
            }`}
            src={`${BASE_URL}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
            onClick={() => handleMovieClick(movie)}
            onMouseEnter={() => console.log("enter")}
            onMouseLeave={() => console.log("leave")}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Row;
