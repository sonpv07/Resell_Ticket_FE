import React, { useState } from "react";
import "./ChatPage.scss";

const ChatPage = () => {
  const [conversations, setConversations] = useState([
    { id: 1, name: "John Doe", lastMessage: "Hey, how are you?", unread: 2 },
    { id: 2, name: "Jane Smith", lastMessage: "See you tomorrow!", unread: 0 },
    {
      id: 3,
      name: "Mike Johnson",
      lastMessage: "Thanks for the help!",
      unread: 1,
    },
  ]);

  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "John Doe",
      content: "Hey, how are you?",
      timestamp: "10:30 AM",
    },
    {
      id: 2,
      sender: "You",
      content: "Im doing great, thanks! How about you?",
      timestamp: "10:32 AM",
    },
    {
      id: 3,
      sender: "John Doe",
      content: "Im good too. Do you want to meet up later?",
      timestamp: "10:35 AM",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleConversationSelect = (conversation) => {
    setSelectedConversation(conversation);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() !== "") {
      const newMsg = {
        id: messages.length + 1,
        sender: "You",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
    }
  };

  return (
    <div className="chat-page">
      <div className="chat-page__sidebar">
        <h2 className="chat-page__sidebar-title">Conversations</h2>
        <ul className="chat-page__conversation-list">
          {conversations.map((conversation) => (
            <li
              key={conversation.id}
              className={`chat-page__conversation-item ${
                selectedConversation === conversation
                  ? "chat-page__conversation-item--active"
                  : ""
              }`}
              onClick={() => handleConversationSelect(conversation)}
            >
              <div className="chat-page__conversation-avatar">
                {conversation.name[0]}
              </div>
              <div className="chat-page__conversation-details">
                <h3 className="chat-page__conversation-name">
                  {conversation.name}
                </h3>
                <p className="chat-page__conversation-last-message">
                  {conversation.lastMessage}
                </p>
              </div>
              {conversation.unread > 0 && (
                <span className="chat-page__conversation-unread">
                  {conversation.unread}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="chat-page__main">
        {selectedConversation ? (
          <>
            <div className="chat-page__header">
              <h2 className="chat-page__header-title">
                {selectedConversation.name}
              </h2>
            </div>
            <div className="chat-page__messages">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`chat-page__message ${
                    message.sender === "You"
                      ? "chat-page__message--sent"
                      : "chat-page__message--received"
                  }`}
                >
                  <div className="chat-page__message-content">
                    {message.content}
                  </div>
                  <div className="chat-page__message-timestamp">
                    {message.timestamp}
                  </div>
                </div>
              ))}
            </div>
            <form
              className="chat-page__input-area"
              onSubmit={handleSendMessage}
            >
              <input
                type="text"
                className="chat-page__input"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button type="submit" className="chat-page__send-button">
                Send
              </button>
            </form>
          </>
        ) : (
          <div className="chat-page__no-conversation">
            <p>Select a conversation to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
