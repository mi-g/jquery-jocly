
Jocly jQuery plugin
===================


*jquery.jocly* is a set of jQuery plugins for embedding Jocly games into any web site.

Jocly (http://jocly.com/) is a HTML5 board games platform for 2-players abstract strategy games like Chess or Checkers.
The Jocly web site allows playing against the computer, reviewing/analyzing played games and playing against other players. 
Most games display the board in 3D when WebGL is enabled on the user's device/platform, and a 2D interface is always available.

The *jquery.jocly* plugin embeds the main features of Jocly so games can be integrated into a web site with minimum effort.

Check a few demos: http://mi-g.github.io/jquery-jocly/index.html, also this chess puzzle site: http://chesschal.com/

*jquery.jocly* is still in active development and many more features are still to be implemented. If you plan to use the plugin
in a project, please let us know so we can help: support at jocly dot com.

Using jquery.jocly
------------------

If you just look after having a "play against the computer" applet in a site page, the easy way show in this example:

```
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Playing Chess</title>
    <link rel="stylesheet" href="jquery.jocly.min.css">
    <script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
    <script src="jquery.jocly.min.js></script>
  </head>
  <body>
    <div data-jocly data-jocly-init='["localPlay","classic-chess"]'></div>
  </body>
</html>
```

This opens an applet ready to play Chess.

Alternatively, you may want to use javascript to setup the applet:

```
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Playing Chess</title>
    <link rel="stylesheet" href="jquery.jocly.min.css">
    <script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
    <script src="jquery.jocly.min.js></script>
    <script>
$(document).ready(function() {
	$("#jocly-applet").jocly().jocly("localPlay","classic-chess");
});
    </script>
  </head>
  <body>
    <div id="jocly-applet"></div>
  </body>
</html>
```

Viewing played games
--------------------

You can watch played games within the applet by providing the game moves in PJN language. PJN is compatible with PGN (for Chess) and PDN (for Draughts)
in the way that a PGN or PDN file is valid PJN. 

There is another jQuery plugin, *joclyPJN*, to display the entire game: meta-tags, moves, variants and comments. It handles opening and collapsing
tags, comments and variants with colors for a better visibility. If the PJN document contains several games, a drop-down selector is automatically displayed
to pick the game to be replayed. Once connected to the Jocly applet, moves in the PJN widget are automatically highlighted to reflect the state of the
board.

```
...
<div id="jocly-applet"></div>
<div id="jocly-pjn"></div>
...
```

```
...
$(document).ready(function() {
	$("#jocly-applet").jocly();
	$("#jocly-pjn").joclyPJN()
		.joclyPJN("attachApplet",$("#jocly-applet"))
		.joclyPJN("load", *** your PJN data as a string *** )  ;
});
...
```

Fair use
--------

The jQuery widgets run from the hosting server, but the applet is an iframe running from Jocly servers. We reserve the right to block
the hosting source if attempts or abusing the system are detected, or if it takes too much of our resources without a significant return. 
If you don't know whether the usage you intend to make of those plugins is considered a fair use, just ask us !

API
---

The jQuery plugins, *jocly*, *joclyPJN* and *joclyListener use the same calling convention:

The widget is created with `jQuerySelector.jocly(options)`, for instance, `$("#jocly-applet").jocly()` or `$("#jocly-pjn").joclyPJN({commentsInitialVisible:false})`.
Note that the *options* parameter can be ommited if you are happy with the default. After the initialisation, methods are called using
`jQuerySelector.jocly(methodName, parameters...)`, for instance `$("#jocly-applet").jocly("setFeatures",{hasNavigation:true})`.

It is possible to invoke one or more methods at page start without using any javascript (but it requires understanding JSON). The initial commands
are passed as HTML attributes, respectively *data-jocly-init* and *data-jocly-pjn-init*, using a JSON-encoded array: `[methodName, arguments...]`,
for instance: `<div data-jocly-pjn data-jocly-pjn-init='["attachApplet","$(\"#jocly-applet\")"]'></div>`.

If you want to call several methods at init, you can group them with an enclosing array.

### jocly plugin

Constructor options:

- **ratio**: the height/width ratio, default is 1.0
- **maxWidth**: the maximum number of pixels horizontally, default is 1000

Methods:

- **remove**: removes the applet from the page gracefully.
- **localPlay**: start a game against the computer
    + **game**: the game to be played (*string*)
- **setFeatures**: show or hide elements in the applet
	+ **features**: the following values are available:
	    * *hasNavigation*: buttons on the left to move into the game (*boolean*)
	    * *hasHistory*: the list of played moves on the right (*boolean*)
	    * *hasControls*: a toolbar at the bottom with control buttons (*boolean*)
	    * *hasToolbar*: the bottom-most toolbar with player names (*boolean*)
- **viewOptions**: modify the applet view options.
	+ **options**: 
		* *skin*: the skin name (*string*)
		* *notation*: whether the notation should be displayed on the board (*boolean*)
		* *moves*: whether possible moves should be highlighted (*boolean*)
		* *sounds*: whether sounds should be played (*boolean*)
- **mask**: displays/hide a semi-opaque mask over the applet.
	+ **haveMask**: whether the mask should be displayed (*boolean*)
- **updateCamera**: modify the position of the camera and/or the target (the point the camera is looking at).
This feature only works when the applet displays a 3D skin.
    + **camera**
        * *x*: X position of the camera
        * *y*: Y position of the camera
        * *z*: Z position of the camera
        * *targetX*: X position of the target
        * *targetY*: Y position of the target
        * *targetZ*: Z position of the target
- **getCamera**: get the current position of the camera and the target (3D skin only).
	+ **callback**: callback function receiving the camera object as parameter, as described in *updateCamera*
- **snapshot**: take a snapshot of the camera (3D skin only)
    + **callback**: callback function receiving an Image object as parameter, or null if failure (not a 3D skin)
	    
### joclyPJN plugin

Constructor options:

- **commentsInitialVisible**: whether the comments are displayed or collapsed by default (*boolean*)
- **onParsedGame**: a function to be called when a game is parsed. This is useful to make use of the game meta-tags elsewhere in the page. 
This callback receives a game object, holding a *tags* field as a map.
- **navigation**: enable navigating the moves (clicking a move update the game being played in the attached applet), default is true. 

Methods:
- **remove**: removes the widget from the page gracefully
- **load**: loads a PJN document. If there is only one game in the document (and the widget has attached an applet), it is sent to the applet automatically.
otherwise, a drop-down selector is displayed to pick a particular game
    + **pjnSource**: a string holding the PJN data
- **loadRemote**: same as *load* but the PJN is loaded from an URL. Same Origin Policy applies, so you can only retrieve files from the hosting server
	* **url**: the url to get the document from
- **attachApplet**: tell the widget which applet to work with
	* **applet**: a jQuery selector containing the applet (initied with the *jocly* plugin)

### joclyListener

Receives messages from the applets.

No constructor option.

Methods:
- **listen(msgType,handler)**: installs a listener for the given message type. The handler is called with the message as only parameter.

Supported message types:
- **display**: called whenever the applet display a new position
- **move**: called whenever a move is played in the applet


 



