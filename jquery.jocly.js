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
			baseURL: "https://www.jocly.com",
			masked: false,
		}
		if (options)
			$.extend(this.options, options);
		var iframeUrl = this.options.baseURL+"/jocly/plazza/embed";
		if(this.options.game)
			iframeUrl+="/"+this.options.game;
		iframeUrl+="?mode=" + this.options.mode;
		if(this.options.skin)
			iframeUrl+="&skin="+encodeURIComponent(this.options.skin);
		if(this.options.joclyStyle)
			iframeUrl+="&style="+encodeURIComponent(this.options.joclyStyle);
		this.iframeId = iframeIdRef++;
		this.options.jei = this.iframeId;
		if(this.options.ratio=='auto')
			this.options.ratio = this.jqElm.height() / this.jqElm.width(); 
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
			variationsInitialVisible: false,
			commentsToggleable: true,
			variationsToggleable: true,
			onParsedGame: function() {},
			navigation: true,
			nag: {
				0:	'null annotation',
				1:	'good move',
				2:	'poor move',
				3:	'very good move',
				4:	'very poor move',
				5:	'speculative move',
				6:	'questionable move',
				7:	'forced move (all others lose quickly)',
				8:	'singular move (no reasonable alternatives)',
				9:	'worst move',
				10:	'drawish position',
				11:	'equal chances, quiet position',
				12:	'equal chances, active position',
				13:	'unclear position',
				14:	'White has a slight advantage',
				15:	'Black has a slight advantage',
				16:	'White has a moderate advantage',
				17:	'Black has a moderate advantage',
				18:	'White has a decisive advantage',
				19:	'Black has a decisive advantage',
				20:	'White has a crushing advantage (Black should resign)',
				21:	'Black has a crushing advantage (White should resign)',
				22:	'White is in zugzwang',
				23:	'Black is in zugzwang',
				24:	'White has a slight space advantage',
				25:	'Black has a slight space advantage',
				26:	'White has a moderate space advantage',
				27:	'Black has a moderate space advantage',
				28:	'White has a decisive space advantage',
				29:	'Black has a decisive space advantage',
				30:	'White has a slight time (development) advantage',
				31:	'Black has a slight time (development) advantage',
				32:	'White has a moderate time (development) advantage',
				33:	'Black has a moderate time (development) advantage',
				34:	'White has a decisive time (development) advantage',
				35:	'Black has a decisive time (development) advantage',
				36:	'White has the initiative',
				37:	'Black has the initiative',
				38:	'White has a lasting initiative',
				39:	'Black has a lasting initiative',
				40:	'White has the attack',
				41:	'Black has the attack',
				42:	'White has insufficient compensation for material deficit',
				43:	'Black has insufficient compensation for material deficit',
				44:	'White has sufficient compensation for material deficit',
				45:	'Black has sufficient compensation for material deficit',
				46:	'White has more than adequate compensation for material deficit',
				47:	'Black has more than adequate compensation for material deficit',
				48:	'White has a slight center control advantage',
				49:	'Black has a slight center control advantage',
				50:	'White has a moderate center control advantage',
				51:	'Black has a moderate center control advantage',
				52:	'White has a decisive center control advantage',
				53:	'Black has a decisive center control advantage',
				54:	'White has a slight kingside control advantage',
				55:	'Black has a slight kingside control advantage',
				56:	'White has a moderate kingside control advantage',
				57:	'Black has a moderate kingside control advantage',
				58:	'White has a decisive kingside control advantage',
				59:	'Black has a decisive kingside control advantage',
				60:	'White has a slight queenside control advantage',
				61:	'Black has a slight queenside control advantage',
				62:	'White has a moderate queenside control advantage',
				63:	'Black has a moderate queenside control advantage',
				64:	'White has a decisive queenside control advantage',
				65:	'Black has a decisive queenside control advantage',
				66:	'White has a vulnerable first rank',
				67:	'Black has a vulnerable first rank',
				68:	'White has a well protected first rank',
				69:	'Black has a well protected first rank',
				70:	'White has a poorly protected king',
				71:	'Black has a poorly protected king',
				72:	'White has a well protected king',
				73:	'Black has a well protected king',
				74:	'White has a poorly placed king',
				75:	'Black has a poorly placed king',
				76:	'White has a well placed king',
				77:	'Black has a well placed king',
				78:	'White has a very weak pawn structure',
				79:	'Black has a very weak pawn structure',
				80:	'White has a moderately weak pawn structure',
				81:	'Black has a moderately weak pawn structure',
				82:	'White has a moderately strong pawn structure',
				83:	'Black has a moderately strong pawn structure',
				84:	'White has a very strong pawn structure',
				85:	'Black has a very strong pawn structure',
				86:	'White has poor knight placement',
				87:	'Black has poor knight placement',
				88:	'White has good knight placement',
				89:	'Black has good knight placement',
				90:	'White has poor bishop placement',
				91:	'Black has poor bishop placement',
				92:	'White has good bishop placement',
				93:	'Black has good bishop placement',
				94:	'White has poor rook placement',
				95:	'Black has poor rook placement',
				96:	'White has good rook placement',
				97:	'Black has good rook placement',
				98:	'White has poor queen placement',
				99:	'Black has poor queen placement',
				100:	'White has good queen placement',
				101:	'Black has good queen placement',
				102:	'White has poor piece coordination',
				103:	'Black has poor piece coordination',
				104:	'White has good piece coordination',
				105:	'Black has good piece coordination',
				106:	'White has played the opening very poorly',
				107:	'Black has played the opening very poorly',
				108:	'White has played the opening poorly',
				109:	'Black has played the opening poorly',
				110:	'White has played the opening well',
				111:	'Black has played the opening well',
				112:	'White has played the opening very well',
				113:	'Black has played the opening very well',
				114:	'White has played the middlegame very poorly',
				115:	'Black has played the middlegame very poorly',
				116:	'White has played the middlegame poorly',
				117:	'Black has played the middlegame poorly',
				118:	'White has played the middlegame well',
				119:	'Black has played the middlegame well',
				120:	'White has played the middlegame very well',
				121:	'Black has played the middlegame very well',
				122:	'White has played the ending very poorly',
				123:	'Black has played the ending very poorly',
				124:	'White has played the ending poorly',
				125:	'Black has played the ending poorly',
				126:	'White has played the ending well',
				127:	'Black has played the ending well',
				128:	'White has played the ending very well',
				129:	'Black has played the ending very well',
				130:	'White has slight counterplay',
				131:	'Black has slight counterplay',
				132:	'White has moderate counterplay',
				133:	'Black has moderate counterplay',
				134:	'White has decisive counterplay',
				135:	'Black has decisive counterplay',
				136:	'White has moderate time control pressure',
				137:	'Black has moderate time control pressure',
				138:	'White has severe time control pressure',
				139:	'Black has severe time control pressure',
			},
		}
		if (options)
			$.extend(true,this.options, options);
		PJNParser.setNagStringFunction(function(nag) {
			return $this.options.nag[nag] || '$'+nag;
		});
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
			if(game.tags.Result && game.tags.Result!='*')
				label+=" - "+game.tags.Result;
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
	
	PJN.prototype.select = function(index) {
		this.jqElm.find("select.jocly-pjn-selector").val(index).trigger("change");
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
					toggleable: this.options.commentsToggleable,
				},comment)).append(comment);
			}
			if(node.variation) {
				var variation=this.makeNodesDOM(node.variation,level+1,crc,prevPrev,"");
				variation.addClass(this.options.varClasses[level%this.options.varClasses.length]);
				elm.append(this.makeViewToggler({
					label: this.options.strings.variation,
					show: this.options.variationsInitialVisible,
					toggleable: this.options.variationsToggleable,
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
		function Update() {
			if(state) {
				child.show();
				elm.text(options.label+options.openedSuff);
			} else {
				child.hide();
				elm.text(options.label+options.closedSuff);				
			}
		}
		if(options.toggleable) {
			var state=options.show;
			var elm=$("<span/>").addClass('jocly-pjn-toggler').on("click",function() {
				state=!state;
				Update();
			});
			Update();
			return elm;
		} else
			return $("<span/>");
	}

	PJN.prototype.display = function() {
		this.jqView.empty();
		var tags=this.makeTagsDOM(this.game.tags);
		this.jqView.append(this.makeViewToggler({
			label: this.options.strings.tags,
			toggleable: true,
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
							top: null,
							left: null,
							position: "relative",
						});
					}
				}
			});
		});
		return this;
	};
	
	
})(jQuery);

