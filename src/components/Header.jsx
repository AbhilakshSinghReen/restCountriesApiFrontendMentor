import React from "react";

import styled from "styled-components";
import NightsStayIcon from "@material-ui/icons/NightsStay";

const HeaderDiv = styled.div`
  font-family: ${(props) => props.theme["font-family"]};
  color: ${(props) => props.theme["color"]};
  background: ${(props) => props.theme["elements"]};

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  height: 10vh;
`;

const WebsiteTitle = styled.div`
  font-size: 5vw;
  font-weight: bold;

  margin-left: 5vw;

  @media screen and (min-width: 600px) {
    font-size: 32px;
  } ;
`;

const ModeDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: 5vw;
  margin-right: 5vw;
  border-radius: 5px;

  &:hover {
    background: ${(props) => props.theme["background"]};
  }
`;

const ModeText = styled.h1`
  font-size: 3vw;
  color: ${(props) => props.theme["color"]};

  display: flex;
  flex-direction: column;
  justify-content: center;

  height: 35px;

  margin-left: 5px;
  margin-right: 15px;
  border: none;
  outline: none;

  @media screen and (min-width: 600px) {
    font-size: 20px;
  } ;
`;

export default function Header({ theme, toggleMode }) {
  return (
    <HeaderDiv>
      <WebsiteTitle>Where in the world?</WebsiteTitle>
      <ModeDiv onClick={toggleMode}>
        <NightsStayIcon />
        <ModeText>Dark Mode</ModeText>
      </ModeDiv>
    </HeaderDiv>
  );
}
