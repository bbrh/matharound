/*global Dropdown:true*/

Dropdown = function(el, name, choices, onchange) {
  this.el = el;
  this.name = name;
  this.choices = choices;
  this.onchange = onchange;
  this.selected = null;

  this.el.addClass('dropdown');

  this.btn = $('<button>', {
    class         : 'btn btn-default btn-sm dropdown-toggle seed-selector',
    'data-toggle' : 'dropdown',
    id            : 'dropdownMenu'+name,
    text          : name
  });
  $('<span>', {class:'caret'}).appendTo(this.btn);

  var list = $('<ul>', {
    class             : 'dropdown-menu',
    role              : 'menu',
    'aria-labelledby' : 'dropdownMenu'+name
  });

  for (var chId=0; chId<choices.length; chId++) {
    var li = $('<li>', {role:'presentation'});
    var d = choices[chId];
    if (d.key) {
      $('<a>', {
        role     :'menuitem',
        class    : 'seed-item menu-item',
        tabindex : '-1',
        data     : d.key,
        text     : d.val
      }).appendTo(li);
      li.bind('click', { key:d.key, ctx:this }, this.setVal);
    } else {
      li.addClass('divider');
    }
    li.appendTo(list);
  }

  el.append(this.btn).append(list);
};

Dropdown.prototype.val = function(key) {
  if (key) {
    var choice = this.choices.filter(function(i) {
      return i.key === key;
    })[0];
    this.selected = choice.key;
    this.btn.text(this.name + ': ' + choice.val);
    this.onchange();
  } else {
    return this.selected;
  }
};

Dropdown.prototype.setVal = function(event) {
  return event.data.ctx.val(event.data.key);
};
