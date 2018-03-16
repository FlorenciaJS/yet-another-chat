
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