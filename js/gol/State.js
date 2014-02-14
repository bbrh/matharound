StrangeState = function (xb, yb, r) {
  var state = new State(State.randomState(xb, yb, r));
  state.neighborhood = function (x, y) {
    if (x===0 || y===0 || x===this.size[0]-1 || y===this.size[1]-1)
      return [];

    if (Math.abs(xb*Math.random()-x) < 10 && Math.abs(yb*Math.random()-y) < 10 && x+y < 10) {
      return [
        this.state[x-2][y-2],this.state[x-1][y-2],this.state[x][y-2],this.state[x+1][y-2],this.state[x+2][y-2],
        this.state[x-2][y-1],this.state[x-1][y-1],this.state[x][y-1],this.state[x+1][y-1],this.state[x+2][y-1],
        this.state[x-2][y],  this.state[x-1][y],                     this.state[x+1][y],  this.state[x+2][y],
        this.state[x-2][y+1],this.state[x-1][y+1],this.state[x][y+1],this.state[x+1][y+1],this.state[x+2][y+1],
        this.state[x-2][y+2],this.state[x-1][y+2],this.state[x][y+2],this.state[x+1][y+2],this.state[x+2][y+2]
      ];
    } else {
      return [
        this.state[x-1][y-1],this.state[x][y-1],this.state[x+1][y-1],
        this.state[x-1][y],                     this.state[x+1][y],
        this.state[x-1][y+1],this.state[x][y+1],this.state[x+1][y+1],
      ];
    }
  };
  return state;
};

RandomState = function (x, y, r) {
  return new State(State.randomState(x, y, r));
};

IslandsState = function (x, y) {
  return new State(State.islandsStates(x, y, 0.5));
};

State = function (state) {
  this.size = [state.length, state[0].length];
  // this.state = this.cloneEmpty(x, y);
  this.state = state; // State.islandsStates(x, y, 0.25);
};

State.prototype.cloneEmpty = function() {
  return State.emptyState(this.size[0], this.size[1]);
};

State.randomState = function (x, y, prob) {
  var newState = [];
  for (var i=0; i<x; i++) {
    var r = [];
    for (var j=0; j<y; j++) {
      r.push(Math.random() > prob ? Gol.states.alive : Gol.states.dead);
    }
    newState.push(r);
  }
  return newState;
};

State.islandsStates = function (x, y, prob) {
  var newState = State.emptyState(x, y);
  var islands = Math.ceil(Math.random() * 100);
  for (var i=0; i<islands; i++) {
    var cx = Math.ceil(Math.random() * x);
    var cy = Math.ceil(Math.random() * y);

    for (var k=0; k<10; k++) {
      for (var l=0; l<10; l++) {
        if (k+cx < x && l+cy < y && (Math.random() > prob)) {
          newState[k+cx][l+cy] = Gol.states.alive;
        }
      }
    }
  }
  return newState;
};

State.emptyState = function (x, y) {
  var newState = [];
  var row = [];
  for (var i=0; i<y; i++) {
    row.push(Gol.states.dead);
  }
  for (var j=0; j<x; j++) {
    newState.push(row.slice(0));
  }
  return newState;
};

State.prototype.neighborhood = function (x, y) {
  if (x===0 || y===0 || x===this.size[0]-1 || y===this.size[1]-1)
    return [];

  return [
    this.state[x-1][y-1],this.state[x][y-1],this.state[x+1][y-1],
    this.state[x-1][y],                     this.state[x+1][y],
    this.state[x-1][y+1],this.state[x][y+1],this.state[x+1][y+1]
  ];
};

State.prototype.appendRule = function (ruleFun) {
  var newState = this.cloneEmpty();
  for (var x=0; x<this.size[0]; x++) {
    for (var y=0; y<this.size[1]; y++) {
      newState[x][y] = ruleFun(this.state[x][y], this.neighborhood(x,y));
    }
  }
  this.state = newState;
};

State.prototype.sameAs = function (other) {
  for (var x=0, xl=this.state.length; x<xl; x++) {
    for (var y=0, yl=this.state.length; y<yl; y++) {
      if (this.state[x][y] !== other[x][y])
        return false;
    }
  }
  return true;
};
