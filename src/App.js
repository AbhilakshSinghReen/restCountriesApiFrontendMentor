import React, { useState, useEffect } from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";
import { ThemeProvider } from "styled-components";

import "./App.css";

import Header from "./components/Header";
import Body from "./components/Body";
import Country from "./components/Country";

const lightModeTheme = {
  "font-family": "sans-serif",
  color: "rgb(17, 21, 23)",
  elements: "rgb(255, 255, 255)",
  background: "rgb(225,225,225)",
};

const darkModeTheme = {
  "font-family": "sans-serif",
  color: "rgb(255, 255, 255)",
  elements: "rgb(43, 57, 69)",
  background: "rgb(32,44,55)",
};

function App() {
  const loadedMode = localStorage.getItem("mode");

  const [mode, setMode] = useState(loadedMode === null ? "dark" : loadedMode);
  const [openCountry, setOpenCountry] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    if (countries.length === 0) {
      axios
        .get("https://restcountries.eu/rest/v2/all")
        .then((response) => {
          setCountries(response.data);
        })
        .catch((err) => {
          console.log(`Error in getting countries: ${err}`);
        });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("mode", mode);
  }, [mode]);

  return (
    <ThemeProvider theme={mode === "dark" ? darkModeTheme : lightModeTheme}>
      <div className="App">
        <Header
          toggleMode={() => {
            setMode(mode === "light" ? "dark" : "light");
          }}
        />
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              component={() => (
                <Body
                  countries={countries}
                  onOpenCountry={(country) => {
                    setOpenCountry(country);
                  }}
                />
              )}
            />
            <Route
              path="/:countryCode"
              component={() => (
                <Country
                  openCountry={openCountry}
                  countries={countries}
                  onOpenCountry={(country) => {
                    setOpenCountry(country);
                  }}
                />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
