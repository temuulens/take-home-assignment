import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import UserList from './UserList';
import Message from './Message';

let socket;

const ChatRoom = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [olderMessagesAvailable, setOlderMessagesAvailable] = useState(false);
  const [lastMessageDate, setLastMessageDate] = useState(null);

  useEffect(() => {
    if (!user) return;

    // Initialize socket connection
    socket = io(process.env.REACT_APP_BACKEND_URL);

    // Emit join event
    socket.emit('join', user);

    // Handle loading initial messages
    socket.on('loadMessages', (initialMessages) => {
      setMessages(initialMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)));
      if (initialMessages.length === 100) {
        setOlderMessagesAvailable(true);
        setLastMessageDate(new Date(initialMessages[initialMessages.length - 1].timestamp));
      }
    });

    // Handle user list event
    socket.on('userList', (onlineUsers) => {
      setUsers(onlineUsers);
    });

    // Handle new messages
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)));
    });

    // Cleanup on unmount
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [user]);

  const handleSendMessage = () => {
    if (newMessage.trim() && socket) {
      const message = { user, text: newMessage };
      socket.emit('message', message);
      setNewMessage('');
    }
  };

  const loadOlderMessages = async () => {
    if (lastMessageDate) {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/messages/older?before=${lastMessageDate.toISOString()}`);
      const newMessages = await response.json();
      setMessages((prevMessages) => [...newMessages, ...prevMessages].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)));

      // Update lastMessageDate if there are new messages
      if (newMessages.length > 0) {
        setLastMessageDate(new Date(newMessages[newMessages.length - 1].timestamp));
      } else {
        setOlderMessagesAvailable(false); // No more older messages available
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      <UserList users={users} />
      <div className="flex-1 flex flex-col">
        <div className="p-4 flex flex-col h-full">
          {olderMessagesAvailable && (
            <button onClick={loadOlderMessages} className="mb-4 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded">
              Load Older Messages
            </button>
          )}
          <div className="flex flex-col flex-1 overflow-y-auto">
            <div className="text-gray-400 mb-2">Messages Shown: {messages.length}</div>
            {messages.map((msg, index) => (
              <Message key={index} message={msg} />
            ))}
          </div>
          <div className="mt-4 flex">
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 p-2 bg-gray-800 text-white rounded"
            />
            <button onClick={handleSendMessage} className="ml-4 p-2 bg-green-500 hover:bg-green-600 text-white rounded">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
