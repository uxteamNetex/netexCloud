jQuery(document).ready(function() {
      
    /*jQuery(function () {
        jQuery('[data-toggle="popover"]').popover()
    });*/
    jQuery('.collection-selection-request').hide();
    jQuery('#btnUnlockCollection').on('click', function(event) {    
       event.preventDefault();         
       //Habilitamos el texto de selección:
       jQuery('#toolbar-select-courses-text').show();
       //Deshabilitamos el header de la colección  
       jQuery('.collection-selection-request').show();       
       jQuery('#btnUnlockCollection').attr("disabled", true);      
       jQuery('.collection-header').addClass('opacity-medium');
       jQuery('#collectionHelpText').removeClass('hidden');
       //Hacemos que se puedan seleccionar los cards:             
       jQuery('.collection-cards .material-card').addClass('material-card-selecteable');
    });
    
    //Clean form
    function cleanUnlockCollection(){
        //Deshabilitamos el texto de selección:
       jQuery('#toolbar-select-courses-text').hide();
       //Habilitamos el header de la colección
       jQuery('.collection-selection-request').hide();
       jQuery('#btnUnlockCollection').attr("disabled", false);
       jQuery('.collection-header').removeClass('opacity-medium');  
       //Indicamos que ya no son cards que podamos seleccionar:     
       jQuery('.collection-cards .material-card').removeClass('material-card-selecteable');
       //Quitamos los cards seleccionados:
       jQuery('.collection-cards .material-card').removeClass('selected');
    }
    
     //Cancel unlock
    jQuery('#btnSkipSelectionUnlockCollection').on('click', function(event) {  
        event.preventDefault();                     
         $('#modalSkipSelectionUnlockCollection').modal('show') ;          
    });
    
    //Cancel unlock
    jQuery('#btnCancelUnlockCollection').on('click', function(event) {  
        event.preventDefault();             
        cleanUnlockCollection(); 
        jQuery('#collectionHelpText').addClass('hidden');       
    });
    
    //Button Unlock -> Muestra modal popup request:
    jQuery('#btnRequestUnlockCollection').on('click', function(event) {  
        event.preventDefault(); 
        $('#modalRequestUnlockCollection').modal('show') ;                           
    });

    //ModalPopup - OK
    jQuery('#btnApplyRequestUnlockCollection').on('click', function(event) {  
        event.preventDefault();      
        $('#modalRequestUnlockCollection').modal('hide') ;                        
        cleanUnlockCollection();
    });
    
    //ModalPopup - OK Skip
     jQuery('#btnApplySkipSelectionUnlockCollection').on('click', function(event) {  
        event.preventDefault();      
        $('#modalSkipSelectionUnlockCollection').modal('hide') ;                        
        cleanUnlockCollection();
    });
        
    //ModalPopup - Cancel
    jQuery('#btnCancelRequestUnlockCollection').on('click', function(event) {  
        event.preventDefault();                             
        $('#modalRequestUnlockCollection').modal('hide') ; 
    });
           
    //Select card 
    jQuery('.material-card').on('click', function(event) {       
        event.preventDefault();
        //console.log('Click en material card!');
        
         if(jQuery(this).hasClass('material-card-selecteable')){
             
            if(jQuery(this).hasClass('material-card-enabled')){
                jQuery('#btnSkipSelectionUnlockCollection').hide();
                jQuery('#btnRequestUnlockCollection').removeClass("hidden");
            
                jQuery( this ).toggleClass( "selected" );
                
                if(jQuery( ".material-card-wrapper" ).children( ".selected" ).length == 0){
                    jQuery('#btnSkipSelectionUnlockCollection').show();
                    jQuery('#btnRequestUnlockCollection').addClass("hidden");
                }
            }                         
            
         }else{
             console.log('Lanzar web!');
             jQuery(this).find('a').each(function(e) {
                console.log(jQuery(this).attr('href'));
                window.location= jQuery(this).attr('href');
                
            });
         }
       
    });        
    
    
});
