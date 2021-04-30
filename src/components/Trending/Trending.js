import React from 'react';
import './Trending.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

import SingleItem from '../SingleItem/SingleItem';

const Trending = () => {

    const [content, setContent] = useState([]);
    const API_KEY = "e60e2f0cc6c14c63cb04b450da94ebfd";
  
    const fetchTrending = async () => {

      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&page=${page}`
      );
  
      setContent(data.results);
    };
  
    useEffect(() => {
      window.scroll(0, 0);
      fetchTrending();
      // eslint-disable-next-line
    }, [page]);
  
    return (
      <div>
        <span className="pageTitle">Trending Today</span>
        <div className="trending">
          {content &&
            content.map((c) => (
              <SingleItem
                key={c.id}
                id={c.id}
                poster={c.poster_path}
                name={c.title || c.name}
                    description={c.overview}
                date={c.first_air_date || c.release_date}
                media_type={c.media_type}
                vote_average={c.vote_average}
              />
            ))}
        </div>

      </div>
    );
  };
  
  export default Trending;