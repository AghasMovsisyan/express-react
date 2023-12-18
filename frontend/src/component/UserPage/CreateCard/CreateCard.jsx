import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Br, CardForm, CreateCardButton, H3, Input, Label, Textarea } from "./CreateCardStyled";


function CreateCard () {
  const { id: userId } = useParams();
  const [cards, setCards] = useState([]);
  const [cardData, setCardData] = useState({
    title: '',
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchUserCards = async () => {
    try {
      const response = await fetch(`/user-cards/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setCards(data.cards);
      } else {
        console.error('Failed to fetch cards');
      }
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };
  const handleCardSubmission = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/create-card', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: cardData.title,
          description: cardData.description,
          userId: userId,
        }),
      });

      if (response.ok) {
        console.log('Card created successfully');
        setCardData({
          title: '',
          description: '',
        });
        fetchUserCards();
      } else {
        console.error('Failed to create card');
      }
    } catch (error) {
      console.error('Error creating card:', error);
    }
  };

  return (
    <CardForm onSubmit={handleCardSubmission}>
       <H3>Create a Card</H3>
       <Label htmlFor="title">Title:</Label>
       <Input
         type="text"
         id="title"
         name="title"
         value={cardData.title}
         onChange={handleInputChange}
       />
       <Br />
       <Label htmlFor="description">Description:</Label>
       <Textarea
         id="description"
         name="description"
         value={cardData.description}
         onChange={handleInputChange}
       ></Textarea>
       <Br />
       <CreateCardButton type="submit">Create Card</CreateCardButton  >
     </CardForm>
  )


}

export default CreateCard;