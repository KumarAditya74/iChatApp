//Node server which will handle socket.io connections
const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
  });

const users = {};
io.on('connection', socket =>{
    socket.on('new-user-joined', nam =>{
        users[socket.id] = nam;
        socket.broadcast.emit('user-joined', nam);
    });

    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, nam: users[socket.id]})
    });
    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
})
