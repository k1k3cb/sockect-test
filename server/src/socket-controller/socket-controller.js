const establishSocketConnection = (socket, io) => {
  console.log('Cliente conectado');

  socket.on('counter', (newCounter) => {
    console.log(newCounter);
    io.emit('response', newCounter);
  });
};

module.exports = establishSocketConnection;
