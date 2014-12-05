(function() {
	'use strict'

	// onload function will fire when the document is loaded completely
	window.onload = function() {
		var button = document.getElementById('show');
		var closeButton = document.getElementById('close-button');
		var loadContent = document.getElementById('load-content');

		button.addEventListener('click', A, false);
		closeButton.addEventListener('click', B, false);
		loadContent.addEventListener('click', C, false);
	}

	// function A，B and C is called when you click corresponding element.You should rename these functions to make them more meaningful
	function A() {
		//...
		alert(234234);
		console.log(32123);
	}

	function B() {
		//...
	}

	function C() {
		//...
	}

})();
