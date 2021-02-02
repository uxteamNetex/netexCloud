jQuery(document).ready(function() {
        //Filter:
       jQuery('#filtertrialdatetime1').datetimepicker(
            {
                viewMode: 'years',
                format: 'DD/MM/YYYY'
            }
        );
       jQuery('#filtertrialdatetime2').datetimepicker({
            useCurrent: false,
            viewMode: 'years',
            format: 'DD/MM/YYYY'
        });
       jQuery("#filtertrialdatetime1").on("dp.change", function (e) {
           jQuery('#filtertrialdatetime2').data("DateTimePicker").minDate(e.date);
        });
       jQuery("#filtertrialdatetime2").on("dp.change", function (e) {
           jQuery('#filtertrialdatetime1').data("DateTimePicker").maxDate(e.date);
        });
        
        //Modal:
       jQuery('#modaltrialdatetime1').datetimepicker(
            {
                viewMode: 'years',
                format: 'DD/MM/YYYY'
            }
        );
       jQuery('#modaltrialdatetime2').datetimepicker({
            useCurrent: false,
            viewMode: 'years',
            format: 'DD/MM/YYYY'
        });
       jQuery("#modaltrialdatetime1").on("dp.change", function (e) {
           jQuery('#modaltrialdatetime2').data("DateTimePicker").minDate(e.date);
        });
       jQuery("#modaltrialdatetime2").on("dp.change", function (e) {
           jQuery('#modaltrialdatetime1').data("DateTimePicker").maxDate(e.date);
        });

        //Advanced options
        $("button.advancedOptionsButton").click(function(){ 
            if($(this).hasClass("collapsed")) {
                $(this).text("Ocultar opciones avanzadas");
            } else {
                $(this).text("Ver opciones avanzadas");
            }
        });
});