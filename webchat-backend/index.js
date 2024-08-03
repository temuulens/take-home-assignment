const express = require('express');
const router = express.Router();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const connectDB = require('./db');
const Message = require('./models/Message');
const messagesRouter = require('./routes/messages');

const app = express();
const server = http.createServer(app);

// Configure CORS for both Express and Socket.IO
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST"],
  credentials: true
};

app.use(cors(corsOptions));
app.use('/', messagesRouter);

const io = new Server(server, {
  cors: corsOptions,
  transports: ['websocket', 'polling'] // Explicitly specify transports
});


// Connect to MongoDB
connectDB();

const onlineUsers = {};

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('join', async (username) => {
    onlineUsers[socket.id] = username;
    io.emit('userList', Object.values(onlineUsers));

    const messages = await Message.find()
    .sort({ timestamp: -1 })
    .limit(100);
    socket.emit('loadMessages', messages);
  });

  socket.on('message', async (message) => {
    const newMessage = new Message(message);
    await newMessage.save();

    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    const username = onlineUsers[socket.id];
    delete onlineUsers[socket.id];
    io.emit('userList', Object.values(onlineUsers));
    console.log(`${username} left the chat`);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));