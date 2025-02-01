import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import Modal from 'react-modal';
import api from '../services/API';
import "../styles/ChatWindow.css";

Modal.setAppElement('#root');

const ChatWindow = ({ request, userRole, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Connect to Socket.IO server
    const newSocket = io(API_URL);
    setSocket(newSocket);

    // Join the chat room
    newSocket.emit('join_chat', request._id);

    // Load existing messages
    const loadMessages = async () => {
      try {
        const response = await api.get(`/chat/${request._id}`);
        setMessages(response.data.data);
        scrollToBottom();
      } catch (error) {
        console.error('Error loading messages:', error);
      }
    };

    loadMessages();

    // Cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, [request._id]);

  useEffect(() => {
    if (socket) {
      // Listen for new messages
      socket.on('receive_message', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
        scrollToBottom();
      });
    }
  }, [socket]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (inputMessage.trim() && socket) {
      const messageData = {
        requestId: request._id,
        sender: userRole === 'donor' ? request.acceptUserId : request.recUserId,
        receiver: userRole === 'donor' ? request.recUserId : request.acceptUserId,
        message: inputMessage.trim(),
      };

      // Emit message to socket server
      socket.emit('send_message', messageData);
      setInputMessage('');
    }
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      className="chat-modal"
      overlayClassName="chat-modal-overlay"
    >
      <div className="chat-modal-content">
        <div className="chat-header">
          <h2>Chat</h2>
          <button onClick={onClose} className="close-button">&times;</button>
        </div>
        <div className="messages-container">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender === (userRole === 'donor' ? request.acceptUserId : request.recUserId) ? 'sent' : 'received'}`}
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
        <form onSubmit={handleSendMessage} className="message-form">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message..."
            className="message-input"
          />
          <button type="submit" className="send-button">
            Send
          </button>
        </form>
      </div>
    </Modal>
  );
};

ChatWindow.propTypes = {
  request: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    acceptId: PropTypes.string.isRequired,
    recId: PropTypes.string.isRequired,
    acceptUserId: PropTypes.string,
    recUserId: PropTypes.string.isRequired,
  }).isRequired,
  userRole: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ChatWindow;
