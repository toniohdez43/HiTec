/**
 * Created by Gabriel Hdez on 4/24/2015.
 */
Parse.initialize("UEIPVPotYJx4XaTt2ManKgQJPnCFkG7rRwuSzptb", "joqQkUeMMd2OjnDlrgUbFq8yLWBHkkkJut44SsGI");
function f1() {

    /*var numBeb= document.getElementById("ui-id-1");
     numBeb.addEventListener('click',function(event){alert("que pedo");
     },false);
     /*var noDrink=numBeb.getElementsByTagName("selected")
     alert(noDrink);*/
// $("option[selected='selected']").empty();
//$("select[name='noDrinks']option[selected='selected']").empty();

    /*function select() {
     $numBeb = $("#noDrinks").find("[selected='selected']").html()
     alert($numBeb);*/
    /* $numBeb = $("#noDrinks-button").find("[class='.ui-selectmenu-text']").innerText;
     alert($numBeb);*/
    var _mesacliente = JSON.parse(localStorage.getItem('_MESACLIENTE'));
    $("#noDrinks").selectmenu({
        select: function (event, ui) {
            $("#sodaContain").empty();
            var l = document.createElement("LABEL");
            l.setAttribute("for", "sodaContain");
            t = document.createTextNode("Favor de seleccionar sus bebidas:");
            l.appendChild(t);
            document.getElementById("sodaContain").appendChild(l);

            $numBeb = $("#noDrinks-button").find("[class='ui-selectmenu-text']").html();
            for (i = 0; i < $numBeb; i++) {
                var y = document.createElement('div');
                y.id = 'soda' + i;
                document.getElementById("sodaContain").appendChild(y);
                var x = document.createElement("SELECT");
                //x.setAttribute("id", "mySelect");
                x.setAttribute("name", "drinks");

                x.className = "drinks";
                document.getElementById("soda" + i).appendChild(x);

                var z = document.createElement("option");
                var soda1 = document.createElement('option');
                var soda2 = document.createElement('option');
                var soda3 = document.createElement('option');
                var soda4 = document.createElement('option');
                var soda5 = document.createElement('option');
                // z.setAttribute("value", "volvocar");
                var t1 = document.createTextNode("Ninguna");
                var t2 = document.createTextNode("Manzanita");
                var t3 = document.createTextNode("Coca Cola");
                var t4 = document.createTextNode("Sprite");
                var t5 = document.createTextNode("Fanta");
                soda1.appendChild(t1);
                soda2.appendChild(t2);
                soda3.appendChild(t3);
                soda4.appendChild(t4);
                soda5.appendChild(t5);
                x.appendChild(soda1);
                x.appendChild(soda2);
                x.appendChild(soda3);
                x.appendChild(soda4);
                x.appendChild(soda5);
                $(".drinks").selectmenu();
            }


        }
    });
    $("#noPizzas").selectmenu({
        select: function (event, ui) {
            $("#pizzaContain").empty();
            var l = document.createElement("LABEL");
            l.setAttribute("for", "pizzaContain");
            t = document.createTextNode("Favor de seleccionar sus pizzas:");
            l.appendChild(t);
            document.getElementById("pizzaContain").appendChild(l);

            $numBeb = $("#noPizzas-button").find("[class='ui-selectmenu-text']").html();
            for (i = 0; i < $numBeb; i++) {
                var y = document.createElement('div');
                y.id = 'pizza' + i;
                document.getElementById("pizzaContain").appendChild(y);
                var x = document.createElement("SELECT");
                //x.setAttribute("id", "mySelect");
                x.setAttribute("name", "pizzas");

                x.className = "pizzas";
                document.getElementById("pizza" + i).appendChild(x);

                var z = document.createElement("option");
                var pizza1 = document.createElement('option');
                var pizza2 = document.createElement('option');
                var pizza3 = document.createElement('option');
                var pizza4 = document.createElement('option');
                var pizza5 = document.createElement('option');
                var pizza6 = document.createElement('option');
                var pizza7 = document.createElement('option');
                var pizza8 = document.createElement('option');
                var pizza9 = document.createElement('option');
                var pizza10 = document.createElement('option');
                var pizza11 = document.createElement('option');
                var pizza12 = document.createElement('option');

                // x.setAttribute("value", "pizza"+i);
                var t1 = document.createTextNode("Ninguna");
                var t2 = document.createTextNode("Tradicional: Pepperoni, Jamon, y Salami");
                var t3 = document.createTextNode("Tradicional: Pepperoni y Jamon");
                var t4 = document.createTextNode("Tradicional: Pepperoni y Salami");
                var t5 = document.createTextNode("Tradicional: Jamon, y Salami");
                var t6 = document.createTextNode("Especialidad:Especial");
                var t7 = document.createTextNode("Especialidad:Hawaiana");
                var t8 = document.createTextNode("Especialidad:Dogo");
                var t9 = document.createTextNode("Especialidad:Mexicana");
                var t10 = document.createTextNode("Tradicional: Pepperoni ");
                var t11 = document.createTextNode("Tradicional: Salami");
                var t12 = document.createTextNode("Tradicional: Jamon");

                pizza1.appendChild(t1);
                pizza2.appendChild(t2);
                pizza3.appendChild(t3);
                pizza4.appendChild(t4);
                pizza5.appendChild(t5);
                pizza10.appendChild(t10);
                pizza11.appendChild(t11);
                pizza12.appendChild(t12);
                pizza6.appendChild(t6);
                pizza7.appendChild(t7);
                pizza8.appendChild(t8);
                pizza9.appendChild(t9);

                x.appendChild(pizza1);
                x.appendChild(pizza2);
                x.appendChild(pizza3);
                x.appendChild(pizza4);
                x.appendChild(pizza5);
                x.appendChild(pizza6);
                x.appendChild(pizza7);
                x.appendChild(pizza8);
                x.appendChild(pizza9);
                x.appendChild(pizza10);
                x.appendChild(pizza11);
                x.appendChild(pizza12);
                $(".pizzas").selectmenu();
            }


        }
    });
    var btn = document.getElementById("checkcheck");
    var precioTotal = 0;
    var costoSoda = 0;
    var costoPizza = 0;
    var costoPizzas=0;
    var Testobject = Parse.Object.extend(_mesacliente.MESA);

//en este event listener escribiremos en la base de datos
    btn.addEventListener('click', function () {
        $numPer = $("#noPersonas-button").find("[class='ui-selectmenu-text']").html();
        //alert("Numero de personas en la mesa: " + $numPer);
        $numBeb = $("#noDrinks-button").find("[class='ui-selectmenu-text']").html();
        for (i = 0; i < $numBeb; i++) {
            $soda = $("#soda" + i).find("[class='ui-selectmenu-text']").html();
            var TestObject = new Testobject();
            TestObject.set("Info", $soda);
            TestObject.set("Tipo", "Bebida");
            TestObject.set("Precio", 20.00);
            TestObject.set("Personas",$numPer);
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

            costoSoda += 20;
            //alert("De tomar ordeno: "+$soda+" costo "+costoSoda);
        }
        $numCom = $("#noPizzas-button").find("[class='ui-selectmenu-text']").html();
        for (i = 0; i < $numCom; i++) {
            $pizza = $("#pizza" + i).find("[class='ui-selectmenu-text']").html();
            $piz = $pizza.slice(0, 12);
           // alert($piz);
            switch ($piz) {
                case "Especialidad":
                    costoPizza = 99.00;
                    costoPizzas+=99.00;
                    break;
                case "Tradicional:":
                    costoPizza = 69.00;
                    costoPizzas+=69.00;
                    break;
            }
            var TestObject = new Testobject();
            TestObject.set("Info", $pizza);
            TestObject.set("Tipo", "Comida");
            TestObject.set("Precio", costoPizza);
            TestObject.set("Personas",$numPer);
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

            //alert("De comer ordeno: "+$pizza+" costo "+costoPizza);
        }
        precioTotal = costoSoda + costoPizzas;

        alert("El total de su orden es: $" + precioTotal);
        alert("redirigiendo al log in...");
        window.location.href = "login.html";
    }, false);

}
function f2(){
    var btn1 = document.getElementById("m1");
    btn1.addEventListener('click',function() {
        var pedido = "";
        var TestObject = Parse.Object.extend("mesa1");
        var cuenta = 0;
        var personas=0;
        var query = new Parse.Query(TestObject);
        query.notEqualTo("Tipo", " ");
        //query.equalTo("Tipo","Bebida");
        query.find({
            success: function (results) {

                //alert("Successfully retrieved " + results.length + " tipos.");
                // Do something with the returned Parse.Object values
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];

                    cuenta += object.get('Precio');
                    pedido += object.get('Info') + ", \n";
                    personas= object.get('Personas')+"\n";

                }
                alert("El numero de personas es: "+personas+"\nEl pedido de la mesa1 es:\n" + pedido + "\nSu cuenta es: " + cuenta + " pesos");
            },
            error: function (error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    },false);
    var btn2 = document.getElementById("m2");
    btn2.addEventListener('click',function() {
        var pedido = "";
        var TestObject = Parse.Object.extend("mesa2");
        var cuenta = 0;
        var personas=0;
        var query = new Parse.Query(TestObject);
        query.notEqualTo("Tipo", " ");
        //query.equalTo("Tipo","Bebida");
        query.find({
            success: function (results) {

                //alert("Successfully retrieved " + results.length + " tipos.");
                // Do something with the returned Parse.Object values
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];

                    cuenta += object.get('Precio');
                    pedido += object.get('Info') + ", \n";
                    personas= object.get('Personas')+"\n";

                }
                alert("El numero de personas es: "+personas+"\nEl pedido de la mesa2 es:\n" + pedido + "\nSu cuenta es: " + cuenta + " pesos");
            },
            error: function (error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    },false);

    var btn3 = document.getElementById("m3");
    btn3.addEventListener('click',function() {
        var pedido = "";
        var TestObject = Parse.Object.extend("mesa3");
        var cuenta = 0;
        var personas=0;
        var query = new Parse.Query(TestObject);
        query.notEqualTo("Tipo", " ");
        //query.equalTo("Tipo","Bebida");
        query.find({
            success: function (results) {

                //alert("Successfully retrieved " + results.length + " tipos.");
                // Do something with the returned Parse.Object values
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];

                    cuenta += object.get('Precio');
                    pedido += object.get('Info') + ", \n";
                    personas= object.get('Personas')+"\n";

                }
                alert("El numero de personas es: "+personas+"\nEl pedido de la mesa3 es:\n" + pedido + "\nSu cuenta es: " + cuenta + " pesos");
            },
            error: function (error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    },false);

    var btn4 = document.getElementById("m4");
    btn4.addEventListener('click',function() {
        var pedido = "";
        var TestObject = Parse.Object.extend("mesa4");
        var cuenta = 0;
        var personas=0;
        var query = new Parse.Query(TestObject);
        query.notEqualTo("Tipo", " ");
        //query.equalTo("Tipo","Bebida");
        query.find({
            success: function (results) {

                //alert("Successfully retrieved " + results.length + " tipos.");
                // Do something with the returned Parse.Object values
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];

                    cuenta += object.get('Precio');
                    pedido += object.get('Info') + ", \n";
                    personas= object.get('Personas')+"\n";

                }
                alert("El numero de personas es: "+personas+"\nEl pedido de la mesa4 es:\n" + pedido + "\nSu cuenta es: " + cuenta + " pesos");
            },
            error: function (error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    },false);

    var btn5 = document.getElementById("m5");
    btn5.addEventListener('click',function() {
        var pedido = "";
        var TestObject = Parse.Object.extend("mesa5");
        var cuenta = 0;
        var personas=0;
        var query = new Parse.Query(TestObject);
        query.notEqualTo("Tipo", " ");
        //query.equalTo("Tipo","Bebida");
        query.find({
            success: function (results) {

                //alert("Successfully retrieved " + results.length + " tipos.");
                // Do something with the returned Parse.Object values
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];

                    cuenta += object.get('Precio');
                    pedido += object.get('Info') + ", \n";
                    personas= object.get('Personas')+"\n";

                }
                alert("El numero de personas es: "+personas+"\nEl pedido de la mesa5 es:\n" + pedido + "\nSu cuenta es: " + cuenta + " pesos");
            },
            error: function (error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    },false);

    var btn6 = document.getElementById("m6");
    btn6.addEventListener('click',function() {
        var pedido = "";
        var TestObject = Parse.Object.extend("mesa6");
        var cuenta = 0;
        var personas=0;
        var query = new Parse.Query(TestObject);
        query.notEqualTo("Tipo", " ");
        //query.equalTo("Tipo","Bebida");
        query.find({
            success: function (results) {

                //alert("Successfully retrieved " + results.length + " tipos.");
                // Do something with the returned Parse.Object values
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];

                    cuenta += object.get('Precio');
                    pedido += object.get('Info') + ", \n";
                    personas= object.get('Personas')+"\n";

                }
                alert("El numero de personas es: "+personas+"\nEl pedido de la mesa6 es:\n" + pedido + "\nSu cuenta es: " + cuenta + " pesos");
            },
            error: function (error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    },false);

    var borrar1 = document.getElementById("v1");
    borrar1.addEventListener('click',function() {

        var TestObject = Parse.Object.extend("mesa1");


        var query = new Parse.Query(TestObject);
        query.notEqualTo("Tipo", " ");
        //query.equalTo("Tipo","Bebida");
        query.find({
            success: function (results) {

                //alert("Successfully retrieved " + results.length + " tipos.");
                // Do something with the returned Parse.Object values
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    object.destroy();


                }
                    alert("Se ha vaciado el pedido de la mesa.")
            },
            error: function (error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });


    },false);

    var borrar2 = document.getElementById("v2");
    borrar2.addEventListener('click',function() {

        var TestObject = Parse.Object.extend("mesa2");


        var query = new Parse.Query(TestObject);
        query.notEqualTo("Tipo", " ");
        //query.equalTo("Tipo","Bebida");
        query.find({
            success: function (results) {

                //alert("Successfully retrieved " + results.length + " tipos.");
                // Do something with the returned Parse.Object values
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    object.destroy();


                }
                alert("Se ha vaciado el pedido de la mesa.")
            },
            error: function (error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });


    },false);

    var borrar3 = document.getElementById("v3");
    borrar3.addEventListener('click',function() {

        var TestObject = Parse.Object.extend("mesa3");


        var query = new Parse.Query(TestObject);
        query.notEqualTo("Tipo", " ");
        //query.equalTo("Tipo","Bebida");
        query.find({
            success: function (results) {

                //alert("Successfully retrieved " + results.length + " tipos.");
                // Do something with the returned Parse.Object values
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    object.destroy();


                }
                alert("Se ha vaciado el pedido de la mesa.")
            },
            error: function (error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });


    },false);

    var borrar4 = document.getElementById("v4");
    borrar4.addEventListener('click',function() {

        var TestObject = Parse.Object.extend("mesa4");


        var query = new Parse.Query(TestObject);
        query.notEqualTo("Tipo", " ");
        //query.equalTo("Tipo","Bebida");
        query.find({
            success: function (results) {

                //alert("Successfully retrieved " + results.length + " tipos.");
                // Do something with the returned Parse.Object values
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    object.destroy();


                }
                alert("Se ha vaciado el pedido de la mesa.")
            },
            error: function (error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });


    },false);

    var borrar5 = document.getElementById("v5");
    borrar5.addEventListener('click',function() {

        var TestObject = Parse.Object.extend("mesa5");


        var query = new Parse.Query(TestObject);
        query.notEqualTo("Tipo", " ");
        //query.equalTo("Tipo","Bebida");
        query.find({
            success: function (results) {

                //alert("Successfully retrieved " + results.length + " tipos.");
                // Do something with the returned Parse.Object values
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    object.destroy();


                }
                alert("Se ha vaciado el pedido de la mesa.")
            },
            error: function (error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });


    },false);

    var borrar6 = document.getElementById("v6");
    borrar6.addEventListener('click',function() {

        var TestObject = Parse.Object.extend("mesa6");


        var query = new Parse.Query(TestObject);
        query.notEqualTo("Tipo", " ");
        //query.equalTo("Tipo","Bebida");
        query.find({
            success: function (results) {

                //alert("Successfully retrieved " + results.length + " tipos.");
                // Do something with the returned Parse.Object values
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    object.destroy();


                }
                alert("Se ha vaciado el pedido de la mesa.")
            },
            error: function (error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });


    },false);

}
