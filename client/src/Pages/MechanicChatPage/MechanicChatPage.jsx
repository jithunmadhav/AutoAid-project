
import axios from '../../axios';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import './MechanicChatPage.css'
import MechanicChatBox from '../../components/MechanicChatBox/MechanicChatBox';
import MechanicConversation from '../../components/MechanicChatBox/MechanicConversation';
import { io} from "socket.io-client";
import MechanicNav from '../../components/MechanicNav/MechanicNav'
function MechanicChatPage() {
  const { mechanic } = useSelector((state) => state);
  const socket = useRef();
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

    // Connect to Socket.io
    useEffect(() => {
      socket.current = io("https://server.autoaid.online/");
      socket.current.emit("new-user-add", mechanic.details[0]._id);
      socket.current.on("get-users", (mechanic) => {
        setOnlineUsers(mechanic);
      });
    }, [mechanic]);
     // Send Message to socket server
     useEffect(() => {
      if (sendMessage!==null) {
        socket.current.emit("send-message", sendMessage);}
    }, [sendMessage]);
  
      // Get the message from socket server
      useEffect(() => {
        socket.current.on("recieve-message", (data) => {
          setReceivedMessage(data);
        }
    
        );
      }, []);
      const checkOnlineStatus = (chat) => {
        const chatMember = chat.members.find((member) => member !== mechanic.details[0]._id);
        const online = onlineUsers.find((user) => user.userId === chatMember);
        return online ? true : false;
      };
  return (
    <>
    <MechanicNav/>
    <div className="Chat-mechanic">
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
                online={checkOnlineStatus(chat)}              />
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
  </>

  )
}

export default MechanicChatPage
