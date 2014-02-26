if (!jQuery) {
	throw new Error("Jocly plugin requires jQuery")
}
;/* 
* Copyright (c) 2006 Andrea Ercolino      
* Released under the MIT license
* http://www.opensource.org/licenses/mit-license.php
*/

/**
* @module jquery-jocly
* @overview CRC32 calculation.
*/

(function($) {
	
		var crc32Table = 
			"00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 " +
			"0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 " +
			"1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 " +
			"136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 " +
			"3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B " +
			"35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 " +
			"26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F " +
			"2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D " +
			"76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 " +
			"7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 " +
			"6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 " +
			"65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 " +
			"4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB " +
			"4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 " +
			"5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F " +
			"5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD " +
			"EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 " +
			"E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 " +
			"F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 " +
			"FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 " +
			"D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B " +
			"D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 " +
			"CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F " +
			"C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D " +
			"9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 " +
			"95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 " +
			"86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 " +
			"88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 " +
			"A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB " +
			"AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 " +
			"BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF " +
			"B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D";     

		$.joclyCRC32 = function Crc32( str, crc ) { 
			if( crc == window.undefined ) crc = 0; 
			var n = 0;  
			var x = 0;  

			crc = crc ^ (-1); 
			for( var i = 0, iTop = str.length; i < iTop; i++ ) { 
				n = ( crc ^ str.charCodeAt( i ) ) & 0xFF; 
				x = "0x" + crc32Table.substr( n * 9, 8 ); 
				crc = ( crc >>> 8 ) ^ x; 
			} 
			return crc ^ (-1); 
		}
	
}(jQuery));

;/* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this
* file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/**
* @author mig <michel.gutierrez@gmail.com>
* @module jquery-jocly
* @overview Board game site integration.
*/

