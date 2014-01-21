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
		this.jqElm = jqElm;
		this.ready = false;
		this.queuedMessages = [];
	}
	Applet.prototype.init = function(options) {
		var $this=this;
		this.options = {
			//width : '100%',
			//height : 450,
			mode : "splash",
			maxWidth: 1000,
			ratio: 1,
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
				"frameborder", 0).attr("src", "about:blank");
		this.content = this.jqElm.html();
		this.jqElm.empty();
		
		var canvas=$("<canvas/>").attr("width",this.options.maxWidth).attr("height",this.options.maxWidth*this.options.ratio);
		var image=new Image();
		image.src = canvas[0].toDataURL("image/png");
		
		this.wrapper=$("<div/>").css({
			position: "relative",
			"white-space": "nowrap",
		}).appendTo(this.jqElm);
		
		this.wrapper.append($(image).css({
			width: "auto",
			height: "auto",
			"max-width": "100%",
			"max-height": "100%",
			"vertical-align": "bottom",
		}));

		this.iframe.attr("width","100%").attr("height","100%").css({
			position: "absolute",
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
			"white-space": "normal",
		}).appendTo(
			$("<div/>").css("padding-top",this.options.ratio*100+"%").appendTo(
				$("<div/>").css({
					position: "absolute",
					top: 0,
					bottom: 0,
					left: 0,
					right: 0,
				}).appendTo(this.wrapper)
			)
		);
		
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
		this.remove();
		this.init(options);
	}
	Applet.prototype.messageListener = function(message) {
		console.log("jocly-applet received message from iframe",message);
		switch(message.type) {
		case 'ready':
			this.ready=true;
			this.queuedMessages.forEach(function(message) {
				this.sendMessage(message);
			},this);
			this.queuedMessages=[];
			break;
		case 'display':
			if(message.initial || message.moves) {
				var crc=$.joclyCRC32(message.initial || '');
				if(message.moves)
					message.moves.forEach(function(move) {
						crc=$.joclyCRC32(move.str,crc);
					});
				$(".jocly-listener").trigger('jocly',{
					type: 'display',
					crc: crc,
				});
			} else
				$(".jocly-listener").trigger('jocly',{
					type: 'undisplay',
				});
			break;
		default:
			$(".jocly-listener").trigger('jocly',message);			
		}
	}
	Applet.prototype.sendMessage = function(message) {
		if(this.ready)
			this.iframe[0].contentWindow.postMessage(message,joclyBaseURL);
		else
			this.queuedMessages.push(message);
	}
	Applet.prototype.view = function(gameName,spec) {
		this.sendMessage({
			type: "view",
			gameName: gameName,
			data: spec,
		});
	}
	Applet.prototype.localPlay = function(gameName,spec) {
		this.sendMessage({
			type: "localPlay",
			gameName: gameName,
			data: spec || {},
		});
	}
	Applet.prototype.setFeatures = function(features) {
		this.sendMessage({
			type: "features",
			features: features,		
		});
	}
	Applet.prototype.getId = function() {
		return this.iframeId;
	}
	
	$.fn.jocly = function() {
		var $arguments = arguments;
		var retVal = this;
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
				var retVal0 = applet[method].apply(applet, Array.prototype.splice
						.call($arguments, 1));
				if(retVal0 !== undefined)
					console.log("method",method,"returns",retVal0)
			}
		});
		return retVal;
	};

	$(document).ready(function() {

		$("[data-jocly]").each(function() {
			var $this=$(this);
			$this.jocly();
			if(this.hasAttribute("data-jocly-init")) {
				var attr=$this.attr("data-jocly-init");
				if(attr.length===0)
					return;
				try {
					var arr=JSON.parse(attr);
					try {
						if(!Array.isArray(arr)) {
							console.warn("jquery.jocly: data-jocly-init attribute is not an array");				
						}
						for(var i=0;i<arr.length;i++) {
							var element=arr[i];
							if(Array.isArray(element))
								$this.jocly.apply($this,element);						
							else {
								$this.jocly.apply($this,arr);
								return;
							}
						}
					} catch(e) {
						console.warn("jquery.jocly: data-jocly-init error:",e);					
					}
				} catch(e) {
					console.warn("jquery.jocly: data-jocly-init attribute has no JSON valid value");
				}
			}
		});

	});
	
}(jQuery));


