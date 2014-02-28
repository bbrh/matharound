/*global Utils:true*/

Utils = {};

Utils.Size = function (w, h) {
  this.w = w;
  this.h = h;

  this.m = Math.min(h, w);
  this.center = {
    x: w/2,
    y: h/2
  };
};

Utils.getSize = function (factor) {
  factor = factor || {x:1, y:1};
  var h = Math.ceil((window.innerHeight -
    $('.header').outerHeight() -
    $('.footer').outerHeight()) / factor.y);
  var w = Math.ceil(window.innerWidth / factor.x);
  return new Utils.Size(w, h);
};

Utils.getCustomSize = function (x, y) {
	var h = y || Math.ceil(window.innerHeight -
    $('.header').outerHeight() -
    $('.footer').outerHeight());
  var w = x || Math.ceil(window.innerWidth);
  return new Utils.Size(w, h);
};
