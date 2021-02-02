$(document).ready(function() {
    $('.dropzone').uploader({
        url: '/apps/upload.json',

        autoProcessQueue: true,
        uploadMultiple: false,
        parallelUploads: 1,
        maxFiles: 5,
/*
        minImageHeight: 280,
        maxImageHeight: 280,

        minImageWidth: 280,
        maxImageWidth: 280,
        */
        //maxFileSize: 0.01,


        addedfile: function(file) {
            console.log('added');
            console.log(this);
            console.log(file);
        },
        removedfile: function(file) {
            console.log('removed');
            console.log(this);
            console.log(file);
        },
        success: function(file, response) {
            console.log('success');
            console.log(this);
            console.log(file, response);
        }/*,
        error: function(file, response) {
            console.log('error');
            console.log(this);
            console.log(file, response);
        }*/
    });
});

$('#formModal').modal('show');


jQuery('.image-box-wrapper-close .btn-circle-close').on('click', function(e) {
    e.preventDefault();
    $('#userimage').hide();
    $('#dzupload_1').show();           
});
