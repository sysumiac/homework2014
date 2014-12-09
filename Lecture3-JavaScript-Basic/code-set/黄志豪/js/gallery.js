(function() {
	'use strict'

	// onload function will fire when the document is loaded completely
	window.onload = function() {
		var button = document.getElementById('show');
		var closeButton = document.getElementById('close-button');
		var loadContent = document.getElementById('load-content');

		button.addEventListener('click', toShow, false);
		closeButton.addEventListener('click', HideOrShow, false);
		loadContent.addEventListener('click', SeeOrNot, false);
		console.log("Successfully!");
	}

	// function A，B and C is called when you click corresponding element.You should rename these functions to make them more meaningful
	function toShow() {
		var temp = this.className;
		var target = document.getElementById("box");
		if (temp === "hide") {
			target.style.display = "block";
			this.className = "show";
			this.innerHTML = "hide";
			var tag = target.getElementsByTagName("span")[0];
			tag && target.removeChild(tag);
		} else {
			this.className = "hide";
			target.style.display = "none";
			this.innerHTML = "show";
		}
	}

	function HideOrShow(situation) {
		var temp = document.getElementById("show");
		situation.className = "hide";
		situation.innerHTML = "show";
		var changing = document.getElementById("box");
		box.style.display = "none";
		situation.innerHTML = "show";
	}

	function SeeOrNot() {
		var target = document.getElementById("box");
		var invision = document.createElement("span");
		var text = document.createTextNode("I can see you~");
		invision.appendChild(text);
		0 === target.getElementsByTagName("span").length && target.appendChild(invision);
	}

})();
