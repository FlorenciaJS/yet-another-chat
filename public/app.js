let signedUser = null;
let socket = null;

const vApp = {

  init: () => {
    vApp.render("<h1>Yet Another Chat!</h1>", document.querySelector('#brand'));
    vApp.login((Math.random() + 1).toString(29).slice(2, 9));
    vApp.socket_connect();
        
    //On Arrive a new User
    socket.on('users', (users) => {
      console.log(users);
    })
  },

  login: (nick) => {
    if (!sessionStorage.getItem("yac")) {
      sessionStorage.setItem("yac", JSON.stringify({
        nick: nick
      }))
    }
    signedUser = JSON.parse(sessionStorage.getItem("yac")); 
  },

  socket_connect: () => {
    socket = io.connect('http://localhost:3000/chat', {
      query:"username="+signedUser.nick,
      'forceNew': true,
    });
  },

  render: (template, selector) => {
    if (!selector) return;
    selector.innerHTML = template;
  }

}

// Initialize App
vApp.init();