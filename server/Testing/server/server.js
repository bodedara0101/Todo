const WebSocket = require('ws');
const http = require('http');
const server = http.createServer();
const wss = new WebSocket.Server({ server });

const PORT = 5000;
let users = [];

wss.on('connection', (ws) => {
  console.log('New client connected');
  
  ws.on('message', (data) => {
    const message = JSON.parse(data);
    
    switch (message.type) {
      case 'join':
        const userId = Math.random().toString(36).substr(2, 9);
        users.push({ id: userId, username: message.payload, ws });
        
        // Send welcome message to new user
        ws.send(JSON.stringify({
          type: 'system',
          payload: `Welcome, ${message.payload}!`
        }));
        
        // Broadcast user joined message
        broadcast({
          type: 'system',
          payload: `${message.payload} joined the chat`
        }, ws);
        
        // Update user list for all clients
        broadcastUserList();
        break;
        
      case 'message':
        broadcast({
          type: 'message',
          payload: message.payload
        });
        break;
    }
  });
  
  ws.on('close', () => {
    const user = users.find(u => u.ws === ws);
    if (user) {
      users = users.filter(u => u.ws !== ws);
      broadcast({
        type: 'system',
        payload: `${user.username} left the chat`
      });
      broadcastUserList();
    }
  });
});

function broadcast(message, exclude = null) {
  wss.clients.forEach(client => {
    if (client !== exclude && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}

function broadcastUserList() {
  const userList = users.map(({ id, username }) => ({ id, username }));
  broadcast({
    type: 'userList',
    payload: userList
  });
}

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});