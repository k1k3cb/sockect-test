let allUsers = [];

const establishSocketConnection = (socket, io) => {
  console.log('Cliente conectado');

  socket.on('counter', (counterValue) => {
    io.emit('new counter value', counterValue);
  });

  allUsers.push(socket.id);
  io.emit('users', allUsers);

  socket.on('disconnect', () =>{
    allUsers=allUsers.filter(id => socket.id !== id)
    io.emit('users', allUsers);

  })
};

module.exports = establishSocketConnection;
