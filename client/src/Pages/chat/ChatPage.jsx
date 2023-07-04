import axios from '../../axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import './ChatPage.css'
import ChatBox from '../../components/ChatBox/ChatBox';
import Conversation from '../../components/Conversation/Conversation';

function ChatPage({data}) {
  const mechanicId=data._id;
  const { user } = useSelector((state) => state);

  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);

  useEffect(() => {
    const getChats = async () => {
      try {
        const userId=user.details._id;
        const { data } = await axios.get(`/user/chat/${userId}`)
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user.details._id]);
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
              <Conversation
                data={chat}
                currentUser={user.details._id}
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
      <ChatBox
        chat={currentChat}
        mechanicId={mechanicId}
        currentUser={user.details._id}
        setSendMessage={setSendMessage}
        receivedMessage={receivedMessage}
      />
    </div>
  </div>
  )
}

export default ChatPage
