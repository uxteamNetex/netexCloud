// Ponerle al árbol de grupos altura 100%
$(document).ready(function($) {
    function ztreeHeight(){
        var windowHeight = $(document).height();
        var navbarHeight = $('.navbar.navbar-topbar').height();
        var tabsToolbarHeight = $('.tabs-wrapper').height();
        var searchToolbarHeight = $('.row.toolbar').height();
        var footerHeight = $('.footer').height();
        $('#groupstree').height(windowHeight - navbarHeight - tabsToolbarHeight - searchToolbarHeight - footerHeight - 2); 
    }
    function ztreeHeightReset(){
        $('#groupstree').height(0); 
    }
    function ztreeHeightInside(){
        var insideHeight = $('.inside').height();
        $('#groupstree').height(insideHeight); 
    }
    ztreeHeight();
    //Volver a cargar la función cuando se redimensiona la pantalla
    $(window).resize(function(){
        ztreeHeightReset();
        ztreeHeight();
    });
    //Volver a cargar la función cuando se despliegan los roles
    $(".info-list-more").click(function(){
        setTimeout(function(){
            ztreeHeightReset();
            ztreeHeight();
        },50); //Le damos un poco de holgura para que no haga inmediato al click, sino que espere x ms 
    });
    //Volver a cargar la función cuando se despliegan las tabs
    $(".nav.nav-tabs li").click(function(){    
        setTimeout(function(){
            ztreeHeightReset();
            ztreeHeight();
        },50);  //Le damos un poco de holgura para que no haga inmediato al click, sino que espere x ms      
    });
    //Volver a cargar la función cuando se despliega el arbol de grupos
    $(".ztree li").click(function(){    
        setTimeout(function(){
            ztreeHeightReset();
            ztreeHeightInside();
        },500);  //Le damos un poco de holgura para que no haga inmediato al click, sino que espere x ms      
    });
}); 