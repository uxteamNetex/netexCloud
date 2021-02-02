jQuery(document).ready(function() {

    var navClass = '.submenu-lateral .submenu-animate';
    var navControllersClass = '.submenu-lateral .submenu-animate-controller';
    
    jQuery(navClass + ', '+navControllersClass).on('click', function(event) {
        //console.log('CLICK menu lateral!');
        jQuery(navClass).toggleClass('focus');
    });
});
