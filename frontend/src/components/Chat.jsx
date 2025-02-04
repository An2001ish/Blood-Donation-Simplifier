import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import axios from 'axios';
import { API_URL } from '../config';

const Chat = ({ requestId, receiverId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);
  const { user } = useSelector((state) => state.auth);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Connect to Socket.IO server
    const newSocket = io(API_URL);
    setSocket(newSocket);

    // Join the chat room
    newSocket.emit('join_chat', requestId);

    // Load existing messages
    const loadMessages = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/v1/chat/${requestId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setMessages(response.data.data);
      } catch (error) {
        console.error('Error loading messages:', error);
      }
    };

    loadMessages();

    // Cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, [requestId]);

  useEffect(() => {
    if (socket) {
      // Listen for new messages
      socket.on('receive_message', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
        scrollToBottom();
      });
    }
  }, [socket]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() && socket) {
      const messageData = {
        requestId,
        sender: user._id,
        receiver: receiverId,
        message: newMessage.trim(),
      };

      // Emit message to socket server
      socket.emit('send_message', messageData);
      setNewMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender._id === user._id ? 'sent' : 'received'}`}
          >
            <div className="message-content">
              <p>{msg.message}</p>
              <small>
                {new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </small>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={sendMessage} className="message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="message-input"
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
