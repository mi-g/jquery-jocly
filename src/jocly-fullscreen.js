/* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this
* file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/**
* @author mig <michel.gutierrez@gmail.com>
* @module jquery-jocly
* @overview Board game site integration.
*/

(function($) {
	
	function GetFullScreenMethods() {
		var fullscreenPrefix=null;
		var fullscreenPrefixes=["","moz","webkit","o","ms"];
		var fullScreenMethods=null;
		function Uncapitalize(m) {
			return m.substr(0,1).toLowerCase() + m.substr(1);  
		}
		for(var i in fullscreenPrefixes) {
			var prefix=fullscreenPrefixes[i];
			var rfsFnt=Uncapitalize(prefix+"RequestFullScreen");
			if(typeof $("body")[0][rfsFnt] == "function") {
				fullScreenMethods={
					request: rfsFnt,
					event: prefix+"fullscreenchange",
					element: Uncapitalize(prefix+"FullScreenElement"),
				};
				switch(prefix) {
				case "webkit": 
					fullScreenMethods.element="webkitCurrentFullScreenElement";
					break;
				}
				break;
			}
		}
		return fullScreenMethods;
	}

	var self = {};
	var fullscreenMethods;
	
	self.canFullscreen = function() {
		if(fullscreenMethods===undefined)
			fullscreenMethods=GetFullScreenMethods();
		return fullscreenMethods!=null;
	};
	
	self.isFullscreen = function() {
		if(!fullscreenMethods)
			return false;
		return !!document[fullscreenMethods.element];
	};
	
	self.cancelFullscreen = function(widget,updateFnt) {
		if(!fullscreenMethods || !document[fullscreenMethods.element])
			return;
		if (document.cancelFullScreen)
			document.cancelFullScreen();
		else if (document.mozCancelFullScreen)
			document.mozCancelFullScreen();
		else if (document.webkitCancelFullScreen)
			document.webkitCancelFullScreen();
	};
	
	self.fullscreen = function(widget,updateFnt) {
		if(!self.canFullscreen())
			return;
		if(arguments.length===0 || !widget)
			widget=$("body");
		if(arguments.length<2)
			updateFnt=function(){};
		if(fullscreenMethods) {
			var fullScreenElement=document[fullscreenMethods.element];
			var originalSize={ width: widget.width(), height: widget.height() };
			$(document).bind(fullscreenMethods.event,function() {
				setTimeout(function() {
					var width, height, entering;
					if(document[fullscreenMethods.element]) {
						entering=true;
						//widget.addClass("jpz-full-size");
						width=document[fullscreenMethods.element].offsetWidth;
						height=document[fullscreenMethods.element].offsetHeight;
					} else {
						entering=false;
						//widget.removeClass("jpz-full-size");
						width=originalSize.width,
						height=originalSize.height,
						$(document).unbind(fullscreenMethods.event);
					}
					if(fullScreenElement) {
						fullScreenElement.width(width);
						fullScreenElement.height(height);
					}
					updateFnt(entering);
				},0);
			});
			widget[0][fullscreenMethods.request]();
		}
	};
	
	$.fn.joclyFullscreen = function() {
		this.each(function() {
			var $this=$(this);
			self.fullscreen($(this),function(fullscreen) {
				if($this.data('jocly-applet')) {
					var img=$this.find("img");
					var child=$this.children();
					if(fullscreen) {
						img.hide();
						child.css({
							height: "100%",
							width: "100%",
							top: 0,
							left: 0,
							position: "fixed",
						});
					} else {
						img.show();
						child.css({
							height: null,
							width: null,
							top: 0,
							left: 0,
							position: "relative",
						});
					}
				}
			});
		});
		return this;
	};
	
	
})(jQuery);

