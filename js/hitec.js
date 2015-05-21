/**
 * Created by Gabriel Hdez on 5/20/2015.
 */
Parse.initialize("4J8YjMmfjGfPpSJfbWhVVkdROiI7Dvjrzh6dYuCs", "pPVE48ASc2fJO9GlPBJo27NOADR2vaxwUqFv8Lq1");
function numAlumno()
{

    var Testobject = Parse.Object.extend("Alumni");

    for (i = 1; i < 257; i++) {
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
function asignTeam()
{
    var TestObject = Parse.Object.extend("Alumni");
    var query = new Parse.Query(TestObject);
    for(i = 1; i < 257; i++) {
        query.EqualTo("numero", i);
        query.find({
            success: function (results) {

                //alert("Successfully retrieved " + results.length + " tipos.");
                // Do something with the returned Parse.Object values
                for (var j = 0; j < results.length; j++) {
                    var object = results[j];
                    var num=i%16;
                    switch (num)
                    {
                        case 0:break;
                        case 1:break;
                        case 2:break;
                        case 3:break;
                        case 4:break;
                        case 5:break;
                        case 6:break;
                        case 7:break;
                        case 8:break;
                        case 9:break;
                        case 10:break;
                        case 11:break;
                        case 12:break;
                        case 13:break;
                        case 14:break;
                        case 15:break;

                    }
                }
                alert("El numero de personas es: "+personas+"\nEl pedido de la mesa1 es:\n" + pedido + "\nSu cuenta es: " + cuenta + " pesos");
            },
            error: function (error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    }

}