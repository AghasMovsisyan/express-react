import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CardContainer, CardDescription, CardImage, CardTitle } from "./UserCardsStyled";
import axios from "axios";

function UserCards() {
  const { id: userId } = useParams();
  const [cards, setCards] = useState([]);

  const fetchUserCards = async () => {
    try {
      const response = await axios.get(`/user-cards/${userId}`);
  
      if (response.status === 200) {
        const data = response.data;
        setCards(data.cards);
      } else {
        console.error('Failed to fetch cards');
      }
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };
  
  useEffect(() => { 
    fetchUserCards();
  }, [userId]);

  return (
    <div>
      {cards.map((card) => (
        <CardContainer key={card._id}>
          <CardImage consolelog={console.log("cardimagge", card.image)} src={require('./cactus.jpeg')} alt={card.title} /> {/* Displaying the image */}
          <CardTitle>{card.title}</CardTitle>
          <CardDescription>{card.description}</CardDescription>
        </CardContainer>
      ))}   
    </div>
  );  
}

export default UserCards;
  