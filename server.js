// server.js
import http from 'http';
import { Server as SocketIoServer } from 'socket.io';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = http.createServer((req, res) => {
    handle(req, res);
  });

  const io = new SocketIoServer(server);

  io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('readFriendRequest', () => {
      io.emit('updateFriendRequestCount', 0);
    });

    socket.on('sendFriendRequest', () => {
      io.emit('newFriendRequest');
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
