const utils = require('./utils');
const templates = require('./templates');

let signedUser = null;
let socket = null;

const vApp = {

  init: () => {
    vApp.render("<h1>Yet Another Chat!</h1>", document.querySelector('#brand'));
    vApp.login((Math.random() + 1).toString(29).slice(2, 9));
    vApp.socket_connect();
    vApp.render(signedUser.nick, document.querySelector('#userInfo')); 
    
    //On Arrive a new User
    socket.on('users', (users) => {
      vApp.render(templates.userList(users), document.querySelector('.users'));
    })
    
    //Listen for send message event
    document.querySelector('#writer').addEventListener('submit', ()=> {
      vApp.sendMessage()
    })

    //On Arrive a new Message
    socket.on('messages', (messages) => {
      vApp.render(templates.messages(messages, signedUser), document.querySelector('#messages'));
      let chat_box = document.querySelector('.chat');
      chat_box.scrollTop = chat_box.scrollHeight; // Auto scroll down
    })

  },

  login: (nick) => {
    if (!sessionStorage.getItem("yac")) {
      sessionStorage.setItem("yac", JSON.stringify({
        nick: nick,
        avatar: utils.avatarGenerator().split(',')[1]
      }))
    }
    signedUser = JSON.parse(sessionStorage.getItem("yac")); 
  },

  socket_connect: () => {
    socket = io.connect(`${SERVER_URL}/chat`, {
      query:"username="+signedUser.nick+"&avatar="+signedUser.avatar,
      'forceNew': true,
    });
  },

  sendMessage: () => {
    let msg_input = document.getElementById('message');
    let msg = msg_input.value;
    if (!msg == "") {
      var message = {
        user: signedUser.nick,
        message: msg.replace(/<\/?[^>]+(>|$)/g, ""),
        date: new Date()
      }
      socket.emit('new-message', message);
      msg_input.value = "";
    }
    msg_input.focus(); // Autofocus after sending message
  },

  render: (template, selector) => {
    if (!selector) return;
    selector.innerHTML = template;
  }

}

// Initialize App
vApp.init();