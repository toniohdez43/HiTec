var claveCorrecta = "hitec2015"
var claveNecesaria = true;

function validar(){
    var currentPath = window.location.pathname;
    if((currentPath=="/HiTec/") || (currentPath=="/HiTec/index.html") || (currentPath=="/HiTec/index.html#")){
        claveNecesaria = true;
    }
    else{
        claveNecesaria = false;
    }


    $('a').click(function(){
        var link;
        var texto = $(this).text();
        texto = texto.toLowerCase();
        texto = texto.replace(/\s+/g, '');
        var clave;

        if(claveNecesaria==true){
            clave = prompt("Password:");
        }
        else
            clave = claveCorrecta;

        if(clave == claveCorrecta){
            switch (texto){
                case "registro":
                    link = "/HiTec/registro";break;
                case "scoresporequipo":
                    link = "/HiTec/porEquipo.html";break;
                case "androidapp":
                    link = "/HiTec/androidApp";break;
                case "scoresporcolor":
                    link = "/HiTec/"
            }
        }
        else{
            alert("La clave no es correcta");
            link = "#";
        }
        if((clave == claveCorrecta) || (claveNecesaria==falsel)){
            window.location.href = link;
        }

    });
}