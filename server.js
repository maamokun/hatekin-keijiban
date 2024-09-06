const express = require('express');
const http = require('node:http');
const socketIo = require('socket.io');
const path = require('node:path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('新しいクライアントが接続しました');

    socket.on('newMessage', (message) => {
        io.emit('newMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('クライアントが切断しました');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`サーバーがポート ${PORT} で起動しました`);
});
