$(function() {
    // Slider Preview Init
    Slider.initSliderPreviewBook();
    Slider.initSliderHealthCards();

    // Menu NavBar
    $( 'ul.nav-bar li' ).on( 'click', function () {
        if (!$(this).hasClass('active')){
            $( 'ul.nav-bar' ).find( 'li.active' ).removeClass( 'active' );
            $( this ).addClass( 'active' );
        }
    });
});

const Slider = {

    initSliderPreviewBook: function () {
        $('#sliderPreviewBook').lightSlider({
            gallery: true,
            item: 1,
            slideMargin: 5,
            thumbItem: 3,
            autoWidth: false,
            galleryMargin: 20,
            thumbMargin: 15,
            currentPagerPosition: 'middle',
            speed: 1000,
            auto: true,
            loop: true,
            pause: 5000,
            responsive: [
                {
                    breakpoint:767,
                    settings: {
                        gallery: false,
                        pause: 3000,
                        galleryMargin: 0,
                        thumbMargin: 0,
                    }
                },
            ]
        });
    },

    initSliderHealthCards: function () {
        $('#sliderHealthCards').lightSlider({
            item:1,
            slideMargin:5,
            loop:true,
            autoWidth: false,
            currentPagerPosition: 'middle',
            auto: true,
            responsive: [
                {
                    breakpoint:380,
                    settings: {
                        slideMargin: 0,
                    }
                },
            ]
        });
    },
};
