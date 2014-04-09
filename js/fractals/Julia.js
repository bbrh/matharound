/*global Julia:true, Utils, Complex*/

Julia = function(canvas, cval, maxiter) {
  this.canvas = canvas;
  this.c = Julia.cDelta(cval);
  this.maxiter = maxiter;
  this.r = (1 + Math.pow(1 + 4*this.c.abs(), 0.5)) / 2;
  this.colors = [];
  this.seq = 0;
  this.updateLock = false;
  this.center = {
    x: 0,
    y: 0,
    zoom: 1
  };

  var colorC = 0;
  var step = 255/maxiter;
  while(colorC < 256) {
    this.colors.push(colorC+=step);
  }

};

Julia.prototype.evaluate = function(w) {
  var itercount = 0;
  var val = w;
  while (itercount < this.maxiter) {
    val = val.square().add(this.c);
    if (val.abs() > this.r)
      return itercount;
    itercount ++;
  }
  return itercount;
};

Julia.prototype.draw = function () {
  var MULT = 1.3;
  var dim = Utils.getSize();
  this.canvas.init();

  for (var x = 0; x < dim.w; x++) {
    for (var y = 0; y < dim.h; y++) {
      var xc = (x/dim.w-0.5+this.center.x/dim.w)*2/(this.center.zoom || 1e-10)/*this.r*/;
      var yc = (y/dim.h-0.5+this.center.y/dim.h)*2/(this.center.zoom || 1e-10)/*this.r*/;
      var iters = this.evaluate(new Complex(xc, yc));
      if (iters > MULT) {
        this.canvas.drawPixel(1, x, y,
          this.colors[Math.floor(iters/MULT)], 0, 0, 256);
      }
    }
  }
  this.seq ++;
  this.canvas.done();
};

Julia.cDelta = function (f) {
  return new Complex(
    0.4*Math.cos(f/100) + Math.random()/200,
    0.25*Math.cos(f/100) + Math.random()/200);
};
