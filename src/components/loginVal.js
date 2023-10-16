function Validation (values){
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-z0-9]{8,}$/

    if(values.email === ""){
        error.email = "Ingrese un correo electronico";
    }
    else if(!email_pattern.test(values.email)){
        error.email = "Correo invalido";
    }else{
        error.email="";
    }

    if(values.pass === ""){
        error.password = "Ingrese una contraseña";
    }
    else if(!password_pattern.test(values.pass)){
        error.password = "La contraseña no coincide";
    }else{
        error.password="";
    }
    return error;
}

export default Validation;