/**
 * Prototype/Script.aculo.us Gallery
 * Adam Cox
 */
 
var iSlideShow = new Class.create();
var animInProgress = false;
iSlideShow.prototype = {
	
	initialize : function (oArgs){
		this.wait 			= oArgs.wait ? oArgs.wait : 4000;
		this.start 			= oArgs.start ? oArgs.start : 0;
		this.duration		= oArgs.duration ? oArgs.duration : 0.3;
		this.autostart		= (typeof(oArgs.autostart)=='undefined') ? true : oArgs.autostart;
		this.slides 		= $(oArgs.slides).getElementsByClassName('gallery_item');
		this.slideContainer	= oArgs.slides;
		this.runrandom		= (typeof(oArgs.runrandom)=='undefined') ? false : oArgs.runrandom;
		this.counter		= oArgs.counter;
		this.caption		= (typeof(oArgs.caption)=='undefined') ? false : oArgs.caption;
		this.captionOpacity	= oArgs.captionOpacity ? oArgs.captionOpacity : 0.8;
		this.animation 		= (typeof(oArgs.animation)=='undefined') ? 'fade' : oArgs.animation;
		this.carousel		= (typeof(oArgs.carousel)=='undefined') ? 'false' : oArgs.carousel;
		this.carouselOrientation		= (typeof(oArgs.carouselOrientation)=='undefined') ? 'false' : oArgs.carouselOrientation;
		this.imagegrid		= (typeof(oArgs.carousel)=='undefined') ? 'false' : oArgs.imagegrid;
		this.carouselPosition = (typeof(oArgs.carouselPosition)=='undefined') ? 'top' : oArgs.carouselPosition;
		this.instance		= (typeof(oArgs.instance)=='undefined') ? 'undefined' : oArgs.instance;
		this.controls		= (typeof(oArgs.controls)=='undefined') ? 'undefined' : oArgs.controls;
		this.ticker			= (typeof(oArgs.ticker)=='undefined') ? 'false' : oArgs.ticker;
		if(this.instance=='undefined'){
			alert('You need to specify the instance name.');
		}
		this.iImageId		= this.start;
		if ( this.slides ) {
			this.numOfImages	= this.slides.length;
			if ( !this.numOfImages ) {
				alert('No slides?');
			}
		}
		if ( this.autostart ) {
			this.startSlideShow();
		}
		if (this.runrandom) {
			var a,b;		
			// TODO - fix this bug - slice is called incorrectly, reorder the array randomly
			a = this.slides.slice( 0, 1);
			b = this.slides.slice( 1).sort(function() {return 0.5 - Math.random()})
			this.slides = a.concat( b);
		}
		if (this.ticker!='false'){
			var tickerWrapper = new Element('div', { id: "ticker_wrapper"});
			var ticker = new Element('ul', { id: "ticker"});
			var newParent = $(this.slideContainer);
			var mbplcForkHolder = $('narrativeContent');
			//newParent.insert({after: tickerWrapper});
			mbplcForkHolder.insert({bottom: tickerWrapper});
			tickerWrapper.insert(ticker);
			var className = "ticker_on";
			for ( var i=0, len=this.slides.length; i<len; ++i ){
				// set classes as off for all but first
				if(i>0){ className = "ticker_off"; }
				$('ticker').insert({ bottom: '<li id="ticker_item_' + i + '" class="' + className + '" onclick="'+ this.instance +'.goTo('+ i +'); return false;">Slide ' + (i+1) + '</li>' });
			}
		}
		if(this.carousel!='false'){
			// navigate through the items, extract items with class, move them to new container, add navigation link
			if(this.carouselOrientation=='HORIZONTAL'){
				var carouselWrapper = new Element('div', { id: "carousel_wrapper", style: 'display: none',  className: 'horizontal' });
				var carouselContainer = new Element('div', { id: "carousel", className: 'horizontal'});
				var carouselLeft = Builder.node('p', { id: 'scrollleft' }, Builder.node('a', { href: '#', onmouseover: 'scrollDivRight()', onmouseout: 'stopMe()' }, 'Left')); 
				var carouselRight = Builder.node('p', { id: 'scrollright'}, Builder.node('a', { href: '#', onmouseover: 'scrollDivLeft()', onmouseout: 'stopMe()' }, 'Right')); 
				var carouselControl = Builder.node('p', { id: 'show_carousel', className: 'closed'  }, Builder.node('a', { href: '#', onclick: 'toggleCarousel(); return false;' }, 'Pictures'));
			} else if (this.carouselOrientation=='VERTICAL'){
				var carouselWrapper = new Element('div', { id: "carousel_wrapper", style: 'display: none' ,  className: 'vertical'});
				var carouselContainer = new Element('div', { id: "carousel", className: 'vertical'});
				var carouselLeft = Builder.node('p', { id: 'scrollup' }, Builder.node('a', { href: '#', onmouseover: 'scrollDivDown()', onmouseout: 'stopMe()' }, 'Up')); 
				var carouselRight = Builder.node('p', { id: 'scrolldown'}, Builder.node('a', { href: '#', onmouseover: 'scrollDivUp()', onmouseout: 'stopMe()' }, 'Down')); 
				var carouselControl = Builder.node('p', { id: 'show_carousel', className: 'closed'  }, Builder.node('a', { href: '#', onclick: 'toggleCarousel(); return false;' }, 'Pictures'));			
			}
			var newParent = $(this.slideContainer);
			
			newParent.insert({before: carouselWrapper});
			carouselWrapper.insert(carouselContainer);
			
			carouselContainer.insert({before: carouselLeft });
			carouselWrapper.insert({after: carouselControl });
			carouselContainer.insert({after: carouselRight });
			
			if(this.carouselOrientation=='HORIZONTAL'){
				var carouselContainerInner = new Element('div', { id: "carousel_inner", className:'horizontal'});
			} else if (this.carouselOrientation=='VERTICAL'){
				var carouselContainerInner = new Element('div', { id: "carousel_inner", className:'vertical'});
			}
			
			carouselContainer.insert(carouselContainerInner);
			
			for ( var i=0, len=this.slides.length; i<len; ++i ){
				var carouselitem = this.slides[i].getElementsByClassName('thumbnail');
				var opacityBase = ''
				if(i>0){
					opacityBase = 'style="opacity: 0.5"';
				}
				if(carouselitem[0]){
					var newItem = '<a href="" id="carousel_' + i + '" onClick="'+ this.instance +'.goTo('+ i +'); return false;" ' + opacityBase+ '>' + carouselitem[0].innerHTML + '</a>';
					carouselitem[0].remove();
					carouselContainerInner.innerHTML = carouselContainerInner.innerHTML + newItem;
				}
			}
		} else {
			if(this.imagegrid!='false'){
				// drop the images into a div underneath the gallery
				var imageGrid = new Element('div', { id: "imagegrid" });
				var newParent = $(this.slideContainer);
				newParent.insert({after: imageGrid});
				for ( var i=0, len=this.slides.length; i<len; ++i ){
					var thumb = this.slides[i].getElementsByClassName('thumbnail');
					if(thumb[0]){
						var newItem = '<a href="" class="imagegrid_item" id="thumb_' + i + '" onClick="'+ this.instance +'.goTo('+ i +'); return false;">' + thumb[0].innerHTML + '</a>';
						thumb[0].remove();
						imageGrid.innerHTML = imageGrid.innerHTML + newItem;
					}
				}				
			} else {
				// thumbs are not being used, or are not being output
				// hide any thumbs that may be out
				for ( var i=0, len=this.slides.length; i<len; ++i ){
					var carouselitem = this.slides[i].getElementsByClassName('thumbnail');
					if(carouselitem[0]){
						carouselitem[0].remove();
					}
				}				
			}
		}
		
		if(this.controls!='undefined' && this.controls!=''){
			$(this.controls).innerHTML = '<div id="next-link"><a href="" onClick="' + this.instance + '.goNext(); return false;">Next</a></div><div id="prev-link"><a href="" onClick="' + this.instance + '.goPrevious(); return false;">Previous</a></div>';
		}
	},
	
	// The Transition Function
	swapImage: function (x,y) {		
		if(this.numOfImages>1){
			switch(this.animation){
				case 'fade':
						if($(this.slides[x])) { ( this.eAppear = new Effect.Appear( this.slides[x]), { duration: this.duration, queue: { position: 'end', scope: 'slidetransition' } }); }
						if($(this.slides[y])) { ( this.eFade   = new Effect.Fade  ( this.slides[y]), { duration: 0.1, queue: { position: 'front', scope: 'slidetransition' } }); }
				break;
				case 'slide':
						if($(this.slides[x])) { ( this.eAppear = new Effect.SlideDown( this.slides[x]), { duration: this.duration, queue: { position: 'end', scope: 'slidetransition' } }); }
						if($(this.slides[y])) { ( this.eFade   = new Effect.SlideUp  ( this.slides[y]), { duration: 0.1, queue: { position: 'front', scope: 'slidetransition' } }); }
				break;
				case 'shrink':
						if($(this.slides[x])){ ( this.eAppear = new Effect.Grow( this.slides[x]), { duration: this.duration, queue: { position: 'end', scope: 'slidetransition' } }); }
						if($(this.slides[y])){ ( this.eFade   = new Effect.Shrink  ( this.slides[y]), { duration: 0.1, queue: { position: 'front', scope: 'slidetransition' } }); }
				break;			
			}
		
		if(this.carousel){
			// get the link element for this item and set opacity
			try {
				$('carousel_' + x).setStyle({opacity: 1.0});// && ( this.eAppear = new Effect.Opacity( 'carousel_' + x), { duration: this.duration, from: 0.5, to: 1.0, queue: { position: 'end', scope: 'carouseltransition' } });		
			} catch (err){
				// do nothing, div doesnt exist
			}
			try {
				$('carousel_' + y).setStyle({opacity: 0.5});// && ( this.eFade   = new Effect.Opacity( 'carousel_' + y), { duration: this.duration, to: 0.5, queue: { position: 'front', scope: 'carouseltransition' } });
			} catch (err){
				// do nothing, div doesnt exist
			}
		}
		if(this.ticker!='false'){
			// transition from off to on and from on to off
			try {
				$('ticker_item_' + y).className = "ticker_off";
				$('ticker_item_' + x).className = "ticker_on";
			} catch (e) {
			}
		}
		if(this.caption==true){
			var captionBox = $(this.slides[x]).down('div');
			//captionBox.setStyle({opacity: 0.5});
		}			
		setTimeout(function(){ animInProgress = false;}, (this.duration + 1000));
		} else {
				this.slides[0].setStyle({display: 'block'});
		}
	},
	// the onload event handler that starts the fading.
	startSlideShow: function () {
		this.play(true);
		this.playid = setInterval(this.play.bind(this),this.wait);
		this.updatecounter();
	},
	
	play: function (init) {
		
		var imageShow, imageHide;
		if(init==true){
			imageShow = this.numOfImages;		
		} else {
			imageShow = this.iImageId+1;
			imageHide = this.iImageId;
		}
		if (imageShow == this.numOfImages) {
			this.swapImage(0,imageHide);	
			this.iImageId = 0;					
		} else {
			this.swapImage(imageShow,imageHide);			
			this.iImageId++;
		}
		
		this.textIn = this.iImageId+1 + ' of ' + this.numOfImages;
		this.updatecounter();
	},
	
	stop: function  () {
		clearInterval(this.playid);				
	},
	
	goNext: function () {
		if(animInProgress == false){
			clearInterval(this.playid);
			animInProgress = true;
			var imageShow, imageHide;
		
			imageShow = this.iImageId+1;
			imageHide = this.iImageId;
			
			if (imageShow == this.numOfImages) {
				this.swapImage(0,imageHide);	
				this.iImageId = 0;					
			} else {
				this.swapImage(imageShow,imageHide);			
				this.iImageId++;
			}	
			this.updatecounter();
		}
	},
	
	goPrevious: function () {
		if(animInProgress == false){
			clearInterval(this.playid);
			animInProgress = true;
			var imageShow, imageHide;
						
			imageShow = this.iImageId-1;
			imageHide = this.iImageId;
			
			if (this.iImageId == 0) {
				this.swapImage(this.numOfImages-1,imageHide);	
				this.iImageId = this.numOfImages-1;		
			} else {
				this.swapImage(imageShow,imageHide);			
				this.iImageId--;
			}		
			this.updatecounter();
		}
	},

	goTo: function (iImageIdNext) {
		var imageShow, imageHide;
		if(animInProgress == false){
			clearInterval(this.playid);
			animInProgress = true;
			imageShow = iImageIdNext;
			imageHide = this.iImageId;
			
			if( imageShow != imageHide) {
				this.swapImage(imageShow,imageHide);			
				this.iImageId = iImageIdNext;
				this.updatecounter();
			}
		}
	},

	updatecounter: function () {
		var textIn = this.iImageId+1 + ' of ' + this.numOfImages;
		$(this.counter) && ( $(this.counter).innerHTML = textIn );
	}
}

