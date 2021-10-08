(function($) {
	
	"use strict";
	
	/* Default Variables */
	var NaxosOptions = {
		loader:true,
		navigation:'sticky',	//sticky, default
		zoomControlDiv:null,
		mapColor:'',
		mapMarker:'',
		security:'',
		rtl:false
	};
	
	if (typeof Naxos!=='undefined') {
		$.extend(NaxosOptions, Naxos);
	}
	
	$.NaxosTheme = {
		
		//Initialize
		init:function() {
			//RTL
			if ($('body').hasClass('rtl')) {
				NaxosOptions.rtl = true;
			}
			
			this.loader();
			this.animations();
			this.navigation(); 
			this.scroll();
			this.smoothScroll();
			this.banner();
			this.lightBox();
			this.parallax(); 
			this.imageSlider();
			this.errorPage(); 
			this.shortCodes();
			this.replace();
		},
		
		//Page Loader
		loader:function() {
			if (NaxosOptions.loader) {
				$(window).on("load", function() {
					$(".page-loader").fadeOut();
				});
			}
		},
		
		//Animations
		animations:function() {
			new WOW().init();
		},
		
		//Navigation
		navigation:function() {
			//Add 'span' to main menu item
			$(".nav-menu > li > a").each(function() {
				var txt = $(this).html();
				$(this).parent().addClass('nav-item');
				$(this).addClass('nav-link js-scroll-trigger').html("<span>"+txt+"</span>");
			});
			
			//Mobile menu open
			$('.menu-bar').on("click", function() {
				$('.header').addClass('mobile-menu-open');
				$(".nav-menu li.dropdown > .dropdown-arrow").show();
			});

			//Mobile menu close
			$('.close-button').on("click", function() {
				$('.header').removeClass('mobile-menu-open');
				$(".nav-menu li.dropdown > .dropdown-arrow").hide();
			});
			
			//Dropdown menu
			var $arrow = $('<div class="dropdown-arrow"><i class="fas fa-chevron-down"></i></div>').hide();
			$('.nav-menu li.dropdown').append($arrow);
			
			$(document).on("click", ".nav-menu li.dropdown > .dropdown-arrow", function(e) {
				e.preventDefault();
				$(this).toggleClass("open");
				$(this).parent().find("> .sub-menu").slideToggle("slow");
			});
			
			//Fixed menu
			if (NaxosOptions.navigation==='normal') {
				$('.main-menu-area').addClass('fixed-top');
			}
		},
		
		//Scroll
		scroll:function() {
			$(window).on("scroll", function() {
				var pos = $(window).scrollTop();

				//Main menu scroll animation
				if (pos>=100) {
					$(".main-menu-area").addClass("fixed-menu animate slideInDown");
				} else {
					$(".main-menu-area").removeClass("fixed-menu animate slideInDown");
				}

				//Scroll to top button
				if (pos>=500) {
					$(".to-top").addClass("fixed-totop");
				} else {
					$(".to-top").removeClass("fixed-totop");
				}
			});
		},
		
		//Smooth scroll
		smoothScroll:function() {
			//Menu click event to scroll
			$('a.js-scroll-trigger[href*="#"]:not([href="#"])').on("click", function() {
				if (location.pathname.replace(/^\//, '')===this.pathname.replace(/^\//, '') && location.hostname===this.hostname) {
					$('.nav-menu > li').each(function() {
						$(this).removeClass('current_page_item');
					});
					
					var target = $(this.hash);
					target = target.length ? target : $('[name='+this.hash.slice(1)+']');
					
					if (target.length) {
						var pos = target.offset().top-30;
						$('html, body').animate({scrollTop:pos}, 1000);
						return false;
					}
				}
			});

			//Close responsive menu when a scroll trigger link is clicked
			$('.js-scroll-trigger').on('click', function() {
				$('.navbar-collapse').collapse('hide');
			});

			//Activate scrollspy to add active class to navbar items on scroll
			$('body').scrollspy({
				target:'#mainNav',
				offset:56
			});
		},
		
		//Banner
		banner:function() {
			var bgImg, src, delay, arr, section, container;
			
			//Image background
			if ($(".banner.image-bg").length>0) {
				bgImg = $(".banner.image-bg");
				
				//Image				
				src = bgImg.data("source");				
				
				if (src!==undefined && src!=="") {
					arr = src.split(",");
					bgImg.backstretch(arr);
				}
			}
			
			//Slide background
			if ($(".banner.slide-bg").length>0) {
				bgImg = $(".banner.slide-bg");
				
				//Images
				src = bgImg.data("source");
				
				if (src!==undefined && src!=="") {
					delay = bgImg.data("delay") * 1000;		
					arr = src.split(",");
					bgImg.backstretch(arr, {duration:delay, fade:750});
				}
			}
			
			//Video background
			if ($(".banner.video-bg").length>0) {
				bgImg = $(".banner.video-bg");
				
				//Hide player on mobile
				if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
					$(".player").hide();
					$(".player-controls").hide();
				}

				//Youtube player
				$(".player").mb_YTPlayer();

				//Player controls
				$("#play").on("click", function() {
					$(".player").playYTP();
				});

				$("#pause").on("click", function() {
					$(".player").pauseYTP();
				});
			}
			
			//Append outer section to container
			if ($("section#banner").length>0) {
				section = $("section#banner");
				container = section.find(" > .container");
				bgImg.prepend(container);
				section.remove();
			}
			
			if ($(".banner-image-center.w-100").length>0) {
				$(".banner-image-center.w-100").appendTo("#home");
			}
		},
		
		//Light box
		lightBox:function() {
			$('a[data-rel^=lightcase]').lightcase();
		},
		
		//Parallax sections
		parallax:function() {
			if ($('.parallax').length===0) {
				return;
			}
	
			$(window).on('load', function() {
				$('.parallax').each(function() {
					if ($(this).data('image')) {
						$(this).parallax('50%', 0.5);
						$(this).css({backgroundImage:'url('+$(this).data('image')+')'});
					}
				});
			});
		},
		
		//Background image
		bgImage:function() {
			if ($('.bg-img').length===0) {
				return;
			}
			
			$(window).on('load', function() {
				$('.bg-img').each(function() {
					if ($(this).data('image')) {
						$(this).css({backgroundImage:'url('+$(this).data('image')+')'});
					}
				});
			});
		},
        
        //Subscribe form
        // subscribe:function() {
		// 	if ($('#subscribe-form').length===0) {
		// 		return;
		// 	}
            
        //     var $subscribeForm = $("#subscribe-form");
            
        //     $subscribeForm.on('submit', function(e) {
		// 		e.preventDefault();
                
        //         var email = $('.field-subscribe').val();

        //         //Validate email address
        //         if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        //             var action = $subscribeForm.attr("action");
                    
        //             $.ajax({
        //                 type:"POST",
        //                 url:action,
        //                 data:{
		// 					action:"subscribe",
		// 					security:NaxosOptions.security,
		// 					email:email
		// 				},
        //                 dataType:"JSON",
        //                 success:function(data) {
        //                     if (data.status==="success") {
        //                         $subscribeForm[0].reset();
        //                         $("#subscribe-result").fadeIn();
        //                     } else {
		// 						alert(data.type);
		// 					}
        //                 }
        //             });
        //         }
        //     });
        // },
		
		//Image slider
		imageSlider:function($root, onComplete) {
			if (typeof $root==='undefined') {$root = $('body');}
			
			if ($root.find('.image-slider').length===0) {
				if (onComplete && typeof onComplete==='function') {onComplete();}
				return;
			}
			
			//Replace block gallery
			$root.find('.image-slider').each(function() {
				var $that = $(this);				
				var $grid = $that.find('.blocks-gallery-grid');
				
				$that.html($grid.html());
				$grid.remove();
				
				var $list = $that.find('li');
				
				$list.each(function() {
					var $item = $(this);
					var $img = $item.find('img');
					$img.removeClass().addClass('img-responsive img-rounded');
					$img.removeAttr('data-id').removeAttr('srcset').removeAttr('sizes').removeAttr('alt');
					$img.appendTo($item);

					var $figure = $item.find('figure');
					$figure.remove();
				});
				
				var $arrows = 	'<div class="arrows">'+
									'<a class="arrow left">'+
										'<i class="fas fa-chevron-left"></i>'+
									'</a>'+
									'<a class="arrow right">'+
										'<i class="fas fa-chevron-right"></i>'+
									'</a>'+
								'</div>';
				
				$that.append($arrows);
				$arrows = $that.find('.arrows');
				
				$that.wrap('<div class="image-slider" />').contents().unwrap();
				$list.wrap('<div />').contents().unwrap();	
			});
	
			$root.find('.image-slider').each(function() {
				var $that = $(this),
					$arrows = $that.find('.arrows'),
					$list = $(this).find('> div').not('.arrows'),
					timeout, 
					delay = false,
					process = false;
	
				var setHeight = function($that, onComplete) {
					$that.css({
						height:$that.find('> div:visible img').outerHeight(true)
					});
					
					if (onComplete && typeof onComplete==='function') {onComplete();}
				};
	
				if ($that.attr('data-delay')) {
					delay = parseInt($that.attr('data-delay'), 10);
					timeout = setInterval(function() {
						$arrows.find('.arrow.right').click();
					}, delay);
				}
	
				$(this).waitForImages(function() {
					$(this).css({position:'relative'});
	
					$list.hide().css({
						position:'absolute',
						top:0,
						left:0,
						zIndex:1,
						width:'100%',
						paddingLeft:15,
						paddingRight:15,
					});
	
					$list.eq(0).show();
	
					setHeight($that, onComplete);
					
					$(window).on('resize', function() {
						setTimeout(function() {
							setHeight($that);
						}, 1);
					});
	
					if ($list.length===1) {
						$arrows.hide();
						clearInterval(timeout);
						delay = false;
					}
				});
	
				$arrows.find('.arrow').on('click', function(e) {
					if (process) {
						e.preventDefault();
						return;
					}
					
					clearInterval(timeout);
					
					var isRight = $(this).hasClass('right');
					var $current = $that.find('> div:visible').not('.arrows'), $next;
	
					if (isRight) {						
						$next = $current.next();						
						if (!$next || $next.is('.arrows')) {
							$next = $list.eq(0);
						}
					} else {
						if ($current.is(':first-child')) {
							$next = $list.last();
						} else {
							$next = $current.prev();
						}
					}
	
					process = true;
					$current.css({zIndex:1});
					
					$next.css({opacity:0, zIndex:2}).show().animate({opacity:1}, {duration:300, queue:false, complete:function() {
						$current.hide().css({opacity:1});
						
						if (delay!==false) {
							timeout = setInterval(function() {
								$arrows.find('.arrow.right').click();
							}, delay);
						}
						
						process = false;
					}});
				});
			});
		},
		
		//Error page
		errorPage:function() {
			if ($('#error-page').length>0) {
				$(window).on('resize', function() {
					$('#error-page').css({marginTop:-Math.ceil($('#error-page').outerHeight()/2)});
				}).resize();
			}
		},
		
		//Shortcodes
		shortCodes:function() {
			//Clients
			if ($('.clients-slider').length>0) {
				//Dots
				var dots = false;
				
				if ($('.clients-slider').data('dots')) {
					dots = true;
				}
				
				//Initialize
				$('.clients-slider').owlCarousel({
					autoplay:3000,
                    autoplaySpeed:300,
                    responsive:{
                        0:{
                            items:2
                        },
						576:{
                            items:3
                        },
                        768:{
                            items:5
                        }
                    },
					dots:dots,
					dotsEach:2,
					rtl:NaxosOptions.rtl
                });
			}
			
			// //Testimonials
            // if ($('.testimonial-slider').length>0) {
			// 	$(".testimonial-slider").append($(".single-block-text"));
			// 	$(".testimonial-nav").append($(".single-block-media"));
				
			// 	$(".testimonial-slider").slick({
			// 		slidesToShow:1,
			// 		slidesToScroll:1,
			// 		arrows:false,
            //         fade:true,
			// 		asNavFor:".testimonial-nav",
			// 		rtl:NaxosOptions.rtl
			// 	});

			// 	$(".testimonial-nav").slick({
			// 		slidesToShow:5,
			// 		slidesToScroll:1,
			// 		asNavFor:".testimonial-slider",
            //         arrows:false,
			// 		centerMode:true,
			// 		focusOnSelect:true,
			// 		variableWidth:false,
			// 		rtl:NaxosOptions.rtl,
            //         responsive:[
			// 			{
			// 				breakpoint:991,
			// 				settings:{
			// 					slidesToShow:3,
            //                     arrows:false
			// 				}
			// 			},
			// 			{
			// 				breakpoint:480,
			// 				settings:{
			// 					slidesToShow:1,
            //                     arrows:false
			// 				}
			// 			}
			// 		]
			// 	});
			// }
			
			//Counters
            if ($('.number-count').length>0) {
                $('.number-count').each(function() {
                    $(this).counterUp({
                        delay:4,
                        time:1000
                    });
                });                
			}
			
			// //Screenshots
			// if ($('.screenshot-slider').length>0) {
			// 	var $screenshot = $('.screenshot-slider');
				
			// 	$screenshot.owlCarousel({
			// 		responsive:{
			// 			0:{
			// 				items:1
			// 			},			 
			// 			768:{
			// 				items:2
			// 			},			
			// 			960 : {
			// 				items:4
			// 			}
			// 		},
			// 		responsiveClass:true,
			// 		autoplay:true,
			// 		autoplaySpeed:1000,
			// 		margin:30,
			// 		dotsEach:2,
			// 		rtl:NaxosOptions.rtl
			// 	});
				
			// 	if ($screenshot.hasClass('zoom-screenshot')) {
			// 		$screenshot.magnificPopup({
			// 			delegate:"a",
			// 			type:"image",
			// 			closeOnContentClick:false,
			// 			closeBtnInside:false,
			// 			mainClass:"mfp-with-zoom",
			// 			image:{verticalFit:true},
			// 			gallery:{enabled:true},
			// 			zoom:{
			// 				enabled:true,
			// 				duration:300, // Don't forget to change the duration also in CSS
			// 				opener:function(element) {
			// 					return element.find("img");
			// 				}
			// 			}
			// 		});
			// 	}
			// }
			
			//Skills
			if ($('.progress .progress-bar').length>0) {				
				setTimeout(function() {
					$(window).scroll(function() {
						var scrollTop = $(window).scrollTop();

						$('.progress .progress-bar').each(function() {
							var $that = $(this), 
								itemTop = $that.offset().top-$(window).height()+$that.height()/2;

							if (scrollTop>itemTop && $that.outerWidth()===0) {
								var percent = parseInt($(this).attr('data-value'), 10)+'%';
								var $value = $(this).parent().parent().find('.progress-value');

								if ($value.length>0) {
									$value.css({width:percent, opacity:0}).html('<span>'+percent+'</span>');
								}

								$that.animate({width:percent}, {duration:1500, queue:false, complete:function() {
									if ($value.length>0) {
										$value.animate({opacity:1}, {duration:300, queue:false});
									}
								}});
							}
						});
					}).scroll();
				}, 1);
			}
			
			//Read more button
			if ($('.more-link').length>0) {
				$('.more-link').removeClass('btn btn-default');
			}
			
			//Footer widgets
			if ($('.footer-widgets > .container > div').length>0) {
				$('.footer-widgets > .container > div > div.col-12').each(function( index ) {
					if (index==1) {
						$(this).removeClass('col-lg-3').addClass('col-lg-2 offset-lg-1');
					}
				});
			}
		},
		
		//Replace
		replace:function() {
			//Search form
			var search_btn = $(".widget_search").find("input.search-submit");
			search_btn.replaceWith('<button class="search-submit" type="submit"><i class="fas fa-search"></i></button>');
			
			//Instagram
			if ($(".instagram-feed li").length>0) {
				$(".instagram-feed li").each(function() {
					var width = $(this)[0].getBoundingClientRect().width;
					$(this).css('height', width+'px');
				});
			}
			
			//Social widget
			if ($(".widget_social").length>0) {
				$(".widget_social").prev(".widget_text").addClass("mb-0");
			}
			
			//Categories
			if ($(".widget_categories .cat-item").length>0) {
				$(".widget_categories .cat-item").each(function() {
					var item = $(this);
					var txt = item.html();

					txt = txt.replace("(", "<span>");
					txt = txt.replace(")", "</span>");

					item.html(txt);
				});
			}
			
			//Comment submit button
			if ($(".comment-form .submit").length>0) {
				var comment_btn = $(".comment-form .submit");
				var comment_txt = comment_btn.val();
				comment_btn.replaceWith('<button id="submit" name="submit" class="submit btn btn-default" type="submit">'+comment_txt+'</button>');		
			}
		},
		
		//Share functions
		share:function(network, title, image, url) {
			//Window size
			var w = 650, h = 350, params = 'width='+w+', height='+h+', resizable=1';
			
			//Title
			if (typeof title==='undefined') {
				title = $('title').text();
			} else if (typeof title==='string') {
				if (title.indexOf("#")!=-1 && $(title).length>0) {
					title = $(title).text();
				}
			}
			
			title = title.trim();
			
			//Image
			if (typeof image==='undefined') {
				image = '';
			} else if (typeof image==='string') {
				if (!/http/i.test(image)) {
					if ($(image).length>0) {
						if ($(image).is('img')) {
							image = $(image).attr('src');
						} else {
							image = $(image).find('img').eq(0).attr('src');
						}
					} else {
						image = '';
					}
				}
			}
			
			//Url
			if (typeof url==='undefined') {
				url = document.location.href;
			} else {
				if (url.startsWith("#")) {
					url = document.location.protocol+'//'+document.location.host+document.location.pathname+url;
				}
			}
			
			//Share
			if (network==='twitter') {
				return window.open('https://twitter.com/intent/tweet?text='+encodeURIComponent(title)+'&url='+encodeURIComponent(url), 'share', params);
			} else if (network==='facebook') {
				return window.open('https://www.facebook.com/sharer/sharer.php?s=100&p[url]='+encodeURIComponent(url)+'&p[title]='+encodeURIComponent(title)+'&p[images][0]='+encodeURIComponent(image), 'share', params);
			} else if (network==='pinterest') {
				return window.open('https://pinterest.com/pin/create/bookmarklet/?media='+image+'&description='+title+' '+encodeURIComponent(url), 'share', params);
			} else if (network==='linkedin') {
				return window.open('https://www.linkedin.com/shareArticle?mini=true&url='+encodeURIComponent(url)+'&title='+title, 'share', params);
			}
			
			return;
		}
		
	};
	
	//Initialize
	$.NaxosTheme.init();

})(jQuery);
 