$(document).ready(function() {

    //Modo selección OFF
    function modeSelectionOff() {
        $('#switch-select-mode').removeClass("checked");
        $('#switch-select-mode').prop('checked', false);
        $('#buttomUsersSelected').removeClass('animated fadeInDown');
        $('#buttomUsersSelected').addClass('animated fadeOutDown');
        $('#buttomCreateUser, #buttomExportUser, #buttomAddUser').removeClass('animated fadeOutDown');
        $('#dropdownOrderUsers').removeClass('hidden');
        $('#buttomCreateUser, #buttomExportUser, #buttomAddUser').addClass('animated fadeInDown');
        $('.users-card .material-card').removeClass('card-select-mode');
        $('.users-card .material-card a').attr("href", "user-profile.html"); 
        $('.users-card .material-card').removeClass('selected');
        $('.action-buttons-container').addClass("hidden"); 
        $('input#checkUserSelect').prop('checked', false);
        $('input#checkUserSelect').removeClass("checked");
    }

    //Modo selección ON
    function modeSelectionOn() {
        $('#switch-select-mode').addClass("checked");
        $('#switch-select-mode').prop('checked', true);
        $('#buttomUsersSelected').removeClass('hidden fadeOutDown');
        $('#buttomUsersSelected').addClass('animated fadeInDown');
        $('#buttomCreateUser, #buttomExportUser, #buttomAddUser').addClass('animated fadeOutDown');
        $('.users-card .material-card').addClass('card-select-mode');
        $('.users-card .material-card').removeClass('card-no-select-mode');
        $('.users-card .material-card a').attr("href", "javascript:void(0);");    
    }

    //Al cargar la página comprueba el estado del check de seleccion
    if($('#switch-select-mode').hasClass("checked")) {
        modeSelectionOn();    
    } else {
        modeSelectionOff();    
    }

    //Al clicar en el check de modo de selección cambia de estado
    $('#switch-select-mode').click(function(){
        if($(this).hasClass("checked")) {
            modeSelectionOff();    
        } else {
            modeSelectionOn();    
        }
    });

    $('.material-card').click(function(){
        //Al clicar en la card el modo seleccion esta ON
        if($(this).hasClass("card-select-mode")) {
            //si la card está seleccionada, al clicar se deselecciona
            if($(this).closest('.material-card').hasClass("selected")) {
                $(this).find("input").prop('checked', false);
                $(this).find("input").removeClass('checked');
                $(this).closest('.material-card').removeClass('selected');
            } else {
            //si la card está deseleccionada, al clicar se selecciona
                $(this).find("input").prop('checked', true);
                $(this).find("input").addClass('checked');
                $(this).closest('.material-card:not(.material-user-subgroup, .material-user-added)').addClass('selected');
            }
        }
        // La card no es clicable cuando tiene clase added
        if ($(this).find('span').hasClass("badge-added")) {
            $(this).closest("input").prop('checked', false);
            $(this).closest('.material-card').removeClass('selected');
        }
        // Enseñar/ocultar botones de acción
        if ($('.material-card').hasClass("selected")) {
            $('.action-buttons-container').removeClass("hidden");
        } else {
            $('.action-buttons-container').addClass("hidden");   
        }

        // Habilitar el botón de acción Eliminar cuando todas las cards tengan clase inactive
        if($(".material-card.selected").length == $(".material-card.selected.material-user-inactive").length) {
            //Todas las cards tienen clase inactive
            $('.action-buttons-container .btn-action-delete').removeClass("disabled");
        } else {
            $('.action-buttons-container .btn-action-delete').addClass("disabled");
        }

    });

    // Selector múltiple
    $('#buttonSelectAll').click(function(){
        if($(this).hasClass("active")) {
            $(this).text("Seleccionar todos");
            $(this).removeClass('active');
            $('.material-card input').prop('checked', false);   
            $('.material-card').removeClass('selected');
            //Ocultar el info de seleccionar todos de todas las páginas
            $('#alert-select-all-pages, #alert-deselect-all-pages').addClass('hidden');  
        } else {
            $(this).text("Deseleccionar todos");
            $(this).addClass('active');
            $('.material-card input').prop('checked', true);   
            $('.material-card:not(.material-user-subgroup, .material-user-added)').addClass('selected'); 
            //Mostrar el info de seleccionar todos de todas las páginas
            $('#alert-select-all-pages').removeClass('hidden'); 
        }
        // La card no es clicable cuando tiene clase added
        if ($('.material-card span').hasClass("badge-added")) {
            $('.material-card span.badge-added').closest("input").prop('checked', false);
            $('.material-card span.badge-added').closest('.material-card').removeClass('selected');
        }
        // Enseñar/ocultar botones de acción
        if ($('.material-card').hasClass("selected")) {
            $('.action-buttons-container').removeClass("hidden");
        } else {
            $('.action-buttons-container').addClass("hidden");    
        }
    });
    //Mostrar Anular seleccionar todas
    $('#button-select-all-pages').click(function(){
        $('#alert-select-all-pages').addClass('hidden');
        $('#alert-deselect-all-pages').removeClass('hidden');  
    }); 
    //Anular seleccionar todas
    $('#button-deselect-all-pages').click(function(){
        $('#alert-select-all-pages').addClass('hidden');
        $('#alert-deselect-all-pages').addClass('hidden'); 
        $('.material-card').removeClass('selected'); 
        $('#buttonSelectAll').text("Seleccionar todos");
        $('#buttonSelectAll').removeClass('active');
        $('.action-buttons-container').addClass("hidden");  
    });    
});