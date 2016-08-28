# RiojaSlider v0.1
**jQuery Plugin Slider**

##Context
Coded to fulfill my need of obtaining a plugin slider which doesn't need to reload everything everytime i need to add a new slide dynamically (for AJAX purpose principally).
There are some options and methods that I'm going to explain below;

##Options

**height**  
Slider height.  
Default: '100%'  
Values: `CSS size syntax`  

**width**  
Slider width.  
Default: '100%'  
Values: `CSS size syntax`  

**startSlide**  
Starting slide.  
Default: 0  
Values: `Int`  

**slideSpeed**  
Animation time duration for slide transition in ms.  
Default: 1000  
Values: `Int`  

**slideEasing**  
Animation easing for slide transition in ms.  
Default: 'swing'  
Values: `Int`  

**prevContent**  
HTML content of `PREV` control.  
Default: 'Prev'  
Values: `HTML`  

**nextContent**  
HTML content of `NEXT` control.  
Default: 'Next'  
Values: `HTML`  

**infiniteLoop**  
When slider arrives to last/first slide and request for next/prev slide returns first/last slide.  
Default: false  
Values: `Boolean`  

**multipleClicks**  
Let the user click controls like mad.  
Default: false  
Values: `Boolean`  

**sliderMode**  
Mode in which the slides will be presented, actually there is only one mode.  
Default: 'horizontal'  
Values: 'horizontal'  

**controls**  
Load controls `NEXT` and `PREV`  
Default: true  
Values: `Boolean`  

**auto**  
Slides will transition automatically.  
Default: false  
Values: `Boolean`  

**autoPause**  
Time in ms between slides in auto mode.  
Default: 4000  
Values: `Int`  

**stopAutoOnControl**  
When user uses controls and slide is in auto mode, it stops automatically animations.  
Default: true  
Values: `Boolean`  

**stopAutoTime**  
Time in ms to wait until start auto mode again when stopAutoOnControl is triggered  
Default: 200  
Values: `Int`  


##Methods
To use a method you just have to initilizate the Slider into a varible like that:
```javascript
	var slider = $('#slider').riojaSlider({
		height: '402px',
		width: '720px'
	})
```
And then you can call any method from the `slider` var.  

There some methods very usefull to modificiate the slider behavior, and others that are more intended to the core code. Anyways all them are disponible to use.  

**appendSlide**  
Adds a new slide to the end.
Params: (SlideContent)
  
**prependSlide**  
Adds a new slide to the start.
Params: (SlideContent)
  
**showSlide**  
Moves to the indicated slide.
Params: ((SlideIndex|SlideObject))
  
**showNextSlide**
Moves to the next slide.  
  
**showPrevSlide**  
Moves to the prev slide.  
  
**showNextSlideOnFiniteSlider**  
On finite sliders it moves to the last slide and then come backs to the first starting the process again.  
  
**getSlide**  
Returns slide object.  
Params: (SlideIndex)
  
**renderSlide**  
Renders slide in correct position, actually it's not really needed when running the slides, but it helps when initializing first slide.  
Params: ((SlideIndex|SlideObject))  
  
**autoSlider**  
Starts auto slides animation.  
  
**pauseAuto**  
Pause auto slides animation.   
  
**bindControls**  
Bind behaviours to PREV NEXT controls.  
  
**buildCustomElement**  
Create custom object element.  
Params: `Object`
```javascript
{
	element: DOM element reference,
	name: 'nameOfTheElement',
	index: `Int`, //If the name is 'slide' it can have a index attribute
	css: {
		cssProperty: 'value1',
		cssProperty2: 'value2'
	},
	attributes: {
	  'data-attribute':'value of data-attribute'
  }
}
```
  
**setSateReady**  
Sets slider state to `ready`. The state determinates if a transition can be executed or not.
  
