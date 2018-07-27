t = $(window).scrollTop();
w = $(window).width();
h = $(window).height();

$( () => {

	$(window).scroll( (evt) => {
		t = $(evt.currentTarget).scrollTop();


	}).resize( (evt) => {
		w = $(window).width();
		h = $(window).height();

		
	}).on('load', (evt) => {

		Preloader.hidden();
		
	})

	Header.init();

	if ($('#headerSlider').length) {
		$('#headerSlider').slick({
			infinite: true,
			arrows: true,
			prevArrow: $('.header-slider-wrap .slick-prev'),
			nextArrow: $('.header-slider-wrap .slick-next'),
			fade: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			asNavFor: '#headerSliderTiles'
		});
	}
	if ($('#headerSliderTiles').length) {
		$('#headerSliderTiles').slick({
			infinite: true,
			arrows: false,
			slidesToShow: 4,
			slidesToScroll: 1,
			focusOnSelect: true,
			asNavFor: '#headerSlider',
			responsive: [{
				breakpoint: 992,
				settings: {
					variableWidth: true
				}
			}]
		});
	}
})

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
