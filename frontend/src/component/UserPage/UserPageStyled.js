import { Link } from "react-router-dom";
import styled from "styled-components";


export const Navigation = styled.nav`
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
  margin-right: 10px;
`;

export const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
`;

export const ProfileSection = styled.div`
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 20px;
`;

export const LogoImage = styled.img`
  width: 30px; /* Adjust width as needed */
  height: 30px; /* Adjust height as needed */
  margin-right: 5px; /* Add margin for spacing */
  /* Add more styles if required */
`;

export const CardForm = styled.form`
  margin-top: 20px;
  padding: 20px;
  border-radius: 5px;

  h3 {
    margin-bottom: 10px;
  }

  label {
    display: block;
    margin-bottom: 5px;
  }

  input,
  textarea {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }

  button {
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }
`;

export const TabButton = styled(Link)`
  text-transform: uppercase;
  color: #201e1e;
  text-decoration: none;
  padding: 10px 15px;
  margin: 0;
  font-size: 16px;
  font-family: Arial;
  cursor: pointer;
  transition: background-color 0.3s;
  height: 38px;
`;

export const Tabs = styled.div`
margin-top: 30px;
margin-left: -10px

`;