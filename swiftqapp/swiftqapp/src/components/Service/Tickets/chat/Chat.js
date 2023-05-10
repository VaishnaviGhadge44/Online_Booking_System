import React, { useEffect, useState } from "react";
import ChatBubble from "./ChatBubble/ChatBubble"
import {getChatsByticketId, postChatMessage, postNewChatMessage} from"../../../../service/api"
import {useLocation} from 'react-router-dom';
import './Chat.css';

const Chat = (props) => {

  const [chats, setChats] = useState({});
  const [inputMessage, setInputMessage] = useState("");
  let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  let loggedInUserEmail = loggedInUser.userRole == 'USER' ? loggedInUser.userEmailId : loggedInUser.centerEmailId;
  var objDiv = document.getElementById("parentDiv");

  useEffect(() => {
    getChats(props.ticket.ticketId);
    if(objDiv && objDiv.scrollTop) {
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  }, [])

  const getChats = async (id) =>{
    const response = await getChatsByticketId(id);
    setChats(response.data[0]);
  }

  const inputChatHandler = (event) => {
    setInputMessage(event.target.value);
  }

  const send = () => {
    const chat = {
      senderMail: loggedInUserEmail,
      messageBody: inputMessage,
      createdAt: new Date().toISOString()
    }
    if(!chats) {
      let chatRequest = {
        "ticketId": props.ticket.ticketId,
        "userEmail": props.ticket.userEmail,
        "centerEmail": props.ticket.centerEmail,
        "iMessage": [
          chat
        ]
      }
      postNewChatMessage(chatRequest);
      setChats(chatRequest);
      return;
    } else if(chats.iMessage) {      
      chats.iMessage.push(chat);   
    } else {
      chats.iMessage = [chat];
    }
    

    setChats(chats);
    setInputMessage("");
    postChat(chat, props.ticket.ticketId)
  }

  const postChat = async (chatMsg, ticketId) => {
    const response = await postChatMessage(chatMsg, ticketId);
  }

  const handleEnter = (event) => {
    if(event.key == 'Enter') {
      send();
    }
  }

  return (
    <>
      <div className="chat-style">
        <ul className="chat-margin" id="conversation">
          {chats && chats.iMessage && chats.iMessage.map((chat, index) => (
              <ChatBubble key={index} data={chat} isLastElement={index == chat.length-1} loggedInUser={loggedInUser}/>
          ))}
        </ul>
      </div>
      {/* </TransitionGroup> */}
      {props.ticket.status != 'CLOSE' && <div className="chat-input">
        <input
          type="text"
          placeholder="Ask something..."
          value={inputMessage}
          onChange={inputChatHandler}
          onKeyDown={handleEnter}
        />
        <button onClick={() => send()} >
          <img src="send.png"/> 
        </button>
      </div>}
    </>
  )
}

export default Chat
