const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://user101:user101@cluster0.4ciqb.mongodb.net/donationapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/inventory', inventoryRoutes);

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('joinRoom', (requestId) => {
    socket.join(requestId);
  });

  socket.on('chatMessage', (data) => {
    io.to(data.requestId).emit('message', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

