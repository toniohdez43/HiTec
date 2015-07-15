/**
 * Created by Gabriel Hdez on 5/20/2015.
 */
Parse.initialize("4J8YjMmfjGfPpSJfbWhVVkdROiI7Dvjrzh6dYuCs", "pPVE48ASc2fJO9GlPBJo27NOADR2vaxwUqFv8Lq1");
var repetido = 0;
var objectAlumni;
var resultsContainer;
var removedChild;
var infoDiv;
infoDiv = document.createElement("div");
var resultsContainer;
resultsContainer = document.createElement("div");

function valRep()
{
    return repetido=1;
}

function main ()
{
    var mat;

    Polymer('note-list', {
        getNombre: function buscarMatricula()
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
            var queryAlumni = new Parse.Query(TestObject);
            queryAlumni.equalTo("matricula", mat);
            removedChild = document.getElementById("MainContainer").removeChild(document.getElementById("buttonDiv"));
            document.getElementById("matri").style.opacity = "0";
            //alert(mat);
            //si no hay resultados vaciar el area
            queryAlumni.count({
                success: function(number){
                    if(number==0){
                        limpiar();
                        removedChild = document.getElementById("MainContainer").removeChild(document.getElementById("buttonDiv"));
                        document.getElementById("matri").style.opacity = "0";
                        infoDiv = document.createElement("div");
                        infoDiv.id = "infoDiv"
                        infoDiv.appendChild(document.createTextNode("No se encontro la matricula " + mat));
                        var btnCancel = document.createElement("paper-button");
                        btnCancel.id = "my-button4";
                        btnCancel.setAttribute("label","OK");
                        btnCancel.setAttribute("raisedbutton","");
                        btnCancel.addEventListener('click',function (){
                            limpiar();
                        });
                        infoDiv.appendChild(btnCancel);
                        resultsContainer.innerHTML = "";
                        document.getElementById("MainContainer").appendChild(infoDiv);
                    }
                    else{
                        
                    }
                },
                error: function(error){
                    alert("Error: " + error.message);
                }
            });
            queryAlumni.find({
                success: function (results) {
                    for (var j = 0; j < results.length; j++) {
                        objectAlumni = results[j];
                        //alert("Successfully retrieved " + results.length + " tipos.");
                        // Do something with the returned Parse.Object values
                        desplegarDatos();
                    }
                },

                error: function (error) {
                    alert("ingrese una matricula valida " + error.code + " " + " " + error.message);
                }
            });
        }
    });
}

//Metodo que se llama al encontrar un alumno en la base Alumni
function desplegarDatos(){
    
    //Obtener los datos del alumno buscado
    var tablatodo = [];
    tablatodo[0] = "Matricula: " + objectAlumni.get("matricula");
    tablatodo[1] = "Alumno: " + objectAlumni.get("nombre") + " " + objectAlumni.get("paterno")+ " " + objectAlumni.get("materno");
    tablatodo[2] = "Carrera: " + objectAlumni.get("carrera");
    tablatodo[3] = "Correo: " + objectAlumni.get("correo");
    tablatodo[4] = "Equipo: " + objectAlumni.get("equipo");
    if(objectAlumni.get("asistio")==true)
        tablatodo[5] = "La asistencia del alumno ya esta registrada";
    else
        tablatodo[5] = "El alumno no ha sido registrado como asistente";
    
    
    //Crear el div en donde ira la tabla con los detalles del alumno, asi como los botones para registrar al alumno o cancelar
    resultsContainer.style.display = "block";
    
    //Crear la tabla en donde estaran los detalles del alumno
    var table = document.createElement("TABLE");
    table.setAttribute("id", "myTable");
    table.style.fontSize = "20px";
    table.style.color = "black";
    resultsContainer.appendChild(table);
    document.getElementById("MainContainer").appendChild(resultsContainer);
    document.getElementById("myTable").innerHTML = "";
    var a = document.createElement("TD");
    for(i=0;i<tablatodo.length;i++)
        {
            var text = document.createTextNode(tablatodo[i]);
            a.appendChild(text);
            a.appendChild(document.createElement("br"));
        }
    document.getElementById("myTable").appendChild(a);
    
    
    //Crear los botones de Enviar y de cancelar, asi como el span que los contendra
    var buttonContainer = document.createElement("span");
    buttonContainer.innerHTML = "";
    buttonContainer.setAttribute("id","buttonContainer");
    resultsContainer.appendChild(buttonContainer);
    document.getElementById("buttonContainer").innerHTML = "";
    var btnEnviar = document.createElement("paper-button");
    var btnCancel = document.createElement("paper-button");
    btnCancel.id = "my-button3";
    btnCancel.setAttribute("label","Cancel");
    btnCancel.setAttribute("raisedbutton","");
    btnEnviar.id="my-button3";
    btnEnviar.setAttribute("label","Enviar");
    btnEnviar.setAttribute("raisedbutton","");
    if(objectAlumni.get("asistio")!=true){
        buttonContainer.appendChild(btnEnviar);
        buttonContainer.appendChild(btnCancel);
    }
    if(objectAlumni.get("asistio")==true){
        btnCancel.style.marginLeft = "33%";
        buttonContainer.appendChild(btnCancel);        
    }
    
    //Accion que ocurrira al presionar el boton cancel
    btnCancel.addEventListener('click', function(){
        limpiar();
        });
    
    //Accion que ocurrira al presionar el boton Enviar
    btnEnviar.addEventListener('click', function(){
        registrarAlumno();
    },false);
}

