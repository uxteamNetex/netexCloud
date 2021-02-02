jQuery(document).ready(function() {

    jQuery('.calendar-monthly-wrapper').calendarmonthly('onitemclick', function(item, year, month) {
        console.log(item);
        console.log(year);
        console.log(month);
    });

});
