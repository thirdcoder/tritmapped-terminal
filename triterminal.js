'use strict';

var Tricanvas = require('tritmapped-canvas');

var toTritmap9x14 = require('trit-text').toTritmap9x14;
var fromUnicode = require('trit-text').fromUnicode;
var fromEvent = require('trit-text').fromEvent;

window.t = Tricanvas();

var cursorX = 0, cursorY = 0;
window.addEventListener('keydown', function(ev) {
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

  console.log(cursorX,cursorY);
  t.writeTrits(toTritmap9x14(tt), 9, 14, cursorY, cursorX);
  t.refresh();

  ++cursorX;

  if (tt == 12) { // trit-text newline
    cursorY++;
    cursorX = 0;
  }

  if (cursorX >= t.width/9) {
    cursorX = 0;
    ++cursorY;
  }
  if (cursorY >= t.width/14) {
    cursorY = 0;
    cursorX = 0;
  }
});

  global.t = t;

t.refresh();
