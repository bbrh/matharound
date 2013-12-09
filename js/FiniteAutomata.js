FiniteAutomata = function (objectPlaceholder, opts) {
  this.objectPlaceholder = objectPlaceholder;
  this.title = 'Finite Automata';
  this.opts = opts || { pixelSize:1, ruleId:30, seed:'point' };
  this.numOfRules = 256;
  var canvasPlaceholder =
    $('<div>', {class:'canvas-placeholder'}).appendTo(objectPlaceholder);
  this.canvas = new Canvas(canvasPlaceholder);
  this.rules = this.generateRules();
};

FiniteAutomata.prototype.display = function (opts) {
  this.opts = opts;
  this.draw();
};

FiniteAutomata.prototype.draw = function () {
  this.canvas.init();

  var prevState = this.generateInitialState(), currentState = [];
  var rule = this.rules[this.opts.ruleId];
  for (var y=0; y<Size.h/this.opts.pixelSize; y++) {
    for (var x=0; x<Size.w/this.opts.pixelSize; x++) {
      currentState[x] = rule[FiniteAutomata.neighborhood(prevState, x)];
      if (currentState[x])
        this.canvas.drawPixel(this.opts.pixelSize, x, y, 0, 0, 0, 256);
    }
    prevState = currentState;
    currentState = [];
  }

  this.canvas.done();
};

FiniteAutomata.prototype.generateInitialState = function() {
  var state = [];
  var w = Size.w/this.opts.pixelSize;

  if (this.opts.seed === 'empty')
    for (var x=0; x<w; x++) {
      state.push(0);
    }
  else if (this.opts.seed === 'point')
    for (var x=0; x<w; x++) {
      state.push((x === Math.floor(w/2) ? 1 : 0));
    }
  else if (this.opts.seed === 'random25')
    for (var x=0; x<w; x++) {
      state.push((Math.random() > 0.75) ? 0 : 1);
    }
  else if (this.opts.seed === 'random50')
    for (var x=0; x<w; x++) {
      state.push((Math.random() > 0.5) ? 0 : 1);
    }
  else if (this.opts.seed === 'random75')
    for (var x=0; x<w; x++) {
      state.push((Math.random() > 0.25) ? 0 : 1);
    }
  else if (this.opts.seed === 'checkboard') {
    var step = w/8;
    for (var x=0; x<w; x++) {
      state.push((Math.floor(x/step) % 2) ? 0 : 1);
    }
  } else if (this.opts.seed === 'symmetry1') {
    for (var x=0; x<w; x++) {
      state.push(0);
    }

    var segments = Math.floor(w/10);
    for (var j = 2; j < segments; j++) {
      for (var x = 1; x < w; x++) {
        state[Math.floor(w/(j*x))] = 1;
        state[w - Math.floor(w/(j*x))] = 1;
      }
    }
  } else if (this.opts.seed === 'filled') {
    for (var x=0; x<w; x++) {
      state.push(1);
    }
  }
  return state;
};

FiniteAutomata.neighborhood = function (state, x) {
  var res = [];
  for (var i=x-1; i<=x+1; i++) {
    if (i<0)
      res.push(0);
    else if (i>state.length-1)
      res.push(0);
    else
      res.push(state[i]);
  }
  return res[0] * 100 +
       res[1] * 10 +
       res[2];
};

FiniteAutomata.prototype.generateRules = function() {
  var rules = {};
  for (var i = 0; i<this.numOfRules; i++) {
    rules[i] = {
      0   : i%2,
      1   : Math.floor(i/2)  %2,
      10  : Math.floor(i/4)  %2,
      11  : Math.floor(i/8)  %2,
      100 : Math.floor(i/16) %2,
      101 : Math.floor(i/32) %2,
      110 : Math.floor(i/64) %2,
      111 : Math.floor(i/128)%2
    };
  }
  return rules;
};

FiniteAutomata.prototype.cleanup = function () {
  this.objectPlaceholder.empty();
};
