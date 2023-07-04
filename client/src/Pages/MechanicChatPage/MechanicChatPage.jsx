
import axios from '../../axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import './MechanicChatPage.css'
import MechanicChatBox from '../../components/MechanicChatBox/MechanicChatBox';
import MechanicConversation from '../../components/MechanicChatBox/MechanicConversation';
function MechanicChatPage() {
  const { mechanic } = useSelector((state) => state);

  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);

  useEffect(() => {
    const getChats = async () => {
      try {
        const mechanicId=mechanic.details[0]._id;
        const { data } = await axios.get(`/mechanic/chat/${mechanicId}`)
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [mechanic.details[0]._id]);
  return (
    <div className="Chat">
    {/* Left Side */}
    <div className="Left-side-chat">
      <div className="Chat-container">
        <h2>Chats</h2>
        <div className="Chat-list">
          {chats.map((chat) => (
            <div
              onClick={() => {
                setCurrentChat(chat);
              }}
            >
              <MechanicConversation
                data={chat}
                currentUser={mechanic.details[0]._id}
                online={'online'}
              />
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Right Side */}

    <div className="Right-side-chat">
      <div style={{ width: "20rem", alignSelf: "flex-end" }}>
        {/* <NavIcons /> */}
      </div>
      <MechanicChatBox
        chat={currentChat}
        currentUser={mechanic.details[0]._id}
        setSendMessage={setSendMessage}
        receivedMessage={receivedMessage}
      />
    </div>
  </div>
  )
}

export default MechanicChatPage
