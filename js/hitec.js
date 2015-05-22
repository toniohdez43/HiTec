/**
 * Created by Gabriel Hdez on 5/20/2015.
 */
Parse.initialize("4J8YjMmfjGfPpSJfbWhVVkdROiI7Dvjrzh6dYuCs", "pPVE48ASc2fJO9GlPBJo27NOADR2vaxwUqFv8Lq1");
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