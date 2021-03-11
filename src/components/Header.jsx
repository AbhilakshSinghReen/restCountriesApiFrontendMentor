import React from "react";
import styled from "styled-components";
import lightModeMoon from "../icons/lightMode.png";
import darkModeMoon from "../icons/darkMode.png";

const HeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => props.theme[props.mode]["color"]};
  background: ${(props) => props.theme[props.mode]["elements"]};
  height: 10vh;
  font-family: ${(props) => props.theme["font-family"]};
`;

const ModeDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-right: 5vw;

  &:hover {
    background: ${(props) => props.theme[props.mode]["background"]};
  }

  border-radius: 5px;
`;

const MainHeading = styled.div`
  margin-left: 5vw;
  font-weight: bold;
  font-size: 32px;
`;

const ModeText = styled.h1`
  font-size: 20px;
  height: 35px;
  border: none;
  outline: none;
  color: ${(props) => props.theme[props.mode]["color"]};
  margin-right: 15px;
  margin-left: 10px;
`;

export default function Header({ theme, mode, toggleMode }) {
  return (
    <HeaderDiv mode={mode}>
      <MainHeading>Where in the world?</MainHeading>
      <ModeDiv mode={mode} onClick={toggleMode}>
        <img
          src={mode === "light" ? lightModeMoon : darkModeMoon}
          alt="Logo"
          height="35"
          width="35"
          style={{
            marginLeft: "15px",
          }}
        />
        <ModeText mode={mode}>Dark Mode</ModeText>
      </ModeDiv>
    </HeaderDiv>
  );
}
