Complex = function(x, y) {
  this.re = x;
  this.i = y;
};

Complex.prototype.abs = function() {
  return Math.pow(this.re*this.re + this.i*this.i, 0.5);
};

Complex.prototype.add = function(c) {
  var re = this.re + c.re;
  var i  = this.i  + c.i;
  return new Complex(re, i);
};

Complex.prototype.square = function(e) {
  var re = this.re*this.re - this.i*this.i;
  var i = 2*this.re*this.i;
  return new Complex(re, i);
};
