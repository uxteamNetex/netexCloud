$('#calendar-link-copy').click(function(){
    $(this).text('Copied link');
    $(this).removeClass('btn-link');
    $(this).addClass('btn-link-disabled');
});