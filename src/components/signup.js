import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Validation from './signupVal.js';
import './style/register.css';

function Signup() {

    const [values, setValues] = useState({
        nombre: '',
        apellido: '',
        email: '',
        pass: '',
        tel: '',
        dir: '',
    })

    const [errors, setErrors] = useState({})

    const navigate = useNavigate('')
    const handleChange = (event) =>{
        setValues(prev => ({...prev, [event.target.name]:[event.target.value]}))
    }
    const handleSubmit = (event) => {   
        event.preventDefault();
        setErrors(Validation(values));
        if(errors.nombre === "" && errors.apellido === "" && errors.email === "" && errors.password === "" && errors.tel === "" && errors.tel === ""){
            axios.post('http://localhost:3001/register',values)
            .then(res =>{
                navigate('/login');
            })
        }
    }
    return(
                
           <html>     
<body>

            <div class="container registration-container">
        <form onSubmit={handleSubmit}>
            <div class="form-group">
                <label for="nombre">Nombre Completo</label>
                <input type="text" class="form-control" name='nombre' placeholder="Ejemplo: Pablo" onChange={handleChange}></input>
                {errors.nombre && <span className='text-danger'>{errors.nombre}</span>}
            </div>
            <div class="form-group">
                <label for="apellido">Apellido</label>
                <input type="text" class="form-control" name='apellido' placeholder="Ejemplo: Perez" onChange={handleChange}></input>
                {errors.apellido && <span className='text-danger'>{errors.apellido}</span>}
            </div>
            <div class="form-group">
                <label for="email">Correo Electronico</label>
                <input type="email" class="form-control" name='email' placeholder="Ejemplo: pabloperez@gmail.com" onChange={handleChange}></input>
                {errors.email && <span className='text-danger'>{errors.email}</span>}
            </div>
            <div class="form-group">
                <label for="pass">Contraseña</label>
                <input type="password" class="form-control" name="pass" onChange={handleChange}></input>
                {errors.pass && <span className='text-danger'>{errors.pass}</span>}
            </div>
            <div class="form-group">
                <label for="tel">Telefono</label>
                <input type="text" class="form-control" name="tel" onChange={handleChange}></input>
                {errors.tel && <span className='text-danger'>{errors.tel}</span>}
            </div>
            <div class="form-group">
                <label for="dir">Direccion</label>
                <input type="text" class="form-control" name="dir" onChange={handleChange}></input>
                {errors.dir && <span className='text-danger'>{errors.dir}</span>}
            </div>
            <button type='submit' className='btn btn-success w-100 rounded-0'> Registro </button>
        </form>
        <p>
            ¿Ya tienes una cuenta? <Link to='/login' className='btn btn-success w-100 rounded-0'>Login</Link>
        </p>
    </div>
    <footer>
    <div class="footer-logo">
        <img src="../data/logo.jpg" alt="HappyPets"></img>
        <h1>HappyPets</h1>
    </div>
    <div class="footer-social">
        <a href="#"><i class="fab fa-facebook"></i></a>
        <a href="#"><i class="fab fa-twitter"></i></a>
        <a href="#"><i class="fab fa-instagram"></i></a>
        <a href="#"><i class="fab fa-linkedin"></i></a>
    </div>
    <p class="footer-text">© 2023 HappyPets. Todos los derechos reservados.</p>
</footer>
</body>
</html>

        
    )
}

export default Signup;