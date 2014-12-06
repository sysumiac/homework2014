/*
 * Author: yuanzm
 * Last-Edit-Date: 2014/12/5
 */
;(function () {
	'use strict';

	//用户获取元素的样式属性值
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
	 *  
	 */
	function Slider(imgs, duration, frameDuration){
		this.imgs = imgs;
		this.duration = duration;
		this.frameDuration = frameDuration;
		this.currentIndex = 0;
		this.nextIndex;
	}

	Slider.prototype = {
		constructor: Slider,
		init: function() {
			this.setPicInitialOpacity();
			var loop = setInterval(this.loopPic, 3000, this);
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
			console.log(that)
			var nextIndex = that.getNextPicIndex();
			AnimationBaseTime(that.imgs[that.currentIndex], 'opacity', 60, 0, 3000);
			AnimationBaseTime(that.imgs[nextIndex], 'opacity', 60, 1, 3000);
			that.currentIndex = nextIndex;
		}
	}
	var imgs = document.getElementsByTagName('img');
	var slider = new Slider(imgs, 3000, 3000);
	slider.init();
})()
