
%{

	//console.log("PJNParser");

	var nagMap={
		0:	'null annotation',
		/*
		1:	'good move (traditional "!")',
		2:	'poor move (traditional "?")',
		3:	'very good move (traditional "!!")',
		4:	'very poor move (traditional "??")',
		5:	'speculative move (traditional "!?")',
		6:	'questionable move (traditional "?!")',
		*/
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
		84:	'White has poor rook placement',
		85:	'Black has poor rook placement',
		86:	'White has good rook placement',
		87:	'Black has good rook placement',
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
		var nagText=nagMap[nag];
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
	
%}

%ebnf

%lex

%x REGEXP
%options flex

%%
// Tokens

"1-0"				return JustChars(this,"WIN1");
"1/2-1/2"			return JustChars(this,"DRAW1");
"0-1"				return JustChars(this,"LOSS1");
"2-0"				return JustChars(this,"WIN2");
"1-1"				return JustChars(this,"DRAW2");
"0-2"				return JustChars(this,"LOSS2");
"0-0"				return JustChars(this,"DOUBLEFORFEIT");
"="					return "MOVERATE";
"+="				return "MOVERATE";
"=+"				return "MOVERATE";
"-+"				return "MOVERATE";
"-/+"				return "MOVERATE";
"!"					return "MOVERATE";
"?"					return "MOVERATE";
"?!"				return "MOVERATE";
"??"				return "MOVERATE";
"#"					return "MOVERATE";
"+"					return "MOVERATE";
[0-9]+\.(\.\.?)?\s*	return "MOVENUMBER";


[0-9]				return "DIGIT";
[a-zA-Z]			return "LETTER";
"("					return "(";
")"					return ")";
"["					return "[";
"]"					return "]";
"{"					return "{";
"}"					return "}";
"*"					return "*";
"."					return ".";
'"'					return "DQUOTE";
"$"					return "$";

//[\/;\?\-+!&=#,':<>\\_%]	return "SIGN";

\s+					return "BLANK";


.					return "SIGN";

<<EOF>>				{ SaveGame(yy); if(yy.complete) yy.complete( yylineno ); }


%%

/lex

%%

// Game independent productions

PdnFile          : 
	BLANK? Game (GameSeparator Game)* GameSeparator? ;

GameSeparator    : 
	"*" BLANK? | (Result BLANK?)+ ;

Game             : 
	(GameHeader GameBody?) { SaveGame(yy); } | GameBody { SaveGame(yy); }; 

GameHeader       : 
	PdnTag+ ;
	
GameBody         : 
	(GameMove | Variation | COMMENT | SETUP | NAG | MOVENUMBER })+ { EndGameBody(yy); };

GameMove         : 
	MOVENUMBER Move MOVESTRENGTH? { AddMoveNumber(yy,$1) }
		| Move MOVESTRENGTH? ;
	
Variation        : 
	Variation1 Variation2 ; 

Variation1        : 
	"(" BLANK? { StartVariation(yy); }; 

Variation2        : 
	GameBody ")" BLANK?; 

PdnTag           : 
	"[" IDENTIFIER BLANK STRING "]" BLANK? { AddTag(yy,$2,$4); };
	
Move		:
	ELLIPSE BLANK? | MOVERATE BLANK? | MOVECHARS BLANK? { AddMove(yy,$1); } ;

Square           : 
	ALPHASQUARE | NUMSQUARE ;
	
COMMENT:
	"{" COMMENTCHARS "}" BLANK? { AddComment(yy,$2.join('').replace(/\s+/g,' ')); };
	
COMMENTCHARS:
	COMMENTCHAR* ;

COMMENTCHAR:
	"{" | BLANK | SAFECHAR | "." | "(" | ")" | "[" | "]" | "*" | "$" | DQUOTE | MOVERATE | MOVENUMBER | CompactResult | JUSTCHARS;	
	
Result           :
	CompactResult BLANK? ; 

CompactResult           : 
	Result1 | Result2 | DOUBLEFORFEIT ;
	
Result1          : 
	WIN1 | DRAW1 | LOSS1 ;
	
Result2          : 
	WIN2 | DRAW2 | LOSS2 ;

MOVECHARS	:
	(SAFECHAR | JUSTCHARS) MOVECHARS2 { $$ = $1 + $2; };

MOVECHARS2	:
	MOVECHAR+ { $$ = $1.join(''); };
	
MOVECHAR:
	SAFECHAR | "*" | "." | "$" | MOVERATE | MOVENUMBER | CompactResult | JUSTCHARS;


IDENTIFIER:
	LETTER (LETTER | DIGIT)* { $$ = $1 + $2.join(''); };
	
STRINGCHAR:
	SAFECHAR | BLANK | "*" | "." | "(" | ")" | "{" | "}" |  "[" | "]" | "$" | MOVERATE | MOVENUMBER | CompactResult | JUSTCHARS;
	
SAFECHAR:
	LETTER | DIGIT | SIGN ;
	
STRING:
	DQUOTE STRINGCHAR* DQUOTE { $$ = $2.join('') };

NAG: 
	"$" DIGIT+ BLANK? { AddNAG(yy,$2.join('')); } ;
	
ELLIPSE:
	"." "." ".";


%%
