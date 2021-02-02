
    
/**
 * Previsualiza el color seleccionado en la vista previa.
 */
function previewColor(colorNew){

    var frameTablet = jQuery('#frame_tablet').contents();
    var frameMobile = jQuery('#frame_mobile').contents();
                
    frameTablet.find("#menu-lateral-app .profile").css("color",colorNew);
    frameMobile.find("#menu-lateral-app .profile").css("color",colorNew);   
}; 



/**
 * Previsualiza el background que le pasamos
 */
function previewBackground(urlBackgroundImage){
    var frameTablet = jQuery('#frame_tablet').contents();
    var frameMobile = jQuery('#frame_mobile').contents();
    
    var bgImage = "../../files/wallpapers/wallpaper_02.png";
    //var urlBackgroundImage = jQuery('#wallpaper_custom').css('background');

    if(typeof urlBackgroundImage != 'undefined')
        bgImage = urlBackgroundImage;
   
    frameTablet.find("#menu-lateral-app .profile").css("background", bgImage);
    frameMobile.find("#menu-lateral-app .profile").css("background",bgImage);
}


//CROPPIE:--------------------------------------------------------------------------------------------------------------------
var $uploadCrop; //Global croppie (an unique croppie, if you need more: create an array of croppies)

function readFileCroppie(inputFile) {           
    if (inputFile.files && inputFile.files[0]) {
        var reader = new FileReader();        
        reader.onload = function (e) {
            $uploadCrop.croppie('bind', {
                url: e.target.result
            });
            $('#upload-demo').addClass('ready');

            //Add clean button:
            $('#upload-demo-container  .croppie-wrapper-innactive-close').addClass('croppie-wrapper-close');
            $('#upload-demo-container  .croppie-wrapper-innactive-close').removeClass('croppie-wrapper-innactive-close');
        }        
        reader.readAsDataURL(inputFile.files[0]);
    }
    else {
        alert("Sorry - you're browser doesn't support the FileReader API");
    }
}


function loadCroppie(){

    //Clean value input file:
    var inputFile = jQuery('#upload');
    inputFile.val('');     

    //Clean croppie container:
    jQuery('#upload-demo').html('');

    //Add clean button:
    $('#upload-demo-container  .croppie-wrapper-close').addClass('croppie-wrapper-innactive-close');
    $('#upload-demo-container  .croppie-wrapper-close').removeClass('croppie-wrapper-close');
    
    //Img: 330px x 196px
    //Init Croppie:
    $uploadCrop = jQuery('#upload-demo').croppie({
			viewport: {
				width: 330,
				height: 196,				
			},            
			boundary: {
				width: 350,
				height: 216,
                customClass: "img-responsive",
			},
			exif: true
	});
    jQuery('#upload-demo .cr-boundary').addClass('img-responsive');

     //Upload file:
    jQuery('#upload').on('change', function () {   
        var inputFile = this;      
        readFileCroppie(inputFile); 
    });

    jQuery('#upload-demo-clean').on('click', function (ev) {                     
       loadCroppie();
    });
}


 jQuery(document).ready(function() {
    //Activa colorpicker y configura evento cambio de color:   
    jQuery('#colorpickerTextcolor').colorpicker().on('changeColor.colorpicker', function(event){
        var colorNew = event.color.toHex();
        previewColor(colorNew);
    });

    //Cargamos el objeto croppie:
    loadCroppie();
          
    jQuery('#btnAddBackground').on('click', function (ev) {
        $uploadCrop.croppie('result', {
            type: 'canvas',
            size: 'viewport'
        }).then(function (resp) {           
           jQuery('.img-wallpaper_custom').css('background-image', 'url(' + resp + ')');
            //jQuery('#wallpaper_custom').css('background-image', 'url(' + resp + ')');
            //console.debug(resp);            
        });
    });   
 //-------------------------------------------------------------------------------------------------------------------- 

    //Cambio de imagen de fondo:
    jQuery('.desktop-images-preview-wrapper .desktop-image-preview-wrapper').on('click', function(e) {
        e.preventDefault();
        jQuery('.desktop-images-preview-wrapper .desktop-image-preview-wrapper').removeClass('selected');
        jQuery(this).addClass('selected');
        
        var urlBackground = jQuery(this).find('.desktop-image-preview').css('background-image');
        //console.log("--->"+urlBackground);
        previewBackground(urlBackground);
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
    
});
				
