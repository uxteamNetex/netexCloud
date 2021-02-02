jQuery(document).on('click',function(){
    jQuery('.dashboard-wrapper.collapse, .dashboard-wrapper-small.collapse, .dashboard, .navbar-nav-topbar-legacy-wrapper').collapse('hide');
});


(function() {
    function stickyTitles(stickies) {
        this.load = function() {
            stickies.each(function(){
                var thisSticky = jQuery(this);
                jQuery.data(thisSticky[0], 'pos', thisSticky.offset().top);
            });
        };
        this.scroll = function() {
            stickies.each(function(i){
                var thisSticky = jQuery(this),
                    pos = jQuery.data(thisSticky[0], 'pos'),
                    nextSticky = stickies.eq(i+1),
                    prevSticky = stickies.eq(i-1)
                    ;
                var heightPrevSticky = 0;
                var margin_top = 0;
                if(i > 0) {
                    heightPrevSticky = prevSticky.outerHeight();
                    //Este es el la altural del header que al ser fixed daba problema con el calculo para cuando debía mover la siguiente cabecera
                    margin_top = 80*i;
                } else {
                    heightPrevSticky = jQuery(this).outerHeight();
                }
                var height = jQuery(this).outerHeight();

                var t = jQuery(window).scrollTop();
                var h = jQuery(window).height();
                var b = t+h;

                var p = jQuery(this).position();

                if (pos <= jQuery(window).scrollTop()+heightPrevSticky+margin_top) {
                    thisSticky.addClass("fixed");
                    if(p.top == 0) {
                        jQuery(this).parent().css('margin-top', height + 'px');
                    }
                } else {
                    thisSticky.removeClass("fixed");
                    jQuery(this).parent().css('margin-top', '');
                }

                if(jQuery(window).scrollTop() <=1) {
                    stickies.each(function(){
                        jQuery(this).removeClass("fixed");
                        jQuery(this).parent().css('margin-top', '');
                    });
                }
            });
        }
    }
    jQuery(document).ready(function(){
        var newStickies = new stickyTitles(jQuery(".stickybar"));
        newStickies.load();
        jQuery(window).on("scroll", function() {
            newStickies.scroll();

        });
    });
})();

jQuery.extend({
    desktop: {
        itemsperpage: 10,
        load: function(appwrapper) {
            var that = this;
            var number_item = 0;
            var total_pages = 0;
            this.itemsperpage = this.getItemsPerPage();

            jQuery(appwrapper).carousel("pause").removeData();

            jQuery.each(jQuery(appwrapper).find('.desktop-app'), function(key, item) {
                jQuery(item).detach().appendTo(jQuery(appwrapper));
            });
            jQuery(appwrapper).find('.desktop-apps-page').remove();

            jQuery.each(jQuery(appwrapper).find('.desktop-app'), function(key, item) {
                var page_number = parseInt(number_item / that.itemsperpage) + 1;
                if(jQuery(appwrapper).find('#desktop_apps_page_'+page_number+'.desktop-apps-page').length == 0) {
                    jQuery(appwrapper).find('.carousel-inner').append('<div id="desktop_apps_page_'+page_number+'" class="item desktop-apps-page '+(page_number==1?'active':'')+'"></div>');
                }
                total_pages = page_number;
                jQuery(item).detach().appendTo('#desktop_apps_page_'+page_number);
                number_item = number_item+1;
            });
            
            var data_target = jQuery(appwrapper).attr('id');
            if(data_target == '' || data_target == 'undefined' || data_target == undefined) {
                data_target = 'carousel_'+ this.uniqId();
                jQuery(appwrapper).attr('id', data_target);
            }
            data_target = '#'+data_target;

            //Código para que el paginador, flechas del slider, degradado en la cabecera y centrado del slider actuen al mismo tiempo
            var paginator = jQuery(appwrapper).find('.desktop-apps-paginator');
            jQuery(paginator).find('ol li').remove();
            var sliderPages = jQuery(appwrapper).find('.carousel-control');
            var navbarGradient = jQuery(appwrapper).find('.carousel-inner').closest('.body-content').prev('.navbar-topbar');
            var sliderVerticalAlign = jQuery(appwrapper).find('.carousel-inner').closest('.desktop-apps-wrapper');
            
            //Si hay más de una página en el slide
            if (total_pages > 1) {
                jQuery(paginator).show();
                jQuery(sliderPages).show();
                jQuery(sliderVerticalAlign).addClass('vertical-align');
                for (var i = 1; i <= total_pages; i++) {
                    jQuery(paginator).find('ol').append('<li data-target="'+data_target+'"  data-slide-to="' + (i-1) + '" ' + ((i == 1) ? ' class="active" ' : '') + '></li>');
                }
            }
            //Si hay una página slide
            if (total_pages == 1) {
                jQuery(paginator).hide();
                jQuery(sliderPages).hide();
                jQuery(sliderVerticalAlign).removeClass('vertical-align');
            }

            // Se calcula el ancho de la pantalla para quitar o poner el degradado de la cabecera
            var width = jQuery(window).width();
            if ( width > 992) {
                jQuery(navbarGradient).removeClass('background-gradient-vertical');    
            } else{
                jQuery(navbarGradient).addClass('background-gradient-vertical');      
            }

            if(jQuery(appwrapper).find('.left.carousel-control').length > 0) {
                jQuery(appwrapper).find('.left.carousel-control').attr('href', data_target);
            }
            if(jQuery(appwrapper).find('.right.carousel-control').length > 0) {
                jQuery(appwrapper).find('.right.carousel-control').attr('href', data_target);
            }

            jQuery(appwrapper).carousel({
                pause: true,
                interval: false
            });

        },

        uniqId: function() {
            return Math.round(new Date().getTime() + (Math.random() * 100));
        },

        getItemsPerPage: function() {
            var width = jQuery(window).width();

            if (width < 992) {
                return 1000;
            } 
            return 10;
        }
    }
});

