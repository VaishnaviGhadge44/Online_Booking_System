import React, {useEffect, useRef} from "react"
import './ChatBubble.css';

const ChatBubble = (props) => {
  console.log(props);
  let divRef = useRef();

  useEffect(()=> {
    // if(props.isLastElement) {
    //   divRef.current.scrollIntoView({behavior: 'smooth'});
    // }
  }, [])

  const getNameInitial = (name) => {
    if(name) {
      return name.charAt(0).toUpperCase();
    }
    return "";
  }
  let loggedInEmail = props.loggedInUser.userRole == 'USER' ? props.loggedInUser.userEmailId : props.loggedInUser.centerEmailId;
  let alignClassName = props.data.senderMail != loggedInEmail ? ' user' : 'system';
  let timeStamp = new Date(props.data.createdAt).toString().split('GMT')[0];
  let chatIcon = getNameInitial(props.data.senderMail == loggedInEmail ? loggedInEmail : props.data.senderMail);
  return (
    <>
      <div ref={props.isLastElement ? divRef : null} className={"chat-item "+(props.data.senderMail != loggedInEmail ? "chat-item-user" : "chat-item-system")}>
        {props.data.senderMail != loggedInEmail && <button className="chat-button button5">{chatIcon}</button>}
        <div className={'chat-bubble '+alignClassName} >{props.data.messageBody}</div>
        {props.data.senderMail == loggedInEmail && <button className="chat-button button5">{chatIcon}</button>}
      </div>
      {<div className={props.data.senderMail != loggedInEmail ? "time-stamp-left" : "time-stamp-right"}>{timeStamp}</div>}
    </>
  )
}

export default ChatBubble
