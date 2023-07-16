import express from 'express';
import path from 'path';
import { dbconnect } from './config.js';
import cors from 'cors';
import 'dotenv/config';
import cookieparser from 'cookie-parser';
import http from 'http';
import { Server } from 'socket.io';
import morgan from 'morgan';
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000",'https://autoaid.online','https://autoaid.netlify.app']
  },
});

let activeUsers = [];

io.on("connection", (socket) => {
  // add new User
  socket.on("new-user-add", (newUserId) => {
    // if user is not added previously
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({ userId: newUserId, socketId: socket.id });
    }
    // send all active users to new user
    io.emit("get-users", activeUsers);
  });

  socket.on("disconnect", () => {
    // remove user from active users
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    // send all active users to all users
    io.emit("get-users", activeUsers);
  });

  // send message to a specific user
  socket.on("send-message", (data) => {
    const { receiverId } = data;
    const user = activeUsers.find((user) => user.userId === receiverId);
    if (user) {
      io.to(user.socketId).emit("recieve-message", data);
    }
  });
});

dbconnect();
app.use(cors({
  origin: ['http://localhost:3000', 'https://checkout.stripe.com','https://autoaid.online','https://autoaid.netlify.app'],
  credentials: true,
}));


import userRoute from './routes/userRoute.js';
import mechanicRoute from './routes/mechanicRoute.js';
import adminRoute from './routes/adminRoute.js';

app.use(express.static(path.resolve() + "/public"));
app.use(express.json());
app.use(morgan('dev'))
app.use(cookieparser());
app.use(express.urlencoded({ extended: true }));
app.use('/admin', adminRoute);
app.use('/mechanic', mechanicRoute);
app.use('/user', userRoute);

server.listen(4000, () => {
  console.log("localhost running on http://localhost:4000");
});
