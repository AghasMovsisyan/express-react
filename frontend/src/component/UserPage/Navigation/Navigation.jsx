import React from "react";
import { Li, NavigationStyle, StyledLink, Ul } from "./NavigationStyled";

function Navigation () {

  return (
      <NavigationStyle>
        <Ul>
          <Li>
            <StyledLink to="/home">Home</StyledLink>
          </Li>
          <Li>
            <StyledLink to="/dashboard">Dashboard</StyledLink>
          </Li>
        </Ul>
      </NavigationStyle>
  )
};
export default Navigation;