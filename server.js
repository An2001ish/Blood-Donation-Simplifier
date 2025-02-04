const express = require("express")
const dotenv = require("dotenv")
const colors = require("colors")
const morgan = require("morgan")
const cors = require("cors")
const connectDB = require("./config/db")
const authMiddleware = require("./middlewares/authMiddleware")
const { createServer } = require("http")
const { Server } = require("socket.io")
const ChatMessage = require("./models/chatModel")

dotenv.config()

//mongodb connection
connectDB()

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST"],
    credentials: true
  }
})

app.use(express.json())
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true
}))
app.use(morgan("dev"))

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Join a chat room based on blood request ID
  socket.on("join_chat", (requestId) => {
    socket.join(requestId);
    console.log(`User ${socket.id} joined chat: ${requestId}`);
  });

  // Handle new messages
  socket.on("send_message", async (messageData) => {
    try {
      const { requestId, sender, receiver, message } = messageData;
      
      // Create and save the new message
      const newMessage = new ChatMessage({
        requestId,
        sender,
        receiver,
        message
      });
      
      const savedMessage = await newMessage.save();
      
      // Emit the saved message to all users in the room
      io.to(requestId).emit("receive_message", savedMessage);
    } catch (error) {
      console.error("Error saving message:", error);
      socket.emit("error", "Failed to save message");
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Define auth routes before applying global middleware
app.use("/api/v1/auth", require("./routes/authRoutes"))

// Apply authMiddleware to all routes under /api/v1 except /api/v1/auth
app.use("/api/v1", (req, res, next) => {
  if (req.path.startsWith("/auth")) {
    return next()
  }
  authMiddleware(req, res, next)
})

app.use("/api/v1/inventory", require("./routes/inventoryRoutes"))
app.use("/api/v1/bloodrequest", require("./routes/bloodRequestRoutes"))
app.use("/api/v1/admin", require("./routes/adminRoutes"))
app.use("/api/v1/chat", require("./routes/chatRoutes"))

const PORT = process.env.PORT || 4000;

// Start Server
const server = httpServer.listen(PORT, () => {
  console.log(
    `Node Server Running In ${process.env.DEV_MODE} Mode On Port ${process.env.PORT}`
  );
});

// Handle server errors
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please either:`);
    console.error('1. Shut down the other process using this port');
    console.error('2. Use a different port by setting the PORT environment variable');
    process.exit(1);
  } else {
    console.error('Server error:', error);
    process.exit(1);
  }
});
