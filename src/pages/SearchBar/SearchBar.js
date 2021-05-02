import {
  createMuiTheme,
  ThemeProvider,
  TextField,
  Tabs,
  Tab,
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import './SearchBar.css';
import axios from 'axios';
import Button from '../../components/Button/Button';
import Pagination from '../../components/Pagination/Pagination';
import SingleItem from '../../components/SingleItem/SingleItem';

const Search = () => {
  const API_KEY = "e60e2f0cc6c14c63cb04b450da94ebfd";
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);

  /*editing the theme so the search bar can be visible*/
  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState();
  const [numOfPages, setNumOfPages] = useState();

  /*calling API*/
  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
          API_KEY
        }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );
      setContent(data.results);
      setNumOfPages(data.total_pages);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line
  }, [type, page]);
  return (
    <div className="searchResult">
      <div className="search">
        <ThemeProvider theme={darkTheme}>
          <TextField
            style={{ marginTop: "5% " }}
            className="text-field"
            id="filled-search"
            label="Search field"
            type="search"
            variant="filled"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </ThemeProvider>
        <Button
          onClick={fetchSearch}
          variant="contained"
          style={{ marginLeft: 10 }}
        />
      </div>
      <div className="tabs">
        <Tabs
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
        >
          <Tab style={{ width: "50%" }} label="Movies" />
          <Tab style={{ width: "50%" }} label="Series" />
        </Tabs>
      </div>
      <div>
        <div className="searchBar">
          {content &&
            content.map((c) => (
              <SingleItem
                key={c.id}
                id={c.id}
                poster={c.poster_path}
                description={c.overview}
                popularity={c.popularity}
                name={c.name}
                vote_average={c.vote_average}
                media_type={type ? "tv" : "movie"}
              />
            ))}
          {searchText &&
            !content &&
            (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
        </div>

        <Pagination setPage={setPage} numOfPages={numOfPages} />
      </div>
    </div>
  );
};

export default Search;
