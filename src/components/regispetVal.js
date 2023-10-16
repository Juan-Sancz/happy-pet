function Validation (values){
    let error = {}
   

    if(values.nombre === ""){
        error.nombre = "Ingrese un nombre";
    }else{
        error.nombre="";
    }

    if(values.especie === ""){
        error.especie = "Ingrese una especie";
    }else{
        error.especie="";
    }

    if(values.raza === ""){
        error.raza = "Ingrese una raza";
    }else{
        error.raza="";
    }

    if(values.edad === ""){
        error.edad = "Ingrese una edad";
    }else{
        error.edad="";
    }

    if(values.des === ""){
        error.des = "Ingrese una descripcion";
    }else{
        error.des="";
    }

    if(values.img === ""){
        error.img = "Ingrese una imagen";
    }else{
        error.img="";
    }
    return error;
}

export default Validation;