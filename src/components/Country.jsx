import React from "react";

import styled from "styled-components";
import { useHistory } from "react-router-dom";

import backLight from "../icons/backLight.png";
import backDark from "../icons/backDark.png";

const BackButtonBgDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => props.theme[props.mode]["color"]};
  background: ${(props) => props.theme[props.mode]["background"]};
  height: 15vh;
  width: 100%;
`;

const BackButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: 5vw;
  background: ${(props) => props.theme[props.mode]["elements"]};
  height: 50px;
  width: 150px;
  border-radius: 5px;

  &:hover {
    background: ${(props) => props.theme[props.mode]["background"]};
    cursor: pointer;
  }
  font-family: ${(props) => props.theme["font-family"]};
`;

const BackText = styled.h1`
  font-size: 20px;
  height: 35px;
  border: none;
  outline: none;
  color: ${(props) => props.theme[props.mode]["color"]};
  margin-right: 15px;
  margin-left: 10px;
`;

const CountryDetailsDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  color: ${(props) => props.theme[props.mode]["color"]};
  background: ${(props) => props.theme[props.mode]["background"]};
  min-height: 75vh;
  width: 100%;
  font-family: ${(props) => props.theme["font-family"]};
`;

const FlagDiv = styled.div`
  margin-top: 5vh;
  width: 40vw;
  height: 40vw;
`;

const DetailsDiv = styled.div`
  margin-top: 5vh;
  width: 40vw;
  height: 40vw;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding-left: 2vw;
`;

const DetailsMainDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const DetailsSubDiv = styled.div`
  width: 20vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;
const BorderCountriesDiv = styled.div`
  width: 40vw;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
`;
const BorderCountryButton = styled.button`
  font-size: 15px;
  padding: 5px;
  margin-left: 7px;
  border-radius: 2px;
  color: ${(props) => props.theme[props.mode]["color"]};
  background: ${(props) => props.theme[props.mode]["elements"]};
  border: none;
  outline: none;

  &:hover {
    cursor: pointer;
  }
`;

const DetailsParagraph = styled.p`
  font-size: 15px;
  display: flex;
  margin-left: 10px;

  margin-top: 0px;
  margin-bottom: 0px;
`;

export default function Country({
  theme,
  mode,
  openCountry,
  countries,
  onOpenCountry,
}) {
  const history = useHistory();

  console.log(`Opened country: ${openCountry["name"]}`);
  const currencies = openCountry["currencies"];
  const languages = openCountry["languages"];
  const borderCountriesCodes = openCountry["borders"];

  let borderCountries = [];

  borderCountriesCodes.forEach((alpha3Code) => {
    for (let i = 0; i < countries.length; i++) {
      if (countries[i]["alpha3Code"] === alpha3Code) {
        borderCountries.push(countries[i]);
        i = countries.length;
      }
    }
  });

  borderCountries.forEach((country) => {
    console.log(country["name"]);
  });

  return (
    <div>
      <BackButtonBgDiv mode={mode}>
        <BackButtonDiv mode={mode} onClick={() => history.push("/")}>
          <img
            src={mode === "light" ? backLight : backDark}
            alt="Logo"
            height="35"
            width="70"
            style={{
              marginLeft: "15px",
            }}
          />
          <BackText mode={mode}>Back</BackText>
        </BackButtonDiv>
      </BackButtonBgDiv>
      <CountryDetailsDiv mode={mode}>
        <FlagDiv mode={mode}>
          <img
            src={openCountry["flag"]}
            alt="Logo"
            width="100%"
            style={{
              borderTopLeftRadius: "5px",
              borderTopRightRadius: "5px",
            }}
          />
        </FlagDiv>
        <DetailsDiv>
          <h1>{openCountry["name"]}</h1>

          <DetailsMainDiv>
            <DetailsSubDiv>
              <DetailsParagraph>
                <strong style={{ marginRight: ".5rem" }}>Native name:</strong>
                {openCountry["nativeName"]}
              </DetailsParagraph>
              <DetailsParagraph>
                <strong style={{ marginRight: ".5rem" }}>Population:</strong>
                {openCountry["population"]}
              </DetailsParagraph>
              <DetailsParagraph>
                <strong style={{ marginRight: ".5rem" }}>Region:</strong>
                {openCountry["region"]}
              </DetailsParagraph>
              <DetailsParagraph>
                <strong style={{ marginRight: ".5rem" }}>Sub Region:</strong>
                {openCountry["subregion"]}
              </DetailsParagraph>
              <DetailsParagraph>
                <strong style={{ marginRight: ".5rem" }}>Capital:</strong>
                {openCountry["capital"]}
              </DetailsParagraph>
            </DetailsSubDiv>
            <DetailsSubDiv>
              <DetailsParagraph>
                <strong style={{ marginRight: ".5rem" }}>
                  Top Level Domain:
                </strong>
                {openCountry["topLevelDomain"][0]}
              </DetailsParagraph>
              <DetailsParagraph>
                <strong style={{ marginRight: ".5rem" }}>Currencies:</strong>
                {currencies.map(
                  (currency) =>
                    ` ${currency["name"]}${
                      currencies.indexOf(currency) === currencies.length - 1
                        ? ""
                        : ", "
                    }`
                )}
              </DetailsParagraph>
              <DetailsParagraph>
                <strong style={{ marginRight: ".5rem" }}>Languages:</strong>
                {languages.map(
                  (language) =>
                    ` ${language["name"]}${
                      languages.indexOf(language) === languages.length - 1
                        ? ""
                        : ", "
                    }`
                )}
              </DetailsParagraph>
            </DetailsSubDiv>
          </DetailsMainDiv>

          <BorderCountriesDiv>
            <h3>Border countries: </h3>
            {borderCountries.map((country) => (
              <BorderCountryButton
                mode={mode}
                onClick={() => onOpenCountry(country)}
              >
                {country["name"]}
              </BorderCountryButton>
            ))}
          </BorderCountriesDiv>
        </DetailsDiv>
      </CountryDetailsDiv>
    </div>
  );
}
