var Cinemas = (function(){

    var cinema = "";
    var totalFunctions = [];
    var funciones = [];

    var cambiarCinema = function (param) {
        var movieName;
        var movieSeatsCols;
        var movieSeatsRows;
        var movieDate;
        var singleFunction;
        var functions = param.functions;
        totalFunctions = functions;
        funciones = [];
        for(var i = 0; i < functions.length; i++){
            movieName = functions[i].movie.name;
            movieSeatsCols = functions[i].seats[0].length;
            movieSeatsRows = functions[i].seats.length;
            movieDate = functions[i].date;
            singleFunction = {"cinema":cinema, "funcion":movieName, "seats":movieSeatsCols*movieSeatsRows,"fecha":movieDate};
            funciones.push(singleFunction);
        }
        actualizarTabla();
    };

    var actualizarTabla = function() {
        $("#tablaCines").find('tbody').empty();
        for (var i = 0; i < funciones.length; i++) {
            var funcion = funciones[i];
            $("#tablaCines").find('tbody').append('<tr class="clickable-row"><th scope="row" data-funcion="'+funcion.funcion+'">'+(i+1)+'</th><td data-funcion="'+funcion.funcion+'">'+funcion.cinema+'</td><td data-funcion="'+funcion.funcion+'">'+funcion.funcion+'</td><td data-funcion="'+funcion.funcion+'">'+funcion.seats+'</td><td data-funcion="'+funcion.funcion+'">'+funcion.fecha+'</td></tr>');
        }
        mostrarSillas();
    }

    var mostrarSillas = function() {
        var movieSeatsCols;
        var movieSeatsRows;
        $('#tablaCines').on('click', 'tbody tr', function(event) {
            $(this).addClass('highlight').siblings().removeClass('highlight');
            $("#tablaSeats").find("tbody").empty();
            var rowSelected = false;
            for(var i = 0; i < totalFunctions.length && !rowSelected; i++){
                if (totalFunctions[i].movie.name == event.target.dataset.funcion) {
                    movieSeatsCols = totalFunctions[i].seats[0].length;
                    movieSeatsRows = totalFunctions[i].seats.length;
                    generarTablaSillas(i, movieSeatsCols, movieSeatsRows);
                }                
            }
        });            
    }

    var generarTablaSillas = function(funcion, movieSeatsCols, movieSeatsRows) {
        for (var row = 0; row < movieSeatsRows; row++) {
            $("#tablaSeats").find("tbody").append('<tr>');
            for (var col = 0; col < movieSeatsCols; col++) {
                $("#tablaSeats").find("tbody").append('<td>');
                if(totalFunctions[funcion].seats[row][col]) {
                    $("#tablaSeats").find("tbody").append('<img src=/images/sillaOffMini.png/>');
                } else {
                    $("#tablaSeats").find("tbody").append('<img src=/images/sillaOnMini.png/>');
                }
                $("#tablaSeats").find("tbody").append('</td>');
            }
            $("#tablaSeats").find("tbody").append('</tr>');
        }
        rowSelected = true;
    }

    return {
        buscarCinemas: function() {
            cinema = $("#inputBuscar").val();
            //apimock.getCinemaByName(cinema,cambiarCinema);
            apiclient.getCinemaByName(cinema,cambiarCinema);
        }
    };

})();