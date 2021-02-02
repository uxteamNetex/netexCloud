/* Se ha creado este archivo para no tener que crear tantos modal popup en la maqueta y poder reutilizar el mismo */

jQuery(document).ready(function() {         

    jQuery('#btnSiguiente, #btnSiguiente2').on('click', function(event) {    
       event.preventDefault();         
       //Habilitamos el texto de selección:
       jQuery('#paso1, #paso3').hide();
       jQuery('#paso2, #paso4').show();
       
       jQuery('#btnSiguiente, #btnSiguiente2').hide();
       jQuery('#btnInitSynchro, #btnInitSynchro2').show();      
    });


    //Código js para el icono circular progressbar
    var bar1 = new ProgressBar.Circle(circularProgressbar1, {
        color: '#666',
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 5,
        trailWidth: 2,
        easing: 'easeInOut',
        duration: 1400,
        text: {
            autoStyleContainer: false
        },
        from: { color: '#99E5FF', width: 1 },
        to: { color: '#5EC0EA', width: 5 },
        // Set default step function for all animate calls
        step: function(state, circle) {
            circle.path.setAttribute('stroke', state.color);
            circle.path.setAttribute('stroke-width', state.width);

            var value = Math.round(circle.value() * 100);
            if (value === 0) {
                circle.setText('');
            } else {
                circle.setText(value);
            }
        }
    });
    bar1.text.style.fontSize = '16px';
    bar1.animate(1.0);  // Number from 0.0 to 1.0


    var bar2 = new ProgressBar.Circle(circularProgressbar2, {
        color: '#666',
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 5,
        trailWidth: 2,
        easing: 'easeInOut',
        duration: 1400,
        text: {
            autoStyleContainer: false
        },
        from: { color: '#99E5FF', width: 1 },
        to: { color: '#5EC0EA', width: 5 },
        // Set default step function for all animate calls
        step: function(state, circle) {
            circle.path.setAttribute('stroke', state.color);
            circle.path.setAttribute('stroke-width', state.width);

            var value = Math.round(circle.value() * 100);
            if (value === 0) {
                circle.setText('');
            } else {
                circle.setText(value);
            }
        }
    });
    bar2.text.style.fontSize = '16px';
    bar2.animate(1.0);  // Number from 0.0 to 1.0


     var bar3 = new ProgressBar.Circle(circularProgressbar3, {
        color: '#666',
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 5,
        trailWidth: 2,
        easing: 'easeInOut',
        duration: 1400,
        text: {
            autoStyleContainer: false
        },
        from: { color: '#99E5FF', width: 1 },
        to: { color: '#5EC0EA', width: 5 },
        // Set default step function for all animate calls
        step: function(state, circle) {
            circle.path.setAttribute('stroke', state.color);
            circle.path.setAttribute('stroke-width', state.width);

            var value = Math.round(circle.value() * 100);
            if (value === 0) {
                circle.setText('');
            } else {
                circle.setText(value);
            }
        }
    });
    bar3.text.style.fontSize = '16px';
    bar3.animate(0.8);  // Number from 0.0 to 1.0


    var bar4 = new ProgressBar.Circle(circularProgressbar4, {
        color: '#666',
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 5,
        trailWidth: 2,
        easing: 'easeInOut',
        duration: 1400,
        text: {
            autoStyleContainer: false
        },
        from: { color: '#99E5FF', width: 1 },
        to: { color: '#5EC0EA', width: 5 },
        // Set default step function for all animate calls
        step: function(state, circle) {
            circle.path.setAttribute('stroke', state.color);
            circle.path.setAttribute('stroke-width', state.width);

            var value = Math.round(circle.value() * 100);
            if (value === 0) {
                circle.setText('');
            } else {
                circle.setText(value);
            }
        }
    });
    bar4.text.style.fontSize = '20px';
    bar4.animate(1.0);  // Number from 0.0 to 1.0


    var bar5 = new ProgressBar.Circle(circularProgressbar5, {
        color: '#666',
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 5,
        trailWidth: 2,
        easing: 'easeInOut',
        duration: 1400,
        text: {
            autoStyleContainer: false
        },
        from: { color: '#99E5FF', width: 1 },
        to: { color: '#5EC0EA', width: 5 },
        // Set default step function for all animate calls
        step: function(state, circle) {
            circle.path.setAttribute('stroke', state.color);
            circle.path.setAttribute('stroke-width', state.width);

            var value = Math.round(circle.value() * 100);
            if (value === 0) {
                circle.setText('');
            } else {
                circle.setText(value);
            }
        }
    });
    bar5.text.style.fontSize = '20px';
    bar5.animate(1.0);  // Number from 0.0 to 1.0


});