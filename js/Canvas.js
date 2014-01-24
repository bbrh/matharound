/*global Canvas:true, Size*/

Canvas = function (container, opts, size) {
  this.container = container;
  this.size = size || Size;
  this.canvas = $('<canvas>')
    .attr('width', this.size.w)
    .attr('height', this.size.h)
    .appendTo(this.container);

};

Canvas.prototype.init = function() {
  this.cleanup();

  this.ctx = this.canvas[0].getContext('2d');
  this.canvasData = this.ctx.getImageData(0, 0, this.size.w, this.size.h);
};

Canvas.prototype.done = function() {
  this.ctx.putImageData(this.canvasData, 0, 0);
};

Canvas.prototype.drawPixel = function (size, x, y, r, g, b, a) {
  for (var i=x*size; i<(x+1)*size; i++) {
    for (var j=y*size; j<(y+1)*size; j++) {

      var index = (i + j * this.size.w) * 4;

      this.canvasData.data[index + 0] = r;
      this.canvasData.data[index + 1] = g;
      this.canvasData.data[index + 2] = b;
      this.canvasData.data[index + 3] = a;
    }
  }
};

Canvas.prototype.cleanup = function () {
  this.canvas[0].getContext('2d').clearRect (0, 0, this.size.w, this.size.h);
};

Canvas.prototype.setSize = function (newSize) {
  if (newSize) {
    this.cleanup();
    this.size = newSize;
    this.canvas
      .attr('width', this.size.w)
      .attr('height', this.size.h);
    return this;
  } else {
    return this.size;
  }
};
