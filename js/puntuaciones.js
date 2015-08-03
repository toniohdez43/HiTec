Parse.initialize("GND8xkckLAJGY4Lo0lFyWeLUBMJnSzW5u6i9NEiZ","fbVNV89U16Zgdkpv7iEatWwtLMGY1G7VvRNvVKWl");


var dataColores;
var dataEquipos;

var version;
var myBarChart;
var index = [];
var scoresSumados = [];
var scoresPorColor = [];
var scoresSumadosPorColor = [];
var total = 0;

var allScores = [];
for(var x = 0; x < 17; x++){
    allScores[x] = [];
}

for(var x=0; x<4; x++){
    scoresPorColor[x] = [];
}

function TaskList(tasks, endOfTasksCallback) {
    this.doTasks = function () {
        var numTasks = tasks.length;
        function singleTaskCallback() {
            if (--numTasks == 0) {
                endOfTasksCallback();
            }
        }
        for (var i = 0; i < tasks.length; i++) {
            tasks[i](singleTaskCallback);
        }
    }
}

function createTask(taskIndexI, taskIndexJ) {
    // a task is a function that does some work for this demo it's simply a random wait
    return function (endOfTaskCallback) {
        var estacionActual = estaciones[taskIndexI]
        var equipoActual = equipos[taskIndexJ];
        var TestObject = Parse.Object.extend("Puntuacionesv2");
        leerCasilla(estacionActual,equipoActual,taskIndexI,taskIndexJ,resultados);
        endOfTaskCallback();
    }
}

function main(opcion){
    version = opcion
    var numTasksI = 17;
    var numTasksJ = 16;
    var tasks = [];
    for (var i = 0; i < numTasksI; i++) {
        for(var j=0; j < numTasksJ; j++)
            tasks.push(createTask(i,j));
    }
    new TaskList(tasks, function () {
    }).doTasks();
}

function sumarArrayPorColumna(arrayASumar, arrayDondeGuardar){
    for(var i=0; i<arrayASumar[0].length; i++){
        var suma =0;
        for(var j=0; j<arrayASumar.length; j++){
            suma += arrayASumar [j][i];
        }
        arrayDondeGuardar [i] = suma;
    }
}

function sumarArrayPorRenglon(arrayASumar, arrayDondeGuardar){
    for(var i=0; i<arrayASumar.length; i++){
        var suma = 0;
        for(var j=0; j<arrayASumar[0].length; j++){
            suma += arrayASumar[i][j];
        }
        arrayDondeGuardar[i] = suma;
    }
}

//Mandar dos arrays, el primer array se volvera bidimensional, y tendra  dentro de él otro array que contendra su valor previo y los valores del otro array
//El array quedara asi: array[i] = array[i],array2[i]
function hacerBidimensional(array1,array2){
    for(var i=0; i<array1.length; i++){
        aux = array1 [i];
        array1 [i] = [];
        array1 [i][0] = aux;
        array1 [i][1] = array2[i];
    }
}

function resultados (){
    borrarLoading();

    //Genera el array scoresSumados que contiene los scores sumados de todos los equipos
    sumarArrayPorColumna(allScores,scoresSumados);

    dataEquipos = createData(scoresSumados,equipos2);

    if(version==1)
        drawGraphEquipos();

    //scoresSumados ahora contendra el score y el nombre del equipo, p.e. scoresSumados[i] = [score,nombreDeEquipo]
    hacerBidimensional(scoresSumados,equipos2);

    //va a generar el array scoresPorColor, array bidimensional de 4x4. En scoresPorColor[i] contiene los scores de los 4 equipos de un mismo color
    porColor();

    //Sumar los scores de todos los equipos (guardados en scoresPorColor) de un mismo color y guardarlo en scoresSumadosPorColor
    sumarArrayPorRenglon(scoresPorColor,scoresSumadosPorColor);


    dataColores = createData(scoresSumadosPorColor,colores);

    if(version==2)
        drawGraphColores();

    //scoresSumadosPorColor ahora contendra la suma de los equipos de un color y el nombre del color. [score,nombre]
    hacerBidimensional(scoresSumadosPorColor,colores);

    //Acomodar los array que contienen las sumas de scores de mayor a menor
    scoresSumados.sort(compareNumbers);
    scoresSumadosPorColor.sort(compareNumbers);

    //Mostrar los resultados
    if(version==1){
        mostrarPorEquipo();
        mostrarPorColor();
    }
    else
        mostrarPorColor();


}

function mostrarPorEquipo(){
    resultsDiv = document.getElementById("puntuaciones1");
    resultsDiv.appendChild(document.createTextNode("Ranking por equipos"));

    for(var i=0; i<scoresSumados.length; i++){
        var div = document.createElement("div");
        if(i<scoresSumados.length/2){
            resultsDiv = document.getElementById("res1_1");
        }
        else{
            resultsDiv = document.getElementById("res1_2")
        }

        var p = document.createElement("p");
        p.appendChild(document.createTextNode("" + (i+1) + ". " + scoresSumados[i][1] + ": " + scoresSumados [i][0]));

        if((i==0) || (i==1) || (i==2))
            p.style.fontWeight = "bolder";

        p.style.lineHeight = "50%";
        resultsDiv.appendChild(p);
    }
}

