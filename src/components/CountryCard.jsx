import React from "react";
import styled from "styled-components";

const CardDiv = styled.div`
  color: ${(props) => props.theme[props.mode]["color"]};
  background: ${(props) => props.theme[props.mode]["elements"]};

  width: 225px;
  height: 300px;
  margin-bottom: 100px;

  border-radius: 5px;

  display: flex;
  flex-direction: column;

  justify-content: flex-start;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

const FlagDiv = styled.div`
  width: 100%;
  height: 50%;
  background: ${(props) => props.theme[props.mode]["elements"]};

  display: "flex";
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const DetailsDiv = styled.div`
  width: 100%;
  height: 50%;

  color: ${(props) => props.theme[props.mode]["color"]};
  background: ${(props) => props.theme[props.mode]["elements"]};

  display: "flex";
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 0px;

  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

const CountryCardHeading = styled.h1`
  font-size: 20px;
  display: flex;
  margin-left: 10px;
  //flex-direction: row;
  //justify-content: flex-start;
`;

const DetailsParagraph = styled.p`
  font-size: 15px;
  display: flex;
  margin-left: 10px;

  margin-top: 0px;
  margin-bottom: 0px;
`;

export default function CountryCard({ theme, mode, countryDetails, onClick }) {
  return (
    <CardDiv mode={mode} onClick={onClick}>
      <FlagDiv mode={mode}>
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

      <DetailsDiv mode={mode}>
        <CountryCardHeading>{countryDetails["name"]}</CountryCardHeading>

        <DetailsParagraph>
          <strong style={{ marginRight: ".5rem" }}>Population:</strong>
          {countryDetails["population"]}
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
