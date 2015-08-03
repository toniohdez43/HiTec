var claveCorrecta = "hitec2015"
var claveNecesaria = true;

function validar(){
    var currentPath = window.location.pathname;
    if((currentPath=="/hitec/") || (currentPath=="/hitec/index.html") || (currentPath=="/hitec/index.html#")){
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
                    link = "/hitec/r___-_-e_-gIS-t__r-o";break;
                case "scoresporequipo":
                    link = "/hitec/p--o_r-EquI___p-o.html";break;
                case "androidapp":
                    link = "/hitec/a__-n-_D-r-__--O_id--_A-pp";break;
                case "scoresporcolor":
                    link = "/hitec/"
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