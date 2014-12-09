(function() {
	'use strict'

	// onload function will fire when the document is loaded completely
	window.onload = function() {
		var button = document.getElementById('show');
		var closeButton = document.getElementById('close-button');
		var loadContent = document.getElementById('load-content');

		button.addEventListener('click', A, false);
		closeButton.addEventListener('click', B, false);
		loadContent.addEventListener('click', C, false);ss
	}

	// function A，B and C is called when you click corresponding element.You should rename these functions to make them more meaningful
	function A() {
		var button = document.getElementById('box');
		var node = document.getElementById("content");
		if (button.style.display != 'block') {
			button.style.display = 'block';
			document.getElementById("show").innerHTML = "hide";
		} else {
			button.style.display = 'none';
			document.getElementById("show").innerHTML = "show";
		}
		node.innerHTML = "";
	}

	function B() {
		document.getElementById('box').style.display = "none";
		document.getElementById('show').innerHTML = "show";
		var node = document.getElementById("content");
		node.innerHTML = "";
	}

	function C() {
		var box = document.getElementById("box");
		var text = document.getElementById("content");
		box.removeChild(text);
		var node = document.createElement("span");
		node.innerHTML = "_(:3」∠)_";
		node.id = "content";
		box.appendChild(node);
	}

})();

