Sources = function (svgcontainer, field) {
  this.field = field;
  this.objectPlaceholder = svgcontainer;
  this.svg = d3.select(svgcontainer).append('svg')
    .attr('height', Size.h)
    .attr('width',  Size.w);
  this.data = {
    0 : { 
      x          : Math.floor(Size.w/5),
      y          : Math.floor(Size.h/3),
      wavelength : 20,
      amplitude  : 10,
      id         : 0,
      fill       : 'green'
    }, 1 : {
      x          : Math.floor(Size.w/5),
      y          : Math.floor(Size.h*2/3),
      wavelength : 20,
      amplitude  : 8,
      id         : 1,
      fill       : 'yellow'
    },
  };
}

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

  var drag =   d3.behavior.drag()
    .origin(Object)
    .on('drag', dragmove);

  var circles = this.svg.selectAll('circle')
    .data(dataset)
    .enter()
    .append('circle')
    .attr('class', 'draggable')
    .attr('cx',     function(d) { return d.x; })
    .attr('cy',     function(d) { return d.y; })
    .attr('fill',   function(d) { return d.fill; })
    .attr('dataid', function(d) { return d.id; })
    .attr('r', 10)
    .on('click', function (d, i) {
      _this.field.draw(_this.data);
      return;
    }).call(drag);
};

Sources.prototype.cleanup = function () {
  $(this.objectPlaceholder).empty();
};

Sources.prototype.addNewSource = function () {
  var id = (Object.keys(this.data)).length;
  var news = Sources.newSource(id);
  this.data[id] = news;
  console.log(news);
}

Sources.newSource = function (id) {
  return {
      x          : Math.floor(Size.w * (0.8 * Math.random() + 0.1)),
      y          : Math.floor(Size.h * (0.8 * Math.random() + 0.1)),
      wavelength : 2,
      amplitude  : 8,
      id         : id,
      fill       : 'orange'
    };
}