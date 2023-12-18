import { Link } from "react-router-dom";
import styled from "styled-components";


export const NavigationStyle = styled.nav`
  background: #333;
  color: #fff;
  padding: 10px;
`;

export const Ul = styled.ul`
  list-style: none;
  display: flex;
  justify-content: left;
`;

export const Li = styled.li`
  margin-right: 25px;
`;

export const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
`;