jQuery.extend({
    alerts: {

        TYPE_ALERT_DANGER: 'alert-danger',
        TYPE_ALERT_WARNING: 'alert-warning',
        TYPE_ALERT_INFO: 'alert-info',
        TYPE_ALERT_SUCCESS: 'alert-success',

        alerts_wrapper_id: '.alert-wrapper',
        alert_elements: [],
        add: function(message, type, alerts_wrapper_id) {
            type = typeof type !== 'undefined' ? type : this.TYPE_ALERT_SUCCESS;
            this.alerts_wrapper_id = typeof alerts_wrapper_id !== 'undefined' ? alerts_wrapper_id : this.alerts_wrapper_id;

            var alert_id = this.uniqId();
            var tpl = '<div id="'+alert_id+'" class="alert '+type+' alert-dismissable fade">' +
                '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
                message +
                '</div>';
            var item = jQuery(tpl);
            jQuery(item).appendTo(jQuery(this.alerts_wrapper_id));


            jQuery("#"+alert_id).alert();
            jQuery("#"+alert_id).fadeTo(10000, 500).slideUp(0, function(){
                jQuery("#"+alert_id).alert('close');
            });

            this.removeAll();
            this.alert_elements.push(alert_id);
        },
        removeAll: function(alerts_wrapper_id) {
            this.alerts_wrapper_id = typeof alerts_wrapper_id !== 'undefined' ? alerts_wrapper_id : this.alerts_wrapper_id;

            var that = this;
            jQuery.each(this.alert_elements, function(key, item) {
                jQuery(that.alerts_wrapper_id).find('#'+item).remove();
            });
            this.alert_elements = [];
        },
        uniqId: function() {
            return Math.round(new Date().getTime() + (Math.random() * 100));
        }
    }
});

jQuery.extend({
    forms: {
        TYPE_VALIDATION_ERROR: 'has-error',
        TYPE_VALIDATION_WARNING: 'has-warning',
        TYPE_VALIDATION_SUCCESS: 'has-success',

        setValidations: function(elem, validations) {
            jQuery.each(validations, function(key, item) {
                var class_status  = '';
                if(item.status == 'undefined' || item.status == null || item.status == '' || item.status == undefined) {
                    class_status = 'has-error';
                } else {
                    class_status = item.status;
                }
                var item_id = item.id.replace(/\./g, '\\\.');
                jQuery(elem).find(item_id).addClass(class_status).find('.help-block').html(item.msg);
            });
        },
        showLoading: function() {
            jQuery('.loading-wrapper').show().addClass('active');
        },
        hideLoading: function() {
            jQuery('.loading-wrapper').hide().removeClass('active');
        },
        resetValidations: function(elem) {
            jQuery(elem).find('.has-error, .has-warning, .has-success').each(function(key, item) {
                jQuery(item).removeClass('has-error').removeClass('has-warning').removeClass('has-success').find('.help-block').html(' ');
            });
        }
    }
});

