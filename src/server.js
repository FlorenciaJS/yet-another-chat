let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);
let chat = io.of('/chat')
let port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/../public'));

chat.on('connection', (socket) => {
  console.log(`Connection established from: ${socket.id}`)
});

server.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});