
$(document).ready(function(){
    loadUpdate();
    
});
var ids = [];
function loadUpdate(){
    //var tBody =$("#tablaIndex");
    var tabla = $('#tablaU');
    $.ajax({
      type: 'GET',
      //data:{"escuela":dato},
      data:{},
      ContentType: "application/json; charset=utf-8",
      dataType:'json',
      url:'http://localhost:3000/estudiante/listarEstudiantes',
      //La respuesta del servidor
      success: function(resp){ 
        console.log("Mensaje: "+resp.msg);
            //console.log(elemento);
        var table = tabla.DataTable({
          //Con postgres, da el resultado con respServidor.response.rows
          //Con mysql
          "data":resp.response,
          "destroy": true,
          pageLength : 5,
          lengthMenu: [[5, 10, 15], [5, 10, 15]],
          "columns":[
            {"data":"id_per"},
            {"data":"nombre"},
            {"data":"ap_paterno"},
            {"data":"ap_materno"},
            {"data":"estatus"}
          ]
        });
        //Cuando se haga click en la tabla
        $('#tablaU tbody').on('click', 'tr', function () {
          var data = table.row(this).data();
          alert( 'Seleccionaste a '+data["nombre"]+' para actualizar' );
          var id_per=data["id_per"];
          ids.push(id_per);
          //LA FILA DE LA TABLA
          $.ajax({
            type: 'GET',
            //data:{"escuela":dato},
            data:{id_per},
            ContentType: "application/json; charset=utf-8",
            dataType:'json',
            url:'http://localhost:3000/estudiante/extraerDatos',
            //La respuesta del servidor
            success: function(resp){ 
              //console.log("Mensaje: "+resp.msg);
              //console.log(resp.response[0].fecha_egreso);
              
              $('#nombre').val(resp.response[0].nombre)
              $('#ap_pat').val(resp.response[0].ap_paterno);
              $('#ap_mat').val(resp.response[0].ap_materno);
              $('#sexo').val(resp.response[0].sexo);
              $('#status').val(resp.response[0].estatus);
              $('#curp').val(resp.response[0].curp);
              $('#fecha_n').val(resp.response[0].fecha_nacimiento);
              $('#civil').val(resp.response[0].id_civ);
              /*console.log("Personales "+nombre+" "+apellido1+" "+
                          apellido2+" "+sexo+" "+
                          estatus+" "+curp+" "+estado_civil+" "+
                          fecha_nacimiento);
                          */
              //Datos de direccion
              $('#calle').val(resp.response[0].calle);
              $('#colonia').val(resp.response[0].colonia);
              $('#numero').val(resp.response[0].numero);
              $('#municipio').val(resp.response[0].municipio);
              $('#cp').val(resp.response[0].cp);
              $('#estado').val(resp.response[0].estado);
              $('#pais').val(resp.response[0].pais);
              /*console.log("Direccion "+calle+" "+colonia+" "+numero+" "+
                          municipio+" "+cp+" "+estado+" "+pais);
              */
              //Datos de contacto
              $('#correo').val(resp.response[0].email);
              $('#cel').val(resp.response[0].celular);
              $('#tel').val(resp.response[0].tel);
              //Datos academicos
              $('#promedio').val(resp.response[0].promedio);
              $('#escuela').val(resp.response[0].esc_procedencia);
              var fecha_eg = "";
              for(var i=0;i<10;i++){
                  fecha_eg+=resp.response[0].fecha_egreso[i];
              }
              console.log(fecha_eg);
              $('#fecha_eg').val(fecha_eg);
              //Datos medicos
              $('#t_sangre').val(resp.response[0].tipo_sangre);
              $('#nss').val(resp.response[0].nss);
              $('#alergia').val(resp.response[0].alergias);
              
              var id_tut= resp.response[0].id_tut;
              if(id_per == id_tut){
                alert("Es la misma persona");
                $("#yo").prop("checked",true);
              }else{
                alert("Tiene un tutor externo");
                $("#yo").prop("checked",false);
                $.ajax({
                  type: 'GET',
                  //data:{"escuela":dato},
                  data:{id_tut},
                  ContentType: "application/json; charset=utf-8",
                  dataType:'json',
                  url:'http://localhost:3000/estudiante/datosTutor',
                  //La respuesta del servidor
                  success: function(resp){ 
                    //Datos de direccion
                    $('#calle2').val(resp.response[0].calle);
                    $('#colonia2').val(resp.response[0].colonia);
                    $('#numero2').val(resp.response[0].numero);
                    $('#municipio2').val(resp.response[0].municipio);
                    $('#cp2').val(resp.response[0].cp);
                    $('#estado2').val(resp.response[0].estado);
                    $('#pais2').val(resp.response[0].pais);
                    //Datos de contacto
                    $('#correo2').val(resp.response[0].email);
                    $('#cel2').val(resp.response[0].celular);
                    $('#tel2').val(resp.response[0].tel);
                    //Datos personales
                    $('#nombre2').val(resp.response[0].nombre);
                    $('#ap_pat2').val(resp.response[0].ap_paterno);
                    $('#ap_mat2').val(resp.response[0].ap_materno);
                    $('#sexo2').val(resp.response[0].sexo);
                  },
                  error: function(error){
                      console.log(error);
                      //alert(err);
                  }
                })
              }
            },
            error: function(error){
                console.log(error);
                //alert(err);
            }
          })
        });
      },
      error: function(error){
          console.log(error);
          //alert(err);
      }
    });
}