;PJNParser=(function() {
;/* parser generated by jison 0.4.15 */
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
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[18,25,30,38,46,53,54,57,73,76,77,84],$V1=[1,17],$V2=[1,25],$V3=[1,11],$V4=[1,23],$V5=[1,20],$V6=[1,26],$V7=[1,21],$V8=[1,29],$V9=[1,30],$Va=[1,31],$Vb=[1,32],$Vc=[1,15],$Vd=[1,9,62,63,64,65,66,67,68],$Ve=[1,9,18,25,30,38,46,53,54,57,62,63,64,65,66,67,68,73,76,77,84],$Vf=[1,9,18,25,27,38,46,53,54,57,62,63,64,65,66,67,68,73,76,77,84],$Vg=[9,18,25,27,30,32,34,38,46,48,53,54,55,57,62,63,64,65,66,67,68,73,76,77],$Vh=[1,9,18,25,27,38,46,53,54,57,62,63,64,65,66,67,68,73,76,77,84,85],$Vi=[18,25,38,46,53,54,57,73,76,77,84],$Vj=[1,62],$Vk=[1,66],$Vl=[1,65],$Vm=[1,63],$Vn=[1,64],$Vo=[1,68],$Vp=[1,71],$Vq=[1,72],$Vr=[1,73],$Vs=[1,74],$Vt=[1,75],$Vu=[1,76],$Vv=[1,77],$Vw=[9,18,38,53,54,57,62,63,64,65,66,67,68,73,76,77],$Vx=[1,9,18,25,27,30,32,34,38,46,48,53,54,55,57,62,63,64,65,66,67,68,73,76,77,84,85],$Vy=[32,73,76],$Vz=[1,9,18,25,27,32,38,46,53,54,57,62,63,64,65,66,67,68,73,76,77,84],$VA=[1,9,18,25,27,32,38,46,53,54,57,62,63,64,65,66,67,68,73,76,77,84,85],$VB=[1,18,25,30,38,46,53,54,57,73,76,77,84],$VC=[1,18,25,30,38,46,53,54,57,62,63,64,65,66,67,68,73,76,77,84],$VD=[2,86],$VE=[1,116],$VF=[1,18,25,30,32,38,46,53,54,57,62,63,64,65,66,67,68,73,76,77,84];
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"PdnFile":3,"PdnFile_option0":4,"Game":5,"PdnFile_repetition0":6,"PdnFile_option1":7,"GameSeparator":8,"*":9,"GameSeparator_option0":10,"GameSeparator_repetition_plus0":11,"GameHeader":12,"Game_option0":13,"GameBody":14,"GameHeader_repetition_plus0":15,"GameBody_repetition_plus0":16,"GameMove":17,"MOVENUMBER":18,"Move":19,"GameMove_option0":20,"GameMove_option1":21,"Variation":22,"Variation1":23,"Variation2":24,"(":25,"Variation1_option0":26,")":27,"Variation2_option0":28,"PdnTag":29,"[":30,"IDENTIFIER":31,"BLANK":32,"STRING":33,"]":34,"PdnTag_option0":35,"ELLIPSE":36,"Move_option0":37,"MOVERATE":38,"Move_option1":39,"MOVECHARS":40,"Move_option2":41,"Square":42,"ALPHASQUARE":43,"NUMSQUARE":44,"COMMENT":45,"{":46,"COMMENTCHARS":47,"}":48,"COMMENT_option0":49,"COMMENTCHARS_repetition0":50,"COMMENTCHAR":51,"SAFECHAR":52,".":53,"$":54,"DQUOTE":55,"CompactResult":56,"JUSTCHARS":57,"Result":58,"Result_option0":59,"Result1":60,"Result2":61,"DOUBLEFORFEIT":62,"WIN1":63,"DRAW1":64,"LOSS1":65,"WIN2":66,"DRAW2":67,"LOSS2":68,"MOVECHARS_group0":69,"MOVECHARS2":70,"MOVECHARS2_repetition_plus0":71,"MOVECHAR":72,"LETTER":73,"IDENTIFIER_repetition0":74,"STRINGCHAR":75,"DIGIT":76,"SIGN":77,"STRING_repetition0":78,"NAG":79,"NAG_repetition_plus0":80,"NAG_option0":81,"GameSeparator_repetition_plus0_option0":82,"GameBody_repetition_plus0_group0":83,"SETUP":84,"MOVESTRENGTH":85,"IDENTIFIER_repetition0_group0":86,"$accept":0,"$end":1},
terminals_: {2:"error",9:"*",18:"MOVENUMBER",25:"(",27:")",30:"[",32:"BLANK",34:"]",38:"MOVERATE",43:"ALPHASQUARE",44:"NUMSQUARE",46:"{",48:"}",53:".",54:"$",55:"DQUOTE",57:"JUSTCHARS",62:"DOUBLEFORFEIT",63:"WIN1",64:"DRAW1",65:"LOSS1",66:"WIN2",67:"DRAW2",68:"LOSS2",73:"LETTER",76:"DIGIT",77:"SIGN",84:"SETUP",85:"MOVESTRENGTH"},
productions_: [0,[3,4],[8,2],[8,1],[5,2],[5,1],[12,1],[14,1],[17,3],[17,2],[22,2],[23,2],[24,3],[29,6],[19,2],[19,2],[19,2],[42,1],[42,1],[45,4],[47,1],[51,1],[51,1],[51,1],[51,1],[51,1],[51,1],[51,1],[51,1],[51,1],[51,1],[51,1],[51,1],[51,1],[51,1],[51,1],[58,2],[56,1],[56,1],[56,1],[60,1],[60,1],[60,1],[61,1],[61,1],[61,1],[40,2],[70,1],[72,1],[72,1],[72,1],[72,1],[72,1],[72,1],[72,1],[72,1],[31,2],[75,1],[75,1],[75,1],[75,1],[75,1],[75,1],[75,1],[75,1],[75,1],[75,1],[75,1],[75,1],[75,1],[75,1],[75,1],[52,1],[52,1],[52,1],[33,3],[79,3],[36,3],[4,0],[4,1],[6,0],[6,3],[7,0],[7,1],[10,0],[10,1],[82,0],[82,1],[11,2],[11,3],[13,0],[13,1],[15,1],[15,2],[83,1],[83,1],[83,1],[83,1],[83,1],[83,1],[16,1],[16,2],[20,0],[20,1],[21,0],[21,1],[26,0],[26,1],[28,0],[28,1],[35,0],[35,1],[37,0],[37,1],[39,0],[39,1],[41,0],[41,1],[49,0],[49,1],[50,0],[50,2],[59,0],[59,1],[69,1],[69,1],[71,1],[71,2],[86,1],[86,1],[74,0],[74,2],[78,0],[78,2],[80,1],[80,2],[81,0],[81,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 4: case 5:
 SaveGame(yy); 
break;
case 7:
 EndGameBody(yy); 
break;
case 8:
 AddMoveNumber(yy,$$[$0-2]) 
break;
case 11:
 StartVariation(yy); 
break;
case 13:
 AddTag(yy,$$[$0-4],$$[$0-2]); 
break;
case 16:
 AddMove(yy,$$[$0-1]); 
break;
case 19:
 AddComment(yy,$$[$0-2].join('').replace(/\s+/g,' ')); 
break;
case 46:
 this.$ = $$[$0-1] + $$[$0]; 
break;
case 47:
 this.$ = $$[$0].join(''); 
break;
case 56:
 this.$ = $$[$0-1] + $$[$0].join(''); 
break;
case 75:
 this.$ = $$[$0-1].join('') 
break;
case 76:
 AddNAG(yy,$$[$0-1].join('')); 
break;
case 80: case 120: case 130: case 132:
this.$ = [];
break;
case 81: case 89:
$$[$0-2].push($$[$0-1]);
break;
case 88:
this.$ = [$$[$0-1]];
break;
case 92: case 100: case 126: case 134:
this.$ = [$$[$0]];
break;
case 93: case 101: case 121: case 127: case 131: case 133: case 135:
$$[$0-1].push($$[$0]);
break;
}
},
table: [o($V0,[2,78],{3:1,4:2,32:[1,3]}),{1:[3]},{5:4,12:5,14:6,15:7,16:8,17:12,18:$V1,19:18,22:13,23:19,25:$V2,29:9,30:$V3,36:22,38:$V4,40:24,45:14,46:$V5,52:28,53:$V6,54:$V7,57:$V8,69:27,73:$V9,76:$Va,77:$Vb,79:16,83:10,84:$Vc},o($V0,[2,79]),o($Vd,[2,80],{6:33}),o($Vd,[2,90],{16:8,83:10,17:12,22:13,45:14,79:16,19:18,23:19,36:22,40:24,69:27,52:28,13:34,14:35,18:$V1,25:$V2,38:$V4,46:$V5,53:$V6,54:$V7,57:$V8,73:$V9,76:$Va,77:$Vb,84:$Vc}),o($Vd,[2,5]),o([1,9,18,25,38,46,53,54,57,62,63,64,65,66,67,68,73,76,77,84],[2,6],{29:36,30:$V3}),o([1,9,27,62,63,64,65,66,67,68],[2,7],{17:12,22:13,45:14,79:16,19:18,23:19,36:22,40:24,69:27,52:28,83:37,18:$V1,25:$V2,38:$V4,46:$V5,53:$V6,54:$V7,57:$V8,73:$V9,76:$Va,77:$Vb,84:$Vc}),o($Ve,[2,92]),o($Vf,[2,100]),{31:38,73:[1,39]},o($Vf,[2,94]),o($Vf,[2,95]),o($Vf,[2,96]),o($Vf,[2,97]),o($Vf,[2,98]),o([1,9,18,25,27,46,54,62,63,64,65,66,67,68,84],[2,99],{36:22,40:24,69:27,52:28,19:40,38:$V4,53:$V6,57:$V8,73:$V9,76:$Va,77:$Vb}),o($Vf,[2,104],{21:41,85:[1,42]}),{14:44,16:8,17:12,18:$V1,19:18,22:13,23:19,24:43,25:$V2,36:22,38:$V4,40:24,45:14,46:$V5,52:28,53:$V6,54:$V7,57:$V8,69:27,73:$V9,76:$Va,77:$Vb,79:16,83:10,84:$Vc},o($Vg,[2,120],{47:45,50:46}),{76:[1,48],80:47},o($Vh,[2,112],{37:49,32:[1,50]}),o($Vh,[2,114],{39:51,32:[1,52]}),o($Vh,[2,116],{41:53,32:[1,54]}),o($Vi,[2,106],{26:55,32:[1,56]}),{53:[1,57]},{9:$Vj,18:$Vk,38:$Vl,52:61,53:$Vm,54:$Vn,56:67,57:$Vo,60:69,61:70,62:$Vp,63:$Vq,64:$Vr,65:$Vs,66:$Vt,67:$Vu,68:$Vv,70:58,71:59,72:60,73:$V9,76:$Va,77:$Vb},o($Vw,[2,124]),o($Vw,[2,125]),o($Vx,[2,72]),o($Vx,[2,73]),o($Vx,[2,74]),{1:[2,82],7:78,8:79,9:[1,80],11:81,56:83,58:82,60:69,61:70,62:$Vp,63:$Vq,64:$Vr,65:$Vs,66:$Vt,67:$Vu,68:$Vv},o($Vd,[2,4]),o($Vd,[2,91]),o($Ve,[2,93]),o($Vf,[2,101]),{32:[1,84]},o($Vy,[2,130],{74:85}),o($Vf,[2,102],{20:86,85:[1,87]}),o($Vf,[2,9]),o($Vf,[2,105]),o($Vf,[2,10]),{27:[1,88]},{48:[1,89]},{9:[1,99],18:[1,103],25:[1,95],27:[1,96],30:[1,97],32:[1,92],34:[1,98],38:[1,102],46:[1,91],48:[2,20],51:90,52:93,53:[1,94],54:[1,100],55:[1,101],56:104,57:[1,105],60:69,61:70,62:$Vp,63:$Vq,64:$Vr,65:$Vs,66:$Vt,67:$Vu,68:$Vv,73:$V9,76:$Va,77:$Vb},o([1,9,18,25,27,38,46,53,54,57,62,63,64,65,66,67,68,73,77,84],[2,136],{81:106,32:[1,108],76:[1,107]}),o($Vz,[2,134]),o($Vh,[2,14]),o($Vh,[2,113]),o($Vh,[2,15]),o($Vh,[2,115]),o($Vh,[2,16]),o($Vh,[2,117]),o($Vi,[2,11]),o($Vi,[2,107]),{53:[1,109]},o($VA,[2,46]),o([1,25,27,32,46,84,85],[2,47],{52:61,56:67,60:69,61:70,72:110,9:$Vj,18:$Vk,38:$Vl,53:$Vm,54:$Vn,57:$Vo,62:$Vp,63:$Vq,64:$Vr,65:$Vs,66:$Vt,67:$Vu,68:$Vv,73:$V9,76:$Va,77:$Vb}),o($VA,[2,126]),o($VA,[2,48]),o($VA,[2,49]),o($VA,[2,50]),o($VA,[2,51]),o($VA,[2,52]),o($VA,[2,53]),o($VA,[2,54]),o($VA,[2,55]),o($Vx,[2,37]),o($Vx,[2,38]),o($Vx,[2,39]),o($Vx,[2,40]),o($Vx,[2,41]),o($Vx,[2,42]),o($Vx,[2,43]),o($Vx,[2,44]),o($Vx,[2,45]),{1:[2,1]},{1:[2,83],5:111,12:5,14:6,15:7,16:8,17:12,18:$V1,19:18,22:13,23:19,25:$V2,29:9,30:$V3,36:22,38:$V4,40:24,45:14,46:$V5,52:28,53:$V6,54:$V7,57:$V8,69:27,73:$V9,76:$Va,77:$Vb,79:16,83:10,84:$Vc},o($VB,[2,84],{10:112,32:[1,113]}),o($VB,[2,3],{60:69,61:70,56:83,58:114,62:$Vp,63:$Vq,64:$Vr,65:$Vs,66:$Vt,67:$Vu,68:$Vv}),o($VC,$VD,{82:115,32:$VE}),o($VC,[2,122],{59:117,32:[1,118]}),{33:119,55:[1,120]},{32:[2,56],73:[1,122],76:[1,123],86:121},o($Vf,[2,8]),o($Vf,[2,103]),o($Vf,[2,108],{28:124,32:[1,125]}),o($Vf,[2,118],{49:126,32:[1,127]}),o($Vg,[2,121]),o($Vg,[2,21]),o($Vg,[2,22]),o($Vg,[2,23]),o($Vg,[2,24]),o($Vg,[2,25]),o($Vg,[2,26]),o($Vg,[2,27]),o($Vg,[2,28]),o($Vg,[2,29]),o($Vg,[2,30]),o($Vg,[2,31]),o($Vg,[2,32]),o($Vg,[2,33]),o($Vg,[2,34]),o($Vg,[2,35]),o($Vf,[2,76]),o($Vz,[2,135]),o($Vf,[2,137]),o($VA,[2,77]),o($VA,[2,127]),o($Vd,[2,81]),o($VB,[2,2]),o($VB,[2,85]),o($VC,$VD,{82:128,32:$VE}),o($VC,[2,88]),o($VC,[2,87]),o($VF,[2,36]),o($VF,[2,123]),{34:[1,129]},o($Vg,[2,132],{78:130}),o($Vy,[2,131]),o($Vy,[2,128]),o($Vy,[2,129]),o($Vf,[2,12]),o($Vf,[2,109]),o($Vf,[2,19]),o($Vf,[2,119]),o($VC,[2,89]),o($Ve,[2,110],{35:131,32:[1,132]}),{9:[1,137],18:[1,147],25:[1,139],27:[1,140],30:[1,143],32:[1,136],34:[1,144],38:[1,146],46:[1,141],48:[1,142],52:135,53:[1,138],54:[1,145],55:[1,133],56:148,57:[1,149],60:69,61:70,62:$Vp,63:$Vq,64:$Vr,65:$Vs,66:$Vt,67:$Vu,68:$Vv,73:$V9,75:134,76:$Va,77:$Vb},o($Ve,[2,13]),o($Ve,[2,111]),{34:[2,75]},o($Vg,[2,133]),o($Vg,[2,57]),o($Vg,[2,58]),o($Vg,[2,59]),o($Vg,[2,60]),o($Vg,[2,61]),o($Vg,[2,62]),o($Vg,[2,63]),o($Vg,[2,64]),o($Vg,[2,65]),o($Vg,[2,66]),o($Vg,[2,67]),o($Vg,[2,68]),o($Vg,[2,69]),o($Vg,[2,70]),o($Vg,[2,71])],
defaultActions: {78:[2,1],133:[2,75]},
parseError: function parseError(str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        throw new Error(str);
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        function lex() {
            var token;
            token = lexer.lex() || EOF;
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
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
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
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
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
                sharedState.yy,
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

	var GetNagString = function(nag) {
		return "#"+nag;
	}

	parser.setNagStringFunction=function(fnt) {
		GetNagString = fnt;
	}	
	
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
		if((yy.rootNode.next || tagsCount>0) && yy.compiledGame && yy.lexer.yylloc.range[1]>yy.startOffset) 
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
	
	function AddNAG(yy,nag) {
		var nagText=GetNagString(nag);
		if(nagText===undefined)
			nagText="$"+nag;
		AddComment(yy,nagText);
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
	

/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
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
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
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
});
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
