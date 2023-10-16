import React, { useEffect, useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/regispet.css'
import axios from 'axios';
import Validation from './regispetVal.js';
import logo from '../data/logo.jpg';
function Regispet(){
    const [auth, setAuth] = useState(false)
    const [nombre,setNombre] = useState('')
    const [message, setMessage] = useState('')
    const [file, setFile] =  useState('');

    axios.defaults.withCredentials=true;
    useEffect(() => {
        axios.get('http://localhost:3001')
        .then(res => {
            if(res.data.Status === "success"){
                setAuth(true);
                setNombre(res.data.nombreToken)
            }else{
                setAuth(false);
                setMessage(res.data.message);
            }
        })
    }, [])
    const handleLogout = () => {
        axios.get('http://localhost:3001/logout')
        .then(res => {
            if(res.data.Status === "success"){
                Navigate('/home')
            }else{
                alert("error");
            }
            
        })
        .catch( err => console.log(err))
    }

    const [values, setValues] = useState({
        nombre: '',
        especie: '',
        raza: '',
        edad: '',
        des: '',
    })

    const [errors, setErrors] = useState({})

    const navigate = useNavigate('')
    const handleChange = (event) =>{
        setValues(prev => ({...prev, [event.target.name]:[event.target.value]}))
    }
    const handleFile = (e) => {
        setFile(e.target.files[0])
    }
    
    

    const handleSubmit = (event) => {   
        event.preventDefault();
        setErrors(Validation(values));
        if(errors.nombre === "" && errors.especie === "" && errors.raza === "" && errors.edad === "" && errors.des === "" && errors.img === ""){
          
                const formdata = new FormData();
                formdata.append('image', file );
                const nombreToken = nombre;
                axios.post('http://localhost:3001/imgUpload', formdata, nombreToken)
                .then(res => {
                    if(res.data.Status === "Success"){
                        console.log("success");
                    }else{
                    }
                })
                .catch(err => console.log(err));
            
            axios.post('http://localhost:3001/regispet',values)
            .then(res =>{
                navigate('/home');
            })
        }
    }
    
return(
<html lang="en">
<head>
    <meta charset="UTF-8"></meta>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"></link>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"></link>
    <title>Registro de Adopción de Mascotas</title>
</head>
<body>
<header>
        <div>
            <img src={logo}></img> 
        </div>
    </header>
    <div class="container">
        <div class="cont">
            <nav>
                <ul>
                    <li>
                        <Link to="/home">Inicio</Link>
                    </li>
                    <li>
                        <Link to="/adop">Adoptar</Link>
                    </li>
                    <li>
                        <Link top="/regispet">Presentar a un amiguito</Link>
                    </li>
                    <li>
                    <Link to="/prod">Más amiguitos</Link>
                    </li>
                    {
                
                auth ?
                <div>
                    <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
                </div>
                :
                <div>
                    <Link to='/login' className='btn btn-primary'> Login</Link>
                    
                </div>
            
                }
                </ul>
            </nav> 
        </div>  
    </div>  

    <div class="container registration-container">
        <form onSubmit={handleSubmit}>
            <div class="form-group">
                <label for="nombre">Nombre de la Mascota</label>
                <input type="text" class="form-control" name="nombre" placeholder="Ejemplo: Max" onChange={handleChange}></input>
                {errors.nombre && <span className='text-danger'>{errors.nombre}</span>}
            </div>
            <div class="form-group">
                <label for="especie">Especie</label>
                <input type="text" class="form-control" name="especie" placeholder="Ejemplo: Perro, Gato" onChange={handleChange}></input>
                {errors.especie && <span className='text-danger'>{errors.especie}</span>}
            </div>
            <div class="form-group">
                <label for="raza">Raza</label>
                <input type="text" class="form-control" name="raza" placeholder="Ejemplo: Labrador, Siamese" onChange={handleChange}></input>
                {errors.raza && <span className='text-danger'>{errors.raza}</span>}
            </div>
            <div class="form-group">
                <label for="edad">Edad</label>
                <input type="number" class="form-control" name="edad" placeholder="Ejemplo: 3" onChange={handleChange}></input>
                {errors.edad && <span className='text-danger'>{errors.edad}</span>}
            </div>
            <div class="form-group">
                <label for="des">Descripción</label>
                <input type='text' class="form-control" name ="des" placeholder="Ejemplo: Max es un perro amigable y juguetón." onChange={handleChange}></input>
                {errors.des && <span className='text-danger'>{errors.des}</span>}
            </div>
            <div class="form-group">
                <label for="image">Imagen de la Mascota</label>
                <input type="file" class="form-control-file" name="image" onChange={handleFile}></input>
                {errors.img && <span className='text-danger'>{errors.img}</span>}
            </div>
            <button type="submit" class="btn btn-primary" >Enviar Registro</button>
        </form>
    </div>
    <footer>
        <div class="footer-logo">
            <img src={logo} alt="HappyPets"></img>
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

export default Regispet;