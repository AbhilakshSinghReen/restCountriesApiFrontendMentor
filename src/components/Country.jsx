import React, { useEffect, useState } from "react";

import { useHistory } from "react-router-dom";
import styled from "styled-components";

import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

import { numberWithCommas } from "../helpers";

const BackButtonBgDiv = styled.div`
  color: ${(props) => props.theme["color"]};
  background: ${(props) => props.theme["background"]};

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 15vh;
`;

const BackButtonDiv = styled.div`
  font-family: ${(props) => props.theme["font-family"]};
  background: ${(props) => props.theme["elements"]};

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 150px;
  height: 50px;

  margin-left: 5vw;
  border-radius: 5px;

  &:hover {
    background: ${(props) => props.theme["background"]};
    cursor: pointer;
  }
`;

const BackText = styled.h1`
  font-size: 20px;
  color: ${(props) => props.theme["color"]};

  display: flex;
  flex-direction: column;
  justify-content: center;

  height: 35px;

  margin-left: 10px;
  margin-right: 15px;

  border: none;
  outline: none;
`;

const CountryDetailsDiv = styled.div`
  font-family: ${(props) => props.theme["font-family"]};
  color: ${(props) => props.theme["color"]};
  background: ${(props) => props.theme["background"]};

  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  width: 100%;
  min-height: 75vh;

  @media only screen and (max-width: 1024px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
`;

const FlagDiv = styled.div`
  width: 40vw;
  height: 40vw;

  margin-top: 5vh;

  @media only screen and (max-width: 1024px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    width: 80vw;
    height: 54vw;
  }
`;

const DetailsDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  width: 40vw;
  height: 40vw;

  margin-top: 5vh;
  padding-left: 2vw;

  @media only screen and (max-width: 1024px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    width: 80vw;
    height: 54vw;
  }
`;

const DetailsMainDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  @media only screen and (max-width: 1024px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
`;

const DetailsSubDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  width: 20vw;

  @media only screen and (max-width: 1024px) {
    width: 80vw;
  }
`;
const BorderCountriesDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;

  width: 40vw;

  @media only screen and (max-width: 1024px) {
    width: 80vw;
  }
`;
const BorderCountryButton = styled.button`
  font-size: 15px;
  color: ${(props) => props.theme["color"]};
  background: ${(props) => props.theme["elements"]};

  margin-right: 7px;
  padding: 5px;
  border: none;
  border-radius: 2px;
  outline: none;

  @media only screen and (max-width: 1024px) {
    margin-top: 1em;
    margin-bottom: 1em;
  }

  &:hover {
    cursor: pointer;
  }
`;

const DetailsParagraph = styled.p`
  font-size: 15px;

  display: flex;

  margin-top: 0px;
  margin-left: 10px;
  margin-bottom: 0px;

  @media only screen and (max-width: 1024px) {
    margin-left: 0px;
  }
`;

export default function Country({
  theme,
  openCountry,
  countries,
  onOpenCountry,
}) {
  const history = useHistory();
  const [openedCountry, setOpenedCountry] = useState(openCountry);
  const [detailsOfAllCountries, setDetailsOfAllCountries] = useState(countries);

  const [isLoading, setIsLoading] = useState(true);
  const [badUrlError, setBadUrlError] = useState(false);

  useEffect(() => {
    const openedCountryAlpha3Code = window.location.pathname.slice(
      1,
      window.location.pathname.length
    );

    for (let i = 0; i < detailsOfAllCountries.length; i++) {
      if (detailsOfAllCountries[i]["alpha3Code"] === openedCountryAlpha3Code) {
        setOpenedCountry(detailsOfAllCountries[i]);
        setIsLoading(false);
        return;
      }
    }
    setBadUrlError(true);
  }, [detailsOfAllCountries]);

  if (badUrlError) {
    return (
      <div>
        <BackButtonBgDiv>
          <BackButtonDiv onClick={() => history.push("/")}>
            <KeyboardBackspaceIcon />
            <BackText>Back</BackText>
          </BackButtonDiv>
        </BackButtonBgDiv>
        <CountryDetailsDiv>
          <h1>Invalid URL, press back to return to the homepage.</h1>
        </CountryDetailsDiv>
      </div>
    );
  } else if (isLoading) {
    return (
      <div>
        <BackButtonBgDiv>
          <BackButtonDiv onClick={() => history.push("/")}>
            <KeyboardBackspaceIcon />
            <BackText>Back</BackText>
          </BackButtonDiv>
        </BackButtonBgDiv>
        <CountryDetailsDiv>
          <h1>Loading...</h1>
        </CountryDetailsDiv>
      </div>
    );
  } else {
    const currencies = openedCountry["currencies"];
    const languages = openedCountry["languages"];
    const borderCountriesCodes = openedCountry["borders"];

    let borderCountries = [];

    borderCountriesCodes.forEach((alpha3Code) => {
      for (let i = 0; i < countries.length; i++) {
        if (countries[i]["alpha3Code"] === alpha3Code) {
          borderCountries.push(countries[i]);
          i = countries.length;
        }
      }
    });

    return (
      <div>
        <BackButtonBgDiv>
          <BackButtonDiv onClick={() => history.push("/")}>
            <KeyboardBackspaceIcon />
            <BackText>Back</BackText>
          </BackButtonDiv>
        </BackButtonBgDiv>
        <CountryDetailsDiv>
          <FlagDiv>
            <img
              src={openedCountry["flag"]}
              alt="Logo"
              width="100%"
              style={{
                borderTopLeftRadius: "5px",
                borderTopRightRadius: "5px",
              }}
            />
          </FlagDiv>
          <DetailsDiv>
            <h1>{openedCountry["name"]}</h1>

            <DetailsMainDiv>
              <DetailsSubDiv>
                <DetailsParagraph>
                  <strong style={{ marginRight: ".5rem" }}>Native name:</strong>
                  {openedCountry["nativeName"]}
                </DetailsParagraph>
                <DetailsParagraph>
                  <strong style={{ marginRight: ".5rem" }}>Population:</strong>
                  {numberWithCommas(openedCountry["population"])}
                </DetailsParagraph>
                <DetailsParagraph>
                  <strong style={{ marginRight: ".5rem" }}>Region:</strong>
                  {openedCountry["region"]}
                </DetailsParagraph>
                <DetailsParagraph>
                  <strong style={{ marginRight: ".5rem" }}>Sub Region:</strong>
                  {openedCountry["subregion"]}
                </DetailsParagraph>
                <DetailsParagraph>
                  <strong style={{ marginRight: ".5rem" }}>Capital:</strong>
                  {openedCountry["capital"]}
                </DetailsParagraph>
              </DetailsSubDiv>
              <DetailsSubDiv>
                <DetailsParagraph>
                  <strong style={{ marginRight: ".5rem" }}>
                    Top Level Domain:
                  </strong>
                  {openedCountry["topLevelDomain"][0]}
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
                  onClick={() => {
                    onOpenCountry(country);
                    history.push(`/${country["alpha3Code"]}`);
                  }}
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
}
