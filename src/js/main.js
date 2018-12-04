t = $(window).scrollTop();
w = $(window).width();
h = $(window).height();

$( () => {

	$(window).scroll( (evt) => {
		t = $(evt.currentTarget).scrollTop();


	}).resize( (evt) => {
		w = $(window).width();
		h = $(window).height();

		Aside.resize();

	}).on('load', (evt) => {

		Preloader.hidden();
		
	})

	Header.init();

	if ($('.nav-tabs').length) {
		
	}

	if ($('#headerSlider').length) {
		$('#headerSlider').slick({
			infinite: true,
			arrows: true,
			prevArrow: $('.header-slider-wrap .slick-prev'),
			nextArrow: $('.header-slider-wrap .slick-next'),
			fade: true,
			slidesToShow: 1,
			slidesToScroll: 1
		});
	}

	if ($('.site-slider').length) {
		$('.site-slider').on('init reInit afterChange', (event, slick, currentSlide, nextSlide) => {
			const ind = (currentSlide ? currentSlide : 0);
			const title = $(slick.$slides.get(currentSlide)).data('title');

			$('.site-slider-info__cnt').empty().append(
				$('<span/>', {text: ind + 1}),
				$('<span/>', {text: slick.slideCount})
			);
			$('.site-slider-info__title').fadeOut(200, () => {
				$('.site-slider-info__title').html(title).fadeIn(200);
			})
		});
		$('.site-slider').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			dots: false,
			arrows: true,
			infinite: true,
			speed: 500,
			cssEase: 'ease-in',
			variableWidth: true,
			variableHeight: true,
			centerMode: true,
			centerPadding: 0,
			prevArrow: $('.site-slider-wrap .slick-prev'),
			nextArrow: $('.site-slider-wrap .slick-next'),
			responsive: [{
				breakpoint: 576,
				settings: {
					arrows: false
				}
			}]
		});
	}

	$('.form-group').each((i, eElem) => {
		const eField = $(eElem).find('input, textarea');

		eField.on('focus', (evt) => {
			$(evt.currentTarget).parents('.form-group').addClass('active-label');

		}).on('blur', (evt) => {
			if ($(evt.currentTarget).val().length == 0) 
				$(evt.currentTarget).parents('.form-group').removeClass('active-label');
		});
		if (eField.val() != '') $(eElem).addClass('active-label');
	})

	$('.view-image').on('click', (evt) => {
		$('#modalImage img').attr('src', $(evt.currentTarget).data('view')); 
		$('#modalImage').modal('show');
	});

	СatalogCart.init();
	Aside.init();
	VideoModal.init();

})

const СatalogCart = {
	init () {
		this.slider = $('#sliderCart').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			dots: false,
			fade: true,
			asNavFor: '#sliderCartThumb',
			focusOnSelect: true
		});
		this.sliderThumbs = $('#sliderCartThumb').slick({
			slidesToShow: 3,
			slidesToScroll: 1,
			asNavFor: '#sliderCart',
			arrows: true,
			prevArrow: '<button class="slick-prev"><svg class="i-svg i-svg-prev "><use xlink:href="#i-svg-prev"></use> </svg></button>',
			nextArrow: '<button class="slick-next"><svg class="i-svg i-svg-prev "><use xlink:href="#i-svg-next"></use> </svg></button>',
			dots: false,
			centerMode: false,
			variableWidth: false,
			focusOnSelect: true,
			responsive: [{
				breakpoint: 768,
				settings: {
					arrows: false
				}
			}]
		});

		$('#sliderCart .slick-slide').click(() => {
    		this.slider.slick('slickNext');
		});
	}
}

const Aside = {
	init () {
		this.eExpandAll = $('.aside-title').next();

		Aside.resize();
		
		$('.aside-title').on('click', (evt) => {
			this.accord($(evt.currentTarget));
		})
	},
	resize () {
		if (w < 992) {
			this.eExpandAll.hide();
		} else {
			this.eExpandAll.show();
		}
	},
	accord (eElem) {
		const eExpand = eElem.next();
		if (eExpand.is(':hidden')) {
			this.eExpandAll.slideUp(250);
			eExpand.slideDown(250);
		}
	}
}

