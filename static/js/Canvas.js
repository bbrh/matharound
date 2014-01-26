Canvas = function (container, opts) {
  this.container = container;
  this.init();
};

Canvas.prototype.init = function() {
  if (this.canvas) this.canvas.remove();
  this.canvas = $('<canvas>')
    .attr('width', Size.w)
    .attr('height', Size.h)
    .appendTo(this.container);
  this.ctx = this.canvas[0].getContext('2d');
  this.canvasData = this.ctx.getImageData(0, 0, Size.w, Size.h);
};

Canvas.prototype.done = function() {
  this.ctx.putImageData(this.canvasData, 0, 0);
};

Canvas.prototype.drawPixel = function (size, x, y, r, g, b, a) {
  for (var i=x*size; i<(x+1)*size; i++) {
    for (var j=y*size; j<(y+1)*size; j++) {

      var index = (i + j * Size.w) * 4;

      this.canvasData.data[index + 0] = r;
      this.canvasData.data[index + 1] = g;
      this.canvasData.data[index + 2] = b;
      this.canvasData.data[index + 3] = a;
    }
  }
};
