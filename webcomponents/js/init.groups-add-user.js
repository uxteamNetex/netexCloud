  $(document).ready(function($) {
  // Añadir usuarios
    $('.action-buttons-container .btn-action').click(function(){
        $('.material-card.selected .card-footer').prepend(
            '<span class="badge badge-transparent badge-added">'+
                '<i class="icon-ntx icon-success vertical-align-middle text-success separation-right-small"></i>'+
                'Añadido'+
                '</span>');
        $('.material-card.selected').addClass('material-user-added');
        $('.material-card.selected').removeClass('selected');
        $('.action-buttons-container').addClass("hidden"); 
    });
});