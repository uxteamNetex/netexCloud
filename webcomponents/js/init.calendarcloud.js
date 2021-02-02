    var alumnoColor = "#df3176";
    var formadorColor = "#56A7d7";
    var eventsFormador = [
        {
            title: 'Cumple Javier Méndez',
            start: '2016-05-27T00:00:00',
            end: '2016-05-27T23:59:59',
            color: formadorColor,
            description: 'Lorem ipsum..',
            ubication: 'Zona común',
            type: 'Del formador',
            obligatory: 'Sí',     
        },
        {
            title: 'Netex-AC-Seminars',
            start: '2016-05-15T11:00:00',
            end: '2016-05-15T12:30:00',
            color: formadorColor,
            description: 'Lorem ipsum..',
            ubication: 'Sala AC',
            type: 'Del formador',
            obligatory: 'No',     
        },       
    ];
    var eventsAlumno =[
            {
                title: 'Netex Sala A - Reunión',
                start: '2016-05-15T10:30:00',
                end: '2016-05-15T12:00:00',
                color: alumnoColor,
                description: 'Lorem ipsum..',
                ubication: 'Sala A',
                type: 'Del alumno',
                obligatory: 'No',                    
            },
            {
                title: 'Netex Sala D',
                start: '2016-05-10T16:00:00',
                end: '2016-05-10T18:00:00',
                color: alumnoColor,
                description: 'Lorem ipsum..',
                ubication: 'Sala D',
                type: 'Del alumno',
                obligatory: 'No',  
            },
            {
                title: 'Netex Formación FrontEnd',
                start: '2016-05-07T12:00:00',
                end: '2016-05-08T12:00:00',
                color: alumnoColor,
                description: 'Una maravillosa clase magistral de Javier Méndez Veira.',
                ubication: 'Sala D',
                type: 'Del alumno',
                obligatory: 'Sí',  
            }
    ];
    var eventsAll = eventsAlumno.concat(eventsFormador);
  
    
    function getPopoverRowEvent(title,data){
        var popoverContent = '<div class="row">';
            popoverContent += '<div class="col-lg-5"><label>'+title+':</label></div>';
            popoverContent += '<div class="col-lg-7"><span>'+data+'</span></div>';
            popoverContent += '</div>';
        return popoverContent;
    }
    
    
    var FC = $.fullCalendar; // a reference to FullCalendar's root namespace
    var View = FC.View;      // the class that all views must inherit from
    var CustomView;          // our subclass

    CustomView = View.extend({ // make a subclass of View

        initialize: function () {
            // called once when the view is instantiated, when the user switches to the view.
            // initialize member variables or do other setup tasks.
        },
        render: function () {
            // responsible for displaying the skeleton of the view within the already-defined
            // this.el, a jQuery element.
        },
        setHeight: function (height, isAuto) {
            // responsible for adjusting the pixel-height of the view. if isAuto is true, the
            // view may be its natural height, and `height` becomes merely a suggestion.
        },
        renderEvents: function (events) {
            // reponsible for rendering the given Event Objects
            console.dir(events);    
            var html = "";          
            html += '<table>';
            html += '<thead><tr>';
            html += '<th class="col-lg-2">día</th>';
            html += '<th class="col-lg-2">duración</th>';
            html += '<th class="col-lg-8">evento</th>';
            html += '</tr></thead>';
            html += '<tbody class="fc-body">';
           
           for(var index in events){
               var event = events[index];
               var start = moment(event.start).format('dddd DD/MM');
               var end = moment(event.end).format('dddd DD/MM');
               var startTime = moment(event.start).format('HH:mm');
               var endTime = moment(event.end).format('HH:mm');
               var duration = startTime+" - "+endTime;
               if(start == end && duration == "00:00 - 23:59"){
                   duration = "Todo el día";
               }
               
               html += "<tr>";
               html += '<td><a href="#">'+start+'</a></td>';
               html += "<td>"+duration+"</td>";
               html += "<td>"+event.title+"</td>";                              
               html += "</tr>";
           }
           
            html += ' ';
            html += '</tbody>';
            html += '</table>';
                       
            $('.fc-agendaNext-view').html(html);     
        },
        destroyEvents: function () {
            // responsible for undoing everything in renderEvents
        },
        renderSelection: function (range) {
            // accepts a {start,end} object made of Moments, and must render the selection
        },
        destroySelection: function () {
            // responsible for undoing everything in renderSelection
        }

    });

    // call this what you like, for this example it's just called 'custom'
    FC.views.agendaNext = CustomView; // register our class with the view system
    
    $(document).ready(function() {               
        $('#mincalendar').datetimepicker({
                inline: true,
                locale: 'es',
                viewMode: 'days',
                format: 'DD/MM/YYYY',               
                //sideBySide: true
        }).on("dp.change", function (e) {
            //alert(e.date);
            $('#calendar').fullCalendar('gotoDate', e.date);
        });
        
        $('#calendar').fullCalendar({
            defaultDate: '2016-05-27',
            editable: true,
            eventLimit: true, // allow "more" link when too many events
            lang: "es",
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay,agendaNext'
            },
            views : {
                agendaDay : {

                },
                agendaWeek : {

                },
                agendaNext : {
                    buttonText: 'Agenda'
                },
                /*agendaNextFive: {
                    type: 'agenda',
                    duration: { days: 5 },
                    buttonText: 'Agenda'
                }*/
            },
            eventRender: function(event, element, view) {               
               //element.addClass('class'); 
               
               var start = moment(event.start).format('DD/MM/YYYY HH:mm')
               var end = moment(event.end).format('DD/MM/YYYY HH:mm')
               
               //Construimos el contenido del popover:
               var popoverContent = '';
               popoverContent += '<div class="popover-event">';               
               popoverContent += "<h4><b>"+event.title+"</b></h4>";
               popoverContent += getPopoverRowEvent("Descripción",event.description);
               popoverContent += getPopoverRowEvent("Ubicación",event.ubication);
               popoverContent += getPopoverRowEvent("Calendario",event.type);
               popoverContent += getPopoverRowEvent("Obligatorio",event.obligatory);                              
               popoverContent += getPopoverRowEvent("Fecha inicio",start);
               popoverContent += getPopoverRowEvent("Fecha fin",end);                                            
               popoverContent += "</div>";
               
               // Añadimos atributos necesarios para el popover bottom de cada evento:            
               element.attr("data-container","body");
               element.attr("data-toggle","popover");
               element.attr("data-placement","bottom");   
               element.attr("data-content",popoverContent);                                      
            },
            events: eventsAll,
            eventClick: function(calEvent, jsEvent, view) {

                console.log('Event: ' + calEvent.title);
                console.debug(calEvent);
                console.log('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
                console.log('View: ' + view.name);               
                // change the border color just for fun
                //$(this).css('border-color', 'red');

            }
        });
        
         //Activate popovers events:
        $('[data-toggle="popover"]').popover({
            html:true,
            //Importante para añadir diseño al popover
            placement: function(context, src) {
                $(context).addClass('popover-event-wrapper');
                return 'bottom';
            },            
        });   
        
        //No funcionan:
        $("#chk_formador").change(function() {           
            if(this.checked) {   
                console.debug(eventsFormador);             
                $('#calendar').fullCalendar({
                    events: eventsFormador
                });
                $('#calendar').fullCalendar('renderEvents');
            }
        });
        $("#chk_alumno").change(function() {
            if(this.checked) {
                console.debug(eventsAlumno);  
                $('#calendar').fullCalendar({
                    events: eventsAlumno
                });
                $('#calendar').fullCalendar('renderEvents');
            }
        });
        
    });