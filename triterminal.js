'use strict';

var Tricanvas = require('tritmapped-canvas');

var toTritmap9x14 = require('trit-text').toTritmap9x14;
var fromUnicode = require('trit-text').fromUnicode;
var fromEvent = require('trit-text').fromEvent;

function Triterm(opts) {
  this.tc = Tricanvas(opts);
  this.tc.refresh();

  this.cursorX = 0;
  this.cursorY = 0;

  window.addEventListener('keydown', this.keydown.bind(this));
};

Triterm.prototype.keydown = function(ev) {
  console.log(ev);

  if (ev.metaKey) {
    // don't intercept cmd-key, allow e.g. cmd-r to reload browser
    return;
  }

  ev.preventDefault(); // allow intercepting ctrl-key without executing browser default

  var tt = fromEvent(ev);
  if (tt === null) {
    // no assigned key, ignore
    return;
  }

  this.tc.writeTrits(toTritmap9x14(tt), 9, 14, this.cursorY, this.cursorX);
  this.tc.refresh();

  ++this.cursorX;

  if (tt == 12) { // trit-text newline
    this.cursorY++;
    this.cursorX = 0;
  }

  if (this.cursorX >= t.width/9) {
    this.cursorX = 0;
    ++this.cursorY;
  }
  if (this.cursorY >= t.width/14) {
    this.cursorY = 0;
    this.cursorX = 0;
  }
};

module.exports = function(opts) {
  return new Triterm(opts);
};

