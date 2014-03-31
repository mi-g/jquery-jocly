/* This Source Code Form is subject to the terms of the Mozilla Public
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
					show: this.options.variationsInitialVisible,
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

