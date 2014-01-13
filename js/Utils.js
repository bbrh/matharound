/*global Utils:true*/

Utils = {};

Utils.getSize = function () {
  var h = window.innerHeight -
    $('.header').outerHeight() -
    $('.footer').outerHeight();
  var w = window.innerWidth;
  return {
    m : Math.min(h, w),
    h : h,
    w : w
  };
};
