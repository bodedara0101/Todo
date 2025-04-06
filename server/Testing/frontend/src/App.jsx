import React, { useState, useEffect, useRef } from 'react';

function App() {
  const [ws, setWs] = useState(null);
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [isJoined, setIsJoined] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:5000');
    
    websocket.onopen = () => {
      console.log('Connected to WebSocket');
      setWs(websocket);
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      switch (data.type) {
        case 'message':
          setMessages(prev => [...prev, data.payload]);
          break;
        case 'userList':
          setUsers(data.payload);
          break;
        case 'system':
          setMessages(prev => [...prev, { text: data.payload, system: true }]);
          break;
        default:
          console.log('Unknown message type:', data.type);
      }
    };

    websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
      setMessages(prev => [...prev, { 
        text: 'Connection error. Please try again later.', 
        system: true 
      }]);
    };

    return () => {
      if (websocket) {
        websocket.close();
      }
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleJoin = (e) => {
    e.preventDefault();
    if (username.trim() && ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        type: 'join',
        payload: username
      }));
      setIsJoined(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        type: 'message',
        payload: {
          text: message,
          username: username,
          timestamp: new Date().toISOString()
        }
      }));
      setMessage('');
    }
  };

  if (!isJoined) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <form onSubmit={handleJoin} className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl mb-4 font-bold text-gray-800">Join Chat</h2>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Join
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-white border-r">
        <div className="p-4 border-b">
          <h2 className="font-bold text-gray-800">Online Users</h2>
        </div>
        <div className="p-4">
          {users.map((user) => (
            <div key={user.id} className="mb-2 text-gray-700">
              {user.username}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 bg-green-300 px-2 rounded ${msg.system ? 'text-center text-gray-500 italic' : ''}`}
            >
              {!msg.system && (
                <span className="font-bold text-blue-600">
                  {msg.username}:{' '}
                </span>
              )}
              <span className={msg.system ? 'text-sm' : ''}>
                {msg.text}
              </span>
              {!msg.system && (
                <span className="text-xs text-gray-500 ml-2">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </span>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="border-t p-4 bg-white">
          <div className="flex">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 p-2 border rounded-l"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 rounded-r hover:bg-blue-600"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default App
