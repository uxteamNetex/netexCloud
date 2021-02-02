$(document).ready(function(){ 

    //Se calcula la posicion del selec para que no se solape con el scoll vertical de la tabla
    function selectDropdown(){
         $('.bootstrap-table .bootstrap-select').click(function(){
            var offset = $(this).offset();
            var windowTop = $(window).scrollTop();
            var buttonHeight = $(this).height();
            var buttonWidth = $(this).width();
            
            $(this).find('.dropdown-menu.open').css('position', 'fixed');
            $(this).find('.dropdown-menu.open').css('top', offset.top - windowTop + buttonHeight);
            $(this).find('.dropdown-menu.open').css('left', offset.left);
            $(this).find('.dropdown-menu.open').css('min-width', buttonWidth);

            $(window).resize(function(){
                $('.bootstrap-table .bootstrap-select.open button').attr('aria-expanded', 'false');
                $('.bootstrap-table .bootstrap-select.open').removeClass('open');
            });
            $(window).scroll(function() {
                $('.bootstrap-table .bootstrap-select.open button').attr('aria-expanded', 'false');
                $('.bootstrap-table .bootstrap-select.open').removeClass('open');
            });
            $('.fixed-table-body').scroll(function() {
                $('.bootstrap-select.open button').attr('aria-expanded', 'false');
                $('.bootstrap-select.open').removeClass('open');
            });
        });

    }
    selectDropdown();


    //Se añade el label para darle estilo a los inputs
    $('input[type="checkbox"]').attr("for","checkbox1");
    $('input[type="checkbox"]').after('<label for="checkbox1" class="label-checkbox"></label>');

    //Se crea el input Seleccionar todos
    var addSelectAll=   '<li role="menuitem">' +
                            '<label class="inputSelectAll">' +
                                '<input type="checkbox" data-field="selectAll" value="1" for="checkbox1">' +
                                '<label for="checkbox1" class="label-checkbox"></label> Select All' +
                            '</label>' +
                        '</li>';
    $('.fixed-table-toolbar ul.dropdown-menu').prepend(addSelectAll);

    //Al clicar en el input Seleccionar todos, se checkean todos los inputs
    $(".inputSelectAll").click(function (e) {
        var table = jQuery('.fixed-table-toolbar [data-toggle="table"]');
        var ischecked = jQuery("label.inputSelectAll input:checkbox")[0].checked;
        $(".fixed-table-toolbar ul.dropdown-menu input[type='checkbox']").each(function() {
            if (ischecked) {
               this.checked = true;
               table.bootstrapTable('showColumn',this.getAttribute('data-field'));
            } else {
               this.checked = false;
               table.bootstrapTable('hideColumn',this.getAttribute('data-field'));
            }
        });
        
        //Evitar que el dropdown se cierre al clicar en el input Seleccionar todos
        e.stopPropagation();
    });

    //Al clicar en cualquier input se vuelve a cargar el selectpicker
    $('.fixed-table-toolbar ul.dropdown-menu input[type="checkbox"]').click(function () {
        jQuery.initializer.selectpicker();
        selectDropdown();
    });

    //Al clicar en cualquier input se pone al contenido el mismo alto que el documento para que el footer siempre este abajo de todo
    $('.fixed-table-toolbar ul.dropdown-menu input[type="checkbox"]').click(function () {
        var navbarHeight = $(".navbar-topbar").height();
        var documentHeight = $(document).height();
        $(".content").height(documentHeight - navbarHeight);
    }); 

    
});