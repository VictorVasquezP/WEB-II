function ocultar(){
    var num = document.getElementById('serOpcion').value;
    console.log("cambio "+num);
    switch(num){
        case "1":
            document.getElementById('datoEscuela').style.display='inline';
            document.getElementById('datoMunicipio').style.display='none';
            document.getElementById('datoColonia').style.display='none';
            document.getElementById('datoPromedio').style.display='none';
            document.getElementById('orden').style.display='none';
            break;
        case "2":
            document.getElementById('datoEscuela').style.display='none';
            document.getElementById('datoMunicipio').style.display='inline';
            document.getElementById('datoColonia').style.display='inline';
            document.getElementById('datoPromedio').style.display='none';
            document.getElementById('orden').style.display='none';
            break;
        case "3":
            document.getElementById('datoEscuela').style.display='none';
            document.getElementById('datoMunicipio').style.display='none';
            document.getElementById('datoColonia').style.display='none';
            document.getElementById('datoPromedio').style.display='inline';
            document.getElementById('orden').style.display='inline';
            break;
    }
}
$(document).ready(function(){
    ocultar();
});


