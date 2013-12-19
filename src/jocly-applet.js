/* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this
* file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/**
* @author mig <michel.gutierrez@gmail.com>
* @module jquery-jocly
* @overview Board game site integration.
*/

(function($) {
	
	var joclyBaseURL="http://embed.jocly.net";
	var iframeIdRef = 1;

	function Applet(jqElm) {
		console.log("create applet");
		this.jqElm = jqElm;
		this.ready = false;
		this.gotoMessage = null;
	}
	Applet.prototype.init = function(options) {
		console.log("init", options)
		var $this=this;
		this.options = {
			width : 400,
			height : 450,
			mode : "splash",
		}
		if (options)
			$.extend(this.options, options);
		var iframeUrl = joclyBaseURL+"/jocly/plazza/embed";
		if(this.options.game)
			iframeUrl+="/"+this.options.game;
		iframeUrl+="?mode=" + this.options.mode;
		this.iframeId = iframeIdRef++;
		this.options.jei = this.iframeId;
		this.listener=function(event) {
			if(event.origin!=joclyBaseURL || event.data.jei!=$this.iframeId)
				return;
			$this.messageListener(event.data);
		}
		window.addEventListener("message",this.listener,false);
		var iframeName = "jocly-iframe-" + this.iframeId;
		this.iframe = $("<iframe/>").attr("name", iframeName).attr(
				"frameborder", 0).attr("width", this.options.width).attr(
				"height", this.options.height).attr("src", "about:blank");
		this.content = this.jqElm.html();
		this.jqElm.empty();
		this.iframe.appendTo(this.jqElm);
		var initForm = $("<form/>").attr("action", iframeUrl).attr("method",
				"post").attr("target", iframeName);
		$("<input/>").attr("type", "hidden").attr("name", "data").attr("value",
				JSON.stringify(this.options)).appendTo(initForm);
		initForm.appendTo($("body"));
		initForm[0].submit();
		initForm.remove();
	}
	Applet.prototype.remove = function() {
		window.removeEventListener("message",this.listener,false);
		this.jqElm.empty();
		this.jqElm.html(this.content);
		this.jqElm.data("jocly-applet", null);
	}
	Applet.prototype.update = function(options) {
		console.log("update", arguments);
		this.remove();
		this.init(options);
	}
	Applet.prototype.messageListener = function(message) {
		console.log("Received message",message);
		switch(message.type) {
		case 'ready':
			this.ready=true;
			console.log("gotoMessage",this.gotoMessage)
			if(this.gotoMessage) {
				this.sendMessage(this.gotoMessage);
				this.gotoMessage=null;
			}
			break;
		case 'display':
			var crc=$.joclyCRC32(message.initial);
			message.moves.forEach(function(move) {
				crc=$.joclyCRC32(move.str,crc);
			});
			$(document).trigger('jocly.display',{
				type: 'display',
				crc: crc,
			});
			console.log("Applet sent display message");
			break;
		}
	}
	Applet.prototype.sendMessage = function(message) {
		console.log("sendMessage",message);
		this.iframe[0].contentWindow.postMessage(message,joclyBaseURL);
	}
	Applet.prototype.goto = function(spec) {
		var message={
			type: "import",
			data: spec,
		};
		if(this.ready)
			this.sendMessage(message);
		else
			this.gotoMessage=message;
	}
	
	$.fn.jocly = function() {
		var $arguments = arguments;
		this.each(function() {
			var applet = $(this).data("jocly-applet");
			if (!applet) {
				applet = new Applet($(this));
				var options = null;
				var dataAttr = $(this).attr("data-jocly");
				if (dataAttr)
					try {
						options = eval("(" + dataAttr + ")"); // jshint ignore:line
					} catch (e) {
						console
								.error("Jocly applet: invalid data-jocly "
										+ dataAttr);
					}
				applet.init(options);
				$(this).data("jocly-applet", applet);
			}
			if ($arguments.length > 0) {
				var method = $arguments[0];
				if (typeof method != "string")
					throw new Error(
							"Jocly applet: first argument must be a string specifying the method to be called");
				if (typeof applet[method] != "function")
					throw new Error("Jocly applet: no such method '"
							+ method + "'");
				applet[method].apply(applet, Array.prototype.splice
						.call($arguments, 1));
			}
		});
		return this;
	};
	
}(jQuery));

$(document).ready(function() {

	$("[data-jocly]").each(function() {
		$(this).jocly();
	});

});