function mostrarPorColor(){
    resultsDiv = document.getElementById("puntuaciones2");
    resultsDiv.appendChild(document.createTextNode("Ranking por colores"));

    for(var i=0; i<scoresSumadosPorColor.length; i++){
        var div = document.createElement("div");
        resultsDiv = document.getElementById("res2_1");

        var p = document.createElement("p");
        p.appendChild(document.createTextNode("" + (i+1) + ". " + scoresSumadosPorColor[i][1] + ": " + scoresSumadosPorColor [i][0]));
        p.style.lineHeight = "50%";
        resultsDiv.appendChild(p);
    }
}


function compareNumbers(a, b) {
    return b[0] - a[0];
}

function leerCasilla(estacion,equipo,taskIndexI,taskIndexJ,callback){
    var TestObject = Parse.Object.extend("Puntuacionesv2");
    var query = new Parse.Query(TestObject);
    var result;
    query.exists(equipo);
    query.equalTo("Estaciones",estacion);
    query.find({
        success: function(results){
            result = results[0].get(equipo);
            if(result != ""){
                var tempResult = parseInt(result);
                allScores[taskIndexI][taskIndexJ] = tempResult;
            }
            else{
                allScores[taskIndexI][taskIndexJ] = 0;
            }
            total++;
            if(total==272)
            {
                resultados();
            }
        }
        ,error: function (){
            errorLoading();
        }
    });
}

function errorLoading(){
    borrarLoading();
    myBarChart.destroy();
    var div = document.getElementById("chartDiv");
    div.innerHTML = "";
    var text = document.createElement("div");
    text.className = "errorText";
    text.appendChild(document.createTextNode("Error de conexión. "));
    var link = document.createElement("a");
    link.style.color = "#0088E2";
    link.appendChild(document.createTextNode("Intentar de nuevo"));
    link.setAttribute("href", "javascript:history.go(0);");
    text.appendChild(link);
    div.appendChild(text);
}

function prueba(){
    alert("Hoal");
}

var equipos = [
    "CITAMARILLO","CITMORADO","CITROJO","CITVERDE",
    "EIAMARILLO","EIMORADO","EIROJO","EIVERDE",
    "ENHAMARILLO","ENHMORADO","ENHROJO","ENHVERDE",
    "PITAMARILLO","PITMORADO","PITROJO","PITVERDE"
];

var equipos2 = [
    "CIT-Naranja","CIT-Morado","CIT-Rojo","CIT-Verde",
    "Ingenieria-Naranja","Ingenieria-Morado","Ingenieria-Rojo","Ingenieria-Verde",
    "ENH-Naranja","ENH-Morado","ENH-Rojo","ENH-Verde",
    "PIT-Naranja","PIT-Morado","PIT-Rojo","PIT-Verde"
];

var colores = ["Naranja", "Morado", "Rojo", "Verde"];

//hardcoded scores solo para el uso de la grafica antes de tener funcional el array scores[]
var scores2 = [
    10,20,30,10,11,25,36,40,11,15,29,30,45,20,10,6
];

var estaciones = [
    "Estacion 01", "Estacion 02", "Estacion 03", "Estacion 04",
    "Estacion 05", "Estacion 06", "Estacion 07", "Estacion 08",
    "Estacion 09", "Estacion 10", "Estacion 11", "Estacion 12",
    "Estacion 13", "Estacion 14", "Estacion 15", "Estacion 16", "Bonus"
];

//Opciones globales de graficas
Chart.defaults.global = {
    // Boolean - Whether to animate the chart
    animation: true,

    // Number - Number of animation steps
    animationSteps: 200,

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
    scaleFontSize: 15,

    // String - Scale label font weight style
    scaleFontStyle: "bold",

    // String - Scale label font colour
    scaleFontColor: "#000000",

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

function borrarLoading(){
    var loaderDiv = document.getElementById("loaderContainer");
    loaderDiv.style.background = "transparent";
    loaderDiv.innerHTML = "";
}

//Opciones de la grafica de barras
var barOptions=
{
    //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
    scaleBeginAtZero : true,

    //Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines : false,

    //String - Colour of the grid lines
    scaleGridLineColor : "rgba(0,0,0,.05)",

    //Number - Width of the grid lines
    scaleGridLineWidth : 1,

    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: true,

    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: true,

    //Boolean - If there is a stroke on each bar
    barShowStroke : false,

    //Number - Pixel width of the bar stroke
    barStrokeWidth : 2,

    //Number - Spacing between each of the X value sets
    barValueSpacing : 2,

    //Number - Spacing between data sets within X values
    barDatasetSpacing : 1,

    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

}


function createData(dataToUse, labelsToUse){
    var data = {
        labels: labelsToUse,
        datasets: [
            {
                label: "Ranking",
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,0.8)",
                highlightFill: "rgba(220,220,220,0.75)",
                highlightStroke: "rgba(220,220,220,1)",
                data: dataToUse
            }
        ]
    };
    return data;
}

