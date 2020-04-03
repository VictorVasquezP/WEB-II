//Buscar
$(function(){
  $('#buscar').click(function(){
      var num = document.getElementById('serOpcion').value;
      console.log("cambio "+num);
      var head = $('#thead');
      var tabla = $('#tablaB');
      switch(num){
          case "1":
              var escuela = $('#datoEscuela').val();
              if(!isNaN(escuela)){
                $('#datoEscuela').css('border-color','#FF0000');
                
              }else{
              $('#datoEscuela').css('border-color',' #33F775');
              $.ajax({
                type: 'GET',
                //data:{"escuela":dato},
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                dataType:'json',
                url:'http://localhost:3000/estudiante/listar_escuela',
                data:{escuela},
                //La respuesta del servidor
                success: function(respServidor){
                    head.empty();
                    head.append('<tr>'+
                                '<td>Nombre</td>'+
                                '<td>Apellido paterno</td>'+
                                '<td>Apellido materno</td>'+
                                '<td>Escuela</td>'+
                                '</tr>');
                  tabla.DataTable({
                    //Con postgres, da el resultado con respServidor.response.rows
                    //Con mysql
                    "data":respServidor.response,
                    "destroy": true,
                    "columns":[
                      {"data":"nombre"},
                      {"data":"ap_paterno"},
                      {"data":"ap_materno"},
                      {"data":"esc_procedencia"},
                    ]
                  });
                },
                error: function(error){
                    console.log(error);
                    //alert(err);
                }
              })
            }
              break;
          case "2":
              var municipio = $('#datoMunicipio').val();
              var colonia = $('#datoColonia').val();
              if(!isNaN(municipio) || !isNaN(colonia)){
                $('#datoMunicipio').css('border-color','#FF0000');
                $('#datoColonia').css('border-color','#FF0000');
              }else{
                $('#datoMunicipio').css('border-color',' #33F775');
                $('#datoColonia').css('border-color',' #33F775');
              
                $.ajax({
                  type: 'GET',
                  //data:{"escuela":dato},
                  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                  contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                  dataType:'json',
                  url:'http://localhost:3000/estudiante/listar_municipio',
                  data:{municipio,colonia},
                  //La respuesta del servidor
                  success: function(respServidor){
                      head.empty();
                      head.append('<tr>'+
                                  '<td>Nombre</td>'+
                                  '<td>Apellido paterno</td>'+
                                  '<td>Apellido materno</td>'+
                                  '<td>Municipio</td>'+
                                  '<td>Colonia</td>'+
                                  '</tr>');
                    tabla.DataTable({
                      //Con postgres, da el resultado con respServidor.response.rows
                      //Con mysql
                      "data":respServidor.response,
                      "destroy": true,
                      "columns":[
                        {"data":"nombre"},
                        {"data":"ap_paterno"},
                        {"data":"ap_materno"},
                        {"data":"municipio"},
                        {"data":"colonia"},
                      ]
                    });
                  },
                  error: function(error){
                      console.log(error);
                      //alert(err);
                  }
                })
              }
              break;
          case "3":
                var prom = $('#datoPromedio').val();
                var orden = $('#orden').val(); 
                if(prom==""){
                   $('#datoPromedio').css('border-color','#FF0000');
                   //alert("Dato vacio");
                }else{

                  $('#datoPromedio').css('border-color',' #33F775');
                  $.ajax({
                    type: 'GET',
                    //data:{"escuela":dato},
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                    dataType:'json',
                    url:'http://localhost:3000/estudiante/listar_promedio',
                    data:{prom,orden},
                    //La respuesta del servidor
                    success: function(respServidor){
                        head.empty();
                        head.append('<tr>'+
                                    '<td>Nombre</td>'+
                                    '<td>Apellido paterno</td>'+
                                    '<td>Apellido materno</td>'+
                                    '<td>Promedio</td>'+
                                    '<td>Escuela</td>'+
                                    '</tr>');
                      tabla.DataTable({
                        //Con postgres, da el resultado con respServidor.response.rows
                        //Con mysql
                        "data":respServidor.response,
                        "destroy": true,
                        "columns":[
                          {"data":"nombre"},
                          {"data":"ap_paterno"},
                          {"data":"ap_materno"},
                          {"data":"promedio"},
                          {"data":"esc_procedencia"},
                        ]
                      });
                    },
                    error: function(error){
                        console.log(error);
                        //alert(err);
                    }
                  })
                }
              break;
      }
    
    //var tBody =$("#tabla");
    
  });
}); 

//Eliminar estudiante
$(function(){
  $('#elimina').click(function(){
  
    var dato = $('#datoEliminar').val();
    var opcion = $('#delOpcion').val();
    if(dato==""){
      $('#datoEliminar').css('border-color','#FF0000');
    }else{
      
      if(opcion=="1"){
        //promedio
        $('#datoEliminar').css('border-color',' #33F775');
        console.log("Promedio "+dato);
        $.ajax({
          
          type: 'DELETE',
          //data:{"escuela":dato},
          data:{"promedio":dato},
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          contentType: 'application/x-www-form-urlencoded; charset=utf-8',
          dataType:'json',
          url:'http://localhost:3000/estudiante/borrarEst',
          //La respuesta del servidor
          success: function(resp){
                console.log("Estudiante eliminado");
                alert("Estudiantes eliminados con exito! " + resp.response.affectedRows);
                location.reload();
                
          },
          error: function(error){
              console.log(error);
              //alert(err);
          }
        })
      }else{
        //id
        $('#datoEliminar').css('border-color',' #33F775');
        $.ajax({
          type: 'DELETE',
          //data:{"escuela":dato},
          data:{"id":dato},
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          contentType: 'application/x-www-form-urlencoded; charset=utf-8',
          dataType:'json',
          url:'http://localhost:3000/estudiante/borrarEstId',
          //La respuesta del servidor
          success: function(resp){
                console.log("Estudiante eliminado");
                alert("Estudiante eliminado con exito! " + resp.msg);
                location.reload();
                
          },
          error: function(error){
              console.log(error);
              //alert(err);
          }
        })
      }
    }
  });
}); 