//Actualizar datos
$(function(){
  $('#actualizar').click(function(){
    
    var nombre = $('#nombre').val();
    var apellido1 = $('#ap_pat').val();
    var apellido2 = $('#ap_mat').val();
    var sexo = $('#sexo').val();
    var estatus = $('#status').val();
    var curp = $('#curp').val();
    var fecha_nacimiento = $('#fecha_n').val();
    var id_civ = $('#civil').val();
    //Datos de direccion
    var calle = $('#calle').val();
    var colonia = $('#colonia').val();
    var numero = $('#numero').val();
    var municipio = $('#municipio').val();
    var cp = $('#cp').val();
    var estado = $('#estado').val();
    var pais = $('#pais').val();
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
    //updateDir
    if(ids.length == 0){
      alert("No ha seleccionado");
    }else{
      var id_per = ids.pop();
      $.ajax({
        type: 'put',
        //data:{"escuela":dato},
        data:{calle,colonia,numero,municipio,cp,estado,pais,id_per},
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType:'json',
        url:'http://localhost:3000/estudiante/updateDir',
        //La respuesta del servidor
        success: function(resp){
              console.log("Direccion actualizada "+resp.response.affectedRows);
              //location.reload();
              
        },
        error: function(error){
            console.log(error);
            //alert(err);
        }
      });
      
      //updateCon
      $.ajax({
        type: 'put',
        //data:{"escuela":dato},
        data:{email,celular,tel,id_per},
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType:'json',
        url:'http://localhost:3000/estudiante/updateCon',
        //La respuesta del servidor
        success: function(resp){
              console.log("Contactos actualizados "+resp.response.affectedRows);
              //location.reload();
              
        },
        error: function(error){
            console.log(error);
            //alert(err);
        }
      });
      //updatePer
      $.ajax({
        type: 'put',
        //data:{"escuela":dato},
        data:{nombre,apellido1,apellido2,sexo,id_per},
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType:'json',
        url:'http://localhost:3000/estudiante/updatePer',
        //La respuesta del servidor
        success: function(resp){
            console.log("Persona actualizada "+resp.response.affectedRows);
              
        },
        error: function(error){
            console.log(error);
            //alert(err);
        }
      });
      //updateAca
      $.ajax({
        type: 'put',
        //data:{"escuela":dato},
        data:{promedio,esc_procedencia,egreso,id_per},
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType:'json',
        url:'http://localhost:3000/estudiante/updateAca',
        //La respuesta del servidor
        success: function(resp){
            console.log("Academicos actualizada "+resp.response.affectedRows);
              
        },
        error: function(error){
            console.log(error);
            //alert(err);
        }
      });
      //updateMed
      $.ajax({
        type: 'put',
        //data:{"escuela":dato},
        data:{sangre,nss,alergias,id_per},
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType:'json',
        url:'http://localhost:3000/estudiante/updateMed',
        //La respuesta del servidor
        success: function(resp){
            console.log("Medicos actualizada "+resp.response.affectedRows);
              
        },
        error: function(error){
            console.log(error);
            //alert(err);
        }
      });
      //updateEst
      $.ajax({
        type: 'put',
        //data:{"escuela":dato},
        data:{estatus,curp,fecha_nacimiento,id_civ,id_per},
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType:'json',
        url:'http://localhost:3000/estudiante/updateEst',
        //La respuesta del servidor
        success: function(resp){
            console.log("Estudiante actualizada "+resp.response.affectedRows);
              
        },
        error: function(error){
            console.log(error);
            //alert(err);
        }
      });
      
      if(checkTutor){
        console.log("Tutor actualizado");
      }else{
        console.log("Tutor actualizado otra persona");
        $.ajax({
          type: 'get',
          //data:{"escuela":dato},
          data:{id_per},
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          contentType: 'application/x-www-form-urlencoded; charset=utf-8',
          dataType:'json',
          url:'http://localhost:3000/estudiante/extraerDatos',
          //La respuesta del servidor
          success: function(resp){
              var id_tut= resp.response[0].id_tut;
              //updateDir
              $.ajax({
                type: 'put',
                //data:{"escuela":dato},
                data:{"calle":calle2,"colonia":colonia2,"numero":numero2,"municipio":municipio2,"cp":cp2,"estado":estado2,
                "pais":pais2,"id_per":id_tut},
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                dataType:'json',
                url:'http://localhost:3000/estudiante/updateDir',
                //La respuesta del servidor
                success: function(resp){
                      console.log("Direccion actualizada "+resp.response.affectedRows);
                      //location.reload();
                      
                },
                error: function(error){
                    console.log(error);
                    //alert(err);
                }
              });
              
              //updateCon
              $.ajax({
                type: 'put',
                //data:{"escuela":dato},
                data:{"email":email2,"celular":celular2,"tel":tel2,"id_per":id_tut},
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                dataType:'json',
                url:'http://localhost:3000/estudiante/updateCon',
                //La respuesta del servidor
                success: function(resp){
                      console.log("Contactos actualizados "+resp.response.affectedRows);
                      //location.reload();
                      
                },
                error: function(error){
                    console.log(error);
                    //alert(err);
                }
              });
              //updatePer
              $.ajax({
                type: 'put',
                //data:{"escuela":dato},
                data:{"nombre":nombre2,"apellido1":apellido12,"apellido2":apellido22,"sexo":sexo2,"id_per":id_tut},
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                dataType:'json',
                url:'http://localhost:3000/estudiante/updatePer',
                //La respuesta del servidor
                success: function(resp){
                    console.log("Persona actualizada "+resp.response.affectedRows);
                    alert("Actualizada con exito!");
                    location.reload(); 
                },
                error: function(error){
                    console.log(error);
                    //alert(err);
                }
              });
          },
          error: function(error){
              console.log(error);
              //alert(err);
          }
        });
      }
    }
  }); 
});
