import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "./logo.svg";
import avtar from './avtarss.png'
import useUserProfileStore from "../../store/userProfileStore";
import { Avatar, AvatarGroup} from "@chakra-ui/react";
import useStore from "../../store/chatUser";
import { ProfileLogo } from "../../assets/constants";
export default function Contacts({ contacts, changeChat }) {
  const { userProfile } = useUserProfileStore();
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const data = useStore.getState().userData;
  

//   const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(() => {
    setCurrentUserName(data.username);
    // console.log(data.avatarImage)
    // setCurrentUserImage(data.avatarImage);
  }, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      <Container>
          <div className="brand">
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                  {contact.avatarImage ? (
                    <Avatar
                      src={contact.avatarImage}
                      alt=""
                    /> 
      ) : (
        <ProfileLogo />
      )}
                     
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              {/* <Avatar
                src={data.avatarImage || avtar}
                alt="avatar"
              /> */}
              {data.avatarImage ? (
                <Avatar
                src={data.avatarImage}
                alt="avatar"
              />
              ) : (
                <ProfileLogo />
              )}
            </div>
            
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 81% 9%;
  overflow: hidden;
  background-color: 'black';
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.7rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: 'black';
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: 'black';
      min-height: 4rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #ffffff34;
    }
  }

  .current-user {
    background-color: 'black';
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 3rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
