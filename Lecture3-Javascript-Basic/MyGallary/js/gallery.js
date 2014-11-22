(function() {
	'use strict'

	window.onload = function() {
		var button = document.getElementById('show');
		var closeButton = document.getElementById('close-button');
		var loadContent = document.getElementById('load-content');

		button.addEventListener('click', toggleBox, false);
		closeButton.addEventListener('click', removeBox, false);
		loadContent.addEventListener('click', loadText, false);
	}

	function styleButton(button, needHide) {
		var box = document.getElementById('box');
		if(needHide) {
			button.className = 'show'
			box.style.display = 'block';
			button.innerHTML = 'hide';
			var spanText = box.getElementsByTagName('span')[0];
			if(spanText) {
				box.removeChild(spanText);				
			}
		} else {
			button.className = 'hide';
			box.style.display = 'none';
			button.innerHTML = 'show';
		}
	}

	function toggleBox() {
		var className = this.className;
		if(className === 'hide') {
			styleButton(this, true)
		} else {
			styleButton(this, false);
		}
	}

	function removeBox() {
		var button = document.getElementById('show');
		styleButton(button,false);
	}

	function loadText() {
		var box = document.getElementById('box');
		var contentBox = document.createElement('span')
		var textNode = document.createTextNode('You can not see me~');
		contentBox.appendChild(textNode)
		box.appendChild(contentBox);
	}
})();
