$(document).ready(function($) {
    $( function() {
        $("#sortable").sortable({
            placeholder: "ui-state-highlight"
        });
        $("#sortable").disableSelection();
    });
});