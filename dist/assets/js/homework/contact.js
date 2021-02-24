require(['./main'], function (main) {




	require(['jquery', 'tweenmax', 'components/bxslider', 'global'], function($, tweenmax, $bxslider, global) {
		

		var c = {

			map: function() 
			{
				/* init */
				function init_stage()
				{
				    TweenMax.to('#js-office-1', 1, {left:'37%', top:'39.5%', opacity:1});
				    TweenMax.to('#js-office-2', 1, {left:'36%', top:'40%', opacity:1});
				    TweenMax.to('#js-office-3', 1, {left:'27.4%', top:'61%', opacity:1});
				    TweenMax.to('#js-office-4', 1, {left:'67.5%', top:'29%', opacity:1});
				}

				init_stage();


			    // triggering
				$(".contact-map__office").click(function() {

				    $(".contact-map" ).addClass( "active" );
				    $(".contact-map h1, .inner-page__header--contact .btn").fadeOut("fast");

				    $("#office-1, #office-4, #office-2, #office-3" ).removeClass( "office-active" );


				    TweenMax.to('.contact-map__map, .contact-map__shadow', 1, {scaleX:4, scaleY:4});
				    TweenMax.to('#js-office-1', 1, {left:'-3%', top:'27%'});
				    TweenMax.to('#js-office-2', 1,{left:'-3.5%', top:'29%'});
				    TweenMax.to('#js-office-3', 1, {left:'-43%', top:'115%'});
				    TweenMax.to('#js-office-4', 1, {left:'120.5%', top:'-12%'});

				    switch(this.id) {
				    case 'js-office-1':
				        $("#office-1" ).addClass( "office-active" );
				        TweenMax.to('.contact-map__container', 1, {left:'68%', marginTop:'4%'});
				        break;

				    case 'js-office-2':
				        $("#office-2" ).addClass( "office-active" );
				        TweenMax.to('.contact-map__container', 1, {left:'78%', marginTop:'4%'});
				        break;


				    case 'js-office-4':
				        $("#office-4" ).addClass( "office-active" );
				        TweenMax.to('.contact-map__container', 1, {left:'-60%', marginTop:'20%'});
				        break;

				    case 'js-office-3':
				        $("#office-3" ).addClass( "office-active" );
				        TweenMax.to('.contact-map__container', 1, {left:'110%', marginTop:'-30%'});
				        break;



				    default:
				    } 
				});

				
				function back_to_initial_stage() {
				    $(".contact-map").removeClass( "active" );
				    $(".contact-map h1, .inner-page__header--contact .btn").fadeIn("fast");


				    TweenMax.to('.contact-map__container', 1, {left:0, marginTop:'50px'});
				    TweenMax.to('.contact-map__map, .contact-map__shadow', 1, {scaleX:1, scaleY:1});
				}

				
				// going back to the initial stage
				$(".contact-map__map").click(function() {

					back_to_initial_stage();
				    init_stage();
				});



				$(".contact-map__pusher-close").click(function() {
				    back_to_initial_stage();
				    init_stage();
				});

			},


			init: function() {
				this.map();
			}
		};

		c.init();
		global.init();
	});



});