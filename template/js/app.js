/* BEGIN document ready function */
  $(document).ready(function() {

    /*BEGIN MEANMENU*/
    $('.navwrap').meanmenu({
      meanScreenWidth: 992,
      meanRevealPosition: 'right',
      meanRemoveAttrs: true
    });
    /* END MEANMENU */
  });

  /** jQuery document ready */
  $(document).ready(function() {

      carouselvisInterval = 6000;
      initCarouselvis();

      // toggler click
      $(".item-toggle").click(function() {
          clickSlide($(this).data("toggle"));
      });

      // next and previous items
      $(".item-skip").click(function() {
          prevnextSlide($(this));
      });
  });

  /**
   * Initialize Carouselvis
   * @return void
   */
  function initCarouselvis(){

          // build items
          $('.item').each(function(){
              var imgpath = $(this).find('img').attr('src');
              $(this).css('background-image', 'url('+imgpath+')');
          });

          // build toggler
          var carouselItems = $(".item").length;
          for (i = 0; i < carouselItems; i++) {
              var itemimg = $(".item img:eq(" + i + ")").attr("src");

              $(".toggler").append("<li class='item-toggle' data-toggle='" + i + "'></li>");
              $(".minipreview").append("<li class='item-toggle' data-toggle='" + i + "' style='background-image: url(" + itemimg + ")'></li>");
          }

          // remove toggler and prev/next buttons if only 1 element
          if($('.carousel-vis .item').length < 2){
              $('.item-skip, .toggler').hide();
          }

          // set slide counter
          $(".counter .currentslide").text(1);
          $(".counter .amount").text(carouselItems);

          // set first items as active
          $(".carousel-vis").find(".item:first").addClass("active");
          $(".carousel-vis").find(".item-toggle:first").addClass("active");

          // set autointerval
          carouselInterval = setInterval(function() {
              if ($(".item").not(':animated')) {
                  slideItem();
              }
          }, carouselvisInterval);
  }

  /**
   * Slide to Item onClick
   * @param [int] clickNum [selected item]
   * @return void
   */
  function clickSlide(clickNum){
      // check if item is already active
      if ($(".item:eq(" + clickNum + ")").hasClass("active")) {
          return;
      }

      // check if item is already animated
      if ($(".item").is(':animated')) {
          return;
      }
      slideItem(clickNum);
  }

  /**
   * Slide to Next or Previous Item onClick
   * @param [obj] current [selected movement]
   * @return void
   */
  function prevnextSlide(current){
      var active = $(".carousel-vis .item.active");
      var amount = $(".item").length-1;
      var num = 0;
      var type = "";

      // check if item is already animated
      if ($(".item").is(':animated')) {
          return;
      }

      // slide to item
      if((current instanceof jQuery && current.hasClass("next")) || current === 'next'){
          type = "next";
          if(active.index() === amount){
              num = 0;
          }
          else{
              num = active.index()+1;
          }
      }
      else{
          type = "previous";
          if(active.index() === 0){
              num = amount;
          }
          else{
              num = active.index()-1;
          }
      }
      slideItem(num, type);
  }

  /**
   * slideItem
   * @param  [int] num [selected item]
   * @return void
   */
  function slideItem(num, type) {
      var active = $(".carousel-vis .item.active");
      var next = "";
      var called = false; // slide has been called by user

      if ($.isNumeric(num)) {
          next = $(".item:eq(" + num + ")");
          called = true;
      }
      else if (active.next(".item").length) {
          next = active.next(".item");
      }
      else {
          next = $(".carousel-vis").find(".item:first");
      }

      if(next.hasClass('active')){
          return;
      }

      // update toggler
      $(".item-toggle").removeClass("active");
      $("*[data-toggle='" + next.index() + "']").addClass("active");

      // update slide counter
      $(".counter .currentslide").text(next.index()+1);

      // slide in next or previous item
      if(((num+1) > (active.index()+1) || !called ) && type !== "previous" || type === "next"){
          next.css("left", "100%");
          next.css("right", "initial");
          active.css("left", "0");
          active.css("right", "initial");
          // slide in current item
          next.animate({ left: "0" }, 500, function() { next.addClass("active"); });
          // slide out active item
          active.animate({ left: "-100%" }, 500, function() { $(this).removeClass("active"); $(this).css("left", "100%"); });
      }
      else{
          next.css("right", "100%");
          next.css("left", "initial");
          active.css("right", "0");
          active.css("left", "initial");
          // slide in current item
          next.animate({ right: "0" }, 500, function() { next.addClass("active"); });
          // slide out active item
          active.animate({ right: "-100%" }, 500, function() { $(this).removeClass("active"); $(this).css("right", "100%"); });
      }

      // reset interval
      clearInterval(carouselInterval);
      carouselInterval = setInterval(function() {
          slideItem();
      }, carouselvisInterval);
  }

  /**
   * Swipe Items
   * @return void
   */

  // limit touchevents to items
   var classname = document.getElementsByClassName("item");
   for (var i = 0; i < classname.length; i++) {
       classname[i].addEventListener('touchstart', handleTouchStart, false);
       classname[i].addEventListener('touchmove', handleTouchMove, false);
   }

  //document.addEventListener('touchstart', handleTouchStart, false);
  //document.addEventListener('touchmove', handleTouchMove, false);

  var xDown = null;
  var yDown = null;

  function handleTouchStart(evt) {
      xDown = evt.touches[0].clientX;
      yDown = evt.touches[0].clientY;
  }

  function handleTouchMove(evt) {
      if ( ! xDown || ! yDown ) {
          return;
      }

      var xUp = evt.touches[0].clientX;
      var yUp = evt.touches[0].clientY;

      var xDiff = xDown - xUp;
      var yDiff = yDown - yUp;

      if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
          if ( xDiff > 0 ) {
              //$('.box').text("Swipe Left");
              prevnextSlide('next');
              /* left swipe */
          } else {
              //$('.box').text("Swipe Right");
              prevnextSlide('prev');
              /* right swipe */
          }
      } else {
          if ( yDiff > 0 ) {
              /* up swipe */
          } else {
              /* down swipe */
          }
      }
      /* reset values */
      xDown = null;
      yDown = null;
  }
