/*global CellularAutomata2:true, Size*/

CellularAutomata2 = function (canvas, opts, size) {
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

  this.states = 2;

};

CellularAutomata2.prototype.draw = function () {
  this.canvas.init();

  var prevState = CellularAutomata2.generateInitialState(
    this.opts.seed,
    this.opts.pixelSize,
    this.gap);
  // var prevState = (new Array(this.gap)).concat(prevState);
  var currentState = [];
  var rule = CellularAutomata2.avgSum;
  // var rule = CellularAutomata2.rules[this.opts.ruleId];

  var winSize = Size.w/this.opts.pixelSize;
  var winSize2 = Size.h/this.opts.pixelSize;
  var rXBound = winSize + this.gap;
  var xl=winSize + 2*this.gap;

  for (var x=0; x<xl; x++) {
    // currentState[x] = rule[CellularAutomata2.neighborhood(prevState, x)];
    // if (prevState[x])
    if (x > this.gap && x < rXBound) {
      var c = (1-prevState[x])*256;
      this.canvas.drawPixel(this.opts.pixelSize, x-this.gap, 0, c, c, c, 256);
    }
  }


  this.stat.cellsSolved = rXBound - this.gap;
  for (var y=1, yl=Size.h/this.opts.pixelSize; y<yl; y++) {
    var entropyStep = 0;
    var aliveStep = 0;
    for (var x=0; x<xl; x++) {

      // currentState[x] = rule[CellularAutomata2.neighborhood(prevState, x)];
      currentState[x] = rule(CellularAutomata2.neighborhood(prevState, x), this.opts.ruleAdd);


      if (x > this.gap && x < rXBound) {
        if (currentState[x] !== prevState[x]) {
          this.stat.transitions += 1;
          entropyStep += 1;
        }
        this.stat.cellsSolved += 1;

        // if (currentState[x]) {
        // this.stat.alive += 1;
        // aliveStep += 1;
        var c = (1-currentState[x])*256;
        this.canvas.drawPixel(this.opts.pixelSize, x-this.gap, y, c, c, c, 256);
          // this.canvas.drawPixel(
          //   showGrid ? this.opts.pixelSize-1 : this.opts.pixelSize,
          //   x-this.gap, y, 0, 0, 0, 256);
        // }
      }
    }
    this.stat.entropySteps.push(entropyStep/winSize);
    this.stat.aliveSteps.push(aliveStep/winSize);
    prevState = currentState;
    currentState = [];
  }

  this.canvas.done();
  // if (this.opts.pixelSize > 9) {
  //   this.canvas.drawGrid(this.opts.pixelSize);
  // }

  if (this.onDrawCallback)
    this.onDrawCallback(this.stat);
};

CellularAutomata2.neighborhood = function (state, x) {
  var res = [];
  for (var i=x-1; i<=x+1; i++) {
    if (i<0)
      res.push(0);
    else if (i>state.length-1)
      res.push(0);
    else
      res.push(state[i]);
  }
  return [res[0], res[1], res[2]];
};

CellularAutomata2.generateRules = function(numOfRules) {
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

CellularAutomata2.avgSum = function (state, add) {
  var sum = add, i=0;
  while (i<state.length) {
    sum += state[i];
    i++;
  }
  return (sum / state.length) % 1;
};


CellularAutomata2.avgSum1 = function (state) { // катастрофы!!!
  // var sum = 1.001, i=0;
  var sum = 0, i=0;
  while (i<state.length) {
    sum += state[i];
    i++;
  }
  // sum *= 9;
  sum += 1.002;
  return (sum / state.length) % 1;
  // return Math.floor((sum / state.length)*1)/1 % 1.0000000000000001;
};

// CellularAutomata2.generateRules2 = function(states, neighbWidth) {
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

CellularAutomata2.generateInitialState = function(seed, pixelSize, startFrom) {
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
      state.push(Math.random());
    }
  else if (seed === 'random50')
    for (var x=0; x<w; x++) {
      state.push(Math.random());
    }
  else if (seed === 'random75')
    for (var x=0; x<w; x++) {
      state.push(Math.random());
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

CellularAutomata2.prototype.cleanup = function () {
  // this.objectPlaceholder.empty();
};

CellularAutomata2.prototype.setSize = function (newSize) {
  if (newSize) {
    this.size = newSize;
    this.canvas.setSize(newSize);
    return this;
  } else {
    return this.size;
  }
};
