$(document).ready(function(){
    function startSlide(){
        $('.slide-multiple-items').slick({
            dots: true,
            infinite: true,
            speed: 700,
            slidesToShow: 9,
            slidesToScroll: 9,
            responsive: [
                {
                breakpoint: 2000,
                settings: {
                    slidesToShow: 8,
                    slidesToScroll: 8
                }
                },
                {
                breakpoint: 1800,
                settings: {
                    slidesToShow: 7,
                    slidesToScroll: 7
                }
                },
                {
                breakpoint: 1500,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 6
                }
                },
                {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5
                }
                },
                {
                breakpoint: 970,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
                },
                {
                breakpoint: 760,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
                },
                {
                breakpoint: 580,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
                },
                {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
                }
            ]
        });
    }
    startSlide();

    $('.slick-prev').click(function(){
        startSlide();
    });
    $('.slick-next').click(function(){
        startSlide();
    });

    //Le añadimos la clase selected a la card seleccionada
    $('.material-card-image-new').click(function(){
        $('.material-card-link').removeClass('card-selected');
        $(this).find('.material-card-link').addClass('card-selected');
    });
});