jQuery.extend({
    checkboxselectall: {
        init: function () {
            var checkboxes = jQuery('*[data-checkbox-selectall]');
            var that = this;
            jQuery(checkboxes).on('click', function() {
                that.togglegroup(this);
            });

            jQuery.each(checkboxes, function() {
                that.togglegroup(this);
                var groupname = that.getGroupname(this);
                var inputscheckboxes = that.getCheckboxesGroup(groupname);
                that.setcheckboxchange(inputscheckboxes);
            });
        },

        togglegroup: function (elem) {
            var groupname = this.getGroupname(elem);
            this.togglecheckboxes(elem, groupname);
            this.togglebuttons(elem, groupname);
        },

        togglecheckboxes: function(elem_checkall, groupname) {
            var inputscheckboxes = this.getCheckboxesGroup(groupname);
            if(jQuery(elem_checkall).is(':checked')) {
                inputscheckboxes.prop('checked', true);
            } else {
                inputscheckboxes.prop('checked', false);
            }
        },

        togglebuttons: function(elem_checkall, groupname) {
            if(jQuery(elem_checkall).is(':checked')) {
                this.getButtonsGroup(groupname).removeClass('disabled');
            } else {
                this.getButtonsGroup(groupname).addClass('disabled');
            }
        },

        setcheckboxchange: function(inputs) {
            var that = this;
            jQuery(inputs).on('click', function() {
                var groupname = that.getGroupname(this);
                var inputscheckboxes = that.getCheckboxesGroup(groupname);
                var totalcheckboxes = inputscheckboxes.length;

                var inputscheckboxeschecked = that.getCheckboxesGroupChecked(groupname);
                var totalcheckboxeschecked = inputscheckboxeschecked.length;
                var inputcheckall = that.getCheckBoxGroupCheckAll(groupname);

                if(jQuery(this).is(':checked')) {
                    if (totalcheckboxes == totalcheckboxeschecked && totalcheckboxeschecked > 0) {
                        inputcheckall.prop('checked', true);
                    }
                    that.getButtonsGroup(groupname).removeClass('disabled');
                } else {
                    inputcheckall.prop('checked', false);
                    if (totalcheckboxeschecked == 0) {
                        that.getButtonsGroup(groupname).addClass('disabled');
                    }
                }
            });
        },

        getGroupname: function(elem) {
            var groupname = jQuery(elem).data('group-checkboxes');
            return groupname;
        },

        getButtonsGroup: function(groupname) {
            var buttons = jQuery('*[data-group-checkboxes="'+groupname+'"]:not(input[type=checkbox])');
            return buttons;
        },

        getCheckboxesGroup: function(groupname) {
            var inputscheckboxes = jQuery('input[type=checkbox][data-group-checkboxes="' + groupname + '"]:not([data-checkbox-selectall])');
            return inputscheckboxes;
        },

        getCheckboxesGroupChecked: function(groupname) {
            var inputscheckboxeschecked = jQuery('input[type=checkbox][data-group-checkboxes="' + groupname + '"]:not([data-checkbox-selectall]):checked');
            return inputscheckboxeschecked;
        },

        getCheckBoxGroupCheckAll: function(groupname) {
            var inputcheckall = jQuery('input[data-checkbox-selectall][type=checkbox][data-group-checkboxes="' + groupname + '"]');
            return inputcheckall;
        }
    }
});

jQuery.extend({
    imageadjust: {
        adjust: function() {
            /** Normalizar las imagenes para que sean cuadradas */
            jQuery.each(jQuery('.image-wrapper, .avatar-wrapper'), function(index, item) {
                var image = jQuery(item).find('img').first();
                var height = jQuery(item).height();

                var img_height = jQuery(image).height();
                var img_width = jQuery(image).width();

                if (!(img_width == img_height)) {
                    if (img_width > img_height) {
                        jQuery(image).css('height', height);
                        jQuery(image).css('width', 'auto');
                    } else {
                        jQuery(image).css('width', height);
                        jQuery(image).css('height', 'auto');
                    }
                    jQuery(image).css('max-width', 'none');
                    jQuery(image).css('max-height', 'none');
                }  else if (height > img_height) {
                    jQuery(image).css('width', height);
                    jQuery(image).css('height', height);
                }

            });
        }
    }
});

