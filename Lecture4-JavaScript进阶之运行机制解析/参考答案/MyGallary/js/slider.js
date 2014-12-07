/*
 * Author: yuanzm
 * Document Fcuntion: Slider
 * Last-Edit-Date: 2014/12/5
 */
;(function () {
	'use strict';

	//声明一些变量	
	var imgs = document.getElementsByTagName('img'),
		photoBack = document.getElementById('photo-back'),
		photo = document.getElementById('photo'),
		showDiv = document.getElementById('show-div'),
		first = document.getElementById('first'),
		previous = document.getElementById('previous'),
		start = document.getElementById('start'),
		last = document.getElementById('last'),
		next = document.getElementById('next'),
		closeButton = document.getElementById('close-button'),
		isLoadPic = false,
		isStop = false,
		images = [];

	//页面加载完成的时候执行这段函数--slider应用的入口
	window.onload = function() {
		for(var i = 0;i < imgs.length;i++) {
			var clonePic = imgs[i].cloneNode(true);
			images.push(clonePic);
		}
		var loadSlider = new LoadSlider(images);
		loadSlider.bindEvent(loadSlider);
		for(var i = 0; i < imgs.length;i++) {
			imgs[i].addEventListener('click', function(num) {
				return function() {
					loadSlider.init(num);
				}
			}(i), false);
		}
	}


	/*
	 * 用于获取元素的样式属性值
	 * @elem: 需要获取属性的元素
	 * @attr: 需要获取的属性
	 * @return：元素对应的属性
	 */
	function attrStyle(elem,attr){
		if(elem.style[attr]){
			//若样式存在于html中,优先获取
			return elem.style[attr];
		}else if(elem.currentStyle){
			//IE下获取CSS属性最终样式(同于CSS优先级)
			return elem.currentStyle[attr];
		}else if(document.defaultView && document.defaultView.getComputedStyle){
			//W3C标准方法获取CSS属性最终样式(同SS优先级)
			//注意,此法属性原格式(text-align)获取的,故要转换一下
			attr=attr.replace(/([A-Z])/g,'-$1').toLowerCase();
			//获取样式对象并获取属性值
			return document.defaultView.getComputedStyle(elem,null).getPropertyValue(attr);
		}else{
			return null;
		}
	}
	/* 
	 * JavaScript的动画算法分成两种，一种是基于时间的，一种是基于帧的。本质都是在给定的时间内，每隔一段时间(帧)去执行某个函数。
	 * 基于帧的JavaScript根据帧率去重绘画面，也就是如果帧率是60ms，那么每隔16.7ms就会重绘画面一次。
	 * 但主要缺陷是JavaScript计时器很不准确，也就是你不能保证下一次执行这个函数确实是在16.7ms之后，那么效果就很差了。
	 * 而基于时间的动画算法，对于每一帧，如果时间超过我们设置的每一帧的时间(设备性能不同所置)，我们将这段时间分片，
	 * 也就是保证了每一帧都是切实按照实际每帧时间执行的，消除了设备的因素。
	 * @param obj: 需要进行操作的对象
	 * @param attr: 动画中变化的属性
	 * @param fps: 帧率，通常设置成60，公认的适合做动画的帧率，为整数类型值
	 * @endAttr: 属性的最终值，为浮点数或者整数
	 * @durantion: 执行动画的时间
	 * @return: undefined
	 */
	function AnimationBaseTime(obj, attr, fps, endAttr, durantion, callback) {
		var objAttr = attrStyle(obj, attr),
			startAttr = parseFloat(attrStyle(obj, attr)),
			// pattern = /[a-zA-Z]+/gi,
			// attrUnit = pattern.test(objAttr)? String(attrStyle(obj, attr)).replace(/\d+/g, ' ').trim():'',
			dt = 1000 / 60,
			totalAnimationFrame = durantion / dt,
			endAttr = parseFloat(endAttr),
			perStepChange = (endAttr - startAttr) / totalAnimationFrame,
			acc = 0,
			current = new Date(),
			previous = new Date(),
			flag = 1;

		if (startAttr > endAttr) {
			flag = -1;
		}

		function loop() {
			var current = new Date();
			var passed = current - previous;
			previous = current;
			acc += passed;
			while(acc >= dt) {
				update(dt);
				acc -= dt;
			}
			paint();
		}
		function update(dt) {
			startAttr += perStepChange;
			if (flag == 1 && (startAttr - endAttr > 0) ) {
					clearInterval(action);
			} else if(flag == -1 && (endAttr - startAttr > 0)){
				if (endAttr - startAttr > 0) {
					clearInterval(action);
				}
			}
		}
		function paint() {
			obj.style[attr] = String(startAttr);
		}
		var action = setInterval(loop, 1000 / fps);
		var nextAnimation = setTimeout(callback, durantion);
	}
	/*
	 * 此函数实现图片的幻灯片的播放
	 * @imgs: 需要进行幻灯片播放的图片，参数类型为类数组或者数组
	 * @duration: 每一张图片显示或者消失需要的时间，参数类型为毫秒
	 * @stayTime: 每一张图片停留的时间
	 * @return: undefined
	 */
	function Slider(imgs, duration, stayTime, currentIndex){
		this.imgs = imgs;
		this.duration = duration;
		this.stayTime = stayTime;
		this.currentIndex = currentIndex;
		this.loop = null;
	}

	Slider.prototype = {
		constructor: Slider,
		init: function() {
			this.setPicInitialOpacity();
			this.loop = setInterval(this.loopPic, (this.duration + this.stayTime), this);
		},
		setPicInitialOpacity: function() {
			for(var i = 0;i < this.imgs.length; i++) {
				if(i == this.currentIndex) {
					this.imgs[i].style.opacity = 1;
				} else {
					this.imgs[i].style.opacity = 0;
				}
			}
		},
		getNextPicIndex: function() {
			var nextIndex = this.currentIndex + 1;
			if (nextIndex == this.imgs.length) {
				nextIndex = 0
			}
			return nextIndex;
		},
		loopPic: function(that) {
			var nextIndex = that.getNextPicIndex();
			AnimationBaseTime(that.imgs[nextIndex], 'opacity', 60, 1, that.duration);
			AnimationBaseTime(that.imgs[that.currentIndex], 'opacity', 60, 0, that.duration);
			that.currentIndex = nextIndex;
		},
		stop: function() {
			clearInterval(this.loop);
		}
	}

	/*
	 * 点击页面上面的任意一张图片，显示遮罩层
	 * @images: 需要播放的图片
	 * @return: undefined
	 */
	function LoadSlider(images) {
		this.images = images;
		this.num = 0;
		this.slider = new Slider(images, 3000, 1000, 0);
	}
	LoadSlider.prototype = {
		constructor: LoadSlider,
		init: function(num) {
			this.num = num;
			this.loadPic(num);
		},
		bindEvent: function() {
			var that = this;
			start.addEventListener('click', function() {
				that.toggleSlider(that);
			} , false);
			next.addEventListener('click', function() {
				that.nextPic(that);
			}, false);
			previous.addEventListener('click', function() {
				that.previousPic(that);
			},false);
			last.addEventListener('click', function() {
				that.lastPic(that);
			}, false);
			first.addEventListener('click', function() {
				that.firstPic(that);
			}, false);
			photoBack.addEventListener('click',function() {
				that.removeLoad(that);
			} , false);
			closeButton.addEventListener('click', function() {
				that.removeLoad(that);
			}, false);
			window.addEventListener('keydown', function(event) {
				if (photo.className.indexOf('hide') == -1) {
					if (event.which === 32){
						that.toggleSlider(that);
					}
					if (event.which === 37) {
						that.previousPic(that);
					}
					if (event.which === 38) {
						that.firstPic(that);
					}
					if (event.which === 39) {
						that.nextPic(that);
					}
					if (event.which === 40) {
						that.lastPic(that);
					}
					if (event.which === 27) {
						that.removeLoad(that);
					}
				}
			}, false)
		},
		loadPic: function(picIndex) {
			photoBack.className = ' ';
			photo.className = ' ';
			showDiv.className = ' ';
			for(var i = 0;i < this.images.length;i++) {
				if(i == picIndex) {
					this.images[i].style.opacity = 1;
				} else {
					this.images[i].style.opacity = 0;
				}
			}
			//如果关掉幻灯片后再次打开幻灯片，不需要重新加载图片
			if (isLoadPic == false) {
				for(var i = 0;i < this.images.length;i++) {
					photo.appendChild(this.images[i]);
					if (i == this.images.length - 1) {
						isLoadPic = true;
					}
				}
			}
		},
		removeLoad: function(that) {
			photoBack.className = "hide";
			photo.className = "hide";
			showDiv.className = "hide";
			that.slider.stop();
			that.slider.currentIndex = 0;
			start.removeEventListener()
			start.className = start.className.replace('started',' ').replace('stop', ' ').trim();
			isStop = false;
		},
		stop: function() {
			this.slider.stop();
			isStop = true;
		},
		startSlider: function(that) {
			if (isStop == false) {
				that.slider.currentIndex = that.num;
			}
			start.className += ' started stop';
			that.slider.init();
		},
		pauseSlider: function(that) {
			that.stop();
			start.className = start.className.replace('started',' ').replace('stop', ' ').trim();
		},
		toggleSlider: function(that) {
			if(start.className.indexOf('started') == -1) {
				that.startSlider(that)
			} else {
				that.pauseSlider(that);
			}
		},
		changePic: function(that, currentPicIndex) {
			that.loadPic(currentPicIndex);
			that.slider.currentIndex = currentPicIndex;
		},
		nextPic: function(that) {
			that.pauseSlider(that);
			var index = that.slider.currentIndex;
			if (index == that.images.length - 1) {
				index = 0;
			}
			var currentPicIndex = index + 1;
			that.changePic(that, currentPicIndex);
		},
		previousPic: function(that) {
			that.pauseSlider(that);
			var index = that.slider.currentIndex;
			if (index == 0) {
				index = that.images.length - 1;
			}
			var currentPicIndex = index - 1;
			that.changePic(that, currentPicIndex);
		},
		lastPic: function(that) {
			that.pauseSlider(that);
			var currentPicIndex = that.images.length - 1;
			that.changePic(that, currentPicIndex);
		},
		firstPic: function(that) {
			that.pauseSlider(that);
			var currentPicIndex = 0;
			that.changePic(that, currentPicIndex);
		}
	}
})()