function showCaption(element){
}

function toggleCarousel(){
	var carousel = $('carousel_wrapper');
	if(carousel.getStyle('display')=='none'){
		Effect.Appear('carousel_wrapper', { duration: 1.0 });
		$('show_carousel').className = 'open';
	} else {
		Effect.Fade('carousel_wrapper', { duration: 1.0 });
		$('show_carousel').className = 'closed';
	}
}

var scrollStep=1

var timerLeft="";
var timerRight="";
var timerUp="";
var timerDown="";

function toLeft(){
 $('carousel').scrollLeft=0
}

function scrollDivLeft(){
  clearTimeout(timerRight) 
 $('carousel').scrollLeft+=scrollStep
  timerRight=setTimeout("scrollDivLeft()",10)
}

function scrollDivRight(){
  clearTimeout(timerLeft)
  $('carousel').scrollLeft-=scrollStep
  timerLeft=setTimeout("scrollDivRight()",10)
}

function toRight(){
  $('carousel').scrollLeft=$('carousel').scrollWidth
}

function stopMe(){
  clearTimeout(timerRight) 
  clearTimeout(timerLeft)
  clearTimeout(timerUp) 
  clearTimeout(timerDown)  
}



function scrollDivDown(){
  clearTimeout(timerUp) 
 $('carousel').scrollTop+=scrollStep
  timerUp=setTimeout("scrollDivUp()",10)
}

function scrollDivUp(){
  clearTimeout(timerDown)
  $('carousel').scrollTop-=scrollStep
  timerDown=setTimeout("scrollDivUp()",10)
}
