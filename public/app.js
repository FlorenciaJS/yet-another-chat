let signedUser = null;
let socket = null;

const vApp = {

  init: () => {
    vApp.render("<h1>Yet Another Chat!</h1>", document.querySelector('#brand'));
    vApp.login((Math.random() + 1).toString(29).slice(2, 9));
    vApp.socket_connect();
        
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
      console.log(messages);
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
    socket = io.connect('http://localhost:3000/chat', {
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
        message: msg,
        date: new Date()
      }
      socket.emit('new-message', message);
      msg_input.value = "";
    }
  },

  render: (template, selector) => {
    if (!selector) return;
    selector.innerHTML = template;
  }

}

const templates = {

  userList: (users) => {
   return users.map((user) => {
      return (
        `<li class="user">
          <img src="${user.avatar}">
          <span class="name">${user.nick}</span>
          <span class="status">${user.status}</span>
        </li>`
      );
    }).join("");
  },

}

const utils = {

  avatarGenerator: () => {
    var x;
    var y;
    var c = document.createElement('canvas');
    c.width = 50;
    c.height = 50;
    var ctx = c.getContext("2d");
    ctx.fillStyle = 'rgb('
      + Math.floor(Math.random() * 192 + 64) + ', '
      + Math.floor(Math.random() * 192 + 64) + ', '
      + Math.floor(Math.random() * 192 + 64) + ')';
    var firstX = 0;
    var lastX = 40;

    for (x = 0; x < 3; x++) {
      var yPos = 0;
      for (y = 0; y < 5; y++) {
        var random_boolean = Math.random() >= 0.5;
        if (random_boolean) {
          ctx.fillRect(firstX, yPos, 10, 10);
          ctx.fillRect(lastX, yPos, 10, 10);
        }
        yPos += 10;
      }
      firstX += 10;
      lastX -= 10;
    }
    return c.toDataURL();
  }
  
}

// Initialize App
vApp.init();