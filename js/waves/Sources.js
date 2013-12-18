/*global Sources:true, d3, Size */

Sources = function (svgcontainer, field, data) {
  this.field = field;
  this.isDrawControls = false;
  this.objectPlaceholder = svgcontainer;
  this.svg = d3.select(svgcontainer).append('svg')
    .attr('height', Size.h)
    .attr('width',  Size.w);
  this.data = data || {
    0 : {
      x          : Math.floor(Size.w/5),
      y          : Math.floor(Size.h/3),
      wavelength : 100,
      amplitude  : 10,
      id         : 0,
      fill       : 'green'
    },
    1 : {
      x          : Math.floor(Size.w/5),
      y          : Math.floor(Size.h*2/3),
      wavelength : 100,
      amplitude  : 8,
      id         : 1,
      fill       : 'yellow'
    },
  };
};

Sources.prototype.draw = function () {
  var dataset = [];
  for (var si in this.data) {
    dataset.push(this.data[si]);
  }

  var _this = this;

  var dragmove = function(d) {
    var nX = d3.event.x;
    nX = nX < 10 ? 10 : nX > Size.w-10 ? Size.w-10 : nX;
    var nY = d3.event.y;
    nY = nY < 10 ? 10 : nY > Size.h-10 ? Size.h-10 : nY;

    _this.data[d.id].x =nX;
    _this.data[d.id].y =nY;

    d3.select(this).attr('cx', nX).attr('cy', nY);
  };

  var drag = d3.behavior.drag()
    .origin(Object)
    .on('drag', dragmove);

  this.svg.selectAll('circle')
    .data(dataset)
    .enter()
    .append('circle')
    .attr('class', 'draggable')
    .attr('cx',     function(d) { return d.x; })
    .attr('cy',     function(d) { return d.y; })
    .attr('fill',   function(d) { return d.fill; })
    .attr('dataid', function(d) { return d.id; })
    .attr('r', 10)
    .on('click', function (data, id) {
      _this.updateField();
      return;
    }).call(drag);

  if (this.isDrawControls) {
    this.drawControls();
  } else {
    $('.source-control-element').remove();
  }
};

Sources.prototype.updateField = function() {
  this.field.draw(this.data);
};

Sources.prototype.drawControls = function () {
  var dataset = [];
  for (var si in this.data) {
    dataset.push(this.data[si]);
  }

  var dragHorizontal = d3.behavior.drag()
    .origin(Object)
    .on('drag', function(d) {
      d.wavelength += d3.event.dx;
      d3.select(this)
        .attr('x1', d.x+d.wavelength)
        .attr('x2', d.x+d.wavelength);
    });

  var dragVertical = d3.behavior.drag()
    .origin(Object)
    .on('drag', function(d) {
      d.amplitude -= d3.event.dy/5;
      d3.select(this)
        .attr('y1', d.y - 5*d.amplitude)
        .attr('y2', d.y - 5*d.amplitude);
    });

  var controlLines = this.svg.selectAll('line').data(dataset);

  controlLines
    .enter()
    .append('line')
    .attr('class', 'source-control-element')
    .attr('x1', function(d) { return d.x; })
    .attr('y1', function(d) { return d.y; })
    .attr('x2', function(d) { return d.x + d.wavelength; })
    .attr('y2', function(d) { return d.y; })
    .attr('stroke-width', 2)
    .attr('stroke', function(d) { return d.fill; });

  controlLines
    .enter()
    .append('line')
    .attr('class', 'source-control-element draggable')
    .attr('x1', function(d) { return d.x + d.wavelength; })
    .attr('y1', function(d) { return d.y - 10/*d.r*/; })
    .attr('x2', function(d) { return d.x + d.wavelength; })
    .attr('y2', function(d) { return d.y + 10/*d.r*/; })
    .attr('stroke-width', 2)
    .attr('stroke', function(d) { return d.fill; })
    .call(dragHorizontal);

  controlLines
    .enter()
    .append('line')
    .attr('class', 'source-control-element')
    .attr('x1', function(d) { return d.x; })
    .attr('y1', function(d) { return d.y; })
    .attr('x2', function(d) { return d.x; })
    .attr('y2', function(d) { return d.y - 5*d.amplitude; })
    .attr('stroke-width', 2)
    .attr('stroke', function(d) { return d.fill; });

  controlLines
    .enter()
    .append('line')
    .attr('class', 'source-control-element draggable')
    .attr('x1', function(d) { return d.x - 10; })
    .attr('y1', function(d) { return d.y - 5*d.amplitude; })
    .attr('x2', function(d) { return d.x + 10; })
    .attr('y2', function(d) { return d.y - 5*d.amplitude; })
    .attr('stroke-width', 2)
    .attr('stroke', function(d) { return d.fill; })
    .call(dragVertical);
};

Sources.prototype.cleanup = function () {
  $(this.objectPlaceholder).empty();
};

Sources.prototype.addNewSource = function () {
  var id = (Object.keys(this.data)).length;
  var news = Sources.newSource(id);
  this.data[id] = news;
  console.log(news);
};

Sources.newSource = function (id) {
  return {
      x          : Math.floor(Size.w * (0.8 * Math.random() + 0.1)),
      y          : Math.floor(Size.h * (0.8 * Math.random() + 0.1)),
      wavelength : 100,
      amplitude  : 8,
      id         : id,
      fill       : 'orange'
    };
};
