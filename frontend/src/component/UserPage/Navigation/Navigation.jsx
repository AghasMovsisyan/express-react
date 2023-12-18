import React from "react";
import { Li, NavigationStyle, StyledLink, Ul } from "./NavigationStyled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

function Navigation() {
  return (
    <NavigationStyle>
      <Ul>
        <Li>
          <StyledLink to="/home">
            <FontAwesomeIcon icon={faHome} /> Home
          </StyledLink>
        </Li>
        <Li>
          <StyledLink to="/login">
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </StyledLink> 
        </Li>
      </Ul>
    </NavigationStyle>
  );
}

export default Navigation;
