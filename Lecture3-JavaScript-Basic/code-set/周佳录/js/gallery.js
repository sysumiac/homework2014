(function() {
	'use strict'
    var i = 1; 
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
		var button = document.getElementById('show');
		var box = document.getElementById('box');
		 if (i == 0) {
          	  var span= document.getElementById("span");
              box.removeChild(span);
              i = 1;
          }
		 if (box.style.display=='block'){  
             box.style.display='none';  
          } else {  
             box.style.display='block';  
          }
          if (button.innerHTML == "hide")
          	  button.innerHTML = "show";
          else
          	  button.innerHTML = "hide";
		//...
	}

	function B() {
		var button = document.getElementById('show');
		var box = document.getElementById('box');
        if (i == 0) {
        	 var span= document.getElementById("span");
             box.removeChild(span); 
             i = 1;
        } 
        box.style.display='none';  
        button.innerHTML = "show";
		//...
	}

	function C() {
		var para=document.createElement("span");
		para.id = "span";
        var node=document.createTextNode("生活就像海洋，只有意志坚强的人才能到达彼岸！");
        var element=document.getElementById("box");
            if (i) {
            	para.appendChild(node);
              i = 0;
              element.appendChild(para);

        }
        
		//...
	}

})();
