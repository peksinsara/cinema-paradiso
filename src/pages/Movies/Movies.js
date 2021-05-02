import React, { useState, useEffect } from "react";
import "./Movies.css";
import axios from "axios";
import SingleItem from "../../components/SingleItem/SingleItem";
import Pagination from "../../components/Pagination/Pagination";

const Movies = () => {
  const [content, setContent] = useState([]);
  const API_KEY = "e60e2f0cc6c14c63cb04b450da94ebfd";
  const [page, setPage] = useState(1);

  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${page}`
    );

    console.log(data);
    setContent(data.results);
  };

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line
  }, [page]);

  return (
    <div>
      <span className="pageTitle">Movies</span>
      <hr className="separator" />
      <div className="movie">
        {content &&
          content.map((c) => (
            /*Sending data to SingleItem */
            <SingleItem
            key={c.id}
            id={c.id}
            poster={c.poster_path}
            title={c.title || c.name}
            date={c.first_air_date || c.release_date}
            media_type="movie"
            vote_average={c.vote_average}
              
            />
          ))}
      </div>
      <Pagination setPage={setPage} />
    </div>
  );
};

export default Movies;
