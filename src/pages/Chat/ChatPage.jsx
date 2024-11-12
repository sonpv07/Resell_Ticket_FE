import React, { useContext, useEffect, useState } from "react";
import "./ChatPage.scss";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
  limit,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { AuthContext } from "../../context/AuthContext";
import { message } from "antd";

const ChatPage = () => {
  const [conversations, setConversations] = useState([]);
  const { user } = useContext(AuthContext);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const getChatsWithLatestMessages = async () => {
    try {
      const q = collection(db, "boxchat");
      const querySnapshot = await getDocs(q);

      const chatData = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const chat = { id: doc.id, ...doc.data() };

          const messagesRef = collection(db, "boxchat", chat.id, "messages");
          const latestMessageQuery = query(
            messagesRef,
            orderBy("timestamp", "desc"),
            limit(1)
          );
          const latestMessageSnapshot = await getDocs(latestMessageQuery);
          const latestMessage = latestMessageSnapshot.docs[0]?.data() || null;

          return { ...chat, latestMessage };
        })
      );

      const userChats = chatData.filter((chat) =>
        chat.users?.some((item) => item.iD_Customer === user?.iD_Customer)
      );

      setConversations(userChats);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  const handleGetUserCommunicate = (users) => {
    return users?.find((u) => u?.iD_Customer !== user?.iD_Customer);
  };

  const handleConversationSelect = (conversation) => {
    setSelectedConversation(conversation);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() !== "") {
      try {
        const messagesRef = collection(
          db,
          "boxchat",
          selectedConversation.id,
          "messages"
        );

        await addDoc(messagesRef, {
          senderId: user.iD_Customer,
          content: newMessage,
          timestamp: serverTimestamp(),
        });

        setNewMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  useEffect(() => {
    if (user) {
      getChatsWithLatestMessages();
    }
  }, [user, message]);

  useEffect(() => {
    if (!selectedConversation) return;

    const messagesRef = collection(
      db,
      "boxchat",
      selectedConversation.id,
      "messages"
    );
    const q = query(messagesRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messagesData);
    });

    return () => unsubscribe();
  }, [selectedConversation]);

  return (
    <div className="chat-page">
      <div className="chat-page__sidebar">
        <h2 className="chat-page__sidebar-title">Conversations</h2>
        <ul className="chat-page__conversation-list">
          {conversations.map((conversation, index) => (
            <li
              key={index}
              className={`chat-page__conversation-item ${
                selectedConversation === conversation
                  ? "chat-page__conversation-item--active"
                  : ""
              }`}
              onClick={() => handleConversationSelect(conversation)}
            >
              <div className="chat-page__conversation-avatar">
                <img
                  style={{ width: 50, height: 50, borderRadius: "50%" }}
                  src={handleGetUserCommunicate(conversation?.users)?.avatar}
                  alt="Avatar"
                />
              </div>
              <div className="chat-page__conversation-details">
                <h3 className="chat-page__conversation-name">
                  {handleGetUserCommunicate(conversation?.users)?.name}
                </h3>
                <p className="chat-page__conversation-last-message">
                  {conversation.latestMessage
                    ? conversation.latestMessage.content
                    : "No messages yet"}
                </p>
              </div>
              {conversation?.unread > 0 && (
                <span className="chat-page__conversation-unread">
                  {conversation?.unread}
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
                {handleGetUserCommunicate(selectedConversation?.users)?.name}
              </h2>
            </div>
            <div className="chat-page__messages">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`chat-page__message ${
                    message.senderId === user.iD_Customer
                      ? "chat-page__message--sent"
                      : "chat-page__message--received"
                  }`}
                >
                  <div className="chat-page__message-content">
                    {message.content}
                  </div>
                  <div className="chat-page__message-timestamp">
                    {new Date(
                      message.timestamp?.seconds * 1000
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
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
