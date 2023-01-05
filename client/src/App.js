import './App.css';
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage.js";
import Creation from "./components/Creation.js";
import Details from "./components/Details.js";
import Home from "./components/Home.js";
import Search from "./components/Search.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Route path={"/"} element={<LandingPage />} />
        <Route path={"/home"} element={<Home />} />
        <Route path={"/videogame/:id"} element={<Details />} />
        <Route path={"/search/:search"} element={<Search />} />
        <Route path={"/create"} element={<Creation />} />
      </div>
    </Router>
  );
}

export default App;
