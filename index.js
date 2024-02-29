const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, '/html/home.html'));
});
app.get('/user', (req, res) => {
  res.sendFile(join(__dirname, '/html/user.html'));
});
app.get('/how', (req, res) => {
  res.sendFile(join(__dirname, '/html/how.html'));
});
app.get('/about', (req, res) => {
  res.sendFile(join(__dirname, '/html/about.html'));
});
app.get('/contact', (req, res) => {
  res.sendFile(join(__dirname, '/html/contact.html'));
});
app.get('/chat', (req, res) => {
  res.sendFile(join(__dirname, '/html/index.html'));
});
app.get('/join', (req, res) => {
  res.sendFile(join(__dirname, '/html/join.html'));
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    
    
  });
});
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    socket.broadcast.emit('chat message', msg);
  });
});


io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});