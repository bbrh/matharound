/*global CellularAutomataConstructor:true, d3, Utils*/

CellularAutomataConstructor = function (placeholder, data, callback) {
  this.element = placeholder;
  this.size = new Utils.Size(100, 50);
  this.data = data;
  this.callback = callback;
};

CellularAutomataConstructor.ruleOpts = [
  0, 1, 10, 11, 100, 101, 110, 111
];

CellularAutomataConstructor.prototype.display = function() {
  var ctx = this;
  this.element.empty();
  for (var i=0; i<CellularAutomataConstructor.ruleOpts.length; i++) {
    var ruleKey = CellularAutomataConstructor.ruleOpts[i];
    var d = this.data[ruleKey];
    var el = $('<div>', {
      class: 'automata-constructor-container',
      style: 'display:inline-block'
    });
    var svg = d3.select(el[0]).append('svg')
      .attr('id', 'svg-'+ruleKey)
      .attr('height', 100)
      .attr('width',  100);

    svg.selectAll('rect.cell').data([0, 1, 2])
      .enter()
        .append('rect')
          .attr('x', function(data) { return 25 * data + 5; })
          .attr('y', 5 )
          .attr('class', 'cell' )
          .attr('width', 20 )
          .attr('stroke', 'black' )
          .attr('stroke-width', 1 )
          .attr('height', 20 )
          .attr('fill', function(data) {
            var strR = ''+ruleKey;
            while (strR.length < 3) {
              strR = '0'+strR;
            }
            return (strR[data] === '1') ? 'black' : 'white';
          });
    svg.append('rect')
        .attr('x', 30)
        .attr('y', 55 )
        .attr('class', 'cell-result' )
        .attr('width', 20 )
        .attr('stroke', 'black' )
        .attr('stroke-width', 1 )
        .attr('height', 20 )
        .attr('ruleKey', ruleKey)
        .attr('fill', CellularAutomataConstructor.graph.fill(d))
        .attr('orig-fill', CellularAutomataConstructor.graph.fill(d))
      .on('mouseenter', CellularAutomataConstructor.graph.highlight)
      .on('mouseleave', CellularAutomataConstructor.graph.lowlight)
      .on('click', function () {
        var ruleKey = d3.select(this).attr('ruleKey');
        ctx.data[ruleKey] = (ctx.data[ruleKey]+1) % 2;
        ctx.callback();
      });

    el.appendTo(this.element);
  }
};

CellularAutomataConstructor.graph = {};

CellularAutomataConstructor.graph.fill = function(d) {
  return d ? 'black' : 'white';
};

CellularAutomataConstructor.graph.highlight = function() {
  var el = d3.select(this);
  el.transition()
    .attr('fill', 'orange')
    .duration(333);
};

CellularAutomataConstructor.graph.lowlight = function(d) {
  var el = d3.select(this);
  d3.select(this).transition()
    .attr('fill', el.attr('orig-fill'))
    .duration(333);
};
