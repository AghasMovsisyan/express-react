import React, { useState } from 'react';
import {  Li, TabButton, Tabs, Ul } from './UserPageStyled';
import UserCards from './UserCards/UserCards';
import CreateCard from './CreateCard/CreateCard';
import Navigation from './Navigation/Navigation';

function UserPage() {

  const [activeTab, setActiveTab] = useState('createCard');

  return (
    <div>
     <Navigation />
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
    <CreateCard></CreateCard>
    )}

    {activeTab === 'userCards' && (
      <div>
        <UserCards></UserCards>
      </div>
    )}

    </div>
  );
}

export default UserPage;