(function(jQuery) {

    jQuery.extend({
        calendarmonthly: {
            offsetperclick: 80,
            init: function () {
                var that = this;
                jQuery('.calendar-monthly-wrapper').each(function () {
                    var elem = jQuery(this).find('.calendar-monthly-list');
                    var parent = jQuery(this);
                    jQuery(this).find('.icon-prev').on('click', function (e) {
                        e.preventDefault();
                        that.moveToPrev(elem);

                    });

                    jQuery(this).find('.icon-next').on('click', function (e) {
                        e.preventDefault();
                        that.moveToNext(elem, parent);
                    });

                    jQuery(this).find('.calendar-monthly-list li').on('click', function() {
                        jQuery(this).siblings().removeClass('active');
                        jQuery(this).addClass('active');
                    });
                });

            },

            moveToNext: function (elem, parent) {
                var left = this.getLeft(elem);
                left = left - this.offsetperclick;
                var totalwidth = jQuery(elem).width() + (this.offsetperclick * 2);
                var x = Math.abs(left) + jQuery(parent).width();
                //Evitar que se pase del último elemento
                if (x > totalwidth) {
                    return false;
                }
                jQuery(elem).css('left', left + 'px');

            },

            moveToPrev: function (elem) {
                var left = this.getLeft(elem);
                //Evitar que se pase del primer elemento
                if (left >= 0) {
                    return false;
                }
                left = left + this.offsetperclick;
                jQuery(elem).css('left', left + 'px');
            },

            getLeft: function (elem) {
                var left = jQuery(elem).css('left');
                if (left == undefined || left == null || left == 'auto') {
                    left = '0';
                }
                left = left.replace('px', '');
                left = parseInt(left);
                return left;
            }
        }
    });

    var methods = {
        init: function() {
            jQuery.calendarmonthly.init();
        },
        onitemclick : function (fnt) {
            jQuery(this).find('li.calendar-month').on('click', function() {
                var year = jQuery(this).data('year');
                var month = jQuery(this).data('month');
                fnt(this, year, month);
            });
        }


    };

    jQuery.fn.calendarmonthly = function(methodOrOptions) {
        if ( methods[methodOrOptions] ) {
            return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
            // Default to "init"
            return methods.init.apply( this, arguments );
        } else {
            jQuery.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.calendarmonthly' );
        }
    }

} (jQuery));

jQuery.extend({
    initializer: {
        initAll: function() {
            this.switches();
            this.selectpicker();
            this.tooltips();
            this.selectables();
        },

        switches: function() {
            try {
                jQuery("input.switch[type='checkbox']").bootstrapSwitch();
            } catch(ex) {}
        },

        selectpicker: function() {
            try {
                var selects = jQuery('select:not(.selectpicker-not-apply)').addClass('selectpicker');
                selects.selectpicker();
            } catch(ex) {}
        },

        tooltips: function() {
            jQuery('[data-toggle="tooltip"]').tooltip();
        },

        selectables: function() {
            jQuery('*[data-selectable]').unbind('click').on('click', function(e) {
                if (jQuery(this).hasClass('selected')) {
                    jQuery(this).removeClass('selected');
                } else {
                    jQuery(this).addClass('selected');
                }
            });
        },

        parallax: function() {
            jQuery('.parallax').parallax();
        },

    }
});


