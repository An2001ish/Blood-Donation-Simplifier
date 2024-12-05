import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import '../../styles/Chat.css';

const Chat = ({ requestId, recipientId, recipientName }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const socketRef = useRef();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socketRef.current = io('http://localhost:4000');

    socketRef.current.emit('joinRoom', requestId);

    socketRef.current.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [requestId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() !== '') {
      const user = JSON.parse(localStorage.getItem('user'));
      socketRef.current.emit('chatMessage', {
        requestId,
        senderId: user._id,
        senderName: user.name,
        recipientId,
        message: inputMessage
      });
      setInputMessage('');
    }
  };

  return (
    <div className="chat-container">
      <h2>Chat with {recipientName}</h2>
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.senderId === JSON.parse(localStorage.getItem('user'))._id ? 'sent' : 'received'}`}>
            <p className="message-sender">{msg.senderName}</p>
            <p className="message-content">{msg.message}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={sendMessage} className="message-form">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message..."
          className="message-input"
        />
        <button type="submit" className="send-button">Send</button>
      </form>
    </div>
  );
};

export default Chat;

