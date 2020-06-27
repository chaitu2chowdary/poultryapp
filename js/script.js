;(function($){
    'use strict';
     
    /* ==========================================================================
       Preloader
    ========================================================================== */
    $(window).on('load', function() { // makes sure the whole site is loaded 
        $('#status').fadeOut(); // will first fade out the loading animation 
        $('#preloader').css({'height':'0%'}); // will fade out the white DIV that covers the website. 
        $('body').delay(350).css({'overflow-x':'visible'});
    })
    /* ==========================================================================
    
    ========================================================================== */
    var $vdoPop = $('.video');
    if($vdoPop.length > 0){
       $vdoPop.magnificPopup({
          type: 'iframe',
              iframe: {
                  markup: '<style>.mfp-iframe-holder .mfp-content {max-width: 900px;height:500px}</style>' +
                      '<div class="mfp-iframe-scaler" >' +
                      '<div class="mfp-close"></div>' +
                      '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                      '</div></div>'
              }
          });
    }


    /* ==========================================================================
       Counter Up
    ========================================================================== */
    var $counter = $('.counter');
    if($counter.length > 0){
        $counter.counterUp({
            delay: 20,
            time: 500
        });
    }

/* ==========================================================================
        Parallax
    ========================================================================== */
    var $parallax = $('.parallaxie');
    if($parallax.length > 0){
        $parallax.parallaxie({
            speed: 0.5,
        });
    }

/* ==========================================================================
    Screenshot carousel
========================================================================== */
    var $loop = $('.screen')
    if($loop.length > 0){
        $loop.owlCarousel({
        loop:true,
        nav: false,
        autoplay:true,
        autoplayTimeout:2000,
        margin:25,
        responsive:{
            320:{
                items:1,
                margin:0
            },
            481:{
                items:3,
                margin:60
            },
            991:{
                items:4
            }
        }
    });
    }



/* ==========================================================================
    Testimonial Carousel
========================================================================== */
  
  var quoteCarousel = $('.quote')
    if(quoteCarousel.length > 0){
        quoteCarousel.owlCarousel({
            loop:true,
            autoplay:true,
            autoplayTimeout:2500,
            margin: 5,
            nav: false,
            responsive:{
                300:{
                    items:1,
                },
                480:{
                    items:2,
                }
                ,
                768:{
                    items:3,
                }
                ,
                1200:{
                    items:4,
                }
            }
        })
    }

  /* ==========================================================================
    device Carousel
========================================================================== */
  
    var $appSlideAuto = $('.app-slide-auto')
    if($appSlideAuto.length > 0){
        $appSlideAuto.owlCarousel({
            dots: false,
            loop:true,
            center:true,
            margin: 0,
            autoplay:true,
            autoplayTimeout:2500,
            autoWidth:true,
            ouchDrag : false,
             mouseDrag : false,
        })    
    }

  /* ==========================================================================
    device Carousel
========================================================================== */
  
    var $appSlide = $('.app-slide')
    if($appSlide.length > 0){
        $appSlide.owlCarousel({
            loop:true,
            center:true,
            margin: 0,
            autoWidth:true,
            navs: false,
            dots:true,
            ouchDrag : false,
            mouseDrag : false,
            dotsContainer: '.tab-list'
        })
        $('.owl-dot').on('click', function() {
          $appSlide.trigger('to.owl.carousel', [$(this).index(), 300]);
      });    
    }

    /* ==========================================================================
    features Carousel
========================================================================== */
  
    var $featSlide = $('.feat-slide')
    if($featSlide.length > 0){
        $featSlide.owlCarousel({
            loop:true,
            autoplay:true,
            autoplayTimeout:5500,
            nav: true,
            margin: 30,
            navText : ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
            responsive:{
            0:{
                items:1,
            },
            600:{
                items:1,
                margin:10,
            },
            1050:{
                items:3,
            }
        }
        })  
    }

    
    
    /* ==========================================================================
        Wow
    ========================================================================== */
    new WOW().init();
    
    /* ==========================================================================
      Mailchimp Form
    ========================================================================== */
    $('.subscribe form').submit(function(e) {
        e.preventDefault();
        var postdata = $('.subscribe form').serialize();
        $.ajax({
            type: 'POST',
            url: 'https://backoffice.poultryapp.com/api/crons/subscribe',
            data: postdata,
            dataType: 'json',
            success: function(json) {
                if(json.valid == 0) {
                    $('.success-message').hide();
                    $('.error-message').hide();
                    $('.error-message').html(json.message);
                    $('.error-message').fadeIn('fast', function(){
                        $('.subscribe form').addClass('animated shake').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                            $(this).removeClass('animated shake');
                        });
                    });
                }
                else {
                    $('.error-message').hide();
                    $('.success-message').hide();
                    $('.subscribe form').hide();
                    $('.success-message').html(json.message);
                    $('.success-message').fadeIn('fast', function(){
                        // $('.top-content').backstretch("resize");
                    });
                }
            }
        });
    });
    /* ==========================================================================
        Menu click scroll
    ========================================================================== */

    var $navItem = $('.right-nav a, .demo a');
    if($navItem.length > 0 ){
        $navItem.on('click', function (e) {
            $(document).off("scroll");
                if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
                || location.hostname == this.hostname) {

                var target = $(this.hash),
                headerHeight = $(".navbar").height()-2; // Get fixed header height

                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

                if (target.length) {
                    $('html,body').animate({
                      scrollTop: target.offset().top - headerHeight
                    }, 1000);
                    return false;
                }
            }
        });
    }
     /* ==========================================================================
        Accordion
    ========================================================================== */

    function toggleIcon(e) {
    $(e.target)
        .prev('.panel-heading')
        .find(".more-less")
        .toggleClass('glyphicon-plus glyphicon-minus');
    }
    $('.panel-group').on('hidden.bs.collapse', toggleIcon);
    $('.panel-group').on('shown.bs.collapse', toggleIcon);

    //contact form
    var $contactForm = $('#contact-form');
    $contactForm.validator();


    /* ==========================================================================
        Contact form
    ========================================================================== */
    $contactForm.on('submit', function (e) {

        // if the validator does not prevent form submit
        if (!e.isDefaultPrevented()) {
            var url = "https://backoffice.poultryapp.com/api/crons/sendMail";

            // POST values in the background the the script URL
            $.ajax({
                type: "POST",
                url: url,
                data: $(this).serialize(),
                success: function (data)
                {
                    // data = JSON object that contact.php returns
                    // we recieve the type of the message: success x danger and apply it to the 
                    var messageAlert = 'alert-' + data.type;
                    var messageText = data.message;

                    // let's compose Bootstrap alert box HTML
                    var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                    
                    // If we have messageAlert and messageText
                    if (messageAlert && messageText) {
                        // inject the alert to .messages div in our form
                        $contactForm.find('.messages').html(alertBox);
                        // empty the form
                        $contactForm[0].reset();
                    }
                }
            });
            return false;
        }
    })
    /* ==========================================================================
        Pricing Swicher
    ========================================================================== */
        var $priceList = document.getElementById("filt-monthly");

        if ($priceList != 'undefined' && $priceList != null){
            var e = document.getElementById("filt-monthly"),
            d = document.getElementById("filt-hourly"),
            t = document.getElementById("switcher"),
            m = document.getElementById("monthly"),
            y = document.getElementById("hourly");
            e.addEventListener("click", function(){
              t.checked = false;
              e.classList.add("toggler--is-active");
              d.classList.remove("toggler--is-active");
              m.classList.remove("none");
              y.classList.add("none");
            });

            d.addEventListener("click", function(){
              t.checked = true;
              d.classList.add("toggler--is-active");
              e.classList.remove("toggler--is-active");
              m.classList.add("none");
              y.classList.remove("none");
            });

            t.addEventListener("click", function(){
              d.classList.toggle("toggler--is-active");
              e.classList.toggle("toggler--is-active");
              m.classList.toggle("none");
              y.classList.toggle("none");
            })
        }

        $('.navbar-collapse a').click(function (e) {
            $('.navbar-collapse').collapse('toggle');
          });



})(jQuery); 