import './App.css';
import Header from './components/Header.js';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Series from './pages/Series/Series.js';
import Movies from './pages/Movies/Movies.js';
import Search from './pages/SearchBar/SearchBar.js';
import CustomFooter from './components/Footer/Footer.js';

function App() {
  return (
    /*react fragment so the Header will stay out of the component */
    <Router>
      <Header />
      <div className="app">
        <Switch>
          {/* exact so the / doesn't overlap the others routes */}
          <Route path="/" component={Series} exact />
          <Route path="/movies" component={Movies}/>
          <Route path="/search" component={Search}/>
        </Switch>
      </div>
      <CustomFooter />
    </Router>
  );
}

export default App;
