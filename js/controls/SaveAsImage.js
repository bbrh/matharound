SaveAsImage = function (el, canvas) {
  this.el = el;
  this.canvas = canvas;

  var container = $('<div>', { class:' input-group input-group-sm' });
  var btnDownload = $('<button>',{class:'btn btn-default', type:'button'});
  $('<span>', { class: 'glyphicon glyphicon-download' }).appendTo(btnDownload);
  btnDownload.bind('click', { context: this }, this.save);
  btnDownload.appendTo(container);

  container.appendTo(el);
};

SaveAsImage.prototype.save = function(event) {
  var self = event.data.context;
  var dataUrl = self.canvas.canvas[0].toDataURL();
  window.open(dataUrl, '_blank');
};