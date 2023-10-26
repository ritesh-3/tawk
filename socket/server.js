const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config()

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Socket.IO server is running\n');
});

const io = socketIo(server, {
    cors: {
        origin: process.env.CLIENT_URL,
    },
});

let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};

io.on('connection', (socket) => {
    console.log('🚀 Someone connected!');

    // get userId and socketId from client
    socket.on('addUser', (userId) => {
        addUser(userId, socket.id);
        io.emit('getUsers', users);
    });

    // get and send message
    socket.on('sendMessage', ({ senderId, receiverId, content }) => {
        const user = getUser(receiverId);
        io.to(user?.socketId).emit('getMessage', {
            senderId,
            content,
        });
    });

    // typing states
    socket.on('typing', ({ senderId, receiverId }) => {
        const user = getUser(receiverId);
        console.log(user);
        io.to(user?.socketId).emit('typing', senderId);
    });

    socket.on('typing stop', ({ senderId, receiverId }) => {
        const user = getUser(receiverId);
        io.to(user?.socketId).emit('typing stop', senderId);
    });

    // user disconnected
    socket.on('disconnect', () => {
        console.log('⚠️ Someone disconnected');
        removeUser(socket.id);
        io.emit('getUsers', users);
    });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`);
});
