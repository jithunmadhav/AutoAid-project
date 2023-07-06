import axios from "../../axios";
import React, { useState } from "react";
import { useEffect } from "react";
function MechanicConversation({ data, currentUser, online }) {
  const [userData, setUserData] = useState(null)

  useEffect(()=> {

    const userId = data.members.find((id)=>id!==currentUser)
    const getUserData = async ()=> {
      try
      {
        const response = await axios.get(`/mechanic/getuser/${userId}`);
        setUserData(response.data.user)
      }
      catch(error)
      {
        console.log(error)
      }
    }

    getUserData();
  }, [])
  return (
    <>
    <div className="follower conversation">
      <div style={{ height:'79px' }}>
        {online && <div className="online-dot"></div>}
        <img
          src='https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=826&t=st=1680295524~exp=1680296124~hmac=02e23136e23578ef52071ce6ce8be6ecd2a32c6bef946fcacd4e6e788ed33360'
           alt="Profile"
            className="dp-img rounded-circle"
           
            />
        <div className="name" style={{fontSize: '0.8rem'}}>
          <span className="user-name">{userData?.name} </span>
          <span className="online-status" style={{color: online?"#51e200":""}}>{online? "Online" : "Offline"}</span>
        </div>
      </div>
    </div>
    {/* <hr style={{ width: "85%", border: "0.1px solid #ececec" }} /> */}
  </>
  )
}

export default MechanicConversation
