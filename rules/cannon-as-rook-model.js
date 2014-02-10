
(function() {
	
	var SuperCbDefine = Model.Game.cbDefine;
	
	Model.Game.cbDefine = function() {
		/* 
		 * Add rules modifications after calling the regular cbDefine method.
		 * If rule changes are important it is more convenient to rewrite the entire cbDefine method.
		 */ 
		var specs=SuperCbDefine.call(this);
		specs.pieceTypes[6].graph = this.cbXQCannonGraph(specs.geometry);
		return specs;
	}
	
})();