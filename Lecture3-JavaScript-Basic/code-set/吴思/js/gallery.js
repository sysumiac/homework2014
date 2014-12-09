(function() {
	'use strict'
	
	// onload function will fire when the document is loaded completely
	window.onload = function() {
		var button = document.getElementById('show');
		var closeButton = document.getElementById('close-button');
		var loadContent = document.getElementById('load-content');

		button.addEventListener('click', OnClickButton, false);
		closeButton.addEventListener('click', OnClickCloseButton, false);
		loadContent.addEventListener('click', OnClickLoadContent, false);
	}

	// function A，B and C is called when you click corresponding element.You should rename these functions to make them more meaningful
	function OnClickButton() {
	    if(document.getElementById('box').style.display == 'none'){
        document.getElementById('show').innerHTML = 'hide';
        document.getElementById('box').style.display = 'block';
        }else{
        document.getElementById('show').innerHTML = 'show';
        document.getElementById('box').style.display = 'none';
        }
        var parent=document.getElementById('box');
        parent.lastChild.innerHTML='';
	}

	function OnClickCloseButton() {
		document.getElementById('box').style.display='none';
		document.getElementById('show').innerHTML = 'show';
        var parent=document.getElementById('box');
        parent.lastChild.innerHTML='';
	}

	function OnClickLoadContent() {
		var parent=document.getElementById('box');
		if(parent.lastChild.innerHTML=='') {
		var child=document.createElement('textbox');
        var node=document.createTextNode('零基础做的好心累╮(╯▽╰)╭');
        child.appendChild(node);
        parent.appendChild(child);
        document.getElementById("load-content").disabled=true;
        }
	}

})();