(function(jQuery) {

    var detectVerticalSquash = function(img) {
        var alpha, canvas, ctx, data, ey, ih, iw, py, ratio, sy;
        iw = img.naturalWidth;
        ih = img.naturalHeight;
        canvas = document.createElement("canvas");
        canvas.width = 1;
        canvas.height = ih;
        ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        data = ctx.getImageData(0, 0, 1, ih).data;
        sy = 0;
        ey = ih;
        py = ih;
        while (py > sy) {
            alpha = data[(py - 1) * 4 + 3];
            if (alpha === 0) {
                ey = py;
            } else {
                sy = py;
            }
            py = (ey + sy) >> 1;
        }
        ratio = py / ih;
        if (ratio === 0) {
            return 1;
        } else {
            return ratio;
        }
    };

    var drawImageIOSFix = function(ctx, img, sx, sy, sw, sh, dx, dy, dw, dh) {
        var vertSquashRatio;
        vertSquashRatio = detectVerticalSquash(img);
        return ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh / vertSquashRatio);
    };

    jQuery.extend({
        uploader: {

            id: null,
            iserror: false,
            elem: null,
            options: null,

            dropzone: null,

           /* isLoaded: function(){
                console.debug(this.dropzone );
                if(this.dropzone != null ){
                    return true;
                }
                return false;
            },*/
            init: function(elem, options) { 
                                               
                this.elem = elem;
                this.options = options;
                
                var that = this;
                that.iserror = false;
                //console.log("init: "+elem.id);
                //console.debug(elem);
                
                this.dropzone = jQuery(this.elem).dropzone({
                    url: that.options.url,
                    addRemoveLinks: that.options.addRemoveLinks,
                    uploadMultiple: that.options.uploadMultiple,
                    maxFiles: that.options.maxFiles,
                    maxFilesize: that.options.maxFileSize, //MB
                    acceptedFiles: that.options.acceptedFiles,
                    autoProcessQueue: that.options.autoProcessQueue,
                    parallelUploads: that.options.parallelUploads,

                    minImageHeight: that.options.minImageHeight,
                    minImageWidth: that.options.minImageWidth,
                    maxImageHeight: that.options.maxImageHeight,
                    maxImageWidth: that.options.maxImageWidth,
                    titleErrorMsg: that.options.titleErrorMsg,
                    textErrorMsg: that.options.textErrorMsg,

                    success: function (file, response) {
                        var element = this.element; 
                        //console.log("SUCCES: "+element.id);       
                        var imgName = response;
                        file.previewElement.classList.add("dz-success");
                        jQuery(element).find('.dz-alert-error').remove();
                        if(options.success != null && typeof options.success === "function") {
                            options.success(file, response);
                        }
                    },
                    error: function (file, response) {
                        var element = this.element;                        
                        //console.log("ERROR: "+element.id);                                           
                        that.iserror = true;
                        file.previewElement.classList.add("dz-error");
                            try {
                                this.removeFile(file);
                            } catch(e) {}
                            // add error
                            var tplError = '<div class="dz-alert-error alert alert-danger alert-dismissable">' +
                                '<button type="button" data-dismiss="alert" class="close">×</button>&nbsp;' +
                                '&nbsp;<strong>'+that.options.titleErrorMsg+
                                '</strong>&nbsp;'+that.options.textErrorMsg+'</div>';
                            jQuery(element).find('.dz-alert-error').remove();
                            jQuery(element).append(jQuery(tplError));
                        if(options.error != null && typeof options.error === "function") {
                            options.error(file, response);
                        }
                    },
                    init: function() {
                        var element = this.element;                        
                        //console.log("INIT: "+element.id);    
                        var that = this;
                        var defaultAutoProcessQueue = this.options.autoProcessQueue;

                        this.on('addedfile', function(file){
                            jQuery(element).find('.dz-message.dz-default').show();
                            if(that.options.maxFiles != null && that.files.length >= that.options.maxFiles) {
                                jQuery(element).find('.dz-message.dz-default').hide();
                            }
                            if(that.options.maxFiles != null && that.files.length > that.options.maxFiles) {
                                that.removeFile(file);
                                that.options.error(file, {"msg": "file is too big"});
                            } else {
                                if(options.addedfile != null && typeof options.addedfile === "function") {
                                    options.addedfile(file);
                                }
                            }
                        });
                        this.on('removedfile', function(file){
                            var element = this.element;                        
                            //console.log("ON removedfile: "+element.id);  
                            jQuery(element).find('.dz-alert-error').remove();
                            if (!(that.options.maxFiles != null && that.files.length >= that.options.maxFiles)) {
                                jQuery(element).find('.dz-message.dz-default').show();
                                if(options.removedfile != null && typeof options.removedfile === "function") {
                                    options.removedfile(file);
                                }
                            }
                        });

                        this.on('thumbnail', function(file) {
                            var element = this.element;                        
                            //console.log("ON thumbnail: "+element.id);  
                            jQuery(element).remove('.dz-alert-error');
                            //En caso de ser nulo el parámetro se da como bueno
                            //En caso de no ser nulo se evalua. Si es un error se puede capturar con la funcion "error" del componente
                            if (

                                ( that.options.minImageHeight == null || ( that.options.minImageHeight != null && file.height >= that.options.minImageHeight ) ) &&
                                ( that.options.minImageWidth == null  || ( that.options.minImageWidth != null  && file.width >= that.options.minImageWidth ) ) &&
                                ( that.options.maxImageHeight == null || ( that.options.maxImageHeight != null && file.height <= that.options.maxImageHeight ) ) &&
                                ( that.options.maxImageWidth == null  || ( that.options.maxImageWidth != null  && file.width <= that.options.maxImageWidth ) )
                            ) {
                                try {
                                    file.acceptDimensions();
                                } catch(e) {}
                            }
                            else {
                                that.removeFile(file);
                                file.previewElement.classList.add("dz-error");
                                if(that.options.error != null && typeof that.options.error === "function") {
                                    that.options.error(file, {msg:'Invalid dimensions.'});
                                }
                                try {
                                    file.rejectDimensions();
                                } catch (e) {}
                            }
                        });

                        //Cuando inicia la primera subida actualizamos el valor de esta propiedad para que empiece a subir automáticamente todos los archivos
                        this.on("processing", function() {
                            this.options.autoProcessQueue = true;
                        });
                        //Cuando todos los archivos se han subido volvemos a poner la propiedad como estaba
                        this.on("complete", function() {
                            if (this.getQueuedFiles().length == 0 && // If there are no files in the queue
                                this.getUploadingFiles().length == 0) { // and no files being uploaded
                                this.options.autoProcessQueue = defaultAutoProcessQueue;
                            }
                        });
                    } ,

                    // Instead of directly accepting / rejecting the file, setup two
                    // functions on the file that can be called later to accept / reject
                    // the file.
                    accept: function(file, done) {
                        file.acceptDimensions = done;
                        file.rejectDimensions = function() { done("Invalid dimensions."); };
                        // Of course you could also just put the `done` function in the file
                        // and call it either with or without error in the `thumbnail` event
                        // callback, but I think that this is cleaner.
                    }
                });
                
                //console.debug(this.dropzone);
            },

            createThumbnailFromUrl:  function(file, imageUrl, callback) {
                var img;
                img = document.createElement("img");
                img.onload = function() {
                        var canvas, ctx, resizeInfo, thumbnail, _ref, _ref1, _ref2, _ref3;
                        file.width = this.width;
                        file.height = this.height;

                        var getResizeInfo = function(file) {
                            var info, srcRatio, trgRatio;
                            info = {
                                srcX: 0,
                                srcY: 0,
                                srcWidth: file.width,
                                srcHeight: file.height
                            };
                            srcRatio = file.width / file.height;
                            info.optWidth = file.thumbnailWidth;
                            info.optHeight = file.thumbnailHeight;
                            if ((info.optWidth == null) && (info.optHeight == null)) {
                                info.optWidth = info.srcWidth;
                                info.optHeight = info.srcHeight;
                            } else if (info.optWidth == null) {
                                info.optWidth = srcRatio * info.optHeight;
                            } else if (info.optHeight == null) {
                                info.optHeight = (1 / srcRatio) * info.optWidth;
                            }
                            trgRatio = info.optWidth / info.optHeight;
                            if (file.height < info.optHeight || file.width < info.optWidth) {
                                info.trgHeight = info.srcHeight;
                                info.trgWidth = info.srcWidth;
                            } else {
                                if (srcRatio > trgRatio) {
                                    info.srcHeight = file.height;
                                    info.srcWidth = info.srcHeight * trgRatio;
                                } else {
                                    info.srcWidth = file.width;
                                    info.srcHeight = info.srcWidth / trgRatio;
                                }
                            }
                            info.srcX = (file.width - info.srcWidth) / 2;
                            info.srcY = (file.height - info.srcHeight) / 2;
                            return info;
                        };

                        resizeInfo = getResizeInfo(file);

                        if (resizeInfo.trgWidth == null) {
                            resizeInfo.trgWidth = resizeInfo.optWidth;
                        }
                        if (resizeInfo.trgHeight == null) {
                            resizeInfo.trgHeight = resizeInfo.optHeight;
                        }
                        canvas = document.createElement("canvas");
                        ctx = canvas.getContext("2d");
                        canvas.width = resizeInfo.trgWidth;
                        canvas.height = resizeInfo.trgHeight;
                        drawImageIOSFix(ctx, img, (_ref = resizeInfo.srcX) != null ? _ref : 0, (_ref1 = resizeInfo.srcY) != null ? _ref1 : 0, resizeInfo.srcWidth, resizeInfo.srcHeight, (_ref2 = resizeInfo.trgX) != null ? _ref2 : 0, (_ref3 = resizeInfo.trgY) != null ? _ref3 : 0, resizeInfo.trgWidth, resizeInfo.trgHeight);
                        thumbnail = canvas.toDataURL("image/png");

                        if (callback != null) {
                            callback(thumbnail);
                        }
                    };

                img.src = imageUrl;
            },

            preloadDataFile: function($dropzone, file) {
                var mockFile = {name: file.name, size: file.size,
                    width: $dropzone.options.thumbnailWidth,
                    height: $dropzone.options.thumbnailHeight
                };
                var mockFileThumb = {name: file.name, size: file.size,
                    thumbnailWidth: $dropzone.options.thumbnailWidth,
                    thumbnailHeight: $dropzone.options.thumbnailHeight};
                $dropzone.files.push(mockFile);
                $dropzone.emit('addedfile', mockFile);
                $dropzone.emit('complete', mockFile);
                jQuery.uploader.createThumbnailFromUrl(mockFileThumb, file.url, function(thumbnail) {
                    $dropzone.emit('thumbnail', mockFile, thumbnail);
                });
            },
            getDropzone: function(elem) {
                var rawElement = jQuery(elem).get(0);
                return rawElement.dropzone;
            }
        }
    });

    var methods = {
        init: function(options) {
            options = typeof options !== 'undefined' ? options : {};

            Dropzone.autoDiscover = false;

            var settings = jQuery.extend({
                url: "/apps/upload.json",                
                addRemoveLinks: true,
                uploadMultiple: false,
                autoProcessQueue: true,
                parallelUploads: 2,
                maxFiles: 1,
                maxFilesize: 2, //MB
                maxFileSize: 2, //MB
                acceptedFiles: '.jpg,.jpeg,.png,.gif',

                success: null,
                error: null,
                addedfile: null,
                removedfile: null,

                minImageHeight: null,
                minImageWidth: null,
                maxImageHeight: null,
                maxImageWidth: null,
                titleErrorMsg: 'Warning',
                textErrorMsg: 'The file could not be uploaded. Please review the requirements.'

            }, options );

            return this.each(function() {
                var uploader = jQuery.uploader;
                uploader.init(this, settings);
            });
        },
        preloadfilesfromurl : function (url, removeprevfiles) {
            removeprevfiles = typeof removeprevfiles !== 'undefined' ? removeprevfiles : false;
            return this.each(function() {
                var $dropzone = jQuery.uploader.getDropzone(this);
                if(removeprevfiles) {
                    $dropzone.removeAllFiles(true);
                }
                jQuery.getJSON(url, function(data) {
                    jQuery.each(data, function(key, value) {
                        jQuery.uploader.preloadDataFile($dropzone, value);
                    });
                });
            });
        },

        preloadfilesfromjson : function (data, removeprevfiles) {
            removeprevfiles = typeof removeprevfiles !== 'undefined' ? removeprevfiles : false;
            return this.each(function() {
                var $dropzone = jQuery.uploader.getDropzone(this);
                if(removeprevfiles) {
                    $dropzone.removeAllFiles(true);
                }
                jQuery.each(data, function(key, value) {
                    jQuery.uploader.preloadDataFile($dropzone, value);
                });
            });
        },

        removeallfiles: function() {
            return this.each(function() {
                var $dropzone = jQuery.uploader.getDropzone(this);
                $dropzone.removeAllFiles(true);
            });
        },

        processQueue: function() {
            return this.each(function() {
                var $dropzone = jQuery.uploader.getDropzone(this);
                $dropzone.processQueue();
            });
        },

        getDropzone: function(elem) {
            return jQuery.uploader.getDropzone(jQuery(elem));
        }
    };

    jQuery.fn.uploader = function(methodOrOptions) {
        if ( methods[methodOrOptions] ) {
            return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
            // Default to "init"
            return methods.init.apply( this, arguments );
        } else {
            jQuery.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.uploader' );
        }
    }
} (jQuery));

