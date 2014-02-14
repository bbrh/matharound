/*global ControlsLib:true, Dropdown, IntegerInput*/

ControlsLib = {};



ControlsLib.gol = {};

ControlsLib.gol.rule = function (el, callback) {
  var label = $('<input>', { class: 'input-group-addon', style: 'width:10em', disabled:'disabled' }).appendTo(el);
  var selector = $('<span>', { class: 'rule-menu' }).appendTo(el);
  this.value = false;
  var ctx = this;
  var d = new Dropdown(
    selector,
    'Game', [
      { key: 'B3/S23', val: 'Convay' },
      { key: 'B3678/S34678', val: 'Day & Night' },
      { key: 'B36/S23', val: 'High Life' },
      { key: 'B3/S12345678', val: 'Life Without Death' },
      { key: 'B2/S', val: 'Seeds' },
      { },
      { key: 'constructor', val: 'Constructor'},
    ], function () {
      var selected = d.val();
      if (selected === 'constructor') {
        label.removeAttr('disabled');
        label.focus();
      } else {
        ctx.value = false;
        label.attr('disabled', 'disabled');
        label.val(selected);
        callback();
      }
    }
  );
  label.bind('change',  { context: this }, function (event) {
    event.data.context.value = $(this).val();
    callback();
  });
  this.d = d;
  return this;
};

ControlsLib.gol.rule.prototype.val = function (newVal) {
  if (newVal) {
    this.d.val(newVal);
    return this;
  } else {
    return this.value ? this.value : this.d.val();
  }
};

ControlsLib.gol.seed = function (el, callback) {
  return new Dropdown(
    el,
    'Seed', [
      { val: 'Random fill', elements: [
        { key: 'random5', val: 'Fill 5%' },
        { key: 'random25', val: 'Fill 25%' },
        { key: 'random50', val: 'Fill 50%' },
        { key: 'random75', val: 'Fill 75%' },
        { key: 'random95', val: 'Fill 95%' },
      ]},
      { val: 'Islands', elements: [
        { key: 'islands25', val: 'Density 25%' },
        { key: 'islands50', val: 'Density 50%' },
        { key: 'islands75', val: 'Density 75%' },
      ]},
      { val: 'Gliders', elements: [
        { key: 'preset-glider', val: 'Glider' },
        { key: 'preset-glider-gun', val: 'Glider Gun' }
      ]},
      { val: 'Oscillators', elements: [
        { key: 'preset-osc-blinker', val: 'Blinker, period 2' },
        { key: 'preset-osc-star', val: 'Star, period 3' },
        { key: 'preset-osc-cross', val: 'Cross, period 3' },
        { key: 'preset-osc-frenchkiss', val: 'French kiss, period 3' },
        { key: 'preset-osc-clock2', val: 'Clock2, period 4' },
        { key: 'preset-osc-pinwheel', val: 'Pinwheel, period 4' },
        { key: 'preset-osc-octagon', val: 'Octagon, period 5' },
        { key: 'preset-osc-fumarole', val: 'Fumarole, period 5' },
        { key: 'preset-osc-pentoads', val: 'Pentoads, period 5' },
        { key: 'preset-osc-koksgalaxy', val: 'Kok\'s galaxy, period 8' },
        { key: 'preset-osc-pentadecathlon', val: 'Pentadecathlon, period 15' }
      ]},
      { key: 'strange', val: 'Strange' },
    ], callback
  );
};





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