/*
 //La informacion de la tabla, actualmente se usa scores2 en vez de scores porque aun hay errores, scores contendra los valores reales de la base
 //Los colores de la grafica en realidad se cambian en el metodo drawGraphEquipos
 var dataEquipos = {
 labels: equipos2,
 datasets: [
 {
 label: "Ranking por equipos",
 fillColor: "rgba(220,220,220,0.5)",
 strokeColor: "rgba(220,220,220,0.8)",
 highlightFill: "rgba(220,220,220,0.75)",
 highlightStroke: "rgba(220,220,220,1)",
 data: scoresSumados
 }
 ]
 };

 var dataColores = {
 labels: colores,
 datasets: [
 {
 label: "Ranking por colores",
 fillColor: "rgba(220,220,220,0.5)",
 strokeColor: "rgba(220,220,220,0.8)",
 highlightFill: "rgba(220,220,220,0.75)",
 highlightStroke: "rgba(220,220,220,1)",
 data: scoresSumadosPorColor
 }
 ]
 };
 */


//Sirve para el despliegue inicial de informacion (antes de leer datos de la base)
var dummyData1 = {
    labels: equipos2,
    datasets: [
        {
            label: "Ranking por colores",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: [.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5]
        }
    ]
};

var dummyData2 = {
    labels: colores,
    datasets: [
        {
            label: "Ranking por colores",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: [.5,.5,.5,.5]
        }
    ]
}

function porColor(){
    for(var i=0; i<4;i++){
        for(var j=0;j<4;j++){
            var numero = scoresSumados[(j*4)+i][0];
            scoresPorColor [i][j] = numero;
        }
    }
}

function drawDummyGraph(){
    var ctx = document.getElementById("myChart").getContext("2d");
    var dummyOptions = {
        scaleShowGridLines: false,
        animationSteps: 1,

        showScale: true,

        // Boolean - If we want to override with a hard coded scale
        scaleOverride: true,

        // ** Required if scaleOverride is true **
        // Number - The number of steps in a hard coded scale
        scaleSteps: 20,
        // Number - The value jump in the hard coded scale
        scaleStepWidth: 1,
        // Number - The scale starting value
        scaleStartValue: 0
    }
    if(version==1)
        myBarChart = new Chart(ctx).Bar(dummyData1, dummyOptions);

    else
        myBarChart = new Chart(ctx).Bar(dummyData2, dummyOptions);

    for(var i=0; i<4;i++){
        for(var j=0;j<4;j++){
            var numero = (j*4)+i;
            var color;
            var colorSeleccionado;

            //Naranja
            if(numero==0 || numero==4 || numero==8 || numero==12){
                color = "#FF7F00";
                colorSeleccionado = "#FFB570";
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

            if(version==1){
                myBarChart.datasets[0].bars[(j*4)+i].fillColor = color;
                myBarChart.datasets[0].bars[(j*4)+i].highlightFill = colorSeleccionado;
            }
            else{
                myBarChart.datasets[0].bars[i].fillColor = color;
                myBarChart.datasets[0].bars[i].highlightFill = colorSeleccionado;
            }
        }
    }
    myBarChart.update();
}

function drawGraphColores(){
    var ctx = document.getElementById("myChart").getContext("2d");
    myBarChart.destroy();
    myBarChart = new Chart(ctx).Bar(dataColores, barOptions);
    var color;
    var colorSeleccionado;
    for(var i=0; i<4; i++){

        //Naranja
        if(i==0){
            color = "#FF7F00";
            colorSeleccionado = "#FFB570";
        }

        //Morado
        if(i==1){
            color = "#56077A";
            colorSeleccionado = "#CAA2DD";
        }

        //Rojo
        if(i==2){
            color = "#DD0000";
            colorSeleccionado = "#F47F88";
        }

        //Verde
        if(i==3){
            color = "#22892D";
            colorSeleccionado = "#83E291";
        }
        myBarChart.datasets[0].bars[i].fillColor = color;
        myBarChart.datasets[0].bars[i].highlightFill = colorSeleccionado;
    }
    myBarChart.update();
}

//Hacer la grafica, asi como cambiarle los colores a cada barra
function drawGraphEquipos(){
    var ctx = document.getElementById("myChart").getContext("2d");
    myBarChart.destroy();
    myBarChart = new Chart(ctx).Bar(dataEquipos, barOptions);
    for(var i=0; i<4;i++){
        for(var j=0;j<4;j++){
            var numero = (j*4)+i;
            var color;
            var colorSeleccionado;

            //Naranja
            if(numero==0 || numero==4 || numero==8 || numero==12){
                color = "#FF7F00";
                colorSeleccionado = "#FFB570";
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
    }
    myBarChart.update();
}