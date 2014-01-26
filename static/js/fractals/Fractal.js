/*global Koch:true, Cesaro:true, Fractal:true, Size, d3*/

Koch = function (svg, points, opts) {
  return new Fractal(svg, points, Fractal.iterators.koch, opts);
};

Cesaro = function (svg, points, opts) {
  return new Fractal(svg, points, Fractal.iterators.cesaro, opts);
};

Fractal = function (svg, points, iterFun, opts) {
  this.svg = svg;
  this.points = points;
  this.initialPoints = points;
  this.iterFun = iterFun;
  this.opts = opts;
};

Fractal.prototype.display = function(iterations) {
  this.clear().iterate(iterations).draw();
};

Fractal.prototype.clear = function() {
  this.svg.selectAll('*').remove();
  return this;
};

Fractal.prototype.iterate = function(steps) {
  this.points = this.initialPoints.slice(0);

  if (!steps && steps !== 0) {
    steps = 1;
  }

  for (var p=0; p<this.points.length; p++) {
    for (var i=0; i<steps; i++) {
      this.points[p] = this.iterFun(this.points[p]);
    }
  }

  return this;
};

Fractal.lineSegmentFun = d3.svg.line()
  .x( function (d) {
    return d.x * Size.m + (Size.w - Size.m) / 2;
  })
  .y( function (d) {
    return d.y * Size.m + (Size.h - Size.m) / 2;
  })
  .interpolate('linear');

Fractal.prototype.draw = function() {
  for (var i = this.points.length - 1; i >= 0; i--) {
    this.drawPoly(this.points[i]);
  }
};

Fractal.prototype.drawPoly = function (data) {
  this.svg
    .append('path')
      .attr('opacity', 0.5)
      .attr('class', 'fractal')
      .attr('stroke-width', 1)
      .attr('stroke', 'black')
      .attr('fill', 'none')
      .attr('d', Fractal.lineSegmentFun(data))
    .transition()
      .attr('opacity', 1)
      .duration(500);
};

Fractal.iterators = {
  poly: function (data) {
    var newD = [];
    for (var i = 0; i < data.length-1; i++) {
      var d = data[i];
      var e = data[i+1];
      var third = {
        x: (e.x - d.x)/3*this.opts.shiftx,
        y: (e.y - d.y)/3*this.opts.shifty
      };

      newD.push({ x: d.x,                       y: d.y });
      newD.push({ x: d.x + third.x,             y: d.y + third.y });
      newD.push({ x: d.x + third.x   - third.y, y: d.y + third.y + third.x });
      newD.push({ x: d.x + third.x*2 - third.y, y: d.y + 2*third.y + third.x });
      newD.push({ x: d.x + third.x*2,           y: d.y + third.y*2 });
      // newD.push({ x: e.x, y: e.y });
    }
    newD.push({
      x: data[data.length-1].x,
      y: data[data.length-1].y,
    });
    return newD;
  },

  cesaro: function (data) {
    var newD = [];
    for (var i = 0; i < data.length-1; i++) {
      var d = data[i];
      var e = data[i+1];
      var half  = { x: (e.x - d.x)/2, y: (e.y - d.y)/2 };

      newD.push({ x: d.x, y: d.y });
      newD.push({
        x: d.x + half.x - half.x * (1 - this.opts.height),
        y: d.y + half.y - half.y * (1 - this.opts.height),
      });
      newD.push({
        x: d.x + half.x + half.y * this.opts.height,
        y: d.y + half.y - half.x * this.opts.height,
      });
      newD.push({
        x: e.x - half.x + half.x * (1 - this.opts.height),
        y: e.y - half.y + half.y * (1 - this.opts.height),
      });
    }
    newD.push({
      x: data[data.length-1].x,
      y: data[data.length-1].y,
    });
    return newD;
  },

  koch: function (data) {
    var newD = [];
    for (var i = 0; i < data.length; i++) {
      var d = data[i];
      var e = (i === (data.length-1)) ? data[0] : data[i+1];
      var half  = { x: (e.x - d.x)/2, y: (e.y - d.y)/2 };
      var third = { x: (e.x - d.x)/3, y: (e.y - d.y)/3 };

      // console.log(d);

      newD.push({ x: d.x,                    y: d.y });
      newD.push({ x: d.x + third.x,          y: d.y + third.y });
      newD.push({
        x: d.x - third.y * Math.sin(this.opts.angle) + half.x,
        y: d.y + third.x * Math.sin(this.opts.angle) + half.y
      });
      newD.push({ x: e.x - third.x,          y: e.y - third.y });
    }
    return newD;
  }
};

Fractal.init = {
  prepareNgram: function (pts, r, angle, center) {
    var data = [];
    if (!r) r = 0.25;
    if (!angle) angle = Math.PI/4;
    if (!center) center = { x: 0.5, y: 0.5 };

    for (var i=0; i<pts; i++) {
      data.push({
        x: r * Math.sin(i/pts * Math.PI * 2 + angle) + center.x,
        y: r * Math.cos(i/pts * Math.PI * 2 + angle) + center.y,
      });
    }

    if (data.length > 0) // closing the path
      data.push(data[0]);

    return data;
  },

  ngram : function (pts, r, angle, center) {
    return [Fractal.init.prepareNgram(pts, r, angle, center)];
  },

  grid : function (steps) {
    var data = [];

    var step = 1 / steps;

    for (var i=0; i<steps; i++) {
      for (var j=0; j<steps; j++) {
        data.push(
          [{ x: i * step, y: j * step, }, { x: (i+1) * step, y: j * step, } ],
          [{ x: i * step, y: j * step, }, { x: i * step,     y: (j+1) * step, }]
        );
      }
    }

    for (var k=0; k<steps; k++) { // last row
      data.push(
        [{ x: 1,        y: k * step, }, { x: 1,            y: (k+1) * step, } ],
        [{ x: k * step, y: 1, },        { x: (k+1) * step, y: 1 }]
      );
    }

    return data;
  },

  squares : function (steps, pts, angle) {
    var data = [];
    var step = 1 / steps;
    for (var i=0; i<steps+1; i++) {
      for (var j=0; j<steps+1; j++) {
        data.push(
          Fractal.init.prepareNgram(pts, step/2, angle, { x:i*step, y:j*step })
        );
      }
    }

    return data;
  }
};
