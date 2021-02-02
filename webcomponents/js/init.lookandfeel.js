
    
/**
 * Previsualiza el color seleccionado en la vista previa.
 */
function previewColor(colorNew){

    var frameLogin = jQuery('#frame_login').contents();
    var frameDesktop = jQuery('#frame_desktop').contents();
    var frameDesktopClassic = jQuery('#frame_desktop_classic').contents();
    //var colorNew = 'red';
            
    frameLogin.find("body.login").css("color",colorNew);
    frameLogin.find("body.login .login-instructions").css("color",colorNew);
    frameLogin.find("body.login .login-wrapper .form-login label").css("color",colorNew);
    frameLogin.find("body.login .login-wrapper .forgot-password-wrapper a").css("color",colorNew);
    frameLogin.find("body.login .footer-content").css("color",colorNew);
    
    frameDesktop.find("body.desktop").css("color",colorNew);
    frameDesktop.find("body.desktop .navbar .topbar-wrapper .navbar-topbar-wrapper .nav > li.profile-username span").css("color",colorNew);
    frameDesktop.find("body.desktop .desktop-apps-wrapper .desktop-app a").css("color",colorNew);
    frameDesktop.find("body.desktop footer.footer .developed").css("color",colorNew);
    frameDesktop.find("body.desktop footer.footer .version").css("color",colorNew);
    frameDesktop.find("body.desktop footer.footer .manual").css("color",colorNew);
    frameDesktop.find("body.desktop footer.footer .manual a").css("color",colorNew);
    frameDesktop.find("body.desktop footer.footer .help").css("color",colorNew);
    frameDesktop.find("body.desktop footer.footer .help a").css("color",colorNew);    

    frameDesktopClassic.find("body.desktop-classic .navbar-desktop-classic ul.navbar-nav > li > a").css("color",colorNew);
    //Capado cambiar el footer:
    //frameDesktopClassic.find("body.desktop-classic footer.footer").css("color",colorNew);
    //frameDesktopClassic.find("body.desktop-classic footer.footer a").css("color",colorNew);
}; 

/**
 * Previsualiza el color en el header del escritorio classic.
 */
function previewColorHeader(colorNew){    
    var frameDesktopClassic = jQuery('#frame_desktop_classic').contents();    
    frameDesktopClassic.find("body.desktop-classic .navbar-desktop-classic").css("background",colorNew);
    frameDesktopClassic.find("body.desktop-classic .navbar-desktop-classic .navbar-header-logo").css("background",colorNew);
    frameDesktopClassic.find("body.desktop-classic .navbar-desktop-classic .navbar-topbar-wrapper").css("background",colorNew);    
}

/**
 * Previsualiza el background que le pasamos
 */
function previewBackground(urlBackgroundImage){
    var frameLogin = jQuery('#frame_login').contents();
    var frameDesktop = jQuery('#frame_desktop').contents();
    
    var bgImage = "../../files/wallpapers/wallpaper_02.png";
    if(typeof urlBackgroundImage != 'undefined')
        bgImage = urlBackgroundImage;
   
    frameLogin.find("body.login").css("background", bgImage);
    frameDesktop.find("body.desktop").css("background",bgImage);
}

/**
 * Previsualiza el logo principal
 */
function previewFirstLogo(urlLogo){    
    var frameDesktop = jQuery('#frame_desktop').contents();
    var frameDesktopClassic = jQuery('#frame_desktop_classic').contents();
    
    var bgLogo = "../../files/icons/logo/logocloudlarge.png";
    if(typeof urlLogo != 'undefined')
        bgLogo = urlLogo;
   
    var classLogo = "body.desktop .navbar .topbar-wrapper .navbar-header a.navbar-brand";
    frameDesktop.find(classLogo).css("background", bgLogo+" no-repeat top 0 left 0");
    frameDesktop.find(classLogo).css("background-image", bgLogo);
    frameDesktop.find(classLogo).css("background-repeat", "no repeat");
    frameDesktop.find(classLogo).css("background-position", "top 0 left 0");
    frameDesktop.find(classLogo).css("background-size", "contain");
    
    //logonavbar
    //url("http://localhost:3456/files/icons/logo/logo_01.png")
    var srcLogo = urlLogo.replace('url("',"");
    srcLogo = srcLogo.replace('")',"");
    frameDesktopClassic.find("#logonavbar").attr('src', srcLogo);
}

/**
 * Previsualiza el logo secundario
 */
