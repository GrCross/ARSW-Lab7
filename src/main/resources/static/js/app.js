
var Cinemas = (function(){

    var cinema = "";
    var funciones = [];

    var cambiarCinema = function (funciones) {
        this.funciones = funciones;
        console.log(funciones);
    };

    return {
        buscarCinemas: function(){
            cinema = $("#inputBuscar").val();
            funciones = apimock.getCinemaByName(cinema,cambiarCinema);
        }        
    };

})();