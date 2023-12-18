import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Br, CardForm, CreateCardButton, H3, Input, Label, Textarea } from "./CreateCardStyled";
import axios from "axios";

function CreateCard() {
  const { id: userId } = useParams();
  const [cards, setCards] = useState([]);
  const [cardData, setCardData] = useState({
    title: '',
    description: '',
    size: '',
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setCardData((prevData) => ({
      ...prevData,
      image: imageFile,
    }));
  };

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

  const handleCardSubmission = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', cardData.title);
      formData.append('description', cardData.description);
      formData.append('size', cardData.size )
      formData.append('userId', userId);
      formData.append('image', cardData.image)

      const response = await axios.post('/create-card', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        console.log('Card created successfully');
        setCardData({
          title: '',
          description: '',
          size: '',
          image: null,
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
       <Label htmlFor="size">Size:</Label>
       <Input
         id="size"
         name="size"
         value={cardData.size}
         onChange={handleInputChange}
       ></Input>
       <Br />
       <Label htmlFor="description">Description:</Label>
       <Textarea
         id="description"
         name="description"
         value={cardData.description}
         onChange={handleInputChange}
       ></Textarea>
       <Br />
       <Label htmlFor="image">Image:</Label>
       <Input
         type="file"
         id="image"
         name="image"
         accept="image/*"
         onChange={handleImageChange}
       />
       <Br />
       <CreateCardButton type="submit">Create Card</CreateCardButton>
     </CardForm>
  );
}

export default CreateCard;
