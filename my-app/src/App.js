import React from "react";
import logo from "./logo.svg";
import "./App.css";
import CountryListGetApi from "./Components/CountryListGetApi"

function App() {
  return (
    <div className="App">
      {/*invoke CountryListGetApi component */}
      <CountryListGetApi></CountryListGetApi>
    </div>
  );
}

export default App;