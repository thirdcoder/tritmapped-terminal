# tritmapped-terminal

Tricolor tritmapped 45x28 character 9x14 terminal display

Usage:

    var Triterm = require('tritmapped-terminal');

    var t = Triterm(opts);

    t.writeUChar('H');
    t.writeUChar('i');
    t.refresh();

Emulates a terminal wrapping a [tritmapped-canvas](https://github.com/thirdcoder/tritmapped-canvas),
with 9x14 character output and keyboard input from [trit-text](https://github.com/thirdcoder/trit-text).

Options:

* `handleInput`: function to call with (tt, ev) [trit-text](https://github.com/thirdcoder/trit-text) character codepoint and HTML5 DOM event when user presses a key
* `cooked` (true): if true, writing characters interprets control codes
* all options are passed through to [tritmapped-canvas](https://github.com/thirdcoder/tritmapped-canvas)

API:

## `t.writeUChar(u)`

Write a Unicode character (must be supported by trit-text).

## `t.setTTChar(tt, x, y)`

Set (x,y) coordinate to a trit-text character `tt`.

## `t.refresh()`

Redraw the HTML5 canvas.

## `t.writeTTChar(tt)`

Write a trit-text character and append the hardware cursor.

## `t.forward()`

Move the cursor forward, incrementing the column, and if at the end, incrementing the row if necessary then resetting the column.

## `t.backspace()`

Move the cursor backwards, decrementing the column, and if at the beginning, decrement the row if necessary then resetting the column.

