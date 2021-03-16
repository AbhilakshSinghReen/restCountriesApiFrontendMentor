import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import styled from "styled-components";

import SearchIcon from "@material-ui/icons/Search";

import CountryCard from "./CountryCard";

const BodyDiv = styled.div`
  font-family: ${(props) => props.theme["font-family"]};
  color: ${(props) => props.theme["color"]};
  background: ${(props) => props.theme["background"]};

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  min-height: 90vh;
`;

const SearchAndFilterDiv = styled.div`
  font-family: ${(props) => props.theme["font-family"]};
  color: ${(props) => props.theme["color"]};
  background: ${(props) => props.theme["background"]};

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 15vh;

  @media only screen and (max-width: 1280px) {
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
  }
`;

const CountriesDiv = styled.div`
  color: ${(props) => props.theme["color"]};
  background: ${(props) => props.theme["background"]};

  display: grid;
  justify-content: center;
  justify-items: center;
  grid-template-columns: repeat(4, 350px);
  grid-auto-rows: 350px;

  width: 100%;
  min-height: 75vh;

  @media only screen and (max-width: 1500px) {
    grid-template-columns: repeat(3, 350px);
  }
  @media only screen and (max-width: 1150px) {
    grid-template-columns: repeat(2, 350px);
  }
  @media only screen and (max-width: 750px) {
    grid-template-columns: repeat(1, 350px);
  }
`;

const SearchDiv = styled.div`
  color: ${(props) => props.theme["color"]};
  background: ${(props) => props.theme["elements"]};

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  width: 30vw;
  height: 5vh;

  margin-left: 5vw;
  margin-right: 5vw;
  border-radius: 5px;

  @media only screen and (max-width: 1280px) {
    width: 90vw;
    max-width: 400px;
  }
`;

const SearchInput = styled.input`
  font-size: 20px;
  color: ${(props) => props.theme["color"]};
  background: ${(props) => props.theme["elements"]};

  width: 25vw;
  height: 35px;

  border: none;
  outline: none;

  ::placeholder {
    color: ${(props) => props.theme["color"]};
  }

  @media only screen and (max-width: 1280px) {
    width: 80vw;
  }
`;

const RegionSelector = styled.select`
  font-size: 20px;
  color: ${(props) => props.theme["color"]};
  background: ${(props) => props.theme["elements"]};

  width: 15vw;
  height: 5vh;

  margin-left: 5vw;
  margin-right: 5vw;
  padding-left: 1vw;
  padding-right: 1vw;
  border: none;
  border-radius: 5px;
  outline: none;

  @media only screen and (max-width: 1280px) {
    width: 50vw;
    max-width: 300px;
  }
`;

export default function Body({ theme, onOpenCountry, countries }) {
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
    <BodyDiv>
      <SearchAndFilterDiv>
        <SearchDiv>
          <SearchIcon
            style={{
              width: "10vw",
              maxWidth: "50px",
            }}
          />
          <SearchInput
            type="text"
            placeholder="Search for a country..."
            value={searchInputValue}
            onChange={onSearchInputValueChange}
          />
        </SearchDiv>

        <RegionSelector
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

      <CountriesDiv>
        {filteredCountries.map((country) => (
          <CountryCard
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
