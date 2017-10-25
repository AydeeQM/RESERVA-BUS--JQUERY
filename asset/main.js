let celda_actual;
let pasajeros = [];

function genera() {
  let q_asiento = 32;
  let filas = 4;
  let columnas = q_asiento/filas;
  let pasillo = '';
  let tabla = "";
    tabla+="<table class='celda' border='5' cellpadding='10' cellpadding='10' cellspacing='5' align='center' bordercolor='blue'>";
        for(let i = 1; i <= 4; i++){
            tabla+="<tr>";
          let numero_sit = i;
            for(let j = 0; j < columnas; j++){
                  tabla+="<td>"+(numero_sit)+"</td>";
                  numero_sit +=4;
            }
              (i==2)? pasillo += "<td></td>":pasillo = "";
              tabla += "</tr>"+pasillo;
        }
    tabla+="</table>";
    
    $("#tablero").append(tabla);
}

genera();

$(document).ready(function () {
    //Recuperamos en contenido del TD
    $('table tr td').click(function (event) { 
        $("#mostrar").html(parseInt(event.target.textContent));
        
        let num = parseInt($('#mostrar').text());//numero del asiento
        
        celda_actual = $(event.target);//recupera el TD actual
        
        //recorre el array pasajeros
        $.grep(pasajeros, function(value, index){
            if(num == pasajeros[index].Item){
                $("#nombre").val(pasajeros[index].Nombre);
                $("#apell").val(pasajeros[index].Apellido);
                $("#eldni").val(pasajeros[index].Dni);
            }
        });

    });
    
    //funcion que agrega a los pasajeros
    $('#agregar').click(function(){
        let data = {};
        let asiento = parseInt($('#mostrar').text());
        let suNombre = $('#nombre').val();
        let suApellido = $('#apell').val();
        let suDNI= parseInt($('#eldni').val());

        data.Item = asiento;
        data.Nombre= suNombre;
        data.Apellido = suApellido;
        data.Dni= suDNI;

        pasajeros.push(data);

        alert('El pasajero ' + ' ' + data.Nombre+ ' ' + data.Apellido + ' en el asiento N° ' + data.Item + ' se ha agregado correctamente');
        
        celda_actual.css('background','#F8ED50');
        
        $("#nombre").val('');
        $("#apell").val('');
        $("#eldni").val('');

    });
    
    //funcion que imprime la lista 
    $('#print').click(function(){
        $.grep(pasajeros, function(value, index){
            $("#lista").append("Asiento N°: " + pasajeros[index].Item +'<br>'+ 'Nombre: '+pasajeros[index].Nombre + "<br>"+'Apellido: '+pasajeros[index].Apellido+'<br>'+'DNI N°: '+pasajeros[index].Dni+'<br>'+'<br>');
            });
    });
    
    //funcion que busca a los pasajeros por su dni
    $('#buscar').click(function(){
        let id_dni =  parseInt($('#dni').val());
        $.grep(pasajeros, function(value, index){
            if(id_dni == pasajeros[index].Dni){
                $("#nombre").val(pasajeros[index].Nombre);
                $("#apell").val(pasajeros[index].Apellido);
                $("#eldni").val(pasajeros[index].Dni);
            }
        });
    });
    
    //funcion que cancela el asiento
    $('#cancela').click(function(){
        let num = parseInt($('#mostrar').text());
        $.grep(pasajeros, function(value, index){
            let ss = pasajeros[index].Item 
            let itemtoRemove = pasajeros[index];
            if(num === ss){
                pasajeros.splice($.inArray(itemtoRemove, pasajeros),1);
            }
        });
        
        celda_actual.css('background','transparent');
        
        $("#nombre").val('');
        $("#apell").val('');
        $("#eldni").val('');
    });
    
    //solo limpia
    $('#consulta').click(function(){
        $("#nombre").val('');
        $("#apell").val('');
        $("#eldni").val('');
    });
    
});


