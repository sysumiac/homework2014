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
		var box = document.getElementById('box');
		var button = document.getElementById('show');
		if (button.className == "hide") {
			button.innerHTML = "hide";
			button.className = "show";
			box.style.display="block";
			var a = box.getElementsByTagName("span")[0];
			box.removeChild(a);
		}
		else {
			var box = document.getElementById('box');
			button.innerHTML = "show";
			button.className = "hide";
			box.style.display="none";
		}
	}

	function B() {
		var box = document.getElementById('box');
		var button = document.getElementById('show');
		button.innerHTML = "show";
		button.className = "hide";
		box.style.display="none";
	}

	function C() {
		var span = document.createElement("span");
		var text = document.createTextNode("Hello World!");
		var box = document.getElementById("box");
		span.appendChild(text);
		if (box.getElementsByTagName("span").length === 0) {
			box.appendChild(span);
		}
	}

})();
