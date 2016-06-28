define([
	'jquery',
	'./page.hbs',
	'./page.scss'
], function ($, tmpl){
	var store = { nothing : "nothing"};
	
	function build() {
		$('body').html(tmpl());
	}
	
	return {
		build : function () {
			build();	
		}
	}
});