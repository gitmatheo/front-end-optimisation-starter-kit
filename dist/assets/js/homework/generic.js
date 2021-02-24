require(['./main'], function (main) {




	require(['jquery', 'components/bxslider', 'components/domReady', 'waypoints', 'global'], function($, $bxslider, domReady, waypoints, global) {
		

		var h = {

			scrollToID: function(id) 
			{
				var offSet = 50;
				var targetOffset = $(id).offset().top - offSet;
				$('html,body').animate({scrollTop:targetOffset}, 400);
			},


			shortcuts: function() {

				if($(".l-shortcuts").length > 0)
				{					

					setTimeout(function() {
						$('.l-main').waypoint(function(direction) {
						  if (direction == 'down')
						  {
						  		$('.l-shortcuts').slideToggle(200);
						  }
						  else {
						  		$('.l-shortcuts').slideToggle(100);
						  }
						}, { offset: 65 });
					}, 500);





			        $(".l-shortcuts a[href^='#']").click(function(evn){
			            evn.preventDefault();
			            h.scrollToID(this.hash);


						if(history.pushState) {
						    history.pushState(null, null, this.hash);
						}
						else {
						    location.hash = this.hash;
						}
			        });
			        
			        
			        
			        /**
			         * This part handles the highlighting functionality.
			         * We use the scroll functionality again, some array creation and 
			         * manipulation, class adding and class removing, and conditional testing
			         */
			        var aChildren = $(".l-shortcuts li a[href^='#']"); // find the a children of the list items
			        var aArray = []; // create the empty aArray
			        for (var i=0; i < aChildren.length; i++) {    
			            var aChild = aChildren[i];
			            var ahref = $(aChild).attr('href');
			            aArray.push(ahref);
			        } // this for loop fills the aArray with attribute href values



			        function detect_shortcut() {

			            var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page
			            var windowHeight = $(window).height(); // get the height of the window
			            var docHeight = $(document).height();
			            
			            for (var i=0; i < aArray.length; i++) {
			                var theID = aArray[i];
			                var divPos = $(theID).offset().top-70; // get the offset of the div from the top of page
			                var divHeight = $(theID).height(); // get the height of the div in question
			                if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
			                    $("a[href='" + theID + "']").addClass("active");
			                } else {
			                    $("a[href='" + theID + "']").removeClass("active");
			                }
			            }
					}
			        


			        $(window).scroll(function(){
			            detect_shortcut();
			        });


			        detect_shortcut();
				}
				
			},


			slider_people: function() 
			{
	            $('.people-slider__slides').bxSlider({
	                nextSelector: '.btn-arrow--right',
	                prevSelector: '.btn-arrow--left',
	                nextText: '',
	                prevText: '',
	                pagerCustom: '.people-slider__grid',
	                touchEnabled: false,
	                mode: 'fade'
	            });



	            $('.people-slider__grid a').on('click', function() {
	            	$('.people-slider__grid').fadeOut(0);
	            	$('.people-slider .bx-viewport').fadeIn();
	            });

	            $('.people-slider__ico-tiles').on('click', function() {
	            	$('.people-slider .bx-viewport').fadeOut(0);
	            	$('.people-slider__grid').fadeIn();
	            });

	            if($(window).width() > 700)
	            {
		            $('.people-slider .bx-viewport').fadeIn(0);

		            setTimeout(function() {
		            	$('.people-slider .bx-viewport').fadeOut(0);
		            }, 200);
	            }

			},



			image_slider: function() {
				var sliders = $('.l-main--inner-page').find('.image-slider');

				$.each(sliders, function(i) {
					var slider_id = this.id;

		            $('#'+slider_id+' .image-slider__imgs').bxSlider({
		                nextSelector: '#'+slider_id+' .btn-arrow--right',
		                prevSelector: '#'+slider_id+' .btn-arrow--left',
		                nextText: '',
		                prevText: '',
		                pager: false,
		                autoStart: true
		            });
				});
			},




			resources_auto_hash_launch: function() {
				var path = window.location.pathname;


				if(path.indexOf('resources/') > 0 && window.location.hash !== '')
				{
					var hash = window.location.hash.split('-');


					if(hash[0] == '#latest')
					{
						$.ajax({
							url: site_url+'marketo/latest_resource/id/'+hash[1],
							type: 'POST',
							dataType: 'json',
							success: function(j) {

								if(j.res == 1)
								{

									/* if video --> launch video player in magnific popup */
									if(j.type == 'video')
									{
										$.magnificPopup.open({
										  items: {
										    src: j.url
										  },
										  	type: 'iframe',
										  	titleSrc: 'Video',
									        gallery: {
									          enabled: true,
									          navigateByImgClick: true
									        }
										});

										return false;
									}


									/* if normal marketo form - launch popup with the marketo script */
									else {
										$.magnificPopup.open({
										  items: {
										    src: site_url+'marketo/download_resource/id/'+j.id
										  },
										  	type: 'ajax',
										  	titleSrc: 'Download'
										});
									}
								}
							}
						});
					}
					else {
						var resource_id = hash[1];


						$.ajax({
							url: site_url+'marketo/share_popup/id/'+resource_id,
							type: 'POST',
							dataType: 'json',
							success: function(j) {

								if(j.res == 1)
								{

									/* if video --> launch video player in magnific popup */
									if(j.type == 'video')
									{
										$.magnificPopup.open({
										  items: {
										    src: j.url
										  },
										  	type: 'iframe',
										  	titleSrc: 'Video',
									        gallery: {
									          enabled: true,
									          navigateByImgClick: true
									        }
										});

										return false;
									}


									/* if normal marketo form - launch popup with the marketo script */
									else {
										$.magnificPopup.open({
										  items: {
										    src: site_url+'marketo/download_resource/id/'+resource_id
										  },
										  	type: 'ajax',
										  	titleSrc: 'Download'
										});
									}
								}
							}
						});
					}
				}
			},




			resources_from_menu_when_on_resources: function() {
				$('.l-megamenu .col-35.right a[href*="#"]').on('click', function() 
				{
					var path = window.location.pathname;

					if(path.indexOf('resources/') > 0 && window.location.hash !== '')
					{
						window.location.hash = $(this).attr('href').split('#')[1];
						window.location.reload(true);
						return false;
					}
				});
			},


			sorter: function() {
				if($('.sorter').length> 0) {
					$('.sorter').clone().insertAfter('.inner-page').addClass('sticky');

					$('.inner-page__container').waypoint(function(direction) 
					{
						if (direction == 'down')
						{
						  	$('.sorter.sticky').slideToggle(200);
						}
						 else {
						  	$('.sorter.sticky').slideToggle(100);
						}
					}, { offset: 65 });
				}
			},



			counter: function() {
				if($('div[data-counter="1"]').length)
				{
					$('div[data-counter="1"] em, div[data-counter="1"] p').css({'opacity':0});

					$('div[data-counter="1"]').waypoint(function(direction) 
					{
						if(!($('div[data-counter="1"] .counter').hasClass('ready')))
						{
							$('div[data-counter="1"] .counter').addClass('ready');
							
							$('div[data-counter="1"] em:first').animate({
								'opacity': 1
							}, 500);

							setTimeout(function() {
								$('div[data-counter="1"] .counter').animate({
									'opacity': 1
								}, 250);


								var count = function() {
									var counter = $('div[data-counter="1"] .counter');
									var num = counter.text();
									counter.text('0');

									


									var a = 0;
									var count = setInterval(function() {
										counter.text(a);
										a = a + 1;
										if ( a >= num ) {
											counter.text(num);
											clearInterval(count);
										}
									}, 25);
								};

								setTimeout(function() {
									$('div[data-counter="1"] em').animate({
										'opacity': 1
									}, 250);


									setTimeout(function() {
										$('div[data-counter="1"] p').animate({
											'opacity': 1
										}, 350);
									}, 700);
								}, 400);


								count();

							}, 500);

						}

					}, { offset: 350 });
				}
			},

			init: function() {
				this.shortcuts();
				this.slider_people();
				this.image_slider();
				this.resources_auto_hash_launch();
				this.sorter();
				this.counter();
				this.resources_from_menu_when_on_resources();
			}
		};

		h.init();
		global.init();
	});



});