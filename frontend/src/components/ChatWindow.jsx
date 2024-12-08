import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import Modal from 'react-modal';
import "../styles/ChatWindow.css";

Modal.setAppElement('#root'); // Assuming your app's root element has an id of 'root'

const ChatWindow = ({ request, userRole, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const socketRef = useRef();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Connect to the Socket.IO server
    socketRef.current = io('http://localhost:4000'); // Replace with your server URL

    // Join the chat room
    socketRef.current.emit('join room', request._id);

    // Listen for incoming messages
    socketRef.current.on('chat message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [request._id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      const messageData = {
        room: request._id,
        sender: userRole === 'donor' ? request.acceptId : request.recId,
        content: inputMessage,
        timestamp: new Date().toISOString(),
      };
      socketRef.current.emit('chat message', messageData);
      setInputMessage('');
    }
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      contentLabel="Chat Window"
      className="chat-modal"
      overlayClassName="chat-overlay"
    >
      <div className="chat-window">
        <h2>Chat with {userRole === 'donor' ? 'Organization' : 'Donor'}</h2>
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender === (userRole === 'donor' ? request.acceptId : request.recId) ? 'sent' : 'received'}`}>
              <p>{msg.content}</p>
              <span className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSendMessage} className="chat-input">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button type="submit">Send</button>
        </form>
        <button onClick={onClose} className="close-button">Close</button>
      </div>
    </Modal>
  );
};

ChatWindow.propTypes = {
  request: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    acceptId: PropTypes.string.isRequired,
    recId: PropTypes.string.isRequired,
  }).isRequired,
  userRole: PropTypes.oneOf(['donor', 'organization']).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ChatWindow;