function previewSecondLogo(urlLogo){
    var frameLogin = jQuery('#frame_login').contents();   
    
    var bgLogo = "../../files/icons/logo/logocloudlarge.png";
    if(typeof urlLogo != 'undefined')
        bgLogo = urlLogo;
   
    frameLogin.find("body.login .login-wrapper .login-logo").css("background", bgLogo+" no-repeat top center");
}

 
 
 jQuery(document).ready(function() {

    if(typeof CKEDITOR != "undefined"){
        //Activamos los ckeditor:
        CKEDITOR.replace( 'classic_editor_default' );
        CKEDITOR.replace( 'classic_editor_es' );
        CKEDITOR.replace( 'classic_editor_en' );
        CKEDITOR.editorConfig = function( config ) {
            config.language = 'es';
            config.uiColor = '#F7B42C';
            config.height = 250;
            config.toolbarCanCollapse = true;
        };
        //Solo interceptamos los cambios de la default:
        CKEDITOR.instances['classic_editor_default'].on('change', function() {        
            var htmlData = this.getData();
            
            var frameDesktopClassic = jQuery('#frame_desktop_classic').contents(); 
            //console.debug(frameDesktopClassic.find("body.desktop-classic #client-container"));
            var desktopClassicClientContainer = frameDesktopClassic.find("body.desktop-classic #client-container");
            desktopClassicClientContainer.html(htmlData);         
        });
    }
   
    
    
    //Activa colorpicker y configura evento cambio de color:   
    jQuery('#colorpickerTextcolor').colorpicker().on('changeColor.colorpicker', function(event){
        var colorNew = event.color.toHex();
        previewColor(colorNew);
    });
    
    jQuery('#colorpickerHeaderColor').colorpicker().on('changeColor.colorpicker', function(event){
        var colorNew = event.color.toHex();
        previewColorHeader(colorNew);
    });
    

    //Cambio de imagen de fondo:
    jQuery('.desktop-images-preview-wrapper .desktop-image-preview-wrapper').on('click', function(e) {
        e.preventDefault();
        jQuery('.desktop-images-preview-wrapper .desktop-image-preview-wrapper').removeClass('selected');
        jQuery(this).addClass('selected');
        
        var urlBackground = jQuery(this).find('.desktop-image-preview').css('background-image');
        //console.log("--->"+urlBackground);
        previewBackground(urlBackground);
    });

    //Selección Logotipo principal
    jQuery('#logotypes-first .logotypes-preview-wrapper .logotype-preview-wrapper').on('click', function(e) {
        e.preventDefault();
        jQuery('#logotypes-first .logotypes-preview-wrapper .logotype-preview-wrapper').removeClass('selected');
        jQuery(this).addClass('selected');
       
       //FIRSTLOGO
        var urlLogo = jQuery(this).find('.logotype-preview').css('background-image');
        //console.log("First Logo: "+urlLogo);        
        previewFirstLogo(urlLogo);
    });
   
    //Selección Logotipo secundario
     jQuery('#logotypes-second .logotypes-preview-wrapper .logotype-preview-wrapper').on('click', function(e) {
        e.preventDefault();
        jQuery('#logotypes-second .logotypes-preview-wrapper .logotype-preview-wrapper').removeClass('selected');
        jQuery(this).addClass('selected');

        var urlLogo = jQuery(this).find('.logotype-second-preview').css('background-image');        
        //console.log("Second Logo: "+urlLogo);
        previewSecondLogo(urlLogo);
    });

    //Selección Logotipo terciario
     jQuery('#logotypes-third .logotypes-preview-wrapper .logotype-preview-wrapper').on('click', function(e) {
        e.preventDefault();
        jQuery('#logotypes-third .logotypes-preview-wrapper .logotype-preview-wrapper').removeClass('selected');
        jQuery(this).addClass('selected');

       //THIRD LOGO?
    });

 
    //Lanzar modalpopup borrado logotipo:
    jQuery('.logotypes-preview-wrapper .logotype-preview-wrapper .btn-circle-close').on('click', function(e) {
        e.preventDefault();
        jQuery('#modalDeleteLogotype').modal('show') ; //open message popup
        //Guardamos el logotipo clickeado para más adelante si hay que borrarlo presionando en delete:
        var logotypeToDelete = jQuery(this).closest('.logotype-preview-wrapper').attr( "data-logotype" );            
        jQuery('#data-logotype-delete').val(logotypeToDelete);                                                  
    });
    
  
    //Borrado logotipo
    jQuery('#btnDeleteLogotype').on('click', function(e) {
        e.preventDefault();
        jQuery('#modalDeleteLogotype').modal('hide'); //close message popup
        //Recogemos el logotipo seleccionado anteriormente y lo borramos:
        var dataLogotypeDelete = jQuery('#data-logotype-delete').val();
        var logotype = jQuery(".detail-content").find("[data-logotype='" + dataLogotypeDelete + "']");
        if(typeof logotype != "undefined")
            logotype.remove();
        else
            console.log("Ha existido un error desconocido");
    });
      
    //Landar modalpopup borrado imagen de fondo:
    jQuery('.desktop-images-preview-wrapper .desktop-image-preview-wrapper .btn-circle-close').on('click', function(e) {            
        e.preventDefault();
        jQuery('#modalDeleteDesktopImage').modal('show') ; //open message popup
        //Guardamos el logotipo clickeado para más adelante si hay que borrarlo presionando en delete:
        var imageDesktopToDelete = jQuery(this).closest('.desktop-image-preview-wrapper').attr( "data-wallpaper" );                        
        jQuery('#data-desktop-image-delete').val(imageDesktopToDelete);                                                  
    });
    
    //Borrado imagen de fondo:
    jQuery('#btnDeleteDesktopImage').on('click', function(e) {
        e.preventDefault();
        jQuery('#modalDeleteDesktopImage').modal('hide'); //close message popup
        //Recogemos el logotipo seleccionado anteriormente y lo borramos:
        var dataImageDesktopDelete = jQuery('#data-desktop-image-delete').val();
        var image = jQuery(".detail-content").find("[data-wallpaper='" + dataImageDesktopDelete + "']");
        if(typeof image != "undefined")
            image.remove();
        else
            console.log("Ha existido un error desconocido");
    });
    
    
    //Checkboxes Configurar Vista:
    jQuery('#chk_display').on('click', function(e) {
        //e.preventDefault();
        jQuery('#chk_display').attr('checked', true);
        jQuery('#chk_classic').attr('checked', false);
        
        jQuery('#classic_view_options').hide();
       
    });
    
    jQuery('#chk_classic').on('click', function(e) {
        //e.preventDefault();
        jQuery('#chk_classic').attr('checked', true);
        jQuery('#chk_display').attr('checked', false);
       
        jQuery('#classic_view_options').show();
    });


    //Tooltips
    $('.logotype-preview-wrapper.selected-others').tooltip();

});