//Metodo que se llama al presionar el boton enviar, con el que se registrara la asistencia del alumno desplegado
function registrarAlumno(){
    var Contador = Parse.Object.extend("AlumnosAsistentes");
    //var Counter = new Contador();
    var queryAlumni = new Parse.Query(Contador);
    queryAlumni.equalTo("matricula",objectAlumni.get("matricula"));
    //queryAlumni.equalTo("asistio", true);//le ponemos asistencia al alumno
    queryAlumni.count({
        //cuenta los alumnos que han asistido
        //cuenta los alumnos con la matricula del alumno, si regresa un 1, ya esta registrado, no se debe volver a registrar
        success: function(number) {
            if(number>=1)
                alumnoRepetido();
            else{
                guardarAlumno();
            }
        },
        error: function(error) {
            alert("Error: " + error.message);
        }
    });
    
}

//Metodo que se ejecutara cuando el alumno que se intenta registrar ya haya sido registrado previamente
function alumnoRepetido(){
    limpiar();
    var nombre = objectAlumni.get("nombre");
    nombre += " " + objectAlumni.get("paterno");
    alert("El alumno " + nombre + " ya esta registrado.\nSu equipo es " + objectAlumni.get("equipo"));
}

//Metodo que se ejecutara cuando se alumno que se intenta registrar no ha sido registrado previamente
function guardarAlumno(){
    //Saber cuantos alumnos estan registrados para saber en donde guardar el siguiente
    var Contador = Parse.Object.extend("Alumni");
    var queryAlumni = new Parse.Query(Contador);
    queryAlumni.equalTo("asistio",true);
    queryAlumni.count({
        success: function(number){
            save(number);
        },
        error: function(error){
        alert("Error: " + error.message);
    }
    });
}

//Guardar al alumno en el lugar que le corresponde
function save(local){
    var TestObjectAsistentes = Parse.Object.extend("AlumnosAsistentes");
    var queryAsistentes = new Parse.Query(TestObjectAsistentes);
    queryAsistentes.equalTo("numero", local+1);
    queryAsistentes.find({
        success: function(results){
            for (var i = 0; i < results.length; i++) {
                var objectAsistentes = results[i];
                
                //Guardar al alumno en AlumnosAsistentes
                objectAsistentes.set("nombre",objectAlumni.get("nombre"));
                objectAsistentes.set("paterno",objectAlumni.get("paterno"));
                objectAsistentes.set("materno",objectAlumni.get("materno"));
                objectAsistentes.set("correo",objectAlumni.get("correo"));
                objectAsistentes.set("carrera",objectAlumni.get("carrera"));
                objectAsistentes.set("matricula",objectAlumni.get("matricula"));
                objectAsistentes.set("asistio",true);
                objectAsistentes.save(null, {
                    success: function (objectAsistentes) {
                        
                        document.getElementById("matri").style.opacity = "0";
                        infoDiv = document.createElement("div");
                        infoDiv.id = "infoDiv"
                        infoDiv.appendChild(document.createTextNode("Alumno guardado exitosamente"));
                        infoDiv.appendChild(document.createElement("br"));
                        var nombre = objectAlumni.get("nombre");
                        nombre += " " + objectAlumni.get("paterno");
                        infoDiv.appendChild(document.createTextNode(nombre));
                        infoDiv.appendChild(document.createElement("br"));
                        infoDiv.appendChild(document.createTextNode("Equipo: " + objectAsistentes.get("equipo")));
                        var btnCancel = document.createElement("paper-button");
                        btnCancel.id = "my-button4";
                        btnCancel.setAttribute("label","OK");
                        btnCancel.setAttribute("raisedbutton","");
                        btnCancel.addEventListener('click',function (){
                            limpiar();
                        });
                        infoDiv.appendChild(btnCancel);
                        resultsContainer.innerHTML = "";
                        document.getElementById("MainContainer").appendChild(infoDiv);

                        //Poner al alumno como asistente en la tabla Alumni, asi como guardar el equipo que le corresponde
                        objectAlumni.set("asistio",true);
                        objectAlumni.set("equipo", objectAsistentes.get("equipo"));
                        objectAlumni.save(null, {
                            success:function(){
                                
                            },
                            error:function(error){
                                alert("Error: " + error.message);
                            }
                        });
                    },
                    error: function (error) {
                        alert('Failed to create new object, with error code: ' + error.message);
                    }
                });
            }
        },
        error: function (error) {
            alert("ingrese una matricula valida " + error.code + " " + " " + error.message);
        }
    });
}

