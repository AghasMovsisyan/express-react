import styled from "styled-components";

export const CardForm = styled.form`
  margin-top: 10px;
  margin-left: 18px;
  padding: 20px;
  border-radius: 5px;
`;

export const H3 = styled.h3`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  width: 250px;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

export const Textarea = styled.textarea`
  width: 250px;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

export const Br = styled.br`
`;

export const CreateCardButton = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
  background-color: #0056b3;
}
`;
