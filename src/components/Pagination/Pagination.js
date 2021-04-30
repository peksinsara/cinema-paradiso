import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import "./Pagination.css";
import Pagination from '@material-ui/lab/Pagination';


const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

export default function CustomPagination({ setPage, numberOfPages = 10 }) {
  // Scroll to top when page changes
  const handlePageChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };

  return (
    <div className="pagination">
      <ThemeProvider theme={darkTheme}>
        <Pagination
          onChange={(e) => handlePageChange(e.target.textContent)}
          count={numberOfPages}
          color="primary"

        />
      </ThemeProvider>
    </div>
  );
}


