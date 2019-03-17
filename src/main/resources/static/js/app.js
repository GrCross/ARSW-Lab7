
var Cinemas = (function(){

    var cinema = "";
    var funciones = [];

    var cambiarCinema = function (param) {

        var movieName;
        var movieSeatsCols;
        var movieSeatsRows;
        var movieDate;
        var singleFunction;
        var functions = param[0].functions;
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
        console.log(funciones);
    };

    var actualizarTabla = function() {
        $("#tablaCines").find('tbody').empty();
        for (var i = 0; i < funciones.length; i++) {
            var funcion = funciones[i];
            $("#tablaCines").find('tbody').append('<tr><th scope="row">'+(i+1)+'</th><td>'+funcion.cinema+'</td><td>'+funcion.funcion+'</td><td>'+funcion.seats+'</td><td>'+funcion.fecha+'</td></tr>');
        }        
    }

    return {
        buscarCinemas: function(){
            cinema = $("#inputBuscar").val();
            apimock.getCinemaByName(cinema,cambiarCinema);
        }        
    };

})();