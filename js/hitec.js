/**
 * Created by Gabriel Hdez on 5/20/2015.
 */
Parse.initialize("4J8YjMmfjGfPpSJfbWhVVkdROiI7Dvjrzh6dYuCs", "pPVE48ASc2fJO9GlPBJo27NOADR2vaxwUqFv8Lq1");
var repetido = 0;
function valRep()
{
    return repetido=1;
}
function numAlumno()
{

    var Testobject = Parse.Object.extend("Alumni");

    for (i = 1; i < 10; i++) {
        var TestObject = new Testobject();
        TestObject.set("numero", i);

        TestObject.save(null, {
            success: function (TestObject) {
                // Execute any logic that should take place after the object is saved.
                // alert('New object created with objectId: ' + TestObject.id);
            },
            error: function (TestObject, error) {
                // Execute any logic that should take place if the save fails.
                // error is a Parse.Error with an error code and message.
                alert('Failed to create new object, with error code: ' + error.message);
            }
        });
    }
}


function numAlumnoAsistentes()
{
    var TestObject = Parse.Object.extend("AlumnosAsistentes");
    
    for (i=1; i<=32; i++)
        {
            var objeto = new TestObject();
            objeto.set("numero",i);
            
            objeto.save(null,{
                succes: function(){
                    
                },
                error: function () {
                    alert('No se pudo crear el nuevo objeto en AlumnosAsistentes' + error.message);
                }
            });
        }
}
function buscarMatricula ()
{

    var mat;

    Polymer('note-list', {
        getNombre: function ()
        {
            mat = this.val1;
            this.val1="";

            var _alumno = {
                "MATRICULA": mat


            };
            localStorage.setItem('_ALUMNO', JSON.stringify({
                "MATRICULA": mat

            }));
            //alert(mat);
            var TestObject = Parse.Object.extend("Alumni");
            var query = new Parse.Query(TestObject);
            query.equalTo("matricula", mat);
            //alert(mat);
            query.find({
                success: function (results) {
                    for (var j = 0; j < results.length; j++) {
                        var object1 = results[j];
                        //alert("Successfully retrieved " + results.length + " tipos.");
                        // Do something with the returned Parse.Object values

                        //despliegue de datos
                        var tablatodo = [];
                        tablatodo[0] = "Matricula: " + object1.get("matricula");
                        tablatodo[1] = "Alumno: " + object1.get("nombre") + " " + object1.get("paterno")+ " " + object1.get("materno");
                        tablatodo[2] = "Carrera: " + object1.get("carrera");
                        tablatodo[3] = "Correo: " + object1.get("correo");
                        tablatodo[4] = "Equipo: " + object1.get("equipo");
                        
                        object1.set("asistio", true);
                        object1.save(null,{
                            succes: function(){

                            },
                            error: function () {
                                alert('No se pudo crear el nuevo objeto en AlumnosAsistentes' + error.message);
                            }
                        });

                        var x = document.createElement("TABLE");
                        x.setAttribute("id", "myTable");
                        document.getElementById("MainContainer").appendChild(x);
                        document.getElementById("myTable").innerHTML = "";
                        var a = document.createElement("TD");
                        for(i=0;i<tablatodo.length;i++)
                            {
                                var t = document.createTextNode(tablatodo[i]);
                                a.appendChild(t);
                                a.appendChild(document.createElement("br"));
                            }
                        document.getElementById("myTable").appendChild(a);
                        //contadortabla();

                        //creacion del boton
                        
                        var z = document.createElement("div");
                        z.setAttribute("id","buttonContainer");
                        document.getElementById("MainContainer").appendChild(z);
                        document.getElementById("buttonContainer").innerHTML = "";
                        var l = document.createElement("paper-button");
                        l.id="my-button2";
                        l.setAttribute("label","Enviar");
                        l.setAttribute("raisedbutton","");
                        l.style.marginTop = "180px";
                        document.getElementById("buttonContainer").appendChild(l);
                        l.addEventListener('click', function(){

                            var Contador = Parse.Object.extend("Alumni");
                            //var Counter = new Contador();
                            var query = new Parse.Query(Contador);

                            query.equalTo("asistio", true);//le ponemos asistencia al alumno
                            query.count({
                                //cuenta los alumnos que han asistido
                                success: function(count) {
                                    // The count request succeeded. Show the count
                                    alert("Asistieron " + count + " alumnos");
                                    var Test2 = Parse.Object.extend("AlumnosAsistentes");
                                    var query2 = new Parse.Query(Test2);
                                    var test2 = new Test2();
                                    
                                    //Hacemos un query que busque el numero que sea igual a la cuenta. 
                                    //De esta manera podemos insertar los datos del alumno en el espacio libre siguiente
                                    query2.equalTo("matricula", mat);
                                    query2.find({
                                        success: function(results) {
                                       
                                        for (var i = 0; i < results.length; ++i) {
                                        valRep();
                                        alert("Entramos "+repetido);
                                        
                                        }
      
                                        },
                                        error: function() {
                                        response.error("movie lookup failed");
                                        }
                                    });
                                    alert(repetido);
                                    if(repetido==1)
                                    { 
                                        alert("Alumno previamente ingresado. Favor de proporcionar matricula valida " + repetido);
                                        l.parentNode.removeChild(l);
                                        x.parentNode.removeChild(x);
                                        
                                        $("#input").val('');
                                    }
                                    
                                    if(repetido!=1){
                                    alert("se armo puto");
                                    var Test3 = Parse.Object.extend("AlumnosAsistentes");
                                    var query3 = new Parse.Query(Test3);
                                    query3.equalTo("numero", count);
                                    query3.find({
                                        success: function(results)
                                        {
                                            for (var i = 0; i < results.length; i++) {
                                                var object = results[i];
                                                alert(object.get("numero")+" "+object1.get("nombre"));
                                                object.set("nombre",object1.get("nombre"));
                                                object.set("paterno",object1.get("paterno"));
                                                object.set("materno",object1.get("materno"));
                                                object.set("correo",object1.get("correo"));
                                                object.set("carrera",object1.get("carrera"));
                                                object.set("matricula",object1.get("matricula"));
                                                object.set("asistio",object1.get("asistio"));
                                                object.save(null, {
                                                    success: function (test2) {
                                                        // Execute any logic that should take place after the object is saved.
                                                        // alert('New object created with objectId: ' + TestObject.id);
                                                        alert("alumno guardado exitosamente");
                                                        alert("Su equipo es : "+object.get("equipo"));

                                                        l.parentNode.removeChild(l);
                                                        x.parentNode.removeChild(x);
                                                       
                                                        $("#input").val('');

                                                    },
                                                    error: function (test2, error) {
                                                        // Execute any logic that should take place if the save fails.
                                                        // error is a Parse.Error with an error code and message.
                                                        alert('Failed to create new object, with error code: ' + error.message);
                                                    }
                                                });
                                            }

                                        },

                                        error: function (error) {
                                            alert("ingrese una matricula valida " + error.code + " " + " " + error.message);
                                        }


                                    });}
                                    repetido=0;

                                },
                                error: function(error) {
                                    // The request failed
                                }
                            });

                        },false);

                    }
                },

                error: function (error) {
                    alert("ingrese una matricula valida " + error.code + " " + " " + error.message);
                }
            });

            //else console.log("ingrese una matricula valida ");
            //alert(mesa + " " + clave + " ");
            /* Parse.User.logIn(mesa, clave, {
             success: function (user) {


             },
             error: function (user, error) {

             alert("Introduzca una contraseña correcta");
             }
             });*/
            /*
             var Testobject = Parse.Object.extend("correos");
             var TestObject = new Testobject();
             TestObject.set("Nombre", cliente+"");
             TestObject.set("email", correo+"");
             TestObject.save(null, {
             success: function (TestObject) {
             // Execute any logic that should take place after the object is saved.
             // alert('New object created with objectId: ' + TestObject.id);
             },
             error: function (TestObject, error) {
             // Execute any logic that should take place if the save fails.
             // error is a Parse.Error with an error code and message.
             alert('Failed to create new object, with error code: ' + error.message);
             }
             });*/

        }

    });
}
/*
function contadortabla(){


    var Contador = Parse.Object.extend("Alumni");
    //var Counter = new Contador();
    var query = new Parse.Query(Contador);

    query.equalTo("asistio", true);
    query.count({
        success: function(count) {
            // The count request succeeded. Show the count
            alert("Asistieron " + count + " alumnos");
            var Test2 = Parse.Object.extend("AlumnosAsistentes");
            var query2 = new Parse.Query(Test2);
            var test2 = new Test2();
            query2.equalTo("numero", count);
            query2.find({
                success: function()
                {
                    for (var j = 0; j < results.length; j++) {
                        var object = results[j];
                    }

                },

                error: function (error) {
                alert("ingrese una matricula valida " + error.code + " " + " " + error.message);
            }


            });
            test2.set("nombre",object1.get("nombre"));
            test2.save(null, {
                success: function (test2) {
                    // Execute any logic that should take place after the object is saved.
                    // alert('New object created with objectId: ' + TestObject.id);
                    alert("alumno guardado exitosamente");
                    l.parentNode.removeChild(l);
                    x.parentNode.removeChild(x);
                    $("#input").val('');

                },
                error: function (test2, error) {
                    // Execute any logic that should take place if the save fails.
                    // error is a Parse.Error with an error code and message.
                    alert('Failed to create new object, with error code: ' + error.message);
                }
            });
        },
        error: function(error) {
            // The request failed
        }
    });


}*/
function assignTeam()
{
    var TestObject = Parse.Object.extend("AlumnosAsistentes");
    var query = new Parse.Query(TestObject);
    var numSuccesses = 0;
    for(i = 1; i < 33; i++) {
        query.equalTo("numero", i);
        query.find({
            success: function (results) {
                numSuccesses++;

                //alert("Successfully retrieved " + results.length + " tipos.");
                // Do something with the returned Parse.Object values
                //Guardar nombres de equipo. 1-4:CIT, 5-8:INGE, 9-12:PIT2, 13-16:PIT3
                var nombreEquipo;
                for (var j = 0; j < results.length; j++) {

                    var object = results[j];
                    var num=(object.get('numero')%16);
                    switch (num)
                    {
                        case 0: nombreEquipo = "PIT3-AMARILLO"; break;
                        case 1: nombreEquipo = "CIT-AZUL"; break;
                        case 2: nombreEquipo = "CIT-VERDE"; break;
                        case 3: nombreEquipo = "CIT-ROJO"; break;
                        case 4: nombreEquipo = "CIT-AMARILLO"; break;
                        case 5: nombreEquipo = "INGE-AZUL"; break;
                        case 6: nombreEquipo = "INGE-VERDE"; break;
                        case 7: nombreEquipo = "INGE-ROJO"; break;
                        case 8: nombreEquipo = "INGE-AMARILLO"; break;
                        case 9: nombreEquipo = "PIT2-AZUL"; break;
                        case 10: nombreEquipo = "PIT2-VERDE"; break;
                        case 11: nombreEquipo = "PIT2-ROJO"; break;
                        case 12: nombreEquipo = "PIT2-AMARILLO"; break;
                        case 13: nombreEquipo = "PIT3-AZUL"; break;
                        case 14: nombreEquipo = "PIT3-VERDE"; break;
                        case 15: nombreEquipo = "PIT3-ROJO"; break;

                    }
                    object.set("equipo",nombreEquipo);
                    object.save(null,
                                {
                        succes:function(){
                            
                        },
                        error: function(){
                            alert("Error al guardar el nombre de equipo" + error.message);
                        }
                    });
                }
                
                
            },
            error: function (error) {
                alert("No se encontro objeto. Error: " + error.code + " " + error.message);
            }
        });
    }

}