(function(jQuery) {

    var colors = [
        ['transparent', '#56a7d7'], //blue 0
        ['transparent','#21c0c0'], //turquoise 1
        ['transparent','#4bb05f'],  //green 2
        ['transparent','#f86120'],  //orange 3
        ['transparent','#c41a5d'],   //pink 4
        ['transparent','#aeaeae'], //grey, result-notstarted 5
        ['transparent','#ff9100'], //status-inprogress, result-inprogress 6
        ['transparent','#99cc00'], //status-finish, result-pass 7
        ['transparent','#cc3366'] //status-nofinish, result-notpass 8

    ], circles = [];

    var createcircle = function (item) {
        var percentage = jQuery(item).data('percent');
        var color = 0;
        if(jQuery(item).hasClass('blue')) {
            color = 0;
        } else if(jQuery(item).hasClass('turquoise')) {
            color = 1;
        }  else if(jQuery(item).hasClass('green')) {
            color = 2;
        }  else if(jQuery(item).hasClass('orange')) {
            color = 3;
        }  else if(jQuery(item).hasClass('pink')) {
            color = 4;
        } else if(jQuery(item).hasClass('grey')) {
            color = 5;
        } else if(jQuery(item).hasClass('status-inprogress')) {
            color = 6;
        } else if(jQuery(item).hasClass('status-finish')) {
            color = 7;
        } else if(jQuery(item).hasClass('status-nofinish')) {
            color = 8;
        } else if(jQuery(item).hasClass('status-notinit')) {
            color = 5;
        }

        else if(jQuery(item).hasClass('result-notstarted')) {
            color = 5;
        } else if(jQuery(item).hasClass('result-inprogress')) {
            color = 6;
        } else if(jQuery(item).hasClass('result-pass')) {
            color = 7;
        } else if(jQuery(item).hasClass('result-notpass')) {
            color = 8;
        }




        var color_selected = colors[color];
        //Con esto permitimos indicar cualquier color a través del atributo data-color
        var data_color = jQuery(item).data('color');
        if(data_color) {
            color_selected = ['transparent', data_color];
        }

        var radius = (jQuery(item).parent().outerHeight()/2)+1;

        circles.push(Circles.create({
            id:         item.id,
            value:		percentage,
            radius:     radius,
            width:      5,
            colors:     color_selected,
            text: '',
            duration: 0
        }));
    };

    jQuery.fn.circlepercent = function() {
        return this.each(function() {
            var item = this;
            createcircle(item);
            //Esto hace que al redimensionar la pantalla se vuelva a regenerar el circulo
            jQuery(window).resize(function() {
                createcircle(item);
            });
        });
    };


} (jQuery));

