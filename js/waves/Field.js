Field = function(objectPlaceholder) {
  this.objectPlaceholder = objectPlaceholder;
  var canvasPlaceholder =
    $('<div>', {class:'canvas-placeholder'}).appendTo(objectPlaceholder);
  this.canvas = new Canvas(canvasPlaceholder);

}

Field.prototype.draw = function(sources) {
  var at=0, bt=0, ct=0, dt=0, t;
  this.canvas.init();

  for (var x = 0; x < Size.w; x++) {
    for (var y = 0; y < Size.h; y++) {
      var z = this.waveFun(sources, {x:x, y:y});
      var index = z%256;
      this.canvas.drawPixel(1, x, y, index, index, index, 255);
    }
  }
  this.canvas.done();
};

Field.prototype.waveFun = function(sources, point) {
  var res = 0;
  var maxAmp = 0;
  for (var si in sources) {
    maxAmp += sources[si].amplitude;
    res += sources[si].amplitude *
      (1+Math.cos(
        Field.distance(point, sources[si]) / 
        Size.w*sources[si].wavelength*Math.PI));
  }

  return Math.floor(128 * res / maxAmp);
}

Field.distance = function(a, b) {
  var da = a.x - b.x;
  var dy = a.y - b.y;
  return Math.pow(da*da + dy*dy, 0.5);
}

Field.prototype.cleanup = function () {
  this.objectPlaceholder.empty();
};