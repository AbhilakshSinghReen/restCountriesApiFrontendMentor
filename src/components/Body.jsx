import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { useHistory } from "react-router-dom";

import CountryCard from "./CountryCard";

import searchLight from "../icons/searchLight.png";
import searchDark from "../icons/searchDark.png";

const BodyDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  color: ${(props) => props.theme[props.mode]["color"]};
  background: ${(props) => props.theme[props.mode]["background"]};
  min-height: 90vh;
  font-family: ${(props) => props.theme["font-family"]};
`;

const SearchAndFilterDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => props.theme[props.mode]["color"]};
  background: ${(props) => props.theme[props.mode]["background"]};
  height: 15vh;
  width: 100%;
  font-family: ${(props) => props.theme["font-family"]};

  @media only screen and (max-width: 1280px) {
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
  }
`;

const CountriesDiv = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(4, 360px);
  grid-auto-rows: 350px;
  color: ${(props) => props.theme[props.mode]["color"]};
  background: ${(props) => props.theme[props.mode]["background"]};
  min-height: 75vh;
  width: 100%;

  @media only screen and (max-width: 1500px) {
    grid-template-columns: repeat(3, 360px);
  }
  @media only screen and (max-width: 1150px) {
    grid-template-columns: repeat(2, 360px);
  }
  @media only screen and (max-width: 750px) {
    grid-template-columns: repeat(1, 360px);
  }
`;

const SearchDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  color: ${(props) => props.theme[props.mode]["color"]};
  background: ${(props) => props.theme[props.mode]["elements"]};
  height: 5vh;
  width: 30vw;
  margin-left: 5vw;
  border-radius: 5px;
`;

const SearchInput = styled.input`
  color: ${(props) => props.theme[props.mode]["color"]};
  background: ${(props) => props.theme[props.mode]["elements"]};
  height: 35px;
  border: none;
  outline: none;
  font-size: 20px;
  margin-left: 1vw;
  width: 25vw;
  ::placeholder {
    color: ${(props) => props.theme[props.mode]["color"]};
  }
`;

const RegionSelector = styled.select`
  color: ${(props) => props.theme[props.mode]["color"]};
  background: ${(props) => props.theme[props.mode]["elements"]};
  height: 5vh;
  width: 15vw;
  font-size: 20px;

  margin-left: 5vw;
  margin-right: 5vw;
  padding-left: 1vw;
  padding-right: 1vw;
  border: none;
  outline: none;
  border-radius: 5px;
`;

export default function Body({ theme, mode, onOpenCountry, countries }) {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [filterRegion, setFilterRegion] = useState("Filter by Region");

  const [filteredCountries, setfilteredCountries] = useState(countries);

  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  const history = useHistory();

  const onSearchInputValueChange = (event) => {
    setSearchInputValue(event.target.value);
  };

  const onFilterRegionChange = (event) => {
    setFilterRegion(event.target.value);
  };

  useEffect(() => {
    let countriesFilteredByRegion = [];
    let countriesFilteredBySearch = [];

    if (filterRegion !== "Filter by Region") {
      countriesFilteredByRegion = countries.filter((country) => {
        return country["region"] === filterRegion;
      });
    } else {
      countriesFilteredByRegion = countries;
    }

    var filterRegex = new RegExp(searchInputValue, "i");
    countriesFilteredBySearch = countries.filter((country) => {
      return filterRegex.test(country["name"]);
    });

    setfilteredCountries(
      countriesFilteredByRegion.filter((country) =>
        countriesFilteredBySearch.includes(country)
      )
    );
  }, [searchInputValue, filterRegion]);

  return (
    <BodyDiv mode={mode}>
      <SearchAndFilterDiv mode={mode}>
        <SearchDiv mode={mode}>
          <img
            src={mode === "light" ? searchLight : searchDark}
            alt="Logo"
            height="35"
            width="70"
            style={{
              marginLeft: "15px",
            }}
          />
          <SearchInput
            mode={mode}
            type="text"
            placeholder="Search for a country..."
            value={searchInputValue}
            onChange={onSearchInputValueChange}
          />
        </SearchDiv>

        <RegionSelector
          mode={mode}
          name="cars"
          id="cars"
          multiple={false}
          required={false}
          onChange={onFilterRegionChange}
        >
          <option default>Filter by Region</option>

          {regions.map((region) => (
            <option value={region}>{region}</option>
          ))}
        </RegionSelector>
      </SearchAndFilterDiv>

      <CountriesDiv mode={mode}>
        {filteredCountries.map((country) => (
          <CountryCard
            mode={mode}
            countryDetails={country}
            onClick={() => {
              onOpenCountry(country);
              history.push(`/${country["alpha3Code"]}`);
            }}
            key={filteredCountries.indexOf(country)}
          />
        ))}
      </CountriesDiv>
    </BodyDiv>
  );
}
