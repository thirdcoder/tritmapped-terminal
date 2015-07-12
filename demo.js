'use strict';

var Triterm = require('./');

var t = Triterm({handleInput: function(tt, ev) {
  if (ev.keyCode === 8) {
    this.backspace();
    return;
  }

  if (tt !== null) {
    this.writeTTChar(tt);
  }
}});

global.t = t;

