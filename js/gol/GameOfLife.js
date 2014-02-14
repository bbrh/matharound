Gol = function (canvas, opts) {
  this.size = opts.size;
  this.trackHistoryDepth = opts.history || 10;
  this.history = [];
  this.onStill = opts.onStill || false;
  this.pixelSize = opts.pixelSize || 10;
  this.state = new RandomState(this.size[0], this.size[1], 1);
  this.canvas = canvas;
  this.rule = Gol.rules.convay();
};

Gol.prototype.step = function() {
  this.history.push($.extend({}, this.state.state));
  if (this.history.length > this.trackHistoryDepth) {
    this.history.shift();
  }
  this.state.appendRule(this.rule);
  this.draw();

  for (var i=0, l=this.history.length; i<l; i++) {
    var previouseState = this.history[i];
    if (this.onStill && this.state.sameAs(previouseState)) {
      this.history = [];
      this.onStill(l-i);
    }
  }
};

Gol.prototype.draw = function () {
  this.canvas.init();
  for (var x=0; x<this.size[0]; x++) {
    for (var y=0; y<this.size[1]; y++) {
      if (this.state.state[x][y]) {
        if (this.history.length === 0 || this.history[this.history.length-1][x][y])
          this.canvas.drawPixel(this.pixelSize, x, y, 0, 0, 0, 256);
        else
          this.canvas.drawPixel(this.pixelSize, x, y, 64, 80, 64, 256);
      }
    }
  }
  this.canvas.done();
};

Gol.states = {
  dead: 0,
  alive: 1
};

Gol.rules = {
  constructor: function (rule) {
    var biStart = rule.indexOf('B');
    var biEnd = rule.indexOf('/');
    var siStart = rule.indexOf('S');
    var bis = [];
    var sis = [];
    for (var bi=biStart+1; bi<biEnd; bi++) {
      bis.push(parseInt(rule[bi], 10));
    }
    for (var si=siStart+1; si<rule.length; si++) {
      sis.push(parseInt(rule[si], 10));
    }
    return function(cell, neighborhood) {
      var aliveNeighb = 0;
      for (var i=0; i<neighborhood.length; i++) {
        if (neighborhood[i] === Gol.states.alive)
          aliveNeighb++;
      }
      if (cell === Gol.states.dead) {
        for (var j=0; j<bis.length; j++) {
          if (bis[j] === aliveNeighb)
            return Gol.states.alive;
        }
      }
      if (cell === Gol.states.alive) {
        for (var k=0; k<sis.length; k++) {
          if (sis[k] === aliveNeighb)
            return Gol.states.alive;
        }
      }
      return Gol.states.dead;
    };
  },

  convay: function () {
    return Gol.rules.constructor('B3/S23');
  },

  daynight: function () {
    return Gol.rules.constructor('B3678/S34678');
  },

  highlife: function () {
    return Gol.rules.constructor('B36/S23');
  },

  lifewithoutdeath: function (od) {
    return Gol.rules.constructor('B3/S12345678');
  },

  seeds: function () {
    return Gol.rules.constructor('B2/S');
  }
};