//Parallax effect
(function ($) {

    $.fn.parallax = function () {
        var window_width = $(window).width();
        // Parallax Scripts
        return this.each(function(i) {
            var $this = $(this);
            $this.addClass('parallax');

            function updateParallax(initial) {
                var container_height;
                if (window_width < 601) {
                    container_height = ($this.height() > 0) ? $this.height() : $this.children("img").height();
                }
                else {
                    container_height = ($this.height() > 0) ? $this.height() : 500;
                }
                var $img = $this.children("img").first();
                var img_height = $img.height();
                var parallax_dist = img_height - container_height;
                var bottom = $this.offset().top + container_height;
                var top = $this.offset().top;
                var scrollTop = $(window).scrollTop();
                var windowHeight = window.innerHeight;
                var windowBottom = scrollTop + windowHeight;
                var percentScrolled = (windowBottom - top) / (container_height + windowHeight);
                var parallax = Math.round((parallax_dist * percentScrolled));

                if (initial) {
                    $img.css('display', 'block');
                }
                if ((bottom > scrollTop) && (top < (scrollTop + windowHeight))) {
                    $img.css('transform', "translate3D(-50%," + parallax + "px, 0)");
                }

            }

            // Wait for image load
            $this.children("img").one("load", function() {
                updateParallax(true);
            }).each(function() {
                if(this.complete) $(this).load();
            });

            $(window).scroll(function() {
                window_width = $(window).width();
                updateParallax(false);
            });

            $(window).resize(function() {
                window_width = $(window).width();
                updateParallax(false);
            });

        });

    };
}( jQuery ));