//Registro de estudiante
$(function(){
  $('#registrar').click(function(){
    var nombre = $('#nombre').val();
    var apellido1 = $('#ap_pat').val();
    var apellido2 = $('#ap_mat').val();
    var sexo = $('#sexo').val();
    var estatus = $('#status').val();
    var curp = $('#curp').val();
    var fecha_nacimiento = $('#fecha_n').val();
    var id_civ = $('#civil').val();
    /*console.log("Personales "+nombre+" "+apellido1+" "+
                apellido2+" "+sexo+" "+
                estatus+" "+curp+" "+estado_civil+" "+
                fecha_nacimiento);
                */
    //Datos de direccion
    var calle = $('#calle').val();
    var colonia = $('#colonia').val();
    var numero = $('#numero').val();
    var municipio = $('#municipio').val();
    var cp = $('#cp').val();
    var estado = $('#estado').val();
    var pais = $('#pais').val();
    /*console.log("Direccion "+calle+" "+colonia+" "+numero+" "+
                municipio+" "+cp+" "+estado+" "+pais);
    */
    //Datos de contacto
    var email = $('#correo').val();
    var celular = $('#cel').val();
    var tel = $('#tel').val();
    //Datos academicos
    var promedio = $('#promedio').val();
    var esc_procedencia = $('#escuela').val();
    var egreso = $('#fecha_eg').val();
    //Datos medicos
    var sangre = $('#t_sangre').val();
    var nss = $('#nss').val();
    var alergias = $('#alergia').val();
    //Datos del tutor
    //Datos de direccion
    var calle2 = $('#calle2').val();
    var colonia2 = $('#colonia2').val();
    var numero2 = $('#numero2').val();
    var municipio2 = $('#municipio2').val();
    var cp2 = $('#cp2').val();
    var estado2 = $('#estado2').val();
    var pais2 = $('#pais2').val();
    //Datos de contacto
    var email2 = $('#correo2').val();
    var celular2 = $('#cel2').val();
    var tel2 = $('#tel2').val();
    //Datos personales
    var nombre2 = $('#nombre2').val();
    var apellido12 = $('#ap_pat2').val();
    var apellido22 = $('#ap_mat2').val();
    var sexo2 = $('#sexo2').val();
    var checkTutor = $("#yo").prop('checked'); 
    console.log(checkTutor);
    if(checkTutor){
      
        //ANIDAR EL INSERTAR DEL ALUMNO
        var id_tut = 0;
        $.ajax({
          type: 'POST',
          //data:{"escuela":dato},
          data:{nombre,apellido1,apellido2,sexo,estatus,curp,fecha_nacimiento,id_civ,calle,colonia,numero,municipio,cp,estado,pais,email,celular,tel,promedio,esc_procedencia,egreso,sangre,nss,alergias,id_tut},
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          contentType: 'application/x-www-form-urlencoded; charset=utf-8',
          dataType:'json',
          url:'http://localhost:3000/estudiante/registro',
          //La respuesta del servidor
          success: function(resp){
                //console.log("Estudiante registrado");
                alert("Estudiante registrado con exito! Yo mismo de tutor" + resp.msg);
                //location.reload();
                
          },
          error: function(error){
              console.log(error);
              //alert(err);
          }
        });
    }else{
      $.ajax({
        type: 'POST',
        data:{"calle":calle2,"colonia":colonia2,"numero":numero2,"munucipio":municipio2,"cp":cp2,"estado":estado2,
              "pais":pais2,"email":email2,"celular":celular2,"tel":tel2,"nombre":nombre2,"apellido1":apellido12,"apellido2":apellido22,"sexo":sexo2},
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType:'json',
        url:'http://localhost:3000/estudiante/tutor',
        //La respuesta del servidor
        success: function(resp){
              
              alert("Tutor registrado con exito! " + resp.msg);
              //ANIDAR EL INSERTAR DEL ALUMNO
              var id_tut = resp.response.insertId;
              $.ajax({
                type: 'POST',
                //data:{"escuela":dato},
                data:{nombre,apellido1,apellido2,sexo,estatus,curp,fecha_nacimiento,id_civ,calle,colonia,numero,municipio,cp,estado,pais,email,celular,tel,celular,promedio,esc_procedencia,egreso,sangre,nss,alergias,id_tut},
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                dataType:'json',
                url:'http://localhost:3000/estudiante/registro',
                //La respuesta del servidor
                success: function(resp){
                      //console.log("Estudiante registrado");
                      alert("Estudiante registrado con exito! Con otra persona de tutor" + resp.msg);
                      //location.reload();
                      
                },
                error: function(error){
                    console.log(error);
                    //alert(err);
                }
              })
              //location.reload();
              
        },
        error: function(error){
            console.log(error);
            //alert(err);
        }
      });
    }
  }); 
});