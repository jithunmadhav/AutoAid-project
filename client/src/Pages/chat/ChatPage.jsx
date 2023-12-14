import axios from '../../axios';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import './ChatPage.css'
import ChatBox from '../../components/ChatBox/ChatBox';
import Conversation from '../../components/Conversation/Conversation';
import { io} from "socket.io-client";

function ChatPage({data}) {
  const mechanicId=data._id;
  const socket = useRef();
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

   // Connect to Socket.io
   useEffect(() => {
    socket.current = io("https://server.autoaid.online/");
    socket.current.emit("new-user-add", user.details._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
      console.log(onlineUsers);
    });
  }, [user]);
   // Send Message to socket server
   useEffect(() => {
    if (sendMessage!==null) {
      socket.current.emit("send-message", sendMessage);}
  }, [sendMessage]);

    // Get the message from socket server
    useEffect(() => {
      socket.current.on("recieve-message", (data) => {
        console.log("RECIEVED-MEss : ",data);
        console.log('*******************');
        setReceivedMessage(data);
      }
  
      );
    }, []);
    const checkOnlineStatus = (chat) => {
      const chatMember = chat.members.find((member) => member !== user.details._id);
      const online = onlineUsers.find((user) => user.userId === chatMember);
      return online ? true : false;
    };
    
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
                mechanicId={mechanicId}
                currentUser={user.details._id}
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
