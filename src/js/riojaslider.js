/**
 * RiojaSlider 0.1v
 *
 * Copyright 2016, Gerard Rodes https://github.com/GerardRodes
 *
 * Released under the MIT license - http://opensource.org/licenses/MIT
 */

(function($){

	var cssClasses = {
		wrapper: 'slider-wrapper',
		viewport: 'viewport',
		slider: 'slider',
		slide: 'slide',
		controls: 'controls',
		prev: 'prev',
		next: 'next'
	};

	var defaultOptions = {
		height: '100%',
		width: '100%',
		startSlide: 0,
		slideSpeed: 1000,
		slideEasing: 'swing',
		prevContent: 'Prev',
		nextContent: 'Next',
		infiniteLoop: false,
		multipleClicks: false,
		sliderMode: 'horizontal',
		controls: true,
		auto: false,
		autoPause: 4000,
		stopAutoOnControl: true,
		stopAutoTime: 2000
	}

	$.fn.extend({
	  riojaSlider: function(customOptions) {

	  	var options = $.extend({},defaultOptions,customOptions);

	  	if(this.length > 1){
	  		var sliders = [];
	  		this.each(function(){ sliders.push(initSlide(this,options)) })
	  		return sliders;
	  	} else {
	      return initSlide(this,options);
	  	}
	  }
	});

	var initSlide = function(sliderWrapper,options){

		var slider = new RiojaSlider(sliderWrapper,options);


		slider.init()

		return slider;
	}

	var RiojaSlider = function(wrapper,options){

		var mainObj = this;

		this.state = null;

		this.elements = {
			slider: {
				dom: $(wrapper),
				custom: null
			},
			slides: {
				dom: $(wrapper).children(),
				total:$(wrapper).children().length,
				actual: {
					index: options.startSlide,
					element: null
				},
				custom: []
			}
		};

		this.customElements = {
			name: "wrapper",
			element: null,
			children: [
				{
					name: "viewport",
					element: null,
					css: {
						overflow:'hidden',
						position: 'relative',
						width:options.width,
						height: options.height
					},
					children: [
						{
							name: "slider",
							css: {
								margin: 0,
								padding: 0,
								listStyle: 'none'
							},
							element: this.elements.slider.dom,
							children: $.makeArray(this.elements.slides.dom.map(function(i,el){
								return {
									element: $(el),
									name: 'slide',
									index: i,
									css: {
										position: 'absolute',
										top: 0,
										left: '100%'
									},
									attributes: {'data-index':i}
								}
							}))
						}
					]
				},
				{
					name: "controls",
					condition: options.controls,
					element: null,
					children: [
						{
							name: 'prev',
							content: options.prevContent
						},
						{
							name: 'next',
							content: options.nextContent
						}
					]
				}
			]
		};

		this.sliderMode = {
			horizontal: function(slideToShow,slides,viewportWidth,indexToShow,actualIndex,control,slidesLength){
				var animationOptions = {
							duration: options.slideSpeed,
							easing: options.slideEasing,
							queue: false
						},
						position;

				mainObj.state = "inTransition";
				$.each(slides,function(i,slide){
					position = undefined;
					if(i+1 == slidesLength){
						animationOptions.done = mainObj.setStateReady
					} else if(options.infiniteLoop && i == indexToShow) {
						animationOptions.done = mainObj.setStateReady
					}else {
						animationOptions.done = undefined;
					}

					if(options.infiniteLoop){
						if(control == 'Next'){
							if(slide.index == indexToShow){
								slideToShow.element.css({left:viewportWidth})
								position = 0;
							} else if (slide.index == actualIndex) {
								position = -viewportWidth;
							} else {
								slide.element.css({left:-viewportWidth})
							}
						} else if (control == 'Prev'){
							if(slide.index == indexToShow){
								slideToShow.element.css({left:-viewportWidth})
								position = 0;
							} else if (slide.index == actualIndex) {
								position = viewportWidth;
							} else {
								slide.element.css({left:viewportWidth})
							}
						}
					} else {
						position = (slide.index - indexToShow) * viewportWidth;
					}

					if (position != undefined){
						slide.element.animate({left: position},animationOptions)
					}
				})
				mainObj.elements.slides.actual.index = indexToShow;
				mainObj.elements.slides.actual.element = slideToShow;
			}
		}

		this.interval = {
			lastMove: 'Next'
		}

		this.init = function(){
			this.setStateReady()
			this.buildCustomElement();
			this.elements.viewport.width = this.elements.viewport.custom.element.width();
			this.elements.viewport.height = this.elements.viewport.custom.element.height();

			$.each(mainObj.elements.slides.custom,function(i, slide){
				mainObj.renderSlide(slide)
			})
			this.showSlide(options.startSlide);

			if(options.controls){
				this.bindControls();
			}

			mainObj.setStateReady();

			if(options.auto){
				this.autoSlider();
			}
		};

		/*
			Set state to ready if there is no pending actions
			Executes pending actions until complete all
		*/
		this.setStateReady = function(){
			mainObj.state = 'ready';
		}

		this.stateReady = function(){
			return mainObj.state == 'ready';
		}

		this.autoSlider = function(){
			setTimeout(function(){
				mainObj.showNextSlideOnFiniteSlider();
				mainObj.interval.reference = setInterval(mainObj.showNextSlideOnFiniteSlider, options.autoPause + options.slideSpeed);
			}, options.autoPause);
		}

		this.pauseAuto = function(){
			clearInterval(mainObj.interval.reference);
			if(mainObj.interval.pause != undefined){
				clearTimeout(mainObj.interval.pause);
			}
			mainObj.interval.pause = setTimeout(mainObj.autoSlider, options.stopAutoTime);
		}

		this.bindControls = function(){
			this.elements.prev.custom.element.on('click',function(){
				if(options.stopAutoOnControl && options.auto){
					mainObj.pauseAuto();
				}
				if (options.multipleClicks) {
					mainObj.showPrevSlide()
				} else if(mainObj.stateReady()){
					mainObj.showPrevSlide()
				}
			});
			this.elements.next.custom.element.on('click',function(){
				if(options.stopAutoOnControl && options.auto){
					mainObj.pauseAuto();
				}
				if (options.multipleClicks) {
					mainObj.showNextSlide()
				} else if(mainObj.stateReady()){
					mainObj.showNextSlide()
				}
			});
		}

		this.showNextSlideOnFiniteSlider = function(){
			if(options.infiniteLoop){
				mainObj.showNextSlide();
			} else {

				if(mainObj.interval.lastMove == 'Next'){
					if(mainObj.showNextSlide()){
						mainObj.interval.lastMove = 'Next';
					} else {
						mainObj.showPrevSlide()
						mainObj.interval.lastMove = 'Prev';
					}
				} else if(mainObj.interval.lastMove == 'Prev'){
					if(mainObj.showPrevSlide()){
						mainObj.interval.lastMove = 'Prev';
					} else {
						mainObj.showNextSlide()
						mainObj.interval.lastMove = 'Next';
					}
				}

			}
		}

		this.showPrevSlide = function(){
			var actual = mainObj.elements.slides.actual.index,
					prevIndex;

			if(options.infiniteLoop){
				prevIndex = actual > 0 ? actual - 1 : mainObj.elements.slides.total - 1;
				mainObj.showSlide(prevIndex,"Prev");
			} else if(actual > 0) {
				mainObj.showSlide(actual - 1,"Prev");
			} else {
				return false;
			}

			return true;
		}

		this.showNextSlide = function(){
			var actual = mainObj.elements.slides.actual.index,
					nextIndex;

			if(options.infiniteLoop){
				nextIndex = actual < ( mainObj.elements.slides.total - 1 ) ? actual + 1 : 0;
				mainObj.showSlide(nextIndex,"Next");
			} else if ( actual < ( mainObj.elements.slides.total - 1 ) ) {
				mainObj.showSlide(actual + 1,"Next");
			} else {
				return false;
			}

			return true;
		}

		this.renderSlide = function(slideToRender){
			var index = typeof slideToRender == 'number' ? slideToRender : slideToRender.index,
					slide = typeof slideToRender == 'number' ? mainObj.getSlide(slideToRender) : slideToRender;

			slide.element.css({left:mainObj.elements.viewport.width * index})
		}

		this.showSlide = function(slideToShow,control){
			var indexToShow = typeof slideToShow == 'number' ? slideToShow : slideToShow.index,
					slide = typeof slideToShow == 'number' ? mainObj.getSlide(slideToShow) : slideToShow,
					slides = mainObj.elements.slides.custom,
					slidesLength = mainObj.elements.slides.total,
					viewportWidth = mainObj.elements.viewport.width,
					actualIndex = mainObj.elements.slides.actual.index;

			mainObj.sliderMode[options.sliderMode](slide,slides,viewportWidth,indexToShow,actualIndex,control,slidesLength);

		}

		this.getSlide = function(index){
			return $.grep(this.elements.slides.custom,function(slide){ return slide.index == index })[0];
		}

		this.appendSlide = function(html){
			var totalSlides = mainObj.elements.slides.total,
					actualSlideIndex = mainObj.elements.slides.actual.index,
					viewportWidth = mainObj.elements.viewport.width,
					newSlide = mainObj.buildCustomElement({
						element: $(document.createElement('LI')).html(html),
						name: 'slide',
						index: totalSlides,
						css: {
							position: 'absolute',
							top: 0,
							left: (totalSlides - actualSlideIndex) * viewportWidth
						},
						attributes: {'data-index':totalSlides}
					})

			mainObj.elements.slider.custom.element.append(newSlide.element)
			mainObj.elements.slider.custom.children.push(newSlide.element)
			mainObj.elements.slides.dom = mainObj.elements.slider.custom.element.children();
			mainObj.elements.slides.total++;
		}

		this.prependSlide = function(html){

			var actualSlideIndex = mainObj.elements.slides.actual.index,
					viewportWidth = mainObj.elements.viewport.width,
					newSlide = mainObj.buildCustomElement({
						element: $(document.createElement('LI')).html(html),
						name: 'slide',
						index: 0,
						css: {
							position: 'absolute',
							top: 0,
							left: (actualSlideIndex * viewportWidth * -1) - viewportWidth
						},
						attributes: {'data-index':0}
					})
		
			mainObj.elements.slider.custom.element.prepend(newSlide.element)
			mainObj.elements.slider.custom.children.unshift(newSlide.element)

			$.each(mainObj.elements.slides.custom,function(i,slide){
				mainObj.elements.slider.custom.children[i].index = i;
				mainObj.elements.slides.custom[i].index = i;
				mainObj.elements.slides.custom[i].attributes['data-index'] = i;
				mainObj.elements.slides.custom[i].element.attr('data-index',i)
			})

			mainObj.elements.slides.dom = mainObj.elements.slider.custom.element.children();
			mainObj.elements.slides.actual.index += 1;
			mainObj.elements.slides.total += 1;
		}

		/*
			Builds all the extra HTML
		*/
		this.buildCustomElement = function(optionalElement){

			var elementToProcess = optionalElement === undefined ? this.customElements : optionalElement,
					isRoot = optionalElement === undefined ? true : false;

			if(elementToProcess.condition != undefined){
				if(!elementToProcess.condition){
					return false;
				}
			}

			if (elementToProcess.element == null || elementToProcess.element == undefined){
				elementToProcess.element = $(document.createElement('DIV'));
				if(isRoot){
					mainObj.elements.slider.dom.replaceWith(elementToProcess.element);
				}
			}
			elementToProcess.element.addClass(cssClasses[elementToProcess.name]);

			if (elementToProcess.attributes != undefined){
				$.each(elementToProcess.attributes,function(attr,value){
					$(elementToProcess.element).attr(attr,value);
				})
			}

			if (elementToProcess.css != undefined){
				$(elementToProcess.element).css(elementToProcess.css);
			}

			if (elementToProcess.content != undefined){
				$(elementToProcess.element).html(elementToProcess.content);
			}


			if(elementToProcess.name == 'slide'){
				if(elementToProcess.index == 0 && mainObj.elements.slides.custom.length > 0){
					mainObj.elements.slides.custom.unshift(elementToProcess)
				} else {
					mainObj.elements.slides.custom.push(elementToProcess)
				}
				$(elementToProcess.element).css({
					minWidth: mainObj.elements.viewport.custom.css.width,
					minHeight: mainObj.elements.viewport.custom.css.heigh
				});
			} else {
				if(mainObj.elements[elementToProcess.name] === undefined){
					mainObj.elements[elementToProcess.name] = {}
				}
				mainObj.elements[elementToProcess.name].custom = elementToProcess;
			}

			if ('children' in elementToProcess) {
				$.each(elementToProcess.children,function(i,el){
					elementToProcess.element.append(mainObj.buildCustomElement(el).element);
				})
			}

			return elementToProcess;
		}

	}

})(jQuery);