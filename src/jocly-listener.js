/* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this
* file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/**
* @author mig <michel.gutierrez@gmail.com>
* @module jquery-jocly
* @overview Jocly applet event receiver.
*/

(function($) {
	
	function Listener(jqElm) {
		this.jqElm = jqElm;
		this.jqElm.addClass("jocly-listener");
	}
	Listener.prototype.init = function(options) {
		var $this=this;
		this.options = {
		}
		if (options)
			$.extend(this.options, options);
		this.listeners={};
		this.jqElm.bind("jocly",function(event,data) {
			var handlers=$this.listeners[data.type];
			if(handlers)
				handlers.forEach(function(handler) {
					handler.call($this.jqElm,data);
				});
		});
	}
	Listener.prototype.listen = function(type,handler) {
		if(!this.listeners[type])
			this.listeners[type]=[];
		this.listeners[type].push(handler);
	}
	Listener.prototype.remove = function(options) {
		this.listeners={};
		this.jqElm.unbind("jocly");
	}
	$.fn.joclyListener = function() {
		var $arguments = arguments;
		this.each(function() {
			var listener = $(this).data("jocly-listener");
			if (!listener) {
				listener = new Listener($(this));
				var options = null;
				listener.init(options);
				$(this).data("jocly-listener", listener);
			}
			if ($arguments.length > 0) {
				var method = $arguments[0];
				if (typeof method != "string")
					throw new Error(
							"Jocly listener: first argument must be a string specifying the method to be called");
				if (typeof listener[method] != "function")
					throw new Error("Jocly listener: no such method '"
							+ method + "'");
				listener[method].apply(listener, Array.prototype.splice
						.call($arguments, 1));
			}
		});
		return this;
	};
	
}(jQuery));


