
//Funcion al cargar la pagina Index
$(document).ready(function(){
    //var tBody =$("#tablaIndex");
    $.ajax({
      type: 'GET',
      //data:{"escuela":dato},
      data:{},
      ContentType: "application/json; charset=utf-8",
      dataType:'json',
      url:'http://localhost:3000/estudiante/listar_orden',
      //La respuesta del servidor
      success: function(respServidor){ 
        console.log(respServidor.msg)
        $('#tablaI').DataTable({
          //Con postgres, da el resultado con respServidor.response.rows
          //Con mysql
            "data":respServidor.response,
            "columns":[
              {"data":"id_est"},
              {"data":"nombre"},
              {"data":"ap_paterno"},
              {"data":"ap_materno"},
              {"data":"estatus"},
          ]

        });
      },
      error: function(error){
          console.log(error);
          //alert(err);
      }
    })
});
