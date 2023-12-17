import React, { useState, useEffect } from 'react';
import { CardForm, Li, Navigation, StyledLink, TabButton, Tabs, Ul } from './UserPageStyled';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

function UserPage() {

  const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  width: 250px;
  margin-bottom: 20px;
`;


const CardTitle = styled.h4`
  color: #333;
  font-size: 18px;
  margin-bottom: 8px;
`;

const CardDescription = styled.p`
  color: #555;
  font-size: 14px;
`;

const CardImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 5px;
  margin-bottom: 10px;
`;
  const { id: userId } = useParams();
  const [cardData, setCardData] = useState({
    title: '',
    description: '',
    // Other fields for the card
  });
  const [cards, setCards] = useState([]);
  const [activeTab, setActiveTab] = useState('createCard'); // State to manage active tab

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchUserCards = async () => {
    try {
      const response = await fetch(`/user-cards/${userId}`); // Replace with your endpoint
      if (response.ok) {
        const data = await response.json();
        setCards(data.cards); // Assuming the response contains a 'cards' property
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
          // Other card data fields as needed
        }),
      });

      if (response.ok) {
        console.log('Card created successfully');
        setCardData({
          title: '',
          description: '',
          // Reset other fields as needed
        });
        fetchUserCards();
      } else {
        console.error('Failed to create card');
      }
    } catch (error) {
      console.error('Error creating card:', error);
    }
  };

  useEffect(() => {
    fetchUserCards();
  }, [userId]); // Fetch again when userId changes

  return (
    <div>
      <Navigation>
        <Ul>
          <Li>
            <StyledLink to="/home">Home</StyledLink>
          </Li>
          <Li>
            <StyledLink to="/dashboard">Dashboard</StyledLink>
          </Li>
        </Ul>
      </Navigation>

      <Tabs>
        <Ul>
          <Li>
            <TabButton onClick={() => setActiveTab('createCard')}>Create Card</TabButton>
          </Li>
          <Li>
            <TabButton onClick={() => setActiveTab('userCards')}>User Cards</TabButton>
          </Li>
        </Ul>
      </Tabs>
      <hr></hr>
      

      {activeTab === 'createCard' && (
       <CardForm onSubmit={handleCardSubmission}>
       <h3>Create a Card</h3>
       <label htmlFor="title">Title:</label>
       <input
         type="text"
         id="title"
         name="title"
         value={cardData.title}
         onChange={handleInputChange}
       />
       <br />
       <label htmlFor="description">Description:</label>
       <textarea
         id="description"
         name="description"
         value={cardData.description}
         onChange={handleInputChange}
       ></textarea>
       <br />
       <button type="submit">Create Card</button>
     </CardForm>
      )}

{activeTab === 'userCards' && (
  <div>
    {/* Content for user cards tab */}
    {cards.map((card) => (
      <CardContainer key={card._id}>
        <CardImage src={card.imageUrl} alt={card.title} />
        <CardTitle>{card.title}</CardTitle>
        <CardDescription>{card.description}</CardDescription>
      </CardContainer>
    ))}
  </div>
)}

    </div>
  );
}

export default UserPage;
