function showSpinner(newTop,newBottom,newLeft,newRight){  
    if(typeof newTop != "undefined")
        jQuery('#spinner-primary').css('top', newTop + 'px');
    if(typeof newBottom != "undefined")
        jQuery('#spinner-primary').css('bottom', newBottom + 'px');
    if(typeof newRight != "undefined")
        jQuery('#spinner-primary').css('right', newRight + 'px');
    if(typeof newLeft != "undefined")
        jQuery('#spinner-primary').css('left', newLeft + 'px');
        
    //Show spinner:
    jQuery('#spinner-primary').show();
}

function hideSpinner(){
    jQuery('#spinner-primary').hide();
}
    
jQuery(document).ready(function() {



});
