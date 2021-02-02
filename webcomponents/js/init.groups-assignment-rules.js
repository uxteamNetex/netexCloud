$(document).ready(function($) { 
    var addAssignmentRuleValues=    '<tr>' +
                                        '<td>' +
                                            '<span>OR</span>' +
                                        '</td>' +
                                        '<td>' +
                                            '<span>Valor elegido</span>' +
                                        '</td>' +
                                        '<td>' +
                                            '<span>Valor elegido</span>' +
                                        '</td>' +
                                        '<td>' +
                                            '<span>Valor escrito</span>' +
                                        '</td>' +
                                        '<td>' +
                                            '<button type="button" class="btn btn-icon">' +
                                                '<span class="icon glyphicon glyphicon-pencil fs-icon vertical-align-middle separation-right-small editAssignmentRule"></span>' +
                                            '</button>' +
                                            '<button type="button" class="btn btn-icon">' +
                                                '<span class="icon glyphicon glyphicon-trash fs-icon vertical-align-middle separation-right-small deleteAssignmentRule"></span>' +
                                            '</button>' +
                                        '</td>' +
                                    '</tr>';

    // Añadir y quitar filas en la tabla de reglas de asignación de grupos
    $(".addAssignmentRule").click(function () {
        //Clonar la primera fila de inputs que ya tiene los selects cargados
        $(".inputsRowAssignmentRule").first().clone().appendTo("#tableAssignmentRules").removeClass("hidden");

        //Comprueba si el input está escrito
        $(".comparevalue").keyup(function() {
            var inputLength = $(this).val().length;
            if (inputLength >= 1) {
                // Si está escrito enseña el botón guardar
                $(this).closest(".inputsRowAssignmentRule").find(".saveAssignmentRule").removeClass("hidden"); 
            } else {
                // Si no está escrito oculta el botón guardar
                $(this).closest(".inputsRowAssignmentRule").find(".saveAssignmentRule").addClass("hidden"); 
            }  
        });

        //Cancelar la edición de la nueva fila
        $(".cancelAssignmentRule").click(function () {
            $(this).closest("tr").remove();
        });
        //Guardar la fila que se esta editando
        $(".saveAssignmentRule").click(function () {
            $(this).closest("tr").remove();
            $("#tableAssignmentRules").append(addAssignmentRuleValues);
        });
        //Editar la nueva fila que se guardó
        $("#tableAssignmentRules").on("click", ".editAssignmentRule", function() {
            $(".inputsRowAssignmentRule").first().clone().insertBefore((this).closest("tr")).removeClass("hidden");
            $(this).closest("tr").remove();
        });
        //Eliminar la nueva fila que se guardó
        $("#tableAssignmentRules").on("click", ".deleteAssignmentRule", function() {
            $(this).closest("tr").remove();
        });
    });

    //Editar una fila que está guardada
    $(".editAssignmentRule").parent().click(function () {
        $(".inputsRowAssignmentRule").first().clone().insertBefore((this).closest("tr")).removeClass("hidden");
        $(this).closest("tr").remove();
    });
    //Cancelar la edición de una fila que está guardada
    $("#tableAssignmentRules").on("click", ".cancelAssignmentRule", function() {
        $("#tableAssignmentRules").append(addAssignmentRuleValues);
        $(this).closest("tr").remove();
    });
    //Eliminar una fila que está guardada
    $(".deleteAssignmentRule").parent().click(function () {
        $(this).closest("tr").remove();
    });

});