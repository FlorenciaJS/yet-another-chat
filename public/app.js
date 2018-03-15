const vApp = {

  init: () => {
    vApp.render("<h1>Yet Another Chat!</h1>", document.querySelector('#brand'));
  },

  render: (template, selector) => {
    if (!selector) return;
    selector.innerHTML = template;
  }

}

// Initialize App
vApp.init();