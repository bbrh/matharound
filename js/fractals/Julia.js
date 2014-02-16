// CompLen = function(c) {
//   return Math.pow(c.re*c.re + c.i*c.i, 0.5);
// };





Julia = function(c, maxiter) {
  this.c = c;
  this.maxiter = maxiter;
  this.R = (1 + Math.pow(1 + 4*this.c.abs(), 0.5)) / 2;
};

Julia.prototype.evaluate = function(w) {
  var itercount = 0;
  var val = w;
  while (itercount < this.maxiter) {
    val = val.square().add(this.c);
    if (val.abs() > this.R)
      return itercount;
    itercount ++;
  }
  return itercount;
};
