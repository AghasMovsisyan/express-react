import styled from "styled-components";

export const CardContainer = styled.div`
display: flex;
flex-direction: column;
border: 1px solid #ccc;
border-radius: 5px;
background-color: #f9f9f9;
width: 300px;
margin-bottom: 20px;
margin-left: 20px;
`;

export const CardImage = styled.img`
width: 300px;
height: auto;
border-radius: 5px;
margin-bottom: 10px;
`;

export const CardTitle = styled.h4`
color: #333;
padding: 0px 0px 0px 5px;
font-size: 18px;
margin-bottom: 8px;
`;

export const CardDescription = styled.p`
color: #555;
padding: 0px 0px 0px 5px;
font-size: 14px;
`;