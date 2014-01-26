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
      fill       : 'green',
      fill2      : 'orange',
      rad        : 7,
      strokewidth: 2
    },
    1 : {
      x          : Math.floor(Size.w/5),
      y          : Math.floor(Size.h*2/3),
      wavelength : 100,
      amplitude  : 8,
      id         : 1,
      fill       : 'green',
      fill2      : 'orange',
      rad        : 7,
      strokewidth: 2
    },
  };
};

Sources.prototype.draw = function () {
  var dataset = [];
  for (var si in this.data) {
    dataset.push(this.data[si]);
  }

  var _this = this;

  var onDragMove = function(d) {
    var nX = d3.event.x;
    nX = nX < 10 ? 10 : nX > Size.w-10 ? Size.w-10 : nX;
    var nY = d3.event.y;
    nY = nY < 10 ? 10 : nY > Size.h-10 ? Size.h-10 : nY;

    _this.data[d.id].x = nX;
    _this.data[d.id].y = nY;

    if (nX || nY) _this.needUpdate = true;

    d3.select(this).attr('cx', nX).attr('cy', nY);
  };

  var onDragEnd = function() {
    if (_this.needUpdate) {
      console.log('onDragEnd');
      _this.updateField();
    }
  };

  var drag = d3.behavior.drag()
    .origin(Object)
    .on('drag', onDragMove)
    .on('dragend', onDragEnd);

  this.svg.selectAll('circle')
    .data(dataset)
    .enter()
    .append('circle')
    .attr('class', 'draggable')
    .attr('cx',     function(d) { return d.x; })
    .attr('cy',     function(d) { return d.y; })
    .attr('fill',   function(d) { return d.fill; })
    .attr('dataid', function(d) { return d.id; })
    .attr('style', 'opacity:0.1')
    .attr('r',      function(d) { return d.rad*3 || 10; })
    .on('mouseenter', function (data, id) {
      d3.select(this).transition()
        .attr('stroke-width', data.strokewidth || 0 )
        .attr('stroke', data.fill )
        .attr('fill', data.fill2 || data.fill )
        .attr('r', data.rad*2.5 );
    })
    .on('mouseleave', function (data, id) {
      d3.select(this).transition()
        .attr('stroke-width', 0 )
        .attr('stroke', data.fill )
        .attr('fill', data.fill )
        .attr('r', data.rad );
    })
    .on('dblclick', function (data, id) {
      d3.select(this).remove();
      delete _this.data[data.id];
      _this.updateField();
      // d3.select(this).transition()
      //   .attr('fill', 'red' )
      //   .attr('r', 100 );
    })
    .call(drag);

  d3.selectAll('circle').transition()
    .delay(5e2)
    .attr('style', 'opacity:1')
    .attr('r', function(d) { return d.rad || 10; });


  if (this.isDrawControls) {
    this.drawControls();
  } else {
    $('.source-control-element').remove();
  }
};

Sources.prototype.updateField = function() {
  this.needUpdate = false;
  this.field.draw(this.data);
};

Sources.Highlight = {};
Sources.Highlight.barOn = function(d) {
  return d3.select(this).transition()
    .attr('stroke-width', 4 )
    .attr('stroke', d.fill2 );
};
Sources.Highlight.barOff = function(d) {
  return d3.select(this).transition()
    .attr('stroke-width', 2 )
    .attr('stroke', d.fill );
};

Sources.dragHorizontal = d3.behavior.drag()
  .origin(Object)
  .on('dragstart', Sources.Highlight.barOn)
  .on('dragend', Sources.Highlight.barOff)
  .on('drag', function(d) {
    d.wavelength += d3.event.dx;
    d3.select(this)
      .attr('x1', d.x+d.wavelength)
      .attr('x2', d.x+d.wavelength);
  });

Sources.dragVertical = d3.behavior.drag()
  .origin(Object)
  .on('dragstart', Sources.Highlight.barOn)
  .on('dragend', Sources.Highlight.barOff)
  .on('drag', function(d) {
    d.amplitude -= d3.event.dy/5;
    d3.select(this)
      .attr('y1', d.y - 5*d.amplitude)
      .attr('y2', d.y - 5*d.amplitude);
  });

Sources.prototype.drawControls = function () {
  var dataset = [];
  for (var si in this.data) {
    dataset.push(this.data[si]);
  }

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
    .attr('class', 'source-control-element draggable-horizontal')
    .attr('x1', function(d) { return d.x + d.wavelength; })
    .attr('y1', function(d) { return d.y - 10/*d.r*/; })
    .attr('x2', function(d) { return d.x + d.wavelength; })
    .attr('y2', function(d) { return d.y + 10/*d.r*/; })
    .attr('stroke-width', 2)
    .attr('stroke', function(d) { return d.fill; })
    .on('mouseenter', Sources.Highlight.barOn)
    .on('mouseleave', Sources.Highlight.barOff)
    .call(Sources.dragHorizontal);

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
    .attr('class', 'source-control-element draggable-vertical')
    .attr('x1', function(d) { return d.x - 10; })
    .attr('y1', function(d) { return d.y - 5*d.amplitude; })
    .attr('x2', function(d) { return d.x + 10; })
    .attr('y2', function(d) { return d.y - 5*d.amplitude; })
    .attr('stroke-width', 2)
    .attr('stroke', function(d) { return d.fill; })
    .on('mouseenter', Sources.Highlight.barOn)
    .on('mouseleave', Sources.Highlight.barOff)
    .call(Sources.dragVertical);
};

Sources.prototype.cleanup = function () {
  $(this.objectPlaceholder).empty();
};

Sources.prototype.addNewSource = function () {
  var id = (Object.keys(this.data)).length;
  var news = Sources.newSource(id);
  this.data[id] = news;
};

Sources.colors = [
  { fill: 'darkgreen', fill2: 'yellow' },
  { fill: 'orange',    fill2: 'red' },
  { fill: 'blue',      fill2: 'darkblue' },
  { fill: 'orange',    fill2: 'darkgrey' },
  { fill: 'red',       fill2: 'green' }
];

Sources.newSource = function (id) {
  var rc = Sources.colors[Math.floor(Math.random()*1e3) % Sources.colors.length];
  return {
      x          : Math.floor(Size.w * (0.8 * Math.random() + 0.1)),
      y          : Math.floor(Size.h * (0.8 * Math.random() + 0.1)),
      wavelength : 100,
      amplitude  : 8,
      id         : id,
      fill       : rc.fill,
      fill2      : rc.fill2,
      rad        : 7,
      strokewidth: 2
    };
};
