import React, { useEffect, useState } from "react";
import './MechanicChatBox.css'
import { useRef } from "react";
import { format } from "timeago.js";
import InputEmoji from 'react-input-emoji'
import axios from "../../axios";
function MechanicChatBox({ chat, currentUser, setSendMessage,  receivedMessage }) {
    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
   
    const handleChange = (newMessage)=> {
      setNewMessage(newMessage)
    }
  
    // fetching data for header
    useEffect(() => {
      const userId = chat?.members?.find((id) => id !== currentUser);
      const getUserData = async () => {
        try {
          const response = await axios.get(`/mechanic/getuser/${userId}`);
          setUserData(response.data.user);
        } catch (error) {
          console.log(error);
        }
      };
  
      if (chat !== null) getUserData();
    }, [chat, currentUser]);
  
    // fetch messages
    useEffect(() => {
      const fetchMessages = async () => {
        try {
          const chatId=chat._id
          const { data } = await axios.get(`/mechanic/message/${chatId}`)
          setMessages(data);
        } catch (error) {
          console.log(error);
        }
      };
  
      if (chat !== null) fetchMessages();
    }, [chat]);

    useEffect(()=> {
      scroll.current?.scrollIntoView({ behavior: "smooth" });
    },[messages])
  

  // Send Message
  const handleSend = async(e)=> {
    e.preventDefault()
    console.log('5555555555',newMessage);

    if(newMessage.trim()){
      const message = {
        senderId : currentUser,
        text: newMessage,
        chatId: chat._id,
    }
    const receiverId = chat.members.find((id)=>id!==currentUser);
    // send message to socket server
    setSendMessage({...message, receiverId})
    // send message to database
    try {
        const { data } = await axios.post('/mechanic/message',{message});
        setMessages([...messages, data]);
        setNewMessage("");
    }
    catch
    {
      console.log("error")
    }
    }
}
console.log(receivedMessage,"Recieved message");

// Receive Message from parent component
useEffect(()=> {
  console.log("Message Arrived: ", receivedMessage)
  if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
    setMessages([...messages, receivedMessage]);
  }

},[receivedMessage])


  const scroll = useRef();
  const imageRef = useRef();
  return (
    <>
      <div className="ChatBox-container">
        {chat ? (
          <>
            {/* chat-header */}
            <div className="chat-header">
              <div className="follower">
                <div style={{ display:'flex',alignItems:'center' }}>
                  <img
                    src='data:image/jpeg;base64,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'
                    alt="Profile"
                    className="followerImage"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div style={{ width:'50px' }}></div>
                  <div className="name" style={{ fontSize: "0.9rem" }}>
                    <span>
                      {userData?.name} 
                    </span>
                  </div>
                </div>
              </div>
              <hr
                style={{
                  width: "95%",
                  border: "0.1px solid #ececec",
                  marginTop: "20px",
                }}
              />
            </div>
            {/* chat-body */}
            <div className="chat-body" >
              {messages.map((message) => (
                 
                <div ref={scroll}
                className={
                  message.senderId === currentUser
                  ? "message own"
                  : "message "
                }
                  >
                    <span>{message.text}</span>{" "}
                    <span>{format(message.createdAt)}</span>
                  </div>
             
              ))}
            </div>
            {/* chat-sender */}
            <div className="chat-sender">
              <InputEmoji
                value={newMessage}
                onChange={handleChange}
              />
              <div className="send-button button" onClick = {handleSend}>Send</div>
              <input
                type="file"
                name=""
                id=""
                style={{ display: "none" }}
                ref={imageRef}
              />
            </div>{" "}
          </>
        ) : (
          <span className="chatbox-empty-message">
            Tap on a chat to start conversation...
          </span>
        )}
      </div>
    </>
  )
}

export default MechanicChatBox