jQuery(document).ready(function(){
   var d = jQuery.desktop;
   d.load(jQuery('.desktop-apps-wrapper'));
    jQuery(window).resize(function() {
        d.load(jQuery('.desktop-apps-wrapper'));
    });

    jQuery.checkboxselectall.init();

    jQuery.initializer.selectpicker();
    jQuery.initializer.tooltips();
    jQuery.initializer.switches();
    jQuery.initializer.selectables();
    jQuery.initializer.parallax();

    jQuery.calendarmonthly.init();

});


jQuery(window).load(function(){

    jQuery('.circle_percent').circlepercent();

    jQuery('.menu-item .checkbox input[type="checkbox"]').on('change', function(e) {
        if(jQuery(this).is(':checked')) {
            jQuery(this).closest('div.app-wrapper').addClass('selected');
        } else {
            jQuery(this).closest('div.app-wrapper').removeClass('selected');
        }
    });
    jQuery.each(jQuery('.menu-item .checkbox input[type="checkbox"]'), function(key, item) {
        if(jQuery(item).is(':checked')) {
            jQuery(item).closest('div.app-wrapper').addClass('selected');
        } else {
            jQuery(item).closest('div.app-wrapper').removeClass('selected');
        }
    });

    jQuery.imageadjust.adjust();

    jQuery.initializer.switches();
       
});

function loadElementsForModal()
{
    jQuery.initializer.switches();

    jQuery.initializer.selectpicker();
    jQuery.initializer.tooltips();
    jQuery.initializer.selectables();
}

function isEmptyInputText(elem)
{
    return (jQuery(elem).val() == "");
}

jQuery(window).resize(function() {
    jQuery.imageadjust.adjust();
});

//FIX, eliminamos los 17px de padding-right que se le dá al abrir una modal.
jQuery('.modal').on('hidden.bs.modal', function () {
    jQuery('body').css('padding-right', '');
});

jQuery('.modal').on('show.bs.modal', function () {
    loadElementsForModal();
});


// Evitar que los desplegables del navbar se solapen
jQuery(document).ready(function () {
    jQuery('.dropdown').on('click',function(){
        if(jQuery("#menu-dashboard").hasClass("in")){
            jQuery("#menu-dashboard").removeClass('in');
        }
    });
});

// Evitar que los dropdown laterales (.dropdown-lateral) se cierren al clicar en un checkbox
// Se cierran al clicar en cualquier parte de la página o en su propio botón de abrir/cerrar
jQuery('.dropdown-lateral li').on('click',function(event){
    event.stopPropagation();
});

// Que los dropdown-menu se abran a la izquierda en pantallas pequeñas
jQuery(document).ready(function () {
    $(window).resize(function() {
        window_width = $(window).width();
        if (window_width < 500) {
            jQuery('.dropdown-auto-width ul.dropdown-menu').removeClass('dropdown-menu-right');
        } else {
            jQuery('.dropdown-auto-width ul.dropdown-menu').addClass('dropdown-menu-right');    
        }
    });
});