function limpiar(){
    resultsContainer.innerHTML = "";
    infoDiv.innerHTML="";
    document.getElementById("matri").style.opacity = "1";
    document.getElementById("MainContainer").appendChild(removedChild);
    //alert("entro");
}


//METODOS COMENTADOS QUE PUEDEN SERVIR EN EL FUTURO
//Metodo contadortabla()
/*
function contadortabla(){


    var Contador = Parse.Object.extend("Alumni");
    //var Counter = new Contador();
    var queryAlumni = new Parse.Query(Contador);

    queryAlumni.equalTo("asistio", true);
    queryAlumni.count({
        success: function(count) {
            // The count request succeeded. Show the count
            alert("Asistieron " + count + " alumnos");
            var TestObjectAsistentes = Parse.Object.extend("AlumnosAsistentes");
            var queryAsistentes = new Parse.Query(TestObjectAsistentes);
            var objectAlumnosAsistentes = new TestObjectAsistentes();
            queryAsistentes.equalTo("numero", count);
            queryAsistentes.find({
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
            objectAlumnosAsistentes.set("nombre",objectAlumni.get("nombre"));
            objectAlumnosAsistentes.save(null, {
                success: function (objectAlumnosAsistentes) {
                    // Execute any logic that should take place after the object is saved.
                    // alert('New object created with objectId: ' + TestObject.id);
                    alert("alumno guardado exitosamente");
                    btnEnviar.parentNode.removeChild(btnEnviar);
                    table.parentNode.removeChild(table);
                    $("#input").val('');

                },
                error: function (objectAlumnosAsistentes, error) {
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

//Metodo assignTeam, para asignar los equipos a la tabla AlumnosAsistentes
/*
function assignTeam()
{
    var TestObject = Parse.Object.extend("AlumnosAsistentes");
    var queryAsistentes = new Parse.Query(TestObject);
    var numSuccesses = 0;
    for(i = 1; i < 33; i++) {
        queryAsistentes.equalTo("numero", i);
        queryAsistentes.find({
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
*/

//Metodo llenarAlumni: llena la tabla Alumni con el numero de alumnos que se le indiquen

function llenarAlumni(numero)
{

    var TestObject = Parse.Object.extend("Alumni");

    for (i = 1; i <= numero; i++) {
        var object = new TestObject();
        object.set("numero", i);
        object.set("asistio",false);
        object.set("matricula",i.toString());
        object.set("paterno","Apellido Persona " + i.toString());
        object.set("materno", "Apellido materno");
        object.set("nombre", "Persona "+ i.toString());
        object.set("carrera","ITIC");
        object.set("correo","correo@correo.com")
        object.set("equipo","");

        object.save(null, {
            success: function (object) {
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


//Metodo llenarAlumnosAsistentes: llena la tabla AlumnosAsistentes con el numero de alumnos que se le indiquen
/*
function llenarAlumnosAsistentes(numero)
{
    var TestObject = Parse.Object.extend("AlumnosAsistentes");
    
    for (i=1; i<=numero; i++)
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
*/