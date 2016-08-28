# RiojaSlider v0.1
**jQuery Plugin Slider**

##Context
Coded to fulfill my need of obtaining a plugin slider which doesn't need to reload everything everytime i need to add a new slide dynamically (for AJAX purpose principally).
There are some options and methods that I'm going to explain below;

###Options

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
