import React, { useState, useEffect } from "react";
import "./Series.css";
import axios from "axios";
import SingleItem from  '../../components/SingleItem/SingleItem';
import Pagination from "../../components/Pagination/Pagination";

const Series = () => {
  const [content, setContent] = useState([]);
  const API_KEY = "e60e2f0cc6c14c63cb04b450da94ebfd";
  const [page, setPage] = useState(1);

  const fetchSeries = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=&page=${page}`);
    

    console.log(data);
      setContent(data.results);
  };
    

    useEffect(() => {
      fetchSeries();
   
    }, [page]);
  
    



  return (
    <div>
          <span className="pageTitle">Series</span>
          <hr className="separator"/>
          <div className="series">
              {
                  content && content.map((c) => (
                      /*Sending data to SingleItem */
                      <SingleItem key={c.id} id={c.id} poster={c.poster_path} description={c.overview}  popularity={c.popularity} name={c.name} vote_average={ c.vote_average}/>
                  ))}

      </div>
      <Pagination />
      
    </div>
  );
};

export default Series;
