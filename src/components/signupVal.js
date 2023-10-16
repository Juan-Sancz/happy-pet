function Validation (values){
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-z0-9]{8,}$/

    if(values.nombre === ""){
        error.nombre = "Ingrese un nombre";
    }else{
        error.nombre="";
    }

    if(values.apellido === ""){
        error.apellido = "Ingrese un apellido";
    }else{
        error.apellido="";
    }

    if(values.email === ""){
        error.email = "Ingrese un correo electronico";
    }
    else if(!email_pattern.test(values.email)){
        error.email = "Email invalido";
    }else{
        error.email="";
    }

    if(values.pass === ""){
        error.password = "Ingrese contraseña";
    }
    else if(!password_pattern.test(values.pass)){
        error.password = "La contraseña no coincide";
    }else{
        error.password="";
    }

    if(values.tel === ""){
        error.tel = "Ingrese un telefono";
    }else{
        error.tel="";
    }

    if(values.dir === ""){
        error.dir = "Ingrese una direccion";
    }else{
        error.dir="";
    }
    return error;
}

export default Validation;