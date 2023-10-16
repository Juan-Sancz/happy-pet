import React, {useState} from 'react';
import axios from 'axios';
import Validation from  './loginVal.js';
import { useNavigate, Link } from 'react-router-dom';
import './style/login.css'
function Login() {

    const [values, setValues] = useState({
        email: '',
        pass: '',
    })

    const navigate = useNavigate('')
    const [errors, setErrors] = useState({})

    const handleChange = (event) =>{
        setValues(prev => ({...prev, [event.target.name]:[event.target.value]}))
    }
    
    
    axios.defaults.withCredentials = true;
    const handleSubmit = (event) => {   
        event.preventDefault();
        setErrors(Validation(values));
        if(errors.email === "" && errors.password === ""){
            axios.post('http://localhost:3001/login',values)
            .then(res =>{
                if(res.data.Status === "success"){
                    navigate('/home');
                }else{
                    alert("Invalid Credentials");
                }
            })
        }
    }
    return(
        <html>
            <body>
        

                    <div class="container login-container">
        <form onSubmit={handleSubmit}>
            <div class="form-group">
                <label for="email">Correo Electrónico</label>
                <input type="email" class="form-control" name="email" placeholder="Ejemplo: juan@example.com" onChange={handleChange}></input>
                {errors.email && <span className='text-danger'>{errors.email}</span>}
            </div>
            <div class="form-group">
                <label for="pass">Contraseña</label>
                <input type="password" class="form-control" name="pass" onChange={handleChange}></input>
                {errors.pass && <span className='text-danger'>{errors.pass}</span>}
            </div>
            <button type='submit' className='btn btn-success w-100 rounded-0'> Iniciar Sesion </button>
        </form>
        <p>
            ¿No tienes una cuenta? <Link to="/signup" className='btn btn-success w-100 rounded-0 text-decoration-none'>Registro</Link>
        </p>
        <Link to="/home" className='btn btn-success w-100 rounded-0 text-decoration-none'>Pagina principal</Link>
    </div>
                
    </body>
    </html>

        
    )
    }

export default Login;