/*global AbstractControllerInput:true,IntegerInput:true,FloatInput:true*/

IntegerInput = function (el, label, opts) {
  if (!opts.step)
    opts.step = 1;
  var aci = new AbstractControllerInput(el, label, opts,
    function(d) { return parseInt(d, 10); });
  return aci;
};

FloatInput = function (el, label, opts) {
  if (!opts.precision)
    console.error('precision required for float controlled input');

  var aci = new AbstractControllerInput(el, label, opts,
    function(d) {
      return Math.round(parseFloat(d)*opts.precision)/opts.precision;
    });
  return aci;
};

AbstractControllerInput = function (el, label, opts, parseResult) {
  this.el = el;
  this.value = opts.init;
  this.opts = opts;
  this.parseResult = parseResult;

  var container = $('<div>', { class:' input-group input-group-sm' });
  $('<div>', { text:label, class:'input-group-addon' }).appendTo(container);
  this.input = $('<input>', {
      value:opts.init,
      class:'form-control',
      type:'text'
    }).appendTo(container);

  if (opts.onchange)
    this.input.change(opts.onchange);

  var btnInc = $('<button>',{class:'btn btn-default', type:'button'});
  $('<span>', { class: 'glyphicon glyphicon-arrow-up' }).appendTo(btnInc);
  btnInc.bind('click', { context: this }, this.next);

  var btnDec = $('<button>',{class:'btn btn-default', type:'button'});
  $('<span>', { class: 'glyphicon glyphicon-arrow-down' }).appendTo(btnDec);
  btnDec.bind('click', { context: this }, this.prev);

  $('<div>', {class:'input-group-btn'})
    .append(btnInc).append(btnDec).appendTo(container);

  container.appendTo(el);
};

AbstractControllerInput.prototype.val = function(newVal) {
  return (newVal || newVal === 0) ? this.set(newVal) : this.get();
};

AbstractControllerInput.prototype.get = function() {
  return this.parseResult(this.input.val());
};

AbstractControllerInput.prototype.set = function(val) {
  var parsedVal = this.parseResult(val);

  if (this.opts.max || this.opts.max === 0)
    parsedVal = Math.min(this.opts.max, parsedVal);

  if (this.opts.min || this.opts.min === 0)
    parsedVal = Math.max(this.opts.min, parsedVal);

  this.input.val(parsedVal);
  this.input.change();
  return this;
};

AbstractControllerInput.prototype.next = function(event) {
  var self = event.data.context;
  var oldVal = self.val();
  var newVal = oldVal + self.opts.step;
  self.set(newVal);
  return this;
};

AbstractControllerInput.prototype.prev = function(event) {
  var self = event.data.context;
  var oldVal = self.val();
  var newVal = oldVal - self.opts.step;
  self.set(newVal);
  return this;
};
