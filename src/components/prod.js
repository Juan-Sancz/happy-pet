import React, { useRef, useEffect, useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/prod.css'
import axios from 'axios';
import logo from '../data/logo.jpg';


function Prod(){
    const [auth, setAuth] = useState(false)
    const [nombre,setNombre] = useState('')
    const [message, setMessage] = useState('')
    const [mascota, setMascota] = useState([])
    const ref = useRef(null);
    const [id,setId] = useState('')

  

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
    /*useEffect(() => {
        axios.get('http://localhost:3001/')
        .then(res => {
            setData(res.data[0])
        })
        .catch(err => console.log(err));
    })*/

    useEffect(() => {
        axios.get('http://localhost:3001/mascotas')
        .then(res => setMascota(res.data))
        .catch(err => console.log(err))
    }, [])    
    const handleButtonClick = () => {
    setId(ref.current.value);
    }

    const handleSubmit = (event) => {   
            

        event.preventDefault();
        axios.post('http://localhost:3001/adop',id)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
    
  
    return(
        <html lang="en">
<head>
    <meta charset="UTF-8"></meta>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"></link>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"></link>
    <title>Mascotas para Adopción</title>
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



    <div class="container adoption-pets-container">
        {mascota.map((data,i)=> (
       <form onSubmit={handleSubmit}>
        <div class="pet-card" key={i}>
            <h2 class="card-title">{data.nombre}</h2>
            <input type="hidden" name="id" ref={ref} value="3"></input>
            {console.log(data.id)};

            <img src="descarga2.jpeg" class="card-img-top" alt="Mascota 1"></img>
            <ul class="list-group">
                <li class="list-group-item">Especie:{data.especie}</li>
                <li class="list-group-item">Raza: {data.raza}</li>
                <li class="list-group-item">Edad: {data.edad}</li>
                <li class="list-group-item">Descripción: {data.descripcion}</li>
            </ul>
            <br></br>
            <button type="submit" class="adoption-button" onClick={handleButtonClick}>Adoptar</button>  
        </div>
        </form>
         ))}
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

export default Prod;