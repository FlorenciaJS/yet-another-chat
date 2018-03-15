const vApp = {

  init: () => {
    let socket = io.connect('http://localhost:3000/chat', { 'forceNew': true });
    vApp.render("<h1>Yet Another Chat!</h1>", document.querySelector('#brand'));
  },

  render: (template, selector) => {
    if (!selector) return;
    selector.innerHTML = template;
  }

}

// Initialize App
vApp.init();