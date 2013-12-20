
Jocly jQuery plugin
=========================


*jocly-embed* is a set of jQuery plugins for embedding Jocly games into any web site.

Jocly (http://jocly.com/) is a HTML5 board games platform for 2-players abstract strategy games like Chess or Checkers.
The Jocly web site allows playing against the computer, reviewing/analyzing played games and playing against other players. 
Most games display the board in 3D when WebGL is enabled on the user's device/platform, and a 2D interface is always available.

The *jquery.jocly* plugin embeds the main features of Jocly so games can be integrated into a web site with minimum effort.

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
    <div data-jocly="{game:'classic-chess',mode:'hvsc'}"></div>
  </body>
</html>
```

This opens a 