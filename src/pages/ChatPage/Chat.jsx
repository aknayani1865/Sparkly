import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import styled from "styled-components";
import ChatContainer from "../../components/Chat/ChatContainer";
import Contacts from "../../components/Chat/Contacts";
import Welcome from "../../components/Chat/Welcome";
import  useStore  from "../../store/chatUser";
export default function Chat() {
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const userData = useStore.getState().userData;
  useEffect(() => {
    console.log(userData)
    if (userData) {
      socket.current = io("http://localhost:5000");
      socket.current.emit("add-user", userData._id);
    }
  }, [userData]);

  
  useEffect( () => {
    if (userData) {
    
        get();
    }
  }, [userData]);
  const get = async ()=> {
    const data = await axios.get(`http://localhost:5000/api/auth/allusers/${userData._id}`);
        setContacts(data.data);
        console.log(data);
  }
  const handleChatChange = (chat) => {
    
    setCurrentChat(chat);
  };
  return (
    <>
      <Container>
        <div className="container">
          <Contacts contacts={contacts} changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
          
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 99vh;
  width: 84vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: 'black';
  .container {
    height: 85vh;
    width: 84vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
