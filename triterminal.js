'use strict';

var Tricanvas = require('tritmapped-canvas');

var toTritmap  = require('trit-text').toTritmap9x14;
var CHAR_HEIGHT = 14;
var CHAR_WIDTH = 9;

var fromUnicode = require('trit-text').fromUnicode;
var fromEvent = require('trit-text').fromEvent;


function Triterm(opts) {
  this.tc = Tricanvas(opts);
  this.tc.refresh();

  this.cursorX = 0;
  this.cursorY = 0;

  this.handleInput = opts.handleInput;
  this.cooked = opts.cooked !== undefined ? opts.cooked : true

  window.addEventListener('keydown', this.onkeydown.bind(this));
};

Triterm.prototype.writeUChar = function(u) {
  return this.writeTTChar(fromUnicode(u));
};

Triterm.prototype.setTTChar = function(tt) {
  if (this.cooked) {
    if (tt == 12) { // trit-text newline
      this.cursorY++;
      this.cursorX = 0;
      return false; // not displayed visually
    }
  }

  this.tc.writeTrits(toTritmap(tt), CHAR_WIDTH, CHAR_HEIGHT, this.cursorY, this.cursorX);
  this.tc.refresh();

  return true;
};

Triterm.prototype.writeTTChar = function(tt) {
  var show = this.setTTChar(tt);
  if (show) this.forward();
};

Triterm.prototype.forward = function() {
  ++this.cursorX;

  if (this.cursorX >= t.tc.width / CHAR_WIDTH) {
    this.cursorX = 0;
    ++this.cursorY;
  }
  if (this.cursorY >= t.tc.width / CHAR_HEIGHT) {
    this.cursorY = 0;
    this.cursorX = 0;
  }
}

Triterm.prototype.backspace = function() {
  --this.cursorX;

  if (this.cursorX < 0) {
    this.cursorX = 0;
    --this.cursorY;
  }

  if (this.cursorY < 0) {
    this.cursorY = 0; // TODO
  }

  this.setTTChar(0);
};

Triterm.prototype.onkeydown = function(ev) {
  //console.log(ev);

  if (ev.metaKey) {
    // don't intercept cmd-key, allow e.g. cmd-r to reload browser
    return;
  }

  ev.preventDefault(); // allow intercepting ctrl-key without executing browser default

  var tt = fromEvent(ev);

  if (this.handleInput) this.handleInput.call(this, tt, ev);
};

module.exports = function(opts) {
  return new Triterm(opts);
};

