
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// Styled components from your Login component
export const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
  flex-direction: column;
`;

export const Title = styled.h2`
  color: #333;
  margin-bottom: 30px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

export const Input = styled.input`
  margin-bottom: 20px;
  padding: 10px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Button = styled.button`
  width: 320px;
  background-color: #4caf50;
  color: white;
  padding: 12px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

export const LoginLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: #555;
  margin-top: 15px;
  text-align: left;
`;