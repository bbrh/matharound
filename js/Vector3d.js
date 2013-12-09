Vector = function (x,y,z) {
  this.x = x;
  this.y = y;
  this.z = z;
};

Vector.zero = function () {
  return new Vector(0,0,0);
};

Vector.unit = function (a) {
  return new Vector(a,a,a);
};

Vector.prototype.clone = function() {
  return new Vector(this.x, this.y, this.z);
};

Vector.prototype.dist = function(other) {
  return this.diff(other).length();
};

Vector.prototype.length = function() {
  return Math.pow(this.x*this.x+this.y*this.y+this.z*this.z, 0.5);
};

Vector.prototype.sum = function(other) {
  return new Vector (this.x + other.x, this.y + other.y, this.z + other.z);
};

Vector.prototype.diff = function(other) {
  return new Vector (this.x - other.x, this.y - other.y, this.z - other.z);
};

Vector.prototype.mult = function(a) {
  return new Vector (this.x*a, this.y*a, this.z*a);
};

Vector.prototype.dotProd = function(other) {
  return this.x*other.x + this.y*other.y + this.z*other.z;
};

Vector.prototype.rotate = function(rotVector) {
  return this.rotx(rotVector.x).roty(rotVector.y).rotz(rotVector.z);
};

Vector.prototype.rotx = function(theta) {
  var ct = Math.cos(theta);
  var st = Math.sin(theta);
  return new Vector(this.x, this.y*ct - this.z*st, this.y*st + this.z*ct);
};

Vector.prototype.roty = function(theta) {
  var ct = Math.cos(theta);
  var st = Math.sin(theta);
  return new Vector(this.x*ct + this.z*st, this.y, this.z*ct - this.x*st);
};

Vector.prototype.rotz = function(theta) {
  var ct = Math.cos(theta);
  var st = Math.sin(theta);
  return new Vector(this.x*ct - this.y*st, this.x*st + this.y*ct, this.z);
};
