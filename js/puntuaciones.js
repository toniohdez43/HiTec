Parse.initialize("GND8xkckLAJGY4Lo0lFyWeLUBMJnSzW5u6i9NEiZ","fbVNV89U16Zgdkpv7iEatWwtLMGY1G7VvRNvVKWl");

var equipos = [
    "CITAMARILLO","CITMORADO","CITROJO","CITVERDE",
    "EIAMARILLO","EIMORADO","EIROJO","EIVERDE",
    "ENHAMARILLO","ENHMORADO","ENHROJO","ENHVERDE",
    "PITAMARILLO","PITMORADO","PITROJO","PITVERDE"
];

var equipos2 = [
    "CIT-Amarillo","CIT-Morado","CIT-Rojo","CIT-Verde",
    "Ingenieria-Amarillo","Ingenieria-Morado","Ingenieria-Rojo","Ingenieria-Verde",
    "ENH-Amarillo","ENH-Morado","ENH-Rojo","ENH-Verde",
    "PIT-Amarillo","PIT-Morado","PIT-Rojo","PIT-Verde"
];

var scoreTotal=0;

//El array donde se guardaran los datos obtenidos de la base de datos (suma de los scores de cada estacion de cada equipo)
//La posicion debe concordar con la manera en que esta hecho el array equipos, p.e., en scores[0] va el score sumado del equipo CITAMARILLO
var scores = [];

//hardcoded scores solo para el uso de la grafica antes de tener funcional el array scores[]
var scores2 = [
    10,20,30,10,11,25,36,40,11,15,29,30,45,20,10,6
];


//Opciones globales de graficas
Chart.defaults.global = {
    // Boolean - Whether to animate the chart
    animation: true,

    // Number - Number of animation steps
    animationSteps: 300,

    // String - Animation easing effect
    // Possible effects are:
    // [easeInOutQuart, linear, easeOutBounce, easeInBack, easeInOutQuad,
    //  easeOutQuart, easeOutQuad, easeInOutBounce, easeOutSine, easeInOutCubic,
    //  easeInExpo, easeInOutBack, easeInCirc, easeInOutElastic, easeOutBack,
    //  easeInQuad, easeInOutExpo, easeInQuart, easeOutQuint, easeInOutCirc,
    //  easeInSine, easeOutExpo, easeOutCirc, easeOutCubic, easeInQuint,
    //  easeInElastic, easeInOutSine, easeInOutQuint, easeInBounce,
    //  easeOutElastic, easeInCubic]
    animationEasing: "easeOutQuart",

    // Boolean - If we should show the scale at all
    showScale: true,

    // Boolean - If we want to override with a hard coded scale
    scaleOverride: false,

    // ** Required if scaleOverride is true **
    // Number - The number of steps in a hard coded scale
    scaleSteps: null,
    // Number - The value jump in the hard coded scale
    scaleStepWidth: null,
    // Number - The scale starting value
    scaleStartValue: null,

    // String - Colour of the scale line
    scaleLineColor: "rgba(0,0,0,.1)",

    // Number - Pixel width of the scale line
    scaleLineWidth: 1,

    // Boolean - Whether to show labels on the scale
    scaleShowLabels: true,

    // Interpolated JS string - can access value
    scaleLabel: "<%=value%>",

    // Boolean - Whether the scale should stick to integers, not floats even if drawing space is there
    scaleIntegersOnly: true,

    // Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
    scaleBeginAtZero: false,

    // String - Scale label font declaration for the scale label
    scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

    // Number - Scale label font size in pixels
    scaleFontSize: 12,

    // String - Scale label font weight style
    scaleFontStyle: "normal",

    // String - Scale label font colour
    scaleFontColor: "#666",

    // Boolean - whether or not the chart should be responsive and resize when the browser does.
    responsive: true,

    // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
    maintainAspectRatio: true,

    // Boolean - Determines whether to draw tooltips on the canvas or not
    showTooltips: true,

    // Function - Determines whether to execute the customTooltips function instead of drawing the built in tooltips (See [Advanced - External Tooltips](#advanced-usage-custom-tooltips))
    customTooltips: false,

    // Array - Array of string names to attach tooltip events
    tooltipEvents: ["mousemove", "touchstart", "touchmove"],

    // String - Tooltip background colour
    tooltipFillColor: "rgba(0,0,0,0.8)",

    // String - Tooltip label font declaration for the scale label
    tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

    // Number - Tooltip label font size in pixels
    tooltipFontSize: 14,

    // String - Tooltip font weight style
    tooltipFontStyle: "normal",

    // String - Tooltip label font colour
    tooltipFontColor: "#fff",

    // String - Tooltip title font declaration for the scale label
    tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

    // Number - Tooltip title font size in pixels
    tooltipTitleFontSize: 14,

    // String - Tooltip title font weight style
    tooltipTitleFontStyle: "bold",

    // String - Tooltip title font colour
    tooltipTitleFontColor: "#fff",

    // Number - pixel width of padding around tooltip text
    tooltipYPadding: 6,

    // Number - pixel width of padding around tooltip text
    tooltipXPadding: 6,

    // Number - Size of the caret on the tooltip
    tooltipCaretSize: 8,

    // Number - Pixel radius of the tooltip border
    tooltipCornerRadius: 6,

    // Number - Pixel offset from point x to tooltip edge
    tooltipXOffset: 10,

    // String - Template string for single tooltips
    tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",

    // String - Template string for multiple tooltips
    multiTooltipTemplate: "<%= value %>",

    // Function - Will fire on animation progression.
    onAnimationProgress: function(){},

    // Function - Will fire on animation completion.
    onAnimationComplete: function(){}
}

