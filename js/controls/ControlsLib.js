/*global ControlsLib:true, Dropdown, IntegerInput*/

ControlsLib = {};

ControlsLib.automatas = {};

ControlsLib.automatas.seed = function (el, callback) {
  return new Dropdown(
    el,
    'Seed', [
      { key: 'empty', val: 'Empty' },
      { key: 'point', val: 'Point' },
      { key: 'filled', val: 'Filled' },
      { },
      { key: 'random25', val: 'Random 25%'},
      { key: 'random50', val: 'Random 50%'},
      { key: 'random75', val: 'Random 75%'},
      { },
      { key: 'checkboard', val: 'Checkboard'},
      { key: 'symmetry1', val: 'Symmetry'},
    ], callback
  );
};

ControlsLib.automatas.pixelSize = function(el, callback) {
  return new IntegerInput(
    el, 'PixelSize', {
      max: 40,
      min: 1,
      init: 3,
      onchange: callback
    }
  );
};

ControlsLib.automatas.ruleId = function(el, rulesAmt, callback) {
  return new IntegerInput(
    el, 'Rule #', {
      max: rulesAmt,
      min: 1,
      init: 30,
      onchange: callback
    }
  );
};


ControlsLib.fractals = {};

ControlsLib.fractals.iterations = function (el, callback) {
  return new IntegerInput(
    el, 'Iterations', {
      max: 10,
      min: 0,
      init: 4,
      onchange: callback
    }
  );
};

