/*global FiniteAutomata:true, Size*/

FiniteAutomata = function (canvas, opts, size) {
  this.canvas = canvas;
  this.opts = opts;
  this.size = size;
  this.gap = this.size.h;
  this.stat = {
    entropySteps: [],
    aliveSteps: [],
    transitions: 0,
    cellsSolved: 0,
    alive: 0
  };
  FiniteAutomata.rules = FiniteAutomata.generateRules(256);
  // FiniteAutomata.rules = FiniteAutomata.generateRules2(2, 3);
};

FiniteAutomata.prototype.draw = function () {
  this.canvas.init();

  var prevState = FiniteAutomata.generateInitialState(
    this.opts.seed,
    this.opts.pixelSize,
    this.gap);
  // var prevState = (new Array(this.gap)).concat(prevState);
  var currentState = [];
  var rule = FiniteAutomata.rules[this.opts.ruleId];

  for (var x=0, xl=Size.w/this.opts.pixelSize + 2*this.gap; x<xl; x++) {
    // currentState[x] = rule[FiniteAutomata.neighborhood(prevState, x)];
    if (prevState[x])
      this.canvas.drawPixel(this.opts.pixelSize, x-this.gap, 0, 0, 0, 0, 256);
  }


  var winSize = Size.w/this.opts.pixelSize;
  var rXBound = winSize + this.gap;
  this.stat.cellsSolved = rXBound - this.gap;
  for (var y=1, yl=Size.h/this.opts.pixelSize; y<yl; y++) {
    var entropyStep = 0;
    var aliveStep = 0;
    var xl=winSize + 2*this.gap;
    for (var x=0; x<xl; x++) {

      currentState[x] = rule[FiniteAutomata.neighborhood(prevState, x)];


      if (x > this.gap && x < rXBound) {
        if (currentState[x] !== prevState[x]) {
          this.stat.transitions += 1;
          entropyStep += 1;
        }
        this.stat.cellsSolved += 1;

        if (currentState[x]) {
          this.stat.alive += 1;
          aliveStep += 1;
          this.canvas.drawPixel(this.opts.pixelSize, x-this.gap, y, 0, 0, 0, 256);
        }
      }
    }
    this.stat.entropySteps.push(entropyStep/winSize);
    this.stat.aliveSteps.push(aliveStep/winSize);
    prevState = currentState;
    currentState = [];
  }

  this.canvas.done();
  if (this.onDrawCallback)
    this.onDrawCallback(this.stat);
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

FiniteAutomata.generateRules = function(numOfRules) {
  var rules = {};
  for (var i = 0; i<numOfRules; i++) {
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

// FiniteAutomata.generateRules2 = function(states, neighbWidth) {
//   var rules = [];
//   var numOfRules = 256;
//   var cases = Math.pow(states, neighbWidth);
//   for (var i = 0; i<numOfRules; i++) {
//     var rule = {};
//     for (var j=0; j<cases; j++) {
//       rule[j.toString(states)] = Math.floor(i / Math.pow(states, j)) % states;
//     }
//     rules.push(rule);
//   }
//   return rules;
// };

FiniteAutomata.generateInitialState = function(seed, pixelSize, startFrom) {
  var state = [];
  var w = Size.w/pixelSize+2*(startFrom||0);

  if (seed === 'empty')
    for (var x=0; x<w; x++) {
      state.push(0);
    }
  else if (seed === 'point')
    for (var x=0; x<w; x++) {
      state.push((x === Math.floor(w/2) ? 1 : 0));
    }
  else if (seed === 'random25')
    for (var x=0; x<w; x++) {
      state.push((Math.random() > 0.75) ? 0 : 1);
    }
  else if (seed === 'random50')
    for (var x=0; x<w; x++) {
      state.push((Math.random() > 0.5) ? 0 : 1);
    }
  else if (seed === 'random75')
    for (var x=0; x<w; x++) {
      state.push((Math.random() > 0.25) ? 0 : 1);
    }
  else if (seed === 'checkboard') {
    var step = w/8;
    for (var x=0; x<w; x++) {
      state.push((Math.floor(x/step) % 2) ? 0 : 1);
    }
  } else if (seed === 'symmetry1') {
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
  } else if (seed === 'filled') {
    for (var x=0; x<w; x++) {
      state.push(1);
    }
  }
  return state;
};

FiniteAutomata.prototype.cleanup = function () {
  // this.objectPlaceholder.empty();
};

FiniteAutomata.prototype.setSize = function (newSize) {
  if (newSize) {
    this.size = newSize;
    this.canvas.setSize(newSize);
    return this;
  } else {
    return this.size;
  }
};
