/*global Dropdown:true*/

// 2do: remove .seed-item

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
    } else if (d.elements) {
      $('<a>', {
        role     :'menuitem',
        class    : 'seed-item menu-item',
        tabindex : '-1',
        text     : d.val
      }).appendTo(li);
      li.addClass('dropdown-submenu');
      var nestedUl = $('<ul>', {
        class             : 'dropdown-menu',
        role              : 'menu'
      });
      for (var subi=0; subi<d.elements.length; subi++) {
        var nestedli = $('<li>', {role:'presentation'})
          .bind('click', { key:d.elements[subi].key, ctx:this }, this.setVal)
          .appendTo(nestedUl);
        $('<a>', {
          role     :'menuitem',
          class    : 'seed-item menu-item',
          tabindex : '-1',
          text     : d.elements[subi].val
        }).appendTo(nestedli);
      }
      nestedUl.appendTo(li);
    } else {
      li.addClass('divider');
    }
    li.appendTo(list);
  }

  el.append(this.btn).append(list);
};

Dropdown.prototype.val = function(key) {
  if (key) {
    var i=0;
    var choice = false;
    while (i<this.choices.length && !choice) {
      if (this.choices[i].key === key)
        choice = this.choices[i];

      if (this.choices[i].elements) {
        for (var j=0; j<this.choices[i].elements.length; j++) {
          if (this.choices[i].elements[j].key === key)
            choice = this.choices[i].elements[j];
        }
      }

      i++;
    }

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
