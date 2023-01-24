jQuery(document).ready(function($){
  var slidesWrapper = $('.cd-hero-slider');

  if ( slidesWrapper.length > 0 ) {
    var primaryNav = $('.cd-primary-nav'),
      sliderNav = $('.cd-slider-nav'),
      navigationMarker = $('.cd-marker'),
      slidesNumber = slidesWrapper.children('li').length,
      visibleSlidePosition = 0,
      autoPlayId,
      autoPlayDelay = 5000;



    setAutoplay(slidesWrapper, slidesNumber, autoPlayDelay);

    primaryNav.on('click', function(event){
      if($(event.target).is('.cd-primary-nav')) $(this).children('ul').toggleClass('is-visible');
    });
    
    sliderNav.on('click', 'li', function(event){
      event.preventDefault();
      var selectedItem = $(this);
      if(!selectedItem.hasClass('selected')) {
        var selectedPosition = selectedItem.index(),
          activePosition = slidesWrapper.find('li.selected').index();
        
        if( activePosition < selectedPosition) {
          nextSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, selectedPosition);
        } else {
          prevSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, selectedPosition);
        }

        visibleSlidePosition = selectedPosition;

        updateSliderNavigation(sliderNav, selectedPosition);
        updateNavigationMarker(navigationMarker, selectedPosition+1);

        setAutoplay(slidesWrapper, slidesNumber, autoPlayDelay);
      }
    });
  }

  function nextSlide(visibleSlide, container, pagination, n){
    visibleSlide.removeClass('selected from-left from-right').addClass('is-moving').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
      visibleSlide.removeClass('is-moving');
    });

    container.children('li').eq(n).addClass('selected from-right').prevAll().addClass('move-left');
    
  }

  function prevSlide(visibleSlide, container, pagination, n){
    visibleSlide.removeClass('selected from-left from-right').addClass('is-moving').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
      visibleSlide.removeClass('is-moving');
    });

    container.children('li').eq(n).addClass('selected from-left').removeClass('move-left').nextAll().removeClass('move-left');
    
  }

  function updateSliderNavigation(pagination, n) {
    var navigationDot = pagination.find('.selected');
    navigationDot.removeClass('selected');
    pagination.find('li').eq(n).addClass('selected');
  }

  function setAutoplay(wrapper, length, delay) {
    if(wrapper.hasClass('autoplay')) {
      clearInterval(autoPlayId);
      autoPlayId = window.setInterval(function(){autoplaySlider(length)}, delay);
    }
  }

  function autoplaySlider(length) {
    if( visibleSlidePosition < length - 1) {
      nextSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, visibleSlidePosition + 1);
      visibleSlidePosition +=1;
    } else {
      prevSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, 0);
      visibleSlidePosition = 0;
    }
    updateNavigationMarker(navigationMarker, visibleSlidePosition+1);
    updateSliderNavigation(sliderNav, visibleSlidePosition);
  }




  function updateNavigationMarker(marker, n) {
    marker.removeClassPrefix('item').addClass('item-'+n);
  }

  $.fn.removeClassPrefix = function(prefix) {
      this.each(function(i, el) {
          var classes = el.className.split(" ").filter(function(c) {
              return c.lastIndexOf(prefix, 0) !== 0;
          });
          el.className = $.trim(classes.join(" "));
      });
      return this;
  };
});