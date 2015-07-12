'use strict';

var Triterm = require('./');

var t = Triterm({handleInput: function(tt) {
  this.writeTTChar(tt);
}});

global.t = t;

