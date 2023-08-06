import React from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import Layout from './components/layout/Layout.js';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import './App.css';


function App() {
  // const location = useLocation();
  // const isHomeWithQueryParam = location.pathname === '/' && location.search !== '';

  return (
    <div className="App">
      <Router>
        <Layout>
          <Switch>

            <Route exact path="/search" component={SearchPage} />
            <Route exact path="/callback" component={HomePage} />
            <Route exact path="/" component={HomePage} />
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App;