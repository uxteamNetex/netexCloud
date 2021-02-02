function RedimMaterialCards(){
          
    var isChrome = !!window.chrome && !!window.chrome.webstore;
    if(isChrome){
        jQuery('.ellipsis-points-1 span.textellipsis').addClass( "ellipsis-chrome-1" );
        jQuery('.ellipsis-points-2 span.textellipsis').addClass( "ellipsis-chrome-2" );
        jQuery('.ellipsis-points-3 span.textellipsis').addClass( "ellipsis-chrome-3" );
        return;
    }
      
    //OLD: Si tenemos varios elementos con anchuras diferentes, coge la anchura del primero que encuentra
    //y la coloca en todos los elementos del DOM, lo cual causa problemas:
    //var parentWidth = jQuery('.ellipsis-points').parent().width();
    //jQuery('.ellipsis-points').width(parentWidth- 10);
    
    //NEW: Recorremos elemento a elemento y cambiamos la anchura cogiéndola de su respectivo padre:
    jQuery('.ellipsis-points').each(function(i, obj) {
        var parentWidth = jQuery(this).parent().width();
        jQuery(this).width(parentWidth);
    });
       
    jQuery('.ellipsis-points-1 span.textellipsis').ellipsis({       
        lines: 1,
        ellipClass: 'ellip',
        onlyFullWords: true,
        //responsive: true,
        char: '...'
    });
               
    jQuery('.ellipsis-points-2 span.textellipsis').ellipsis({       
        lines: 2,
        ellipClass: 'ellip',
        onlyFullWords: true,
        //responsive: true,
        char: '...'
    });
    jQuery('.ellipsis-points-3 span.textellipsis').ellipsis({       
        lines: 3,
        ellipClass: 'ellip',
        onlyFullWords: true,
        //responsive: true,
        char: '...'
    });
}

jQuery(window).load(function() {         
   RedimMaterialCards();
});

jQuery( window ).resize(function() {
  RedimMaterialCards();
});