
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
        var functions = param[0].functions;
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
            $("#tablaCines").find('tbody').append('<tr class="clickable-row"><th scope="row">'+(i+1)+'</th><td>'+funcion.cinema+'</td><td>'+funcion.funcion+'</td><td>'+funcion.seats+'</td><td>'+funcion.fecha+'</td></tr>');
        }
        var movieSeatsCols;
        var movieSeatsRows;
        $('#tablaCines').on('click', 'tbody tr', function(event) {
            $(this).addClass('highlight').siblings().removeClass('highlight');
            for(var i = 0; i < totalFunctions.length; i++){
                movieSeatsCols = totalFunctions[i].seats[0].length;
                movieSeatsRows = totalFunctions[i].seats.length;
                for (var row = 0; row < movieSeatsRows; row++) {
                    $("#tablaSeats").find("tbody").append('<tr>');
                    for (var col = 0; col < movieSeatsCols; col++) {
                        $("#tablaSeats").find("tbody").append('<td>');
                        if(totalFunctions[i].seats[row][col]) {
                            $("#tablaSeats").find("tbody").append('true');
                        } else {
                            $("#tablaSeats").find("tbody").append('false');
                        }
                        $("#tablaSeats").find("tbody").append('</td>');
                    }
                    $("#tablaSeats").find("tbody").append('</tr>');
                }
            }
            
        });
    }

    return {
        buscarCinemas: function(){
            cinema = $("#inputBuscar").val();
            apimock.getCinemaByName(cinema,cambiarCinema);
        }        
    };

})();