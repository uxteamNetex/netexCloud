$(document).ready(function(){ 
    //Scroll lateral
    $('.fixed-table-body').scroll(function () {
        $(this).find('th:first-child').css('left', $(this).scrollLeft());
        $(this).find('td:first-child').css('left', $(this).scrollLeft());
        //Primera tabla
        if ($('.fixed-table-body:eq(0)').scrollLeft() > 0) {
            $('.fixed-table-body:eq(0) th:first-child').addClass('shadow-right');
            $('.fixed-table-body:eq(0) td:first-child').addClass('shadow-right');
        } else {
            $('.fixed-table-body:eq(0) th:first-child').removeClass('shadow-right');
            $('.fixed-table-body:eq(0) td:first-child').removeClass('shadow-right');
        }
        //Segunda tabla
        if ($('.fixed-table-body:eq(1)').scrollLeft() > 0) {
            $('.fixed-table-body:eq(1) th:first-child').addClass('shadow-right');
            $('.fixed-table-body:eq(1) td:first-child').addClass('shadow-right');
        } else {
            $('.fixed-table-body:eq(1) th:first-child').removeClass('shadow-right');
            $('.fixed-table-body:eq(1) td:first-child').removeClass('shadow-right');
        }
    });

    //Scroll vertical
    if ($(".fixed-table-body").length > 1){
        $(window).scroll(function() { 
            //Primera tabla
            var firstHeaderTable = $('.fixed-table-body:eq(0) table thead').offset().top;
            var navbarHeight = $('.navbar-topbar-wrapper').height();
            if ($(window).scrollTop() > (firstHeaderTable - navbarHeight)){
                $('.fixed-table-body:eq(0) table thead tr th').css('top', ($(window).scrollTop() - (firstHeaderTable - navbarHeight) ));
                $('.fixed-table-body:eq(0) table thead tr th').addClass('shadow-bottom');
            } else{
                $('.fixed-table-body:eq(0) table thead tr th').css('top', 0);
                $('.fixed-table-body:eq(0) table thead tr th').removeClass('shadow-bottom');
            } 
            //Segunda tabla
            var secondHeaderTable = $('.fixed-table-body:eq(1) table thead').offset().top; 
            if ($(window).scrollTop() > (secondHeaderTable - navbarHeight)){
                $('.fixed-table-body:eq(1) table thead tr th').css('top', ($(window).scrollTop() - (secondHeaderTable - navbarHeight) ));
                $('.fixed-table-body:eq(1) table thead tr th').addClass('shadow-bottom');
            } else{
                $('.fixed-table-body:eq(1) table thead tr th').css('top', 0);
                $('.fixed-table-body:eq(1) table thead tr th').removeClass('shadow-bottom');
            } 
        });
    } else{
        $(window).scroll(function() {
        //Primera tabla
            var firstHeaderTable = $('.fixed-table-body:eq(0) table thead').offset().top;
            var navbarHeight = $('.navbar-topbar-wrapper').height();
            if ($(window).scrollTop() > (firstHeaderTable - navbarHeight)){
                $('.fixed-table-body:eq(0) table thead tr th').css('top', ($(window).scrollTop() - (firstHeaderTable - navbarHeight) ));
                $('.fixed-table-body:eq(0) table thead tr th').addClass('shadow-bottom');
            } else{
                $('.fixed-table-body:eq(0) table thead tr th').css('top', 0);
                $('.fixed-table-body:eq(0) table thead tr th').removeClass('shadow-bottom');
            } 
        });
    }
  
});

