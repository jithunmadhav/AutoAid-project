import React, { useEffect, useState } from "react";
import './ChatBox.css'
import { useRef } from "react";
import { format } from "timeago.js";
import InputEmoji from 'react-input-emoji'
import axios from "../../axios";
function ChatBox({ chat,currentUser, setSendMessage,  receivedMessage }) {
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
          const response = await axios.get(`/user/getmechanic/${userId}`);
          setUserData(response.data.mechanic);
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
          const { data } = await axios.get(`/user/message/${chatId}`)
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
    const { data } = await axios.post('/user/message',{message});
    console.log(data);
    setMessages([...messages, data]);
    setNewMessage("");
  }
  catch
  {
    console.log("error")
  }
}

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
                    src='https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=826&t=st=1680295524~exp=1680296124~hmac=02e23136e23578ef52071ce6ce8be6ecd2a32c6bef946fcacd4e6e788ed33360'
                    alt="Profile"
                    className="rounded-circle"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div style={{ width:'30px' }}></div>
                  <div className="name" style={{ fontSize: "30px", marginTop:'-10px' }}>
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
                <>
                  <div ref={scroll}
                    className={
                      message.senderId === currentUser
                        ? "message own"
                        : "message"
                    }
                  >
                    <span>{message.text}</span>{" "}
                    <span>{format(message.createdAt)}</span>
                  </div>
                </>
              ))}
            </div>
            {/* chat-sender */}
            <div style={{ color: 'black' }} className="chat-sender">
              <InputEmoji
                value={newMessage}
                style='color:black'
                 onChange={handleChange}
              />
              <div className="send-button button" onClick = {handleSend}>
                <img className="send" src="https://icon-library.com/images/send-icon-png/send-icon-png-19.jpg" alt="" />
              </div>
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
          <>
          <span className="chatbox-empty-message">
            Tap on a chat to start conversation...
          </span>
          <div >
            <img className="empty-img" src="https://img.freepik.com/free-vector/hand-holding-mobile-phone-with-chat-messages-screen_74855-19800.jpg?w=826&t=st=1688661215~exp=1688661815~hmac=c8df5743476f23b438212e520586eb2ca9855af72172694f872225e6674029b5" alt="" />
          </div>
          </>
        )}
      </div>
    </>
  )
}

export default ChatBox
