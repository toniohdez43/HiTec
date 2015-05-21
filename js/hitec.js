/**
 * Created by Gabriel Hdez on 5/20/2015.
 */
function numAlumno()
{
    Parse.initialize("4J8YjMmfjGfPpSJfbWhVVkdROiI7Dvjrzh6dYuCs", "pPVE48ASc2fJO9GlPBJo27NOADR2vaxwUqFv8Lq1");
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