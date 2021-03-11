import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";

import "./App.css";
import styled, { ThemeProvider } from "styled-components";

import Header from "./components/Header";
import Body from "./components/Body";
import Country from "./components/Country";

import H1 from "./elements/H1";

const theme = {
  "font-family": "sans-serif",
  light: {
    color: "rgb(17, 21, 23)",
    elements: "rgb(255, 255, 255)",
    background: "rgb(225,225,225)",
  },
  dark: {
    color: "rgb(255, 255, 255)",
    elements: "rgb(43, 57, 69)",
    background: "rgb(32,44,55)",
  },
};

function App() {
  const [mode, setMode] = useState(
    localStorage.getItem("mode") === null ? "dark" : "light"
  );
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
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header
          mode={mode}
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
                  mode={mode}
                  countries={countries}
                  onOpenCountry={(country) => {
                    setOpenCountry(country);
                  }}
                />
              )}
            />
            <Route
              path="/:countryName"
              component={() => (
                <Country
                  mode={mode}
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