//Opciones de la grafica de barras
var barOptions=
{
    //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
    scaleBeginAtZero : true,

    //Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines : true,

    //String - Colour of the grid lines
    scaleGridLineColor : "rgba(0,0,0,.05)",

    //Number - Width of the grid lines
    scaleGridLineWidth : 1,

    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: true,

    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: true,

    //Boolean - If there is a stroke on each bar
    barShowStroke : true,

    //Number - Pixel width of the bar stroke
    barStrokeWidth : 2,

    //Number - Spacing between each of the X value sets
    barValueSpacing : 5,

    //Number - Spacing between data sets within X values
    barDatasetSpacing : 1,

    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

}

//La informacion de la tabla, actualmente se usa scores2 en vez de scores porque aun hay errores, scores contendra los valores reales de la base
//Los colores de la grafica en realidad se cambian en el metodo drawGraph
var data = {
    labels: equipos2,
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: scores2
        }
    ]
};


function init(){
    obtenerDatos();
}

//Aqui se saca la informacion de la base de datos y se hacen llamados a metodos que los deben guardar en el array global
function obtenerDatos(){
    var aux;
    var suma = 0;
    var texto;
    var TestObject = Parse.Object.extend("Puntuacionesv2");
    var query = new Parse.Query(TestObject);
    var equipoActual;
    
    //La variable servira para circular a traves de los 16 equipos
    for(var i=0;i<window.equipos.length;i++){
        
        //Sin esta alert no circula por el array, i se va a 16 (?)
        alert(i);
        
        equipoActual = equipos[i];
        query.exists(equipoActual);
        query.find({
            success: function(results){
                //Restaurar la suma a 0 (pues se calculará la de otro equipo)
                suma = 0;
                
                //La variable j servira para circular a traves de las 17 estaciones de un equipo
                for(var j=0;j<results.length;j++){
                    var object = results[j];
                    texto = object.get(equipoActual);
                    //alert(texto);
                    
                    //Si la casilla no esta vacia se debe sumar el puntaje al total del equipo
                    if(texto!="")
                        {
                            aux = parseInt(texto);
                            suma += aux;
                        }
                }
                //Una vez sumado el score de todas las estaciones se debe guardar en el array de scores, en la posicion i(num de equipo)
                guardarSuma(i,suma);
            },
            error: function(error){
                alert("Error: " + error.message);
            }
        });
    }
}

//Funcion para guardar la suma total de un equipo en el array global en la posicion que le corresponde
function guardarSuma(numEquipo, sumaEquipo){
    alert("NumEquipo: " + numEquipo + "\nEquipo: " + window.equipos[numEquipo] + "\nSumaEquipo: " + sumaEquipo);
    window.scores[numEquipo] = sumaEquipo; 
}

//Mostrar los datos en el div prueba
function mostrarDatos(){
    var divPrueba = document.getElementById("prueba");
    
    //Circular a traves de los 16 equipos y mostrar sus scores
    for(var i=0; i<16; i++){
        divPrueba.appendChild(document.createTextNode("Equipos[i]: " + window.equipos[i]));
        divPrueba.appendChild(document.createTextNode(" Score[i]: " + window.scores[i]));
        divPrueba.appendChild(document.createElement("br"));
    }
}

//Hacer la grafica, asi como cambiarle los colores a cada barra
function drawGraph(){
    var ctx = document.getElementById("myChart").getContext("2d");
    var myBarChart = new Chart(ctx).Bar(data, barOptions);
    for(var i=0; i<4;i++){
        for(var j=0;j<4;j++){
            var numero = (j*4)+i;
            var color;
            var colorSeleccionado;
            
            //Amarillo
            if(numero==0 || numero==4 || numero==8 || numero==12){
                color = "#FFFF00";
                colorSeleccionado = "#FFFF99";
            }
            
            //Morado
            if(numero==1 || numero==5 || numero==9 || numero==13){
                color = "#56077A";
                colorSeleccionado = "#CAA2DD";
            }
            
            //Rojo
            if(numero==2 || numero==6 || numero==10 || numero==14){
                color = "#DD0000";
                colorSeleccionado = "#F47F88";
            }
            
            //Verde
            if(numero==3 || numero==7 || numero==11 || numero==15){
                color = "#22892D";
                colorSeleccionado = "#83E291";
            }
            
            myBarChart.datasets[0].bars[(j*4)+i].fillColor = color;
            myBarChart.datasets[0].bars[(j*4)+i].highlightFill = colorSeleccionado;
        }
        myBarChart.update();
    }
}