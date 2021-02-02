// Mostrar el input de valores permitidos si se selecciona la opcion "Enumerado"
//$('#extensibleFieldType .bootstrap-select ul li').click(function(){
    //if($(this).val() == 'Enumerado') {
      //  $('#allowedValues').removeClass('hidden');
    //} else{
      //  $('#allowedValues').addClass('hidden');    
    //}
//});

$('select').click(function(){
    if($("#extensibleFieldTypeSelect").val('Enumerado')) {
        $('#allowedValues').removeClass('hidden');
    } else{
        $('#allowedValues').addClass('hidden');    
    }
});