(function() {
	'use strict'
	var b = 0;
	// onload function will fire when the document is loaded completely
	window.onload = function() {
		var button = document.getElementById('show');
		var closeButton = document.getElementById('close-button');
		var loadContent = document.getElementById('load-content');

		button.addEventListener('click', SHOWORHIDE, false);
		closeButton.addEventListener('click', CLOSE, false);
		loadContent.addEventListener('click', ARROR, false);
	}

	// function A，B and C is called when you click corresponding element.You should rename these functions to make them more meaningful
	function SHOWORHIDE() {
		//...
    //alert("c");
    var a = document.getElementById('show'), d, c=document.getElementById("box");
    if (a.innerHTML === 'show'){
    	//alert("a");
    	a.innerHTML = 'hide';
    	a.className = "show";
	    c.style.display = "block";
		d = c.getElementsByTagName("span")[0];
		d && c.removeChild(d);
    } else {
    	//alert("b");
    	a.innerHTML = 'show';
    	a.className = "hide";
	    c.style.display = "none";
    }
	}

	function CLOSE() {
		//...
		//alert("c");
		var a = document.getElementById('show'), d, c=document.getElementById("box");
		a.innerHTML = 'show';
    	a.className = "hide";
	    c.style.display = "none";
	}

	function ARROR() {
		//...
		//alert("a");
        if (b == 0) {
        	//alert('b');
			var para = document.createElement("span"), node = document.createTextNode("great BM");
			para.appendChild(node);
			document.getElementById("box").appendChild(para);
			b = 1;
		}
	}

})();
		