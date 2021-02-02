// Poner al contenido el mismo alto que el documento para que el footer siempre este abajo de todo
jQuery(document).ready(function(){
    var navbarHeight = jQuery(".navbar-topbar").height();
    var documentHeight = jQuery(document).height();
    jQuery(".content").height(documentHeight - navbarHeight);
});
//Detecta cuando se abren elementos desplegables y recalcula el alto del documento
jQuery('.collapse').on('shown.bs.collapse', function () {
    var navbarHeight = jQuery(".navbar-topbar").height();
    var documentHeight = jQuery(document).height();
    jQuery(".content").height(documentHeight - navbarHeight);
})
//Detecta cuando se va a cerrar el elemento, coge su altura y recalcula el alto del documento
jQuery('.collapse').on('hide.bs.collapse', function () {
    var collapsableElementHeight = jQuery('.collapse.in').height();
    var navbarHeight = jQuery(".navbar-topbar").height();
    var documentHeight = jQuery(document).height();
    jQuery(".content").height(documentHeight - navbarHeight - collapsableElementHeight);
})
