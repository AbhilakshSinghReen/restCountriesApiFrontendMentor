import React from "react";

import styled from "styled-components";

import { numberWithCommas } from "../helpers";

const CardDiv = styled.div`
  color: ${(props) => props.theme["color"]};
  background: ${(props) => props.theme["elements"]};

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  width: 225px;
  height: 300px;

  border-radius: 5px;

  &:hover {
    cursor: pointer;
  }
`;

const FlagDiv = styled.div`
  background: ${(props) => props.theme["elements"]};

  display: "flex";
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 50%;

  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const DetailsDiv = styled.div`
  color: ${(props) => props.theme["color"]};
  background: ${(props) => props.theme["elements"]};

  display: "flex";
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  width: 100%;
  height: 50%;

  margin: 0px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

const CountryCardHeading = styled.h1`
  font-size: 20px;

  display: flex;

  margin-left: 10px;
`;

const DetailsParagraph = styled.p`
  font-size: 15px;

  display: flex;

  margin-left: 10px;
  margin-top: 0px;
  margin-bottom: 0px;
`;

export default function CountryCard({ theme, countryDetails, onClick }) {
  return (
    <CardDiv onClick={onClick}>
      <FlagDiv>
        <img
          src={countryDetails["flag"]}
          alt="Logo"
          width="100%"
          style={{
            borderTopLeftRadius: "5px",
            borderTopRightRadius: "5px",
          }}
        />
      </FlagDiv>

      <DetailsDiv>
        <CountryCardHeading>{countryDetails["name"]}</CountryCardHeading>

        <DetailsParagraph>
          <strong style={{ marginRight: ".5rem" }}>Population:</strong>
          {numberWithCommas(countryDetails["population"])}
        </DetailsParagraph>
        <DetailsParagraph>
          <strong style={{ marginRight: ".5rem" }}>Region:</strong>
          {countryDetails["region"]}
        </DetailsParagraph>
        <DetailsParagraph>
          <strong style={{ marginRight: ".5rem" }}>Capital:</strong>
          {countryDetails["capital"]}
        </DetailsParagraph>
      </DetailsDiv>
    </CardDiv>
  );
}
