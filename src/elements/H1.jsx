import styled from "styled-components";

export default styled.h1`
  font-size: 132px;
  color: ${(props) => props.theme[props.color]};
`;
