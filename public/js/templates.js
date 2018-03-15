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

  messages: (messages) => {
    return messages.map((msg, index) => {
      msg_altr = (messages[index].user == signedUser.nick) ? 'me' : 'you';
      return (
        `<div class="msg ${msg_altr}">
            <strong>${msg.user}</strong>: <em>${msg.message}</em>
          </div>`
      )
    }).join("");
  }

}