function onYouTubePlayerAPIReady () {
	$(function () {
		VideoModal.createPlayer();
	})
}

const VideoModal = {
	init () {
		let scriptYoutube = document.createElement('script');
		scriptYoutube.src = 'https://www.youtube.com/iframe_api';
		let firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(scriptYoutube, firstScriptTag);

		$('.play-video').addClass('play-disabled').attr('disabled', 'disabled');
		$('.play-video').on('click', (evt) => {
			VideoModal.play($(evt.currentTarget).data('play'));
			$('#modalVideo').modal('show');
		});

		$('#modalVideo .close').on('click', (evt) => {
			VideoModal.stop();
			$('#modalVideo').modal('hide');
		});
	},

	createPlayer () {
		var _this = this;

		this.player = new YT.Player('moadalVideoPlayer', {
			playerVars: {
				modestbranding: 0,
				branding: 0,
				autoplay: 1,
				controls: 1,
				rel: 0,
				loop: 0,
				wmode: 'opaque',
				showinfo: 0,
				playlist: ''
			},
			videoId: '',
			events: {
				'onReady': onPlayerReady,
				'onStateChange': onStateChange
			}
		});

		function onStateChange (evt) {
			if (event.data == YT.PlayerState.ENDED) {
				//_this.player.playVideo();
			}
		}
		function onPlayerReady (evt) {
			$('.play-video').removeAttr('disabled').removeClass('play-disabled');
			//e.target.mute();
			//e.target.playVideo();
		}
		//this.player.pauseVideo();
		//this.player.playVideo();
	},

	play (sVideoId) {
		this.player.loadVideoById({
			'videoId': sVideoId,
			//'startSeconds': 0,
			//'endSeconds': 60,
			'suggestedQuality': 'default'
		});
	},

	stop (sVideoId) {
		this.player.stopVideo();
	}
}

const Header = {

	init () {
		this.extraNav.init();
		this.search.init();
	},

	search: {
		eBtn: $('#btnTglSearchNav'),
		eElem: $('#searchNav'),

		init () {
			this.setEvtShow();
		},
		setEvtShow () {
			this.eBtn.on('click.showSearchNav', (evt) => {
				this.showing();

				evt.preventDefault();
				evt.stopPropagation();
			})
		},
		showing () {
			this.eElem.addClass('open').find('input').focus();

			this.eBtn.unbind('click.showSearchNav');
			$(document).on('click.hideSearchNav', (evt) => {
				if (!$(evt.target).closest(this.eElem.parent()).length) {
					this.hidden();
				}
			})
		},
		hidden () {
			this.eElem.removeClass('open');

			$(document).unbind('click.hideSearchNav');
			this.setEvtShow();
		}
	},

	extraNav: {
		isshow: false,

		init () {
			this.eElem = $('#headerExtraNav');

			$('#btnShowExtraNav').on('click', (evt) => {
				this.showing();
				this.isshow = true;
				evt.stopPropagation();
			})

			$('#btnHideExtraNav').on('click', (evt) => {
				this.hidden();
				this.isshow = false;
				evt.stopPropagation();
			})

			this.accord();
		},

		showing () {
			this.eElem.addClass('open');

			$(document).on('click.clickExtraNav', (evt) => {
				if (!$(evt.target).closest(this.eElem).length) {
					this.hidden();
				}
			})
		},

		hidden () {
			this.eElem.removeClass('open');
			$(document).unbind('click.clickExtraNav');
		},

		accord () {
			let eUl = this.eElem.find('.collapse-nav li ul');

			eUl.hide().each( (i, eElem) => {
				$(eElem).prev().on('click', (evt) => {
					eUl.stop().slideUp(200).prev().not($(evt.currentTarget)).removeClass('active');
					$(evt.currentTarget).toggleClass('active').next().stop().slideToggle(200);
				});
			})
		}
	}
}

const Preloader = {
	elem: document.getElementById('preloader'),
	
	hidden () {
		this.elem.classList.add('complete');
		document.body.classList.remove('loading');
		document.body.classList.add('loaded');
	},
	showing () {
		document.body.classList.remove('loaded');
		document.body.classList.add('loading');
		this.elem.classList.remove('complete');
	}
}
