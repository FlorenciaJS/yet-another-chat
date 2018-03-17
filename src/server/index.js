let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);
let chat = io.of('/chat')
let port = process.env.PORT || 3000;

let userList = [];
let messages = [];

if (process.env.NODE_ENV === 'production'){
  const rootDir = process.cwd();
  app.use(express.static(rootDir + '/build'));
}

chat.on('connection', (socket) => {

  let signedUser = socket.handshake.query;

  //User SingIn
  if(typeof(userList.find( user => user.nick === signedUser.username)) == 'undefined'){
    userList.push({
      id: socket.id,
      nick: signedUser.username,
      avatar: `data:image/png;base64,${signedUser.avatar}`,
      status: 'online'
    })
  }
  chat.emit('users', userList);
  chat.emit('messages', messages);

  //On Arrive nwew message
  socket.on('new-message', (msg) => {
    messages.push(msg);
    chat.emit('messages', messages);
  })

  //User SignOut
  socket.on('disconnect', () => {
    userList.map((user, index) => {
      if (user.nick === socket.handshake.query.username) {
        userList.splice(index, 1);
      }
    })
    chat.emit('users', userList);
  })

});

server.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});