(function($) {
	
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
			baseURL: "http://embed.jocly.net",
			masked: false,
		}
		if (options)
			$.extend(this.options, options);
		var iframeUrl = this.options.baseURL+"/jocly/plazza/embed";
		if(this.options.game)
			iframeUrl+="/"+this.options.game;
		iframeUrl+="?mode=" + this.options.mode;
		this.iframeId = iframeIdRef++;
		this.options.jei = this.iframeId;
		this.listener=function(event) {
			if(event.origin!=$this.options.baseURL || event.data.jei!=$this.iframeId)
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
				
		this.container=$("<div/>").css("padding-top",this.options.ratio*100+"%").appendTo(
			$("<div/>").css({
				position: "absolute",
				top: 0,
				bottom: 0,
				left: 0,
				right: 0,
			}).appendTo(this.wrapper)
		);

		this.iframe.attr("width","100%").attr("height","100%").css({
			position: "absolute",
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
			"white-space": "normal",
		}).appendTo(this.container);
		
		this.maskElm=$("<div/>").css({
			display: this.options.masked?"block":"none",
			position: "absolute",
			top: 0,
			right: 0,
			width: "100%",
			height: "100%",
			'background-color': 'rgba(0,0,0,.8)',
			"z-index": 1,
		}).appendTo(this.wrapper);
		
		$("script[type='text/jocly-model-view']").each(function() {
			try {
				var specs=JSON.parse($(this).text());
				$this.defineGame($(this).attr("data-jocly-game"),specs);
			} catch(e) {
				console.warn("Cannot parse game specs",e);
			}
		});

		$("script[type='text/jocly-resources']").each(function() {
			try {
				var specs=JSON.parse($(this).text());
				$this.defineResources($(this).attr("data-jocly-game"),specs);
			} catch(e) {
				console.warn("Cannot parse resources specs",id,e);
			}
		});

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
		var $this=this;
		var callback,image;
		console.log("jocly-applet received",message.type,"message from iframe",message);
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
					boardState: message.boardState,
				});
			} else
				$(".jocly-listener").trigger('jocly',{
					type: 'undisplay',
				});
			break;
		case 'snapshot':
			callback=this.snapshotCallbacks[message.snapshotId];
			delete this.snapshotCallbacks[message.snapshotId];
			if(message.image) {
				image=new Image();
				image.onload=function() {
					console.log("image",image.width,"x",image.height)
					callback(image);					
				}
				image.src=message.image;
			} else
				callback(null);
			break;
		case 'camera':
			callback=this.cameraCallbacks[message.cameraId];
			delete this.cameraCallbacks[message.cameraId];
			callback(message.camera);					
			break;
		case 'requestData':
			if(message.dataType=="text")
				$.ajax({
					url: message.url,
					dataType: "html",
					success: function(data) {
						$this.sendMessage({
							type: "responseData",
							data: data,
							callbackId: message.callbackId,
						});
					},
					error: function() {
						$this.sendMessage({
							type: "responseData",
							data: null,
							callbackId: message.callbackId,
						});
					}
				});
			else if(message.dataType=="image") {
				image=new Image();
				image.onload=function() {
					var canvas = document.createElement("canvas");
					canvas.width = image.width;
					canvas.height = image.height;
					var ctx = canvas.getContext("2d");
					ctx.drawImage(image, 0, 0);
					var dataURL = canvas.toDataURL(/\.jpe?g$/.test(message.url)?"image/jpeg":"image/png");
					$this.sendMessage({
						type: "responseData",
						data: dataURL,
						callbackId: message.callbackId,
					});
				}
				image.src=message.url;
			}
			break;
		default:
			$(".jocly-listener").trigger('jocly',message);			
		}
	}
	Applet.prototype.sendMessage = function(message) {
		if(this.ready)
			this.iframe[0].contentWindow.postMessage(message,this.options.baseURL);
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
	Applet.prototype.emptyBoard = function(gameName) {
		this.sendMessage({
			type: "emptyBoard",
			gameName: gameName,
		});
	}
	Applet.prototype.viewOptions = function(options) {
		this.sendMessage({
			type: "viewOptions",
			options: options,
		});
	}
	Applet.prototype.mask = function(masked) {
		if(masked)
			this.maskElm.show();
		else
			this.maskElm.hide();
	}
	Applet.prototype.updateCamera = function(camera,delay) {
		this.sendMessage({
			type: "updateCamera",
			camera: camera,
			delay: delay,
		});
	}
	Applet.prototype.snapshotCallbacks={};
	Applet.prototype.snapshot = function(callback) {
		var snapshotId=1;
		while(snapshotId in this.snapshotCallbacks)
			snapshotId++;
		this.snapshotCallbacks[snapshotId]=callback;
		this.sendMessage({
			type: "snapshot",
			snapshotId: snapshotId,
		});
	}
	Applet.prototype.cameraCallbacks={};
	Applet.prototype.getCamera = function(callback) {
		var cameraId=1;
		while(cameraId in this.cameraCallbacks)
			cameraId++;
		this.cameraCallbacks[cameraId]=callback;
		this.sendMessage({
			type: "getCamera",
			cameraId: cameraId,
		});
	}

	Applet.prototype.defineGame = function(id,specs) {
		this.sendMessage({
			type: 'defineGame',
			id: id,
			jsonSpecs: JSON.stringify(specs),
			url: document.URL,
		});
	}
	
	Applet.prototype.defineResources = function(id,specs) {
		this.sendMessage({
			type: 'defineResources',
			id: id,
			jsonSpecs: JSON.stringify(specs),
			url: document.URL,
		});
	}
	
	Applet.prototype.setPlayers = function(players) {
		this.sendMessage({
			type: 'setPlayers',
			players: players,
		});
	}
	
	Applet.prototype.restartGame = function() {
		this.sendMessage({
			type: 'restartGame',
		});
	}
	
	Applet.prototype.takeBack = function() {
		this.sendMessage({
			type: 'takeBack',
		});
	}
	
	$.fn.jocly = function() {
		var $arguments = arguments;
		var retVal = this;
		this.each(function() {
			var applet = $(this).data("jocly-applet");
			var justCreated=false;
			if (!applet) {
				applet = new Applet($(this));
				justCreated=true;
				var options = $arguments[0] || null;
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
				if(justCreated && typeof method == "object")
					return;
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


;/* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this
* file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/**
* @author mig <michel.gutierrez@gmail.com>
* @module jquery-jocly
* @overview Utilities for Portable Jocly Notation (includes PGN and PDN).
*/

(function($) {
	
	var GameTypes={
		0: 'chess',
		20: 'draughts',
		21:	'english-draughts',
	}

	function PJN(jqElm) {
		this.jqElm = jqElm;
		this.ajaxReq = null;
		this.applets = $();
	}
	PJN.prototype.init = function(options) {
		var $this=this;
		this.options = {
			defaultGame: 'classic-chess',
			data: null,
			dataUrl: null,
			strings: {
				loadingRemote: 'Loading remote PJN ...',
				loadingError: 'Could not load remote PJN',
				parsingPJN: 'Parsing PJN ...',
				errorParsing: 'Error parsing PJN',
				vs: 'vs',
				tags: 'Tags',
				pickAGame: 'Pick a game ...',
				comment: '?',
				variation: 'V',
			},
			varClasses: ['jocly-pjn-variation-1','jocly-pjn-variation-2','jocly-pjn-variation-3'],
			commentsInitialVisible: true,
			onParsedGame: function() {},
			navigation: true,
		}
		if (options)
			$.extend(true,this.options, options);
		this.listener=function(event,data) {
			switch(data.type) {
			case 'display':
				$this.highlightMove(data);
				break;
			case 'undisplay':
				$this.unhighlightMove(data);
				break;
			}
		}
		this.jqElm.addClass("jocly-listener");
		this.jqElm.bind("jocly",this.listener);
		this.content = this.jqElm.html();
		this.jqElm.empty();
		if(this.options.data)
			this.load(this.options.data);
		else if(this.options.dataUrl)
			this.loadRemote(this.options.dataUrl);
	}
	PJN.prototype.setOptions = function(options) {
		$.extend(true,this.options,options);
	}
	PJN.prototype.remove = function() {
		this.jqElm.empty();
		this.jqElm.html(this.content);
		this.jqElm.data("jocly-pjn", null);
		this.jqElm.unbind("jocly",this.listener);
		this.jqElm.removeClass("jocly-listener");
	}
	PJN.prototype.update = function(options) {
		this.remove();
		this.init(options);
	}
	PJN.prototype.abortAjax = function() {
		if(this.ajaxReq) {
			this.ajaxReq.abort();
			this.ajaxReq=null;
		}
	}
	PJN.prototype.load = function(data) {
		this.abortAjax();
		this.parse(data);
	}
	PJN.prototype.loadRemote = function(url) {
		var $this=this;
		this.jqElm.html(this.options.strings.loadingRemote);
		this.ajaxReq = $.ajax({
			url: url,
			success: function(data) {
				$this.jqElm.empty();
				$this.parse(data);
			},
			error: function() {
				$this.jqElm.html($this.options.strings.loadingError);
				console.error("Jocly pjn: could not load PJN from "+$this.options.dataUrl);
			},
			complete: function() {
				$this.ajaxReq=null;
			}
		});
	}
	PJN.prototype.parse = function(data) {
		var $this=this;
		this.pjnData = data;
		this.jqElm.html(this.options.strings.parsingPJN);

		this.games=[];
		PJNParser.parse(data,function(game) {
			$this.games.push(game);
		},function() {
			$this.jqElm.empty();
			if($this.games.length==1) {
				$this.jqView=$("<div/>").addClass("jocly-pjn").appendTo($this.jqElm);
				var game=$this.games[0];
				var pjnGame=$this.pjnData.substr(game.offset,game.length);
				$this.parseGame(pjnGame,function() {
					$this.gotoNode($this.game.root);				
				});
			}
			else if($this.games.length>1)
				$this.buildChoice();
		},function(error) {
			$("<pre/>").text(error).addClass("jocly-pjn-error").appendTo($this.jqElm);
		},0);
	}
	PJN.prototype.buildChoice = function() {
		var $this=this;
		//this.jqElm.find("select.jocly-pjn-selector").remove();
		var select=$("<select/>").addClass("jocly-pjn-selector");
		function FormatTag(tags,name) {
			if(tags[name])
				return (/^"*(.*?)"*$/).exec(tags[name])[1];
			else
				return "?";
		}
		$("<option/>").attr("value",'').text(this.options.strings.pickAGame).appendTo(select);
		this.games.forEach(function(game,gameIndex) {
			var label=FormatTag(game.tags,'White') +' '+$this.options.strings.vs+' '+FormatTag(game.tags,'Black');
			$("<option/>").attr("value",gameIndex).text(label).appendTo(select);
		});
		select.appendTo(this.jqElm);
		this.jqView=$("<div/>").addClass("jocly-pjn").appendTo(this.jqElm);
		select.on("change",function() {
			$this.gameIndex=select.val();
			var game=$this.games[$this.gameIndex];
			var pjnGame=$this.pjnData.substr(game.offset,game.length);
			$this.jqView.text(pjnGame);
			$this.parseGame(pjnGame,function() {
				$this.gotoNode($this.game.root);				
			});
		});
	}

	PJN.prototype.parseGame = function(data,callback) {
		var $this=this;
		PJNParser.parse(data,function(game) {
			$this.game={
				tags: game.tags,
				root: game.rootNode,
			}
			$this.options.onParsedGame(game);
		},function() {
			$this.updateGameTree();
			$this.display();
			if(callback)
				callback();
		},function(error) {
			$("<pre/>").text(error).addClass("jocly-pjn-error").appendTo($this.jqElm);
			$this.game=null;
		},0);
	}
	
	PJN.prototype.updateGameTree = function() {
		function Update(node,moveIndex,side) {
			while(node) {
				if(node.move) {
					if(node.moveNumber) {
						var m=/([0-9]+) *(\.\.\.)?/.exec(node.moveNumber);
						if(m) {
							if(m[2]) {
								side=-1;
								moveIndex=parseInt(m[1])*2-1;
							} else 
								moveIndex=parseInt(m[1])*2-2;
						}
					}
					node.moveIndex=moveIndex;
					node.side=side;
					side=-side;
					moveIndex++;
				}
				if(node.variation)
					Update(node.variation,moveIndex,-side);
				node=node.next;
			}
		}
		Update(this.game.root,0,1);
	}

	PJN.prototype.makeTagsDOM = function(tags) {
		var priority={
			White: 100,
			Black: 99,
			Event: 98,
			Site: 97,
			Date: 96,
			Round: 95,
			FEN: -1,
		}
		var tagArr=[];
		for(var t in tags)
			tagArr.push({
				name: t,
				element: $("<span/>").addClass("jocly-pjn-tag")
					.append($("<span/>").addClass("jocly-pjn-tag-name").text(t))
					.append($("<span/>").addClass("jocly-pjn-tag-sep").text('='))
					.append($("<span/>").addClass("jocly-pjn-tag-value").text(/^"*(.*?)"*$/.exec(tags[t])[1])),
			});
		tagArr.sort(function(t1,t2) {
			var p1=priority[t1.name] || 0;
			var p2=priority[t2.name] || 0;
			return p2-p1;
		});
		var tagsElm=$("<span/>").addClass("jocly-pjn-tags");
		tagArr.forEach(function(tag) {
			tagsElm.append(tag.element);
		});
		return tagsElm;
	}
	
	PJN.prototype.makeNodesDOM = function(node,level,crc,prev,prevPrev) {
		var $this=this;
		function SetMoveClickHandler(elm,node) {
			if($this.options.navigation)
				elm.on("click",function() {
					$(this).addClass("jocly-pjn-pending-move");
					$this.gotoNode(node);				
				});
		}
		var start=true;
		var elm=$("<span/>").addClass("jocly-pjn-moves");
		while(node) {
			if(node.move) {
				crc=$.joclyCRC32(prevPrev,crc);
				if(node.side==1)
					elm.append($("<span/>").addClass("jocly-pjn-move-number").text((Math.floor(node.moveIndex/2)+1)+"."));
				else if(start)
					elm.append($("<span/>").addClass("jocly-pjn-move-number").text((Math.floor(node.moveIndex/2)+1)+"..."));
				var elmMove=$("<span/>").addClass("jocly-pjn-move")
					.attr("jocly-pjn-crc",$.joclyCRC32(node.move,$.joclyCRC32(prev,crc))).text(node.move);
				elm.append(elmMove);
				SetMoveClickHandler(elmMove,node);
				start=false;
				prevPrev=prev;
				prev=node.move;
			}
			if(node.comment) {
				var comment=$("<span/>").addClass("jocly-pjn-comment").text(node.comment);
				elm.append(this.makeViewToggler({
					label: this.options.strings.comment,
					show: this.options.commentsInitialVisible,
				},comment)).append(comment);
			}
			if(node.variation) {
				var variation=this.makeNodesDOM(node.variation,level+1,crc,prevPrev,"");
				variation.addClass(this.options.varClasses[level%this.options.varClasses.length]);
				elm.append(this.makeViewToggler({
					label: this.options.strings.variation,
				},variation)).append(variation);
			}
				
			node=node.next;
		}
		return elm;
	}

	PJN.prototype.makeViewToggler = function(options,child) {
		options=$.extend({
			label: '',
			openedSuff: '-',
			closedSuff: '+',
			className: '',
			show: false,
		},options);
		var state=options.show;
		function Update() {
			if(state) {
				child.show();
				elm.text(options.label+options.openedSuff);
			} else {
				child.hide();
				elm.text(options.label+options.closedSuff);				
			}
		}
		var elm=$("<span/>").addClass('jocly-pjn-toggler').on("click",function() {
			state=!state;
			Update();
		});
		Update();
		return elm;
	}

	PJN.prototype.display = function() {
		this.jqView.empty();
		var tags=this.makeTagsDOM(this.game.tags);
		this.jqView.append(this.makeViewToggler({
			label: this.options.strings.tags,
		},tags)).append(tags).append(this.makeNodesDOM(this.game.root,0,0,this.game.tags.FEN || "",""));
	}
	
	PJN.prototype.attachApplet = function(applets) {
		this.applets=this.applets.add(applets);
	}
	
	PJN.prototype.gotoNode = function(node) {
		var gameName=this.options.defaultGame;
		var spec={
			format: "pjn",
			playedMoves: [],
			tags: this.game.tags,
		}
		if(this.game.tags.JoclyGame)
			gameName=this.game.tags.JoclyGame;
		else if(this.game.tags.GameType) {
			var m=/([0-9]+)(?:,([WB]),([0-9]+),([0-9]+),[ANS][0123](,[01])?)?/.exec(this.game.tags.GameType);
			if(m)
				gameName=GameTypes[m[1]] || gameName;
		}
		var node0=node;
		node=node.prev;
		while(node) {
			if(node.move)
				spec.playedMoves.unshift(node.move);
			node=node.prev;
		}
		node=node0;
		spec.current=spec.playedMoves.length;
		if(node.move)
			spec.playMove=true;
		while(node) {
			if(node.move)
				spec.playedMoves.push(node.move);
			node=node.next;
		}
		
		if(this.game.tags.FEN)
			spec.initial=this.game.tags.FEN;
		this.applets.jocly("view",gameName,spec);
	}
	
	PJN.prototype.highlightMove = function(message) {
		this.unhighlightMove(message); 
		this.jqElm.find(".jocly-pjn-move[jocly-pjn-crc='"+message.crc+"']").addClass("jocly-pjn-current-move");
	}

	PJN.prototype.unhighlightMove = function(message) {
		this.jqElm.find(".jocly-pjn-move").removeClass("jocly-pjn-current-move jocly-pjn-pending-move");
	}

	$.fn.joclyPJN = function() {
		var $arguments = arguments;
		this.each(function() {
				var pjn = $(this).data("jocly-pjn");
				if (!pjn) {
					pjn = new PJN($(this));
					var options = null;
					var dataAttr = $(this).attr("data-jocly-pjn");
					if (dataAttr)
						try {
							options = eval("(" + dataAttr + ")"); // jshint ignore:line
						} catch (e) {
							console
									.error("Jocly pjn: invalid data-jocly-pjn "
											+ dataAttr);
						}
					else if($arguments.length > 0 && typeof $arguments[0] == "object")
						options = $arguments[0];
					pjn.init(options);
					$(this).data("jocly-pjn", pjn);
				}
				if ($arguments.length > 0) {
					var method = $arguments[0];
					if (typeof method != "string")
						return;
					if (typeof pjn[method] != "function")
						throw new Error("Jocly pjn: no such method '"
								+ method + "'");
					pjn[method].apply(pjn, Array.prototype.splice
							.call($arguments, 1));
				}
			});
		return this;
	};

	$(document).ready(function() {

		$("[data-jocly-pjn]").each(function() {
			var $this=$(this);
			$this.jocly();
			if(this.hasAttribute("data-jocly-pjn-init")) {
				var attr=$this.attr("data-jocly-pjn-init");
				if(attr.length===0)
					return;
				try {
					var arr=JSON.parse(attr);
					try {
						if(!Array.isArray(arr)) {
							console.warn("jquery.jocly: data-jocly-pjn-init attribute is not an array");				
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
						console.warn("jquery.jocly: data-jocly-pjn-init error:",e);					
					}
				} catch(e) {
					console.warn("jquery.jocly: data-jocly-pjn-init attribute has no JSON valid value");
				}
			}
		});

	});

}(jQuery));

;/* This Source Code Form is subject to the terms of the Mozilla Public
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


;/* This Source Code Form is subject to the terms of the Mozilla Public
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
						child.css("height","100%");
					} else {
						img.show();
						child.css("height",null);
					}
				}
			});
		});
		return this;
	};
	
	
})(jQuery);

;PJNParser=(function() {
;/* parser generated by jison 0.4.13 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var parser = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"PdnFile":3,"PdnFile_option0":4,"Game":5,"PdnFile_repetition0":6,"PdnFile_option1":7,"GameSeparator":8,"*":9,"GameSeparator_option0":10,"GameSeparator_repetition_plus0":11,"GameHeader":12,"Game_option0":13,"GameBody":14,"GameHeader_repetition_plus0":15,"GameBody_repetition_plus0":16,"GameMove":17,"MOVENUMBER":18,"Move":19,"GameMove_option0":20,"GameMove_option1":21,"Variation":22,"Variation1":23,"Variation2":24,"(":25,"Variation1_option0":26,")":27,"Variation2_option0":28,"PdnTag":29,"[":30,"IDENTIFIER":31,"BLANK":32,"STRING":33,"]":34,"PdnTag_option0":35,"ELLIPSE":36,"Move_option0":37,"MOVERATE":38,"Move_option1":39,"MOVECHARS":40,"Move_option2":41,"Square":42,"ALPHASQUARE":43,"NUMSQUARE":44,"COMMENT":45,"{":46,"COMMENTCHARS":47,"}":48,"COMMENT_option0":49,"COMMENTCHARS_repetition0":50,"COMMENTCHAR":51,"SAFECHAR":52,".":53,"$":54,"DQUOTE":55,"CompactResult":56,"JUSTCHARS":57,"Result":58,"Result_option0":59,"Result1":60,"Result2":61,"DOUBLEFORFEIT":62,"WIN1":63,"DRAW1":64,"LOSS1":65,"WIN2":66,"DRAW2":67,"LOSS2":68,"MOVECHARS_group0":69,"MOVECHARS2":70,"MOVECHARS2_repetition_plus0":71,"MOVECHAR":72,"LETTER":73,"IDENTIFIER_repetition0":74,"STRINGCHAR":75,"DIGIT":76,"SIGN":77,"STRING_repetition0":78,"NAG":79,"NAG_repetition_plus0":80,"NAG_option0":81,"GameSeparator_repetition_plus0_option0":82,"GameBody_repetition_plus0_group0":83,"SETUP":84,"MOVESTRENGTH":85,"IDENTIFIER_repetition0_group0":86,"$accept":0,"$end":1},
terminals_: {2:"error",9:"*",18:"MOVENUMBER",25:"(",27:")",30:"[",32:"BLANK",34:"]",38:"MOVERATE",43:"ALPHASQUARE",44:"NUMSQUARE",46:"{",48:"}",53:".",54:"$",55:"DQUOTE",57:"JUSTCHARS",62:"DOUBLEFORFEIT",63:"WIN1",64:"DRAW1",65:"LOSS1",66:"WIN2",67:"DRAW2",68:"LOSS2",73:"LETTER",76:"DIGIT",77:"SIGN",84:"SETUP",85:"MOVESTRENGTH"},
productions_: [0,[3,4],[8,2],[8,1],[5,2],[5,1],[12,1],[14,1],[17,3],[17,2],[22,2],[23,2],[24,3],[29,6],[19,2],[19,2],[19,2],[42,1],[42,1],[45,4],[47,1],[51,1],[51,1],[51,1],[51,1],[51,1],[51,1],[51,1],[51,1],[51,1],[51,1],[51,1],[51,1],[51,1],[51,1],[51,1],[58,2],[56,1],[56,1],[56,1],[60,1],[60,1],[60,1],[61,1],[61,1],[61,1],[40,2],[70,1],[72,1],[72,1],[72,1],[72,1],[72,1],[72,1],[72,1],[72,1],[31,2],[75,1],[75,1],[75,1],[75,1],[75,1],[75,1],[75,1],[75,1],[75,1],[75,1],[75,1],[75,1],[75,1],[75,1],[75,1],[52,1],[52,1],[52,1],[33,3],[79,3],[36,3],[4,0],[4,1],[6,0],[6,3],[7,0],[7,1],[10,0],[10,1],[82,0],[82,1],[11,2],[11,3],[13,0],[13,1],[15,1],[15,2],[83,1],[83,1],[83,1],[83,1],[83,1],[83,1],[16,1],[16,2],[20,0],[20,1],[21,0],[21,1],[26,0],[26,1],[28,0],[28,1],[35,0],[35,1],[37,0],[37,1],[39,0],[39,1],[41,0],[41,1],[49,0],[49,1],[50,0],[50,2],[59,0],[59,1],[69,1],[69,1],[71,1],[71,2],[86,1],[86,1],[74,0],[74,2],[78,0],[78,2],[80,1],[80,2],[81,0],[81,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 4: SaveGame(yy); 
break;
case 5: SaveGame(yy); 
break;
case 7: EndGameBody(yy); 
break;
case 8: AddMoveNumber(yy,$$[$0-2]) 
break;
case 11: StartVariation(yy); 
break;
case 13: AddTag(yy,$$[$0-4],$$[$0-2]); 
break;
case 16: AddMove(yy,$$[$0-1]); 
break;
case 19: AddComment(yy,$$[$0-2].join('').replace(/\s+/g,' ')); 
break;
case 46: this.$ = $$[$0-1] + $$[$0]; 
break;
case 47: this.$ = $$[$0].join(''); 
break;
case 56: this.$ = $$[$0-1] + $$[$0].join(''); 
break;
case 75: this.$ = $$[$0-1].join('') 
break;
case 80:this.$ = [];
break;
case 81:$$[$0-2].push($$[$0-1]);
break;
case 88:this.$ = [$$[$0-1]];
break;
case 89:$$[$0-2].push($$[$0-1]);
break;
case 92:this.$ = [$$[$0]];
break;
case 93:$$[$0-1].push($$[$0]);
break;
case 100:this.$ = [$$[$0]];
break;
case 101:$$[$0-1].push($$[$0]);
break;
case 120:this.$ = [];
break;
case 121:$$[$0-1].push($$[$0]);
break;
case 126:this.$ = [$$[$0]];
break;
case 127:$$[$0-1].push($$[$0]);
break;
case 130:this.$ = [];
break;
case 131:$$[$0-1].push($$[$0]);
break;
case 132:this.$ = [];
break;
case 133:$$[$0-1].push($$[$0]);
break;
case 134:this.$ = [$$[$0]];
break;
case 135:$$[$0-1].push($$[$0]);
break;
}
},
table: [{3:1,4:2,18:[2,78],25:[2,78],30:[2,78],32:[1,3],38:[2,78],46:[2,78],53:[2,78],54:[2,78],57:[2,78],73:[2,78],76:[2,78],77:[2,78],84:[2,78]},{1:[3]},{5:4,12:5,14:6,15:7,16:8,17:12,18:[1,17],19:18,22:13,23:19,25:[1,25],29:9,30:[1,11],36:22,38:[1,23],40:24,45:14,46:[1,20],52:28,53:[1,26],54:[1,21],57:[1,29],69:27,73:[1,30],76:[1,31],77:[1,32],79:16,83:10,84:[1,15]},{18:[2,79],25:[2,79],30:[2,79],38:[2,79],46:[2,79],53:[2,79],54:[2,79],57:[2,79],73:[2,79],76:[2,79],77:[2,79],84:[2,79]},{1:[2,80],6:33,9:[2,80],62:[2,80],63:[2,80],64:[2,80],65:[2,80],66:[2,80],67:[2,80],68:[2,80]},{1:[2,90],9:[2,90],13:34,14:35,16:8,17:12,18:[1,17],19:18,22:13,23:19,25:[1,25],36:22,38:[1,23],40:24,45:14,46:[1,20],52:28,53:[1,26],54:[1,21],57:[1,29],62:[2,90],63:[2,90],64:[2,90],65:[2,90],66:[2,90],67:[2,90],68:[2,90],69:27,73:[1,30],76:[1,31],77:[1,32],79:16,83:10,84:[1,15]},{1:[2,5],9:[2,5],62:[2,5],63:[2,5],64:[2,5],65:[2,5],66:[2,5],67:[2,5],68:[2,5]},{1:[2,6],9:[2,6],18:[2,6],25:[2,6],29:36,30:[1,11],38:[2,6],46:[2,6],53:[2,6],54:[2,6],57:[2,6],62:[2,6],63:[2,6],64:[2,6],65:[2,6],66:[2,6],67:[2,6],68:[2,6],73:[2,6],76:[2,6],77:[2,6],84:[2,6]},{1:[2,7],9:[2,7],17:12,18:[1,17],19:18,22:13,23:19,25:[1,25],27:[2,7],36:22,38:[1,23],40:24,45:14,46:[1,20],52:28,53:[1,26],54:[1,21],57:[1,29],62:[2,7],63:[2,7],64:[2,7],65:[2,7],66:[2,7],67:[2,7],68:[2,7],69:27,73:[1,30],76:[1,31],77:[1,32],79:16,83:37,84:[1,15]},{1:[2,92],9:[2,92],18:[2,92],25:[2,92],30:[2,92],38:[2,92],46:[2,92],53:[2,92],54:[2,92],57:[2,92],62:[2,92],63:[2,92],64:[2,92],65:[2,92],66:[2,92],67:[2,92],68:[2,92],73:[2,92],76:[2,92],77:[2,92],84:[2,92]},{1:[2,100],9:[2,100],18:[2,100],25:[2,100],27:[2,100],38:[2,100],46:[2,100],53:[2,100],54:[2,100],57:[2,100],62:[2,100],63:[2,100],64:[2,100],65:[2,100],66:[2,100],67:[2,100],68:[2,100],73:[2,100],76:[2,100],77:[2,100],84:[2,100]},{31:38,73:[1,39]},{1:[2,94],9:[2,94],18:[2,94],25:[2,94],27:[2,94],38:[2,94],46:[2,94],53:[2,94],54:[2,94],57:[2,94],62:[2,94],63:[2,94],64:[2,94],65:[2,94],66:[2,94],67:[2,94],68:[2,94],73:[2,94],76:[2,94],77:[2,94],84:[2,94]},{1:[2,95],9:[2,95],18:[2,95],25:[2,95],27:[2,95],38:[2,95],46:[2,95],53:[2,95],54:[2,95],57:[2,95],62:[2,95],63:[2,95],64:[2,95],65:[2,95],66:[2,95],67:[2,95],68:[2,95],73:[2,95],76:[2,95],77:[2,95],84:[2,95]},{1:[2,96],9:[2,96],18:[2,96],25:[2,96],27:[2,96],38:[2,96],46:[2,96],53:[2,96],54:[2,96],57:[2,96],62:[2,96],63:[2,96],64:[2,96],65:[2,96],66:[2,96],67:[2,96],68:[2,96],73:[2,96],76:[2,96],77:[2,96],84:[2,96]},{1:[2,97],9:[2,97],18:[2,97],25:[2,97],27:[2,97],38:[2,97],46:[2,97],53:[2,97],54:[2,97],57:[2,97],62:[2,97],63:[2,97],64:[2,97],65:[2,97],66:[2,97],67:[2,97],68:[2,97],73:[2,97],76:[2,97],77:[2,97],84:[2,97]},{1:[2,98],9:[2,98],18:[2,98],25:[2,98],27:[2,98],38:[2,98],46:[2,98],53:[2,98],54:[2,98],57:[2,98],62:[2,98],63:[2,98],64:[2,98],65:[2,98],66:[2,98],67:[2,98],68:[2,98],73:[2,98],76:[2,98],77:[2,98],84:[2,98]},{1:[2,99],9:[2,99],18:[2,99],19:40,25:[2,99],27:[2,99],36:22,38:[1,23],40:24,46:[2,99],52:28,53:[1,26],54:[2,99],57:[1,29],62:[2,99],63:[2,99],64:[2,99],65:[2,99],66:[2,99],67:[2,99],68:[2,99],69:27,73:[1,30],76:[1,31],77:[1,32],84:[2,99]},{1:[2,104],9:[2,104],18:[2,104],21:41,25:[2,104],27:[2,104],38:[2,104],46:[2,104],53:[2,104],54:[2,104],57:[2,104],62:[2,104],63:[2,104],64:[2,104],65:[2,104],66:[2,104],67:[2,104],68:[2,104],73:[2,104],76:[2,104],77:[2,104],84:[2,104],85:[1,42]},{14:44,16:8,17:12,18:[1,17],19:18,22:13,23:19,24:43,25:[1,25],36:22,38:[1,23],40:24,45:14,46:[1,20],52:28,53:[1,26],54:[1,21],57:[1,29],69:27,73:[1,30],76:[1,31],77:[1,32],79:16,83:10,84:[1,15]},{9:[2,120],18:[2,120],25:[2,120],27:[2,120],30:[2,120],32:[2,120],34:[2,120],38:[2,120],46:[2,120],47:45,48:[2,120],50:46,53:[2,120],54:[2,120],55:[2,120],57:[2,120],62:[2,120],63:[2,120],64:[2,120],65:[2,120],66:[2,120],67:[2,120],68:[2,120],73:[2,120],76:[2,120],77:[2,120]},{76:[1,48],80:47},{1:[2,112],9:[2,112],18:[2,112],25:[2,112],27:[2,112],32:[1,50],37:49,38:[2,112],46:[2,112],53:[2,112],54:[2,112],57:[2,112],62:[2,112],63:[2,112],64:[2,112],65:[2,112],66:[2,112],67:[2,112],68:[2,112],73:[2,112],76:[2,112],77:[2,112],84:[2,112],85:[2,112]},{1:[2,114],9:[2,114],18:[2,114],25:[2,114],27:[2,114],32:[1,52],38:[2,114],39:51,46:[2,114],53:[2,114],54:[2,114],57:[2,114],62:[2,114],63:[2,114],64:[2,114],65:[2,114],66:[2,114],67:[2,114],68:[2,114],73:[2,114],76:[2,114],77:[2,114],84:[2,114],85:[2,114]},{1:[2,116],9:[2,116],18:[2,116],25:[2,116],27:[2,116],32:[1,54],38:[2,116],41:53,46:[2,116],53:[2,116],54:[2,116],57:[2,116],62:[2,116],63:[2,116],64:[2,116],65:[2,116],66:[2,116],67:[2,116],68:[2,116],73:[2,116],76:[2,116],77:[2,116],84:[2,116],85:[2,116]},{18:[2,106],25:[2,106],26:55,32:[1,56],38:[2,106],46:[2,106],53:[2,106],54:[2,106],57:[2,106],73:[2,106],76:[2,106],77:[2,106],84:[2,106]},{53:[1,57]},{9:[1,62],18:[1,66],38:[1,65],52:61,53:[1,63],54:[1,64],56:67,57:[1,68],60:69,61:70,62:[1,71],63:[1,72],64:[1,73],65:[1,74],66:[1,75],67:[1,76],68:[1,77],70:58,71:59,72:60,73:[1,30],76:[1,31],77:[1,32]},{9:[2,124],18:[2,124],38:[2,124],53:[2,124],54:[2,124],57:[2,124],62:[2,124],63:[2,124],64:[2,124],65:[2,124],66:[2,124],67:[2,124],68:[2,124],73:[2,124],76:[2,124],77:[2,124]},{9:[2,125],18:[2,125],38:[2,125],53:[2,125],54:[2,125],57:[2,125],62:[2,125],63:[2,125],64:[2,125],65:[2,125],66:[2,125],67:[2,125],68:[2,125],73:[2,125],76:[2,125],77:[2,125]},{1:[2,72],9:[2,72],18:[2,72],25:[2,72],27:[2,72],30:[2,72],32:[2,72],34:[2,72],38:[2,72],46:[2,72],48:[2,72],53:[2,72],54:[2,72],55:[2,72],57:[2,72],62:[2,72],63:[2,72],64:[2,72],65:[2,72],66:[2,72],67:[2,72],68:[2,72],73:[2,72],76:[2,72],77:[2,72],84:[2,72],85:[2,72]},{1:[2,73],9:[2,73],18:[2,73],25:[2,73],27:[2,73],30:[2,73],32:[2,73],34:[2,73],38:[2,73],46:[2,73],48:[2,73],53:[2,73],54:[2,73],55:[2,73],57:[2,73],62:[2,73],63:[2,73],64:[2,73],65:[2,73],66:[2,73],67:[2,73],68:[2,73],73:[2,73],76:[2,73],77:[2,73],84:[2,73],85:[2,73]},{1:[2,74],9:[2,74],18:[2,74],25:[2,74],27:[2,74],30:[2,74],32:[2,74],34:[2,74],38:[2,74],46:[2,74],48:[2,74],53:[2,74],54:[2,74],55:[2,74],57:[2,74],62:[2,74],63:[2,74],64:[2,74],65:[2,74],66:[2,74],67:[2,74],68:[2,74],73:[2,74],76:[2,74],77:[2,74],84:[2,74],85:[2,74]},{1:[2,82],7:78,8:79,9:[1,80],11:81,56:83,58:82,60:69,61:70,62:[1,71],63:[1,72],64:[1,73],65:[1,74],66:[1,75],67:[1,76],68:[1,77]},{1:[2,4],9:[2,4],62:[2,4],63:[2,4],64:[2,4],65:[2,4],66:[2,4],67:[2,4],68:[2,4]},{1:[2,91],9:[2,91],62:[2,91],63:[2,91],64:[2,91],65:[2,91],66:[2,91],67:[2,91],68:[2,91]},{1:[2,93],9:[2,93],18:[2,93],25:[2,93],30:[2,93],38:[2,93],46:[2,93],53:[2,93],54:[2,93],57:[2,93],62:[2,93],63:[2,93],64:[2,93],65:[2,93],66:[2,93],67:[2,93],68:[2,93],73:[2,93],76:[2,93],77:[2,93],84:[2,93]},{1:[2,101],9:[2,101],18:[2,101],25:[2,101],27:[2,101],38:[2,101],46:[2,101],53:[2,101],54:[2,101],57:[2,101],62:[2,101],63:[2,101],64:[2,101],65:[2,101],66:[2,101],67:[2,101],68:[2,101],73:[2,101],76:[2,101],77:[2,101],84:[2,101]},{32:[1,84]},{32:[2,130],73:[2,130],74:85,76:[2,130]},{1:[2,102],9:[2,102],18:[2,102],20:86,25:[2,102],27:[2,102],38:[2,102],46:[2,102],53:[2,102],54:[2,102],57:[2,102],62:[2,102],63:[2,102],64:[2,102],65:[2,102],66:[2,102],67:[2,102],68:[2,102],73:[2,102],76:[2,102],77:[2,102],84:[2,102],85:[1,87]},{1:[2,9],9:[2,9],18:[2,9],25:[2,9],27:[2,9],38:[2,9],46:[2,9],53:[2,9],54:[2,9],57:[2,9],62:[2,9],63:[2,9],64:[2,9],65:[2,9],66:[2,9],67:[2,9],68:[2,9],73:[2,9],76:[2,9],77:[2,9],84:[2,9]},{1:[2,105],9:[2,105],18:[2,105],25:[2,105],27:[2,105],38:[2,105],46:[2,105],53:[2,105],54:[2,105],57:[2,105],62:[2,105],63:[2,105],64:[2,105],65:[2,105],66:[2,105],67:[2,105],68:[2,105],73:[2,105],76:[2,105],77:[2,105],84:[2,105]},{1:[2,10],9:[2,10],18:[2,10],25:[2,10],27:[2,10],38:[2,10],46:[2,10],53:[2,10],54:[2,10],57:[2,10],62:[2,10],63:[2,10],64:[2,10],65:[2,10],66:[2,10],67:[2,10],68:[2,10],73:[2,10],76:[2,10],77:[2,10],84:[2,10]},{27:[1,88]},{48:[1,89]},{9:[1,99],18:[1,103],25:[1,95],27:[1,96],30:[1,97],32:[1,92],34:[1,98],38:[1,102],46:[1,91],48:[2,20],51:90,52:93,53:[1,94],54:[1,100],55:[1,101],56:104,57:[1,105],60:69,61:70,62:[1,71],63:[1,72],64:[1,73],65:[1,74],66:[1,75],67:[1,76],68:[1,77],73:[1,30],76:[1,31],77:[1,32]},{1:[2,136],9:[2,136],18:[2,136],25:[2,136],27:[2,136],32:[1,108],38:[2,136],46:[2,136],53:[2,136],54:[2,136],57:[2,136],62:[2,136],63:[2,136],64:[2,136],65:[2,136],66:[2,136],67:[2,136],68:[2,136],73:[2,136],76:[1,107],77:[2,136],81:106,84:[2,136]},{1:[2,134],9:[2,134],18:[2,134],25:[2,134],27:[2,134],32:[2,134],38:[2,134],46:[2,134],53:[2,134],54:[2,134],57:[2,134],62:[2,134],63:[2,134],64:[2,134],65:[2,134],66:[2,134],67:[2,134],68:[2,134],73:[2,134],76:[2,134],77:[2,134],84:[2,134]},{1:[2,14],9:[2,14],18:[2,14],25:[2,14],27:[2,14],38:[2,14],46:[2,14],53:[2,14],54:[2,14],57:[2,14],62:[2,14],63:[2,14],64:[2,14],65:[2,14],66:[2,14],67:[2,14],68:[2,14],73:[2,14],76:[2,14],77:[2,14],84:[2,14],85:[2,14]},{1:[2,113],9:[2,113],18:[2,113],25:[2,113],27:[2,113],38:[2,113],46:[2,113],53:[2,113],54:[2,113],57:[2,113],62:[2,113],63:[2,113],64:[2,113],65:[2,113],66:[2,113],67:[2,113],68:[2,113],73:[2,113],76:[2,113],77:[2,113],84:[2,113],85:[2,113]},{1:[2,15],9:[2,15],18:[2,15],25:[2,15],27:[2,15],38:[2,15],46:[2,15],53:[2,15],54:[2,15],57:[2,15],62:[2,15],63:[2,15],64:[2,15],65:[2,15],66:[2,15],67:[2,15],68:[2,15],73:[2,15],76:[2,15],77:[2,15],84:[2,15],85:[2,15]},{1:[2,115],9:[2,115],18:[2,115],25:[2,115],27:[2,115],38:[2,115],46:[2,115],53:[2,115],54:[2,115],57:[2,115],62:[2,115],63:[2,115],64:[2,115],65:[2,115],66:[2,115],67:[2,115],68:[2,115],73:[2,115],76:[2,115],77:[2,115],84:[2,115],85:[2,115]},{1:[2,16],9:[2,16],18:[2,16],25:[2,16],27:[2,16],38:[2,16],46:[2,16],53:[2,16],54:[2,16],57:[2,16],62:[2,16],63:[2,16],64:[2,16],65:[2,16],66:[2,16],67:[2,16],68:[2,16],73:[2,16],76:[2,16],77:[2,16],84:[2,16],85:[2,16]},{1:[2,117],9:[2,117],18:[2,117],25:[2,117],27:[2,117],38:[2,117],46:[2,117],53:[2,117],54:[2,117],57:[2,117],62:[2,117],63:[2,117],64:[2,117],65:[2,117],66:[2,117],67:[2,117],68:[2,117],73:[2,117],76:[2,117],77:[2,117],84:[2,117],85:[2,117]},{18:[2,11],25:[2,11],38:[2,11],46:[2,11],53:[2,11],54:[2,11],57:[2,11],73:[2,11],76:[2,11],77:[2,11],84:[2,11]},{18:[2,107],25:[2,107],38:[2,107],46:[2,107],53:[2,107],54:[2,107],57:[2,107],73:[2,107],76:[2,107],77:[2,107],84:[2,107]},{53:[1,109]},{1:[2,46],9:[2,46],18:[2,46],25:[2,46],27:[2,46],32:[2,46],38:[2,46],46:[2,46],53:[2,46],54:[2,46],57:[2,46],62:[2,46],63:[2,46],64:[2,46],65:[2,46],66:[2,46],67:[2,46],68:[2,46],73:[2,46],76:[2,46],77:[2,46],84:[2,46],85:[2,46]},{1:[2,47],9:[1,62],18:[1,66],25:[2,47],27:[2,47],32:[2,47],38:[1,65],46:[2,47],52:61,53:[1,63],54:[1,64],56:67,57:[1,68],60:69,61:70,62:[1,71],63:[1,72],64:[1,73],65:[1,74],66:[1,75],67:[1,76],68:[1,77],72:110,73:[1,30],76:[1,31],77:[1,32],84:[2,47],85:[2,47]},{1:[2,126],9:[2,126],18:[2,126],25:[2,126],27:[2,126],32:[2,126],38:[2,126],46:[2,126],53:[2,126],54:[2,126],57:[2,126],62:[2,126],63:[2,126],64:[2,126],65:[2,126],66:[2,126],67:[2,126],68:[2,126],73:[2,126],76:[2,126],77:[2,126],84:[2,126],85:[2,126]},{1:[2,48],9:[2,48],18:[2,48],25:[2,48],27:[2,48],32:[2,48],38:[2,48],46:[2,48],53:[2,48],54:[2,48],57:[2,48],62:[2,48],63:[2,48],64:[2,48],65:[2,48],66:[2,48],67:[2,48],68:[2,48],73:[2,48],76:[2,48],77:[2,48],84:[2,48],85:[2,48]},{1:[2,49],9:[2,49],18:[2,49],25:[2,49],27:[2,49],32:[2,49],38:[2,49],46:[2,49],53:[2,49],54:[2,49],57:[2,49],62:[2,49],63:[2,49],64:[2,49],65:[2,49],66:[2,49],67:[2,49],68:[2,49],73:[2,49],76:[2,49],77:[2,49],84:[2,49],85:[2,49]},{1:[2,50],9:[2,50],18:[2,50],25:[2,50],27:[2,50],32:[2,50],38:[2,50],46:[2,50],53:[2,50],54:[2,50],57:[2,50],62:[2,50],63:[2,50],64:[2,50],65:[2,50],66:[2,50],67:[2,50],68:[2,50],73:[2,50],76:[2,50],77:[2,50],84:[2,50],85:[2,50]},{1:[2,51],9:[2,51],18:[2,51],25:[2,51],27:[2,51],32:[2,51],38:[2,51],46:[2,51],53:[2,51],54:[2,51],57:[2,51],62:[2,51],63:[2,51],64:[2,51],65:[2,51],66:[2,51],67:[2,51],68:[2,51],73:[2,51],76:[2,51],77:[2,51],84:[2,51],85:[2,51]},{1:[2,52],9:[2,52],18:[2,52],25:[2,52],27:[2,52],32:[2,52],38:[2,52],46:[2,52],53:[2,52],54:[2,52],57:[2,52],62:[2,52],63:[2,52],64:[2,52],65:[2,52],66:[2,52],67:[2,52],68:[2,52],73:[2,52],76:[2,52],77:[2,52],84:[2,52],85:[2,52]},{1:[2,53],9:[2,53],18:[2,53],25:[2,53],27:[2,53],32:[2,53],38:[2,53],46:[2,53],53:[2,53],54:[2,53],57:[2,53],62:[2,53],63:[2,53],64:[2,53],65:[2,53],66:[2,53],67:[2,53],68:[2,53],73:[2,53],76:[2,53],77:[2,53],84:[2,53],85:[2,53]},{1:[2,54],9:[2,54],18:[2,54],25:[2,54],27:[2,54],32:[2,54],38:[2,54],46:[2,54],53:[2,54],54:[2,54],57:[2,54],62:[2,54],63:[2,54],64:[2,54],65:[2,54],66:[2,54],67:[2,54],68:[2,54],73:[2,54],76:[2,54],77:[2,54],84:[2,54],85:[2,54]},{1:[2,55],9:[2,55],18:[2,55],25:[2,55],27:[2,55],32:[2,55],38:[2,55],46:[2,55],53:[2,55],54:[2,55],57:[2,55],62:[2,55],63:[2,55],64:[2,55],65:[2,55],66:[2,55],67:[2,55],68:[2,55],73:[2,55],76:[2,55],77:[2,55],84:[2,55],85:[2,55]},{1:[2,37],9:[2,37],18:[2,37],25:[2,37],27:[2,37],30:[2,37],32:[2,37],34:[2,37],38:[2,37],46:[2,37],48:[2,37],53:[2,37],54:[2,37],55:[2,37],57:[2,37],62:[2,37],63:[2,37],64:[2,37],65:[2,37],66:[2,37],67:[2,37],68:[2,37],73:[2,37],76:[2,37],77:[2,37],84:[2,37],85:[2,37]},{1:[2,38],9:[2,38],18:[2,38],25:[2,38],27:[2,38],30:[2,38],32:[2,38],34:[2,38],38:[2,38],46:[2,38],48:[2,38],53:[2,38],54:[2,38],55:[2,38],57:[2,38],62:[2,38],63:[2,38],64:[2,38],65:[2,38],66:[2,38],67:[2,38],68:[2,38],73:[2,38],76:[2,38],77:[2,38],84:[2,38],85:[2,38]},{1:[2,39],9:[2,39],18:[2,39],25:[2,39],27:[2,39],30:[2,39],32:[2,39],34:[2,39],38:[2,39],46:[2,39],48:[2,39],53:[2,39],54:[2,39],55:[2,39],57:[2,39],62:[2,39],63:[2,39],64:[2,39],65:[2,39],66:[2,39],67:[2,39],68:[2,39],73:[2,39],76:[2,39],77:[2,39],84:[2,39],85:[2,39]},{1:[2,40],9:[2,40],18:[2,40],25:[2,40],27:[2,40],30:[2,40],32:[2,40],34:[2,40],38:[2,40],46:[2,40],48:[2,40],53:[2,40],54:[2,40],55:[2,40],57:[2,40],62:[2,40],63:[2,40],64:[2,40],65:[2,40],66:[2,40],67:[2,40],68:[2,40],73:[2,40],76:[2,40],77:[2,40],84:[2,40],85:[2,40]},{1:[2,41],9:[2,41],18:[2,41],25:[2,41],27:[2,41],30:[2,41],32:[2,41],34:[2,41],38:[2,41],46:[2,41],48:[2,41],53:[2,41],54:[2,41],55:[2,41],57:[2,41],62:[2,41],63:[2,41],64:[2,41],65:[2,41],66:[2,41],67:[2,41],68:[2,41],73:[2,41],76:[2,41],77:[2,41],84:[2,41],85:[2,41]},{1:[2,42],9:[2,42],18:[2,42],25:[2,42],27:[2,42],30:[2,42],32:[2,42],34:[2,42],38:[2,42],46:[2,42],48:[2,42],53:[2,42],54:[2,42],55:[2,42],57:[2,42],62:[2,42],63:[2,42],64:[2,42],65:[2,42],66:[2,42],67:[2,42],68:[2,42],73:[2,42],76:[2,42],77:[2,42],84:[2,42],85:[2,42]},{1:[2,43],9:[2,43],18:[2,43],25:[2,43],27:[2,43],30:[2,43],32:[2,43],34:[2,43],38:[2,43],46:[2,43],48:[2,43],53:[2,43],54:[2,43],55:[2,43],57:[2,43],62:[2,43],63:[2,43],64:[2,43],65:[2,43],66:[2,43],67:[2,43],68:[2,43],73:[2,43],76:[2,43],77:[2,43],84:[2,43],85:[2,43]},{1:[2,44],9:[2,44],18:[2,44],25:[2,44],27:[2,44],30:[2,44],32:[2,44],34:[2,44],38:[2,44],46:[2,44],48:[2,44],53:[2,44],54:[2,44],55:[2,44],57:[2,44],62:[2,44],63:[2,44],64:[2,44],65:[2,44],66:[2,44],67:[2,44],68:[2,44],73:[2,44],76:[2,44],77:[2,44],84:[2,44],85:[2,44]},{1:[2,45],9:[2,45],18:[2,45],25:[2,45],27:[2,45],30:[2,45],32:[2,45],34:[2,45],38:[2,45],46:[2,45],48:[2,45],53:[2,45],54:[2,45],55:[2,45],57:[2,45],62:[2,45],63:[2,45],64:[2,45],65:[2,45],66:[2,45],67:[2,45],68:[2,45],73:[2,45],76:[2,45],77:[2,45],84:[2,45],85:[2,45]},{1:[2,1]},{1:[2,83],5:111,12:5,14:6,15:7,16:8,17:12,18:[1,17],19:18,22:13,23:19,25:[1,25],29:9,30:[1,11],36:22,38:[1,23],40:24,45:14,46:[1,20],52:28,53:[1,26],54:[1,21],57:[1,29],69:27,73:[1,30],76:[1,31],77:[1,32],79:16,83:10,84:[1,15]},{1:[2,84],10:112,18:[2,84],25:[2,84],30:[2,84],32:[1,113],38:[2,84],46:[2,84],53:[2,84],54:[2,84],57:[2,84],73:[2,84],76:[2,84],77:[2,84],84:[2,84]},{1:[2,3],18:[2,3],25:[2,3],30:[2,3],38:[2,3],46:[2,3],53:[2,3],54:[2,3],56:83,57:[2,3],58:114,60:69,61:70,62:[1,71],63:[1,72],64:[1,73],65:[1,74],66:[1,75],67:[1,76],68:[1,77],73:[2,3],76:[2,3],77:[2,3],84:[2,3]},{1:[2,86],18:[2,86],25:[2,86],30:[2,86],32:[1,116],38:[2,86],46:[2,86],53:[2,86],54:[2,86],57:[2,86],62:[2,86],63:[2,86],64:[2,86],65:[2,86],66:[2,86],67:[2,86],68:[2,86],73:[2,86],76:[2,86],77:[2,86],82:115,84:[2,86]},{1:[2,122],18:[2,122],25:[2,122],30:[2,122],32:[1,118],38:[2,122],46:[2,122],53:[2,122],54:[2,122],57:[2,122],59:117,62:[2,122],63:[2,122],64:[2,122],65:[2,122],66:[2,122],67:[2,122],68:[2,122],73:[2,122],76:[2,122],77:[2,122],84:[2,122]},{33:119,55:[1,120]},{32:[2,56],73:[1,122],76:[1,123],86:121},{1:[2,8],9:[2,8],18:[2,8],25:[2,8],27:[2,8],38:[2,8],46:[2,8],53:[2,8],54:[2,8],57:[2,8],62:[2,8],63:[2,8],64:[2,8],65:[2,8],66:[2,8],67:[2,8],68:[2,8],73:[2,8],76:[2,8],77:[2,8],84:[2,8]},{1:[2,103],9:[2,103],18:[2,103],25:[2,103],27:[2,103],38:[2,103],46:[2,103],53:[2,103],54:[2,103],57:[2,103],62:[2,103],63:[2,103],64:[2,103],65:[2,103],66:[2,103],67:[2,103],68:[2,103],73:[2,103],76:[2,103],77:[2,103],84:[2,103]},{1:[2,108],9:[2,108],18:[2,108],25:[2,108],27:[2,108],28:124,32:[1,125],38:[2,108],46:[2,108],53:[2,108],54:[2,108],57:[2,108],62:[2,108],63:[2,108],64:[2,108],65:[2,108],66:[2,108],67:[2,108],68:[2,108],73:[2,108],76:[2,108],77:[2,108],84:[2,108]},{1:[2,118],9:[2,118],18:[2,118],25:[2,118],27:[2,118],32:[1,127],38:[2,118],46:[2,118],49:126,53:[2,118],54:[2,118],57:[2,118],62:[2,118],63:[2,118],64:[2,118],65:[2,118],66:[2,118],67:[2,118],68:[2,118],73:[2,118],76:[2,118],77:[2,118],84:[2,118]},{9:[2,121],18:[2,121],25:[2,121],27:[2,121],30:[2,121],32:[2,121],34:[2,121],38:[2,121],46:[2,121],48:[2,121],53:[2,121],54:[2,121],55:[2,121],57:[2,121],62:[2,121],63:[2,121],64:[2,121],65:[2,121],66:[2,121],67:[2,121],68:[2,121],73:[2,121],76:[2,121],77:[2,121]},{9:[2,21],18:[2,21],25:[2,21],27:[2,21],30:[2,21],32:[2,21],34:[2,21],38:[2,21],46:[2,21],48:[2,21],53:[2,21],54:[2,21],55:[2,21],57:[2,21],62:[2,21],63:[2,21],64:[2,21],65:[2,21],66:[2,21],67:[2,21],68:[2,21],73:[2,21],76:[2,21],77:[2,21]},{9:[2,22],18:[2,22],25:[2,22],27:[2,22],30:[2,22],32:[2,22],34:[2,22],38:[2,22],46:[2,22],48:[2,22],53:[2,22],54:[2,22],55:[2,22],57:[2,22],62:[2,22],63:[2,22],64:[2,22],65:[2,22],66:[2,22],67:[2,22],68:[2,22],73:[2,22],76:[2,22],77:[2,22]},{9:[2,23],18:[2,23],25:[2,23],27:[2,23],30:[2,23],32:[2,23],34:[2,23],38:[2,23],46:[2,23],48:[2,23],53:[2,23],54:[2,23],55:[2,23],57:[2,23],62:[2,23],63:[2,23],64:[2,23],65:[2,23],66:[2,23],67:[2,23],68:[2,23],73:[2,23],76:[2,23],77:[2,23]},{9:[2,24],18:[2,24],25:[2,24],27:[2,24],30:[2,24],32:[2,24],34:[2,24],38:[2,24],46:[2,24],48:[2,24],53:[2,24],54:[2,24],55:[2,24],57:[2,24],62:[2,24],63:[2,24],64:[2,24],65:[2,24],66:[2,24],67:[2,24],68:[2,24],73:[2,24],76:[2,24],77:[2,24]},{9:[2,25],18:[2,25],25:[2,25],27:[2,25],30:[2,25],32:[2,25],34:[2,25],38:[2,25],46:[2,25],48:[2,25],53:[2,25],54:[2,25],55:[2,25],57:[2,25],62:[2,25],63:[2,25],64:[2,25],65:[2,25],66:[2,25],67:[2,25],68:[2,25],73:[2,25],76:[2,25],77:[2,25]},{9:[2,26],18:[2,26],25:[2,26],27:[2,26],30:[2,26],32:[2,26],34:[2,26],38:[2,26],46:[2,26],48:[2,26],53:[2,26],54:[2,26],55:[2,26],57:[2,26],62:[2,26],63:[2,26],64:[2,26],65:[2,26],66:[2,26],67:[2,26],68:[2,26],73:[2,26],76:[2,26],77:[2,26]},{9:[2,27],18:[2,27],25:[2,27],27:[2,27],30:[2,27],32:[2,27],34:[2,27],38:[2,27],46:[2,27],48:[2,27],53:[2,27],54:[2,27],55:[2,27],57:[2,27],62:[2,27],63:[2,27],64:[2,27],65:[2,27],66:[2,27],67:[2,27],68:[2,27],73:[2,27],76:[2,27],77:[2,27]},{9:[2,28],18:[2,28],25:[2,28],27:[2,28],30:[2,28],32:[2,28],34:[2,28],38:[2,28],46:[2,28],48:[2,28],53:[2,28],54:[2,28],55:[2,28],57:[2,28],62:[2,28],63:[2,28],64:[2,28],65:[2,28],66:[2,28],67:[2,28],68:[2,28],73:[2,28],76:[2,28],77:[2,28]},{9:[2,29],18:[2,29],25:[2,29],27:[2,29],30:[2,29],32:[2,29],34:[2,29],38:[2,29],46:[2,29],48:[2,29],53:[2,29],54:[2,29],55:[2,29],57:[2,29],62:[2,29],63:[2,29],64:[2,29],65:[2,29],66:[2,29],67:[2,29],68:[2,29],73:[2,29],76:[2,29],77:[2,29]},{9:[2,30],18:[2,30],25:[2,30],27:[2,30],30:[2,30],32:[2,30],34:[2,30],38:[2,30],46:[2,30],48:[2,30],53:[2,30],54:[2,30],55:[2,30],57:[2,30],62:[2,30],63:[2,30],64:[2,30],65:[2,30],66:[2,30],67:[2,30],68:[2,30],73:[2,30],76:[2,30],77:[2,30]},{9:[2,31],18:[2,31],25:[2,31],27:[2,31],30:[2,31],32:[2,31],34:[2,31],38:[2,31],46:[2,31],48:[2,31],53:[2,31],54:[2,31],55:[2,31],57:[2,31],62:[2,31],63:[2,31],64:[2,31],65:[2,31],66:[2,31],67:[2,31],68:[2,31],73:[2,31],76:[2,31],77:[2,31]},{9:[2,32],18:[2,32],25:[2,32],27:[2,32],30:[2,32],32:[2,32],34:[2,32],38:[2,32],46:[2,32],48:[2,32],53:[2,32],54:[2,32],55:[2,32],57:[2,32],62:[2,32],63:[2,32],64:[2,32],65:[2,32],66:[2,32],67:[2,32],68:[2,32],73:[2,32],76:[2,32],77:[2,32]},{9:[2,33],18:[2,33],25:[2,33],27:[2,33],30:[2,33],32:[2,33],34:[2,33],38:[2,33],46:[2,33],48:[2,33],53:[2,33],54:[2,33],55:[2,33],57:[2,33],62:[2,33],63:[2,33],64:[2,33],65:[2,33],66:[2,33],67:[2,33],68:[2,33],73:[2,33],76:[2,33],77:[2,33]},{9:[2,34],18:[2,34],25:[2,34],27:[2,34],30:[2,34],32:[2,34],34:[2,34],38:[2,34],46:[2,34],48:[2,34],53:[2,34],54:[2,34],55:[2,34],57:[2,34],62:[2,34],63:[2,34],64:[2,34],65:[2,34],66:[2,34],67:[2,34],68:[2,34],73:[2,34],76:[2,34],77:[2,34]},{9:[2,35],18:[2,35],25:[2,35],27:[2,35],30:[2,35],32:[2,35],34:[2,35],38:[2,35],46:[2,35],48:[2,35],53:[2,35],54:[2,35],55:[2,35],57:[2,35],62:[2,35],63:[2,35],64:[2,35],65:[2,35],66:[2,35],67:[2,35],68:[2,35],73:[2,35],76:[2,35],77:[2,35]},{1:[2,76],9:[2,76],18:[2,76],25:[2,76],27:[2,76],38:[2,76],46:[2,76],53:[2,76],54:[2,76],57:[2,76],62:[2,76],63:[2,76],64:[2,76],65:[2,76],66:[2,76],67:[2,76],68:[2,76],73:[2,76],76:[2,76],77:[2,76],84:[2,76]},{1:[2,135],9:[2,135],18:[2,135],25:[2,135],27:[2,135],32:[2,135],38:[2,135],46:[2,135],53:[2,135],54:[2,135],57:[2,135],62:[2,135],63:[2,135],64:[2,135],65:[2,135],66:[2,135],67:[2,135],68:[2,135],73:[2,135],76:[2,135],77:[2,135],84:[2,135]},{1:[2,137],9:[2,137],18:[2,137],25:[2,137],27:[2,137],38:[2,137],46:[2,137],53:[2,137],54:[2,137],57:[2,137],62:[2,137],63:[2,137],64:[2,137],65:[2,137],66:[2,137],67:[2,137],68:[2,137],73:[2,137],76:[2,137],77:[2,137],84:[2,137]},{1:[2,77],9:[2,77],18:[2,77],25:[2,77],27:[2,77],32:[2,77],38:[2,77],46:[2,77],53:[2,77],54:[2,77],57:[2,77],62:[2,77],63:[2,77],64:[2,77],65:[2,77],66:[2,77],67:[2,77],68:[2,77],73:[2,77],76:[2,77],77:[2,77],84:[2,77],85:[2,77]},{1:[2,127],9:[2,127],18:[2,127],25:[2,127],27:[2,127],32:[2,127],38:[2,127],46:[2,127],53:[2,127],54:[2,127],57:[2,127],62:[2,127],63:[2,127],64:[2,127],65:[2,127],66:[2,127],67:[2,127],68:[2,127],73:[2,127],76:[2,127],77:[2,127],84:[2,127],85:[2,127]},{1:[2,81],9:[2,81],62:[2,81],63:[2,81],64:[2,81],65:[2,81],66:[2,81],67:[2,81],68:[2,81]},{1:[2,2],18:[2,2],25:[2,2],30:[2,2],38:[2,2],46:[2,2],53:[2,2],54:[2,2],57:[2,2],73:[2,2],76:[2,2],77:[2,2],84:[2,2]},{1:[2,85],18:[2,85],25:[2,85],30:[2,85],38:[2,85],46:[2,85],53:[2,85],54:[2,85],57:[2,85],73:[2,85],76:[2,85],77:[2,85],84:[2,85]},{1:[2,86],18:[2,86],25:[2,86],30:[2,86],32:[1,116],38:[2,86],46:[2,86],53:[2,86],54:[2,86],57:[2,86],62:[2,86],63:[2,86],64:[2,86],65:[2,86],66:[2,86],67:[2,86],68:[2,86],73:[2,86],76:[2,86],77:[2,86],82:128,84:[2,86]},{1:[2,88],18:[2,88],25:[2,88],30:[2,88],38:[2,88],46:[2,88],53:[2,88],54:[2,88],57:[2,88],62:[2,88],63:[2,88],64:[2,88],65:[2,88],66:[2,88],67:[2,88],68:[2,88],73:[2,88],76:[2,88],77:[2,88],84:[2,88]},{1:[2,87],18:[2,87],25:[2,87],30:[2,87],38:[2,87],46:[2,87],53:[2,87],54:[2,87],57:[2,87],62:[2,87],63:[2,87],64:[2,87],65:[2,87],66:[2,87],67:[2,87],68:[2,87],73:[2,87],76:[2,87],77:[2,87],84:[2,87]},{1:[2,36],18:[2,36],25:[2,36],30:[2,36],32:[2,36],38:[2,36],46:[2,36],53:[2,36],54:[2,36],57:[2,36],62:[2,36],63:[2,36],64:[2,36],65:[2,36],66:[2,36],67:[2,36],68:[2,36],73:[2,36],76:[2,36],77:[2,36],84:[2,36]},{1:[2,123],18:[2,123],25:[2,123],30:[2,123],32:[2,123],38:[2,123],46:[2,123],53:[2,123],54:[2,123],57:[2,123],62:[2,123],63:[2,123],64:[2,123],65:[2,123],66:[2,123],67:[2,123],68:[2,123],73:[2,123],76:[2,123],77:[2,123],84:[2,123]},{34:[1,129]},{9:[2,132],18:[2,132],25:[2,132],27:[2,132],30:[2,132],32:[2,132],34:[2,132],38:[2,132],46:[2,132],48:[2,132],53:[2,132],54:[2,132],55:[2,132],57:[2,132],62:[2,132],63:[2,132],64:[2,132],65:[2,132],66:[2,132],67:[2,132],68:[2,132],73:[2,132],76:[2,132],77:[2,132],78:130},{32:[2,131],73:[2,131],76:[2,131]},{32:[2,128],73:[2,128],76:[2,128]},{32:[2,129],73:[2,129],76:[2,129]},{1:[2,12],9:[2,12],18:[2,12],25:[2,12],27:[2,12],38:[2,12],46:[2,12],53:[2,12],54:[2,12],57:[2,12],62:[2,12],63:[2,12],64:[2,12],65:[2,12],66:[2,12],67:[2,12],68:[2,12],73:[2,12],76:[2,12],77:[2,12],84:[2,12]},{1:[2,109],9:[2,109],18:[2,109],25:[2,109],27:[2,109],38:[2,109],46:[2,109],53:[2,109],54:[2,109],57:[2,109],62:[2,109],63:[2,109],64:[2,109],65:[2,109],66:[2,109],67:[2,109],68:[2,109],73:[2,109],76:[2,109],77:[2,109],84:[2,109]},{1:[2,19],9:[2,19],18:[2,19],25:[2,19],27:[2,19],38:[2,19],46:[2,19],53:[2,19],54:[2,19],57:[2,19],62:[2,19],63:[2,19],64:[2,19],65:[2,19],66:[2,19],67:[2,19],68:[2,19],73:[2,19],76:[2,19],77:[2,19],84:[2,19]},{1:[2,119],9:[2,119],18:[2,119],25:[2,119],27:[2,119],38:[2,119],46:[2,119],53:[2,119],54:[2,119],57:[2,119],62:[2,119],63:[2,119],64:[2,119],65:[2,119],66:[2,119],67:[2,119],68:[2,119],73:[2,119],76:[2,119],77:[2,119],84:[2,119]},{1:[2,89],18:[2,89],25:[2,89],30:[2,89],38:[2,89],46:[2,89],53:[2,89],54:[2,89],57:[2,89],62:[2,89],63:[2,89],64:[2,89],65:[2,89],66:[2,89],67:[2,89],68:[2,89],73:[2,89],76:[2,89],77:[2,89],84:[2,89]},{1:[2,110],9:[2,110],18:[2,110],25:[2,110],30:[2,110],32:[1,132],35:131,38:[2,110],46:[2,110],53:[2,110],54:[2,110],57:[2,110],62:[2,110],63:[2,110],64:[2,110],65:[2,110],66:[2,110],67:[2,110],68:[2,110],73:[2,110],76:[2,110],77:[2,110],84:[2,110]},{9:[1,137],18:[1,147],25:[1,139],27:[1,140],30:[1,143],32:[1,136],34:[1,144],38:[1,146],46:[1,141],48:[1,142],52:135,53:[1,138],54:[1,145],55:[1,133],56:148,57:[1,149],60:69,61:70,62:[1,71],63:[1,72],64:[1,73],65:[1,74],66:[1,75],67:[1,76],68:[1,77],73:[1,30],75:134,76:[1,31],77:[1,32]},{1:[2,13],9:[2,13],18:[2,13],25:[2,13],30:[2,13],38:[2,13],46:[2,13],53:[2,13],54:[2,13],57:[2,13],62:[2,13],63:[2,13],64:[2,13],65:[2,13],66:[2,13],67:[2,13],68:[2,13],73:[2,13],76:[2,13],77:[2,13],84:[2,13]},{1:[2,111],9:[2,111],18:[2,111],25:[2,111],30:[2,111],38:[2,111],46:[2,111],53:[2,111],54:[2,111],57:[2,111],62:[2,111],63:[2,111],64:[2,111],65:[2,111],66:[2,111],67:[2,111],68:[2,111],73:[2,111],76:[2,111],77:[2,111],84:[2,111]},{34:[2,75]},{9:[2,133],18:[2,133],25:[2,133],27:[2,133],30:[2,133],32:[2,133],34:[2,133],38:[2,133],46:[2,133],48:[2,133],53:[2,133],54:[2,133],55:[2,133],57:[2,133],62:[2,133],63:[2,133],64:[2,133],65:[2,133],66:[2,133],67:[2,133],68:[2,133],73:[2,133],76:[2,133],77:[2,133]},{9:[2,57],18:[2,57],25:[2,57],27:[2,57],30:[2,57],32:[2,57],34:[2,57],38:[2,57],46:[2,57],48:[2,57],53:[2,57],54:[2,57],55:[2,57],57:[2,57],62:[2,57],63:[2,57],64:[2,57],65:[2,57],66:[2,57],67:[2,57],68:[2,57],73:[2,57],76:[2,57],77:[2,57]},{9:[2,58],18:[2,58],25:[2,58],27:[2,58],30:[2,58],32:[2,58],34:[2,58],38:[2,58],46:[2,58],48:[2,58],53:[2,58],54:[2,58],55:[2,58],57:[2,58],62:[2,58],63:[2,58],64:[2,58],65:[2,58],66:[2,58],67:[2,58],68:[2,58],73:[2,58],76:[2,58],77:[2,58]},{9:[2,59],18:[2,59],25:[2,59],27:[2,59],30:[2,59],32:[2,59],34:[2,59],38:[2,59],46:[2,59],48:[2,59],53:[2,59],54:[2,59],55:[2,59],57:[2,59],62:[2,59],63:[2,59],64:[2,59],65:[2,59],66:[2,59],67:[2,59],68:[2,59],73:[2,59],76:[2,59],77:[2,59]},{9:[2,60],18:[2,60],25:[2,60],27:[2,60],30:[2,60],32:[2,60],34:[2,60],38:[2,60],46:[2,60],48:[2,60],53:[2,60],54:[2,60],55:[2,60],57:[2,60],62:[2,60],63:[2,60],64:[2,60],65:[2,60],66:[2,60],67:[2,60],68:[2,60],73:[2,60],76:[2,60],77:[2,60]},{9:[2,61],18:[2,61],25:[2,61],27:[2,61],30:[2,61],32:[2,61],34:[2,61],38:[2,61],46:[2,61],48:[2,61],53:[2,61],54:[2,61],55:[2,61],57:[2,61],62:[2,61],63:[2,61],64:[2,61],65:[2,61],66:[2,61],67:[2,61],68:[2,61],73:[2,61],76:[2,61],77:[2,61]},{9:[2,62],18:[2,62],25:[2,62],27:[2,62],30:[2,62],32:[2,62],34:[2,62],38:[2,62],46:[2,62],48:[2,62],53:[2,62],54:[2,62],55:[2,62],57:[2,62],62:[2,62],63:[2,62],64:[2,62],65:[2,62],66:[2,62],67:[2,62],68:[2,62],73:[2,62],76:[2,62],77:[2,62]},{9:[2,63],18:[2,63],25:[2,63],27:[2,63],30:[2,63],32:[2,63],34:[2,63],38:[2,63],46:[2,63],48:[2,63],53:[2,63],54:[2,63],55:[2,63],57:[2,63],62:[2,63],63:[2,63],64:[2,63],65:[2,63],66:[2,63],67:[2,63],68:[2,63],73:[2,63],76:[2,63],77:[2,63]},{9:[2,64],18:[2,64],25:[2,64],27:[2,64],30:[2,64],32:[2,64],34:[2,64],38:[2,64],46:[2,64],48:[2,64],53:[2,64],54:[2,64],55:[2,64],57:[2,64],62:[2,64],63:[2,64],64:[2,64],65:[2,64],66:[2,64],67:[2,64],68:[2,64],73:[2,64],76:[2,64],77:[2,64]},{9:[2,65],18:[2,65],25:[2,65],27:[2,65],30:[2,65],32:[2,65],34:[2,65],38:[2,65],46:[2,65],48:[2,65],53:[2,65],54:[2,65],55:[2,65],57:[2,65],62:[2,65],63:[2,65],64:[2,65],65:[2,65],66:[2,65],67:[2,65],68:[2,65],73:[2,65],76:[2,65],77:[2,65]},{9:[2,66],18:[2,66],25:[2,66],27:[2,66],30:[2,66],32:[2,66],34:[2,66],38:[2,66],46:[2,66],48:[2,66],53:[2,66],54:[2,66],55:[2,66],57:[2,66],62:[2,66],63:[2,66],64:[2,66],65:[2,66],66:[2,66],67:[2,66],68:[2,66],73:[2,66],76:[2,66],77:[2,66]},{9:[2,67],18:[2,67],25:[2,67],27:[2,67],30:[2,67],32:[2,67],34:[2,67],38:[2,67],46:[2,67],48:[2,67],53:[2,67],54:[2,67],55:[2,67],57:[2,67],62:[2,67],63:[2,67],64:[2,67],65:[2,67],66:[2,67],67:[2,67],68:[2,67],73:[2,67],76:[2,67],77:[2,67]},{9:[2,68],18:[2,68],25:[2,68],27:[2,68],30:[2,68],32:[2,68],34:[2,68],38:[2,68],46:[2,68],48:[2,68],53:[2,68],54:[2,68],55:[2,68],57:[2,68],62:[2,68],63:[2,68],64:[2,68],65:[2,68],66:[2,68],67:[2,68],68:[2,68],73:[2,68],76:[2,68],77:[2,68]},{9:[2,69],18:[2,69],25:[2,69],27:[2,69],30:[2,69],32:[2,69],34:[2,69],38:[2,69],46:[2,69],48:[2,69],53:[2,69],54:[2,69],55:[2,69],57:[2,69],62:[2,69],63:[2,69],64:[2,69],65:[2,69],66:[2,69],67:[2,69],68:[2,69],73:[2,69],76:[2,69],77:[2,69]},{9:[2,70],18:[2,70],25:[2,70],27:[2,70],30:[2,70],32:[2,70],34:[2,70],38:[2,70],46:[2,70],48:[2,70],53:[2,70],54:[2,70],55:[2,70],57:[2,70],62:[2,70],63:[2,70],64:[2,70],65:[2,70],66:[2,70],67:[2,70],68:[2,70],73:[2,70],76:[2,70],77:[2,70]},{9:[2,71],18:[2,71],25:[2,71],27:[2,71],30:[2,71],32:[2,71],34:[2,71],38:[2,71],46:[2,71],48:[2,71],53:[2,71],54:[2,71],55:[2,71],57:[2,71],62:[2,71],63:[2,71],64:[2,71],65:[2,71],66:[2,71],67:[2,71],68:[2,71],73:[2,71],76:[2,71],77:[2,71]}],
defaultActions: {78:[2,1],133:[2,75]},
parseError: function parseError(str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        throw new Error(str);
    }
},
parse: function parse(input) {
    var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    this.yy.parser = this;
    if (typeof this.lexer.yylloc == 'undefined') {
        this.lexer.yylloc = {};
    }
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);
    var ranges = this.lexer.options && this.lexer.options.ranges;
    if (typeof this.yy.parseError === 'function') {
        this.parseError = this.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    function lex() {
        var token;
        token = self.lexer.lex() || EOF;
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }
        return token;
    }
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (this.lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + this.lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: this.lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: this.lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(this.lexer.yytext);
            lstack.push(this.lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                this.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};


	//console.log("PJNParser");

	var SuperParse=parser.parse;
	parser.parse=function(input,callback,complete,error,lineNo) {
		//console.log("parser",input);
		input+="\n"; // dirty way to fix a problem when the game ends on the last character
		parser.lexer.options.ranges=true;
		var yy=parser.yy;
		yy.tags={};
		yy.startOffset=0;
		yy.lineFrom=lineNo;
		yy.rootNode={};
		yy.nodeStack=[yy.rootNode];
		yy.compiledGame=callback;
		yy.complete=complete;
		yy.parseError=function(errStr,errData) {
        	errStr = '!!! Parse error on line ' + (errData.line + lineNo + 1) + ':\n' + parser.lexer.showPosition() + 
        		'\nExpecting ' + errData.expected.join(', ') + ', got \'' + errData.token + '\'';
        	if(error)
        		error(errStr,errData);
        	else
				parser.parseError.call(parser,errStr,errData);
		}
		return SuperParse.call(parser,input);
	}

	function SaveGame(yy) { 			
		//console.warn("SaveGame");
		var tagsCount=0;
		for(var tag in yy.tags)
			tagsCount++;
		if((yy.rootNode.next || tagsCount>0) && yy.compiledGame) 
			yy.compiledGame({
				offset: yy.startOffset,
				length: yy.lexer.yylloc.range[1]-yy.startOffset,
				lineFrom: yy.lineFrom,
				lineTo: yy.lexer.yylineno,
				tags: yy.tags || {},
				rootNode: yy.rootNode,
				fileName: yy.fileName,
			});
		
		yy.lineFrom=yy.lexer.yylineno;
		yy.startOffset = yy.lexer.yylloc.range[1];
		yy.tags={};
		var rootNode={};
		yy.nodeStack=[rootNode];
		yy.rootNode=rootNode;
	}
	
	function AddTag(yy,tagName,tagValue) {
		yy.tags[tagName]=tagValue;
	}
	
	function AddNode(yy,node) {
		var prevNode=yy.nodeStack[yy.nodeStack.length-1];
		if(!prevNode)
			console.log("line",yy.lexer.yylineno);
		prevNode.next=node;
		node.prev=prevNode;
		yy.nodeStack[yy.nodeStack.length-1]=node;
	}
	
	function CurrentNode(yy) {
		if(yy.nodeStack===undefined)
			debugger;
		return yy.nodeStack[yy.nodeStack.length-1];
	}
	
	function AddMove(yy,move) {
		//console.warn("AddMove",move);
		AddNode(yy,{
			move: move,
		});
	}

	function AddComment(yy,comment) {
		//console.warn("AddComment",comment);
		AddNode(yy,{
			comment: comment,
		});
	}
	
	function EndGameBody(yy) {
		yy.nodeStack.pop();
	}
	
	function StartVariation(yy) {
		var prev=CurrentNode(yy);
		while(!prev.move)
			if(prev.prev)
				prev=prev.prev;
			else
				break;
		if(prev.prev)
			prev=prev.prev;
		var node={
			prev: prev,
		};
		AddNode(yy,{
			variation: node,
		});
		if(yy.nodeStack===undefined)
			debugger;
		yy.nodeStack.push(node);
	}

	function AddMoveNumber(yy,moveNumber) {
		//console.log("AddMoveNumber",moveNumber);
		CurrentNode(yy).moveNumber=moveNumber;
	}
	
	// if followed by blank, returns token otherwise JUSTCHARS
	function JustChars(context,token) {
		if(context._input.length==0)
			return undefined;
		var c=context._input[0];
		if(c==' ' || c=='\n' || c=='\r')
			return token;
		else
			return "JUSTCHARS";
	}
	

/* generated by jison-lex 0.2.1 */
var lexer = (function(){
var lexer = {

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input) {
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len - 1);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function (match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex() {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState() {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules() {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState(n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState(condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"flex":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {

var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:return JustChars(this,"WIN1");
break;
case 1:return JustChars(this,"DRAW1");
break;
case 2:return JustChars(this,"LOSS1");
break;
case 3:return JustChars(this,"WIN2");
break;
case 4:return JustChars(this,"DRAW2");
break;
case 5:return JustChars(this,"LOSS2");
break;
case 6:return JustChars(this,"DOUBLEFORFEIT");
break;
case 7:return "MOVERATE";
break;
case 8:return "MOVERATE";
break;
case 9:return "MOVERATE";
break;
case 10:return "MOVERATE";
break;
case 11:return "MOVERATE";
break;
case 12:return "MOVERATE";
break;
case 13:return "MOVERATE";
break;
case 14:return "MOVERATE";
break;
case 15:return "MOVERATE";
break;
case 16:return "MOVERATE";
break;
case 17:return "MOVERATE";
break;
case 18:return "MOVENUMBER";
break;
case 19:return "DIGIT";
break;
case 20:return "LETTER";
break;
case 21:return "(";
break;
case 22:return ")";
break;
case 23:return "[";
break;
case 24:return "]";
break;
case 25:return "{";
break;
case 26:return "}";
break;
case 27:return "*";
break;
case 28:return ".";
break;
case 29:return "DQUOTE";
break;
case 30:return "$";
break;
case 31:return "BLANK";
break;
case 32:return "SIGN";
break;
case 33: SaveGame(yy); if(yy.complete) yy.complete( yy_.yylineno ); 
break;
case 34:console.log(yy_.yytext);
break;
}
},
rules: [/^(?:1-0)/,/^(?:1\/2-1\/2)/,/^(?:0-1)/,/^(?:2-0)/,/^(?:1-1)/,/^(?:0-2)/,/^(?:0-0)/,/^(?:=)/,/^(?:\+=)/,/^(?:=\+)/,/^(?:-\+)/,/^(?:-\/\+)/,/^(?:!)/,/^(?:\?)/,/^(?:\?!)/,/^(?:\?\?)/,/^(?:#)/,/^(?:\+)/,/^(?:[0-9]+\.(\.\.?)?\s*)/,/^(?:[0-9])/,/^(?:[a-zA-Z])/,/^(?:\()/,/^(?:\))/,/^(?:\[)/,/^(?:\])/,/^(?:\{)/,/^(?:\})/,/^(?:\*)/,/^(?:\.)/,/^(?:")/,/^(?:\$)/,/^(?:\s+)/,/^(?:.)/,/^(?:$)/,/^(?:.)/],
conditions: {"REGEXP":{"rules":[],"inclusive":false},"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34],"inclusive":true}}
};
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = parser;
exports.Parser = parser.Parser;
exports.parse = function () { return parser.parse.apply(parser, arguments); };
exports.main = function commonjsMain(args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
};
return parser;
})();
