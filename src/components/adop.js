import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/adop.css'
import axios from 'axios';
import logo from '../data/logo.jpg';
function Adop(){
    const [auth, setAuth] = useState(false)
    const [nombre,setNombre] = useState('')
    const [message, setMessage] = useState('')
    const [id, setId] = useState('')


    axios.defaults.withCredentials=true;
    useEffect(() => {
        axios.get('http://localhost:3001')
        .then(res => {
            if(res.data.Status === "success"){
                setAuth(true);
                setNombre(res.data.nombre)
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
                window.location.reload(true);
            }else{
                alert("error");
            }
            
        })
        .catch( err => console.log(err))
    }

    useEffect(() => {
        
        axios.get('http://localhost:3001/adop')
        .then(res => setId(res.data.id))
        .catch(err => console.log(err));
        
         }
    )
     
    return(
    <html lang="en">
        <head>
    <meta charset="UTF-8"></meta>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"></link>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"></link>
    <title>Formulario de Adopción de Mascotas</title>
</head>
<body>
    <header>
        <div class="">
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
                            <Link to="/regispet">Presentar a un amiguito</Link>
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

    <div class="container adoption-form-container">
        <form>
            <div class="form-group">
                <label for="nombre">Nombre Completo</label>
                <input type="text" class="form-control" id="nombre" placeholder="Ejemplo: María Pérez" required></input>
            </div>
            <div class="form-group">
                <label for="email">Correo Electrónico</label>
                <input type="email" class="form-control" id="email" placeholder="Ejemplo: maria@example.com" required></input>
            </div>
            <div class="form-group">
                <label for="telefono">Teléfono de Contacto</label>
                <input type="tel" class="form-control" id="telefono" placeholder="Ejemplo: 555-555-5555" required></input>
            </div>
            <div class="form-group">
                <input type="hidden" class="form-control" name="mascota" value={id}></input>
            </div>
            <button type="submit" class="btn btn-primary">Enviar Solicitud de Adopción</button>
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

export default Adop