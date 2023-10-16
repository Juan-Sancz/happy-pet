

import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles.css'
import axios from 'axios';
import logo from '../data/logo.jpg';
import descarga1 from '../data/descarga1.jpeg'
import descarga2 from '../data/descarga2.jpeg'
import descarga3 from '../data/descarga3.jpeg'


function Shop(){
    const [auth, setAuth] = useState(false)
    const [nombre,setNombre] = useState('')
    const [message, setMessage] = useState('')

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
  return(
  
  
<html>
    <head>
        <meta charset="utf-8"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <link rel="stylesheet" href="styles.css"></link>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"></link>

    </head>
    <header>
        <div>
            <img src={logo}></img> 
        </div>
    </header>
    <body>
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
                <div class="containeer">
                    <div class="content">
                         <div class="searchcon">
                            <input type="text" id="bus1" placeholder="Buscar gatitos, perritos, etc"></input>
                            <input type="text" id="bus2" placeholder="Ingrese su ciudad, provincia o código postal "></input>
                             <button id="botonbus" type="submit">
                                 <i class="fas fa-search"></i>
                             </button>
                        </div>
                    </div>
                        <div class="textt">
                            <p>Encuentra a tu nuevo mejor amigo</p>
                            <p>Busca mascotas en nuestra red de más de 11,500 refugios y rescates.</p>
                         </div> 
                </div>   
                    <div class="cont2">
                        <div class="overl">
                            <ul class="grid">
                                <li class="griditem"> 
                                    <a href="#">
                                        <i class="fas fa-dog"></i>
                                        <p> Perros</p>
                                    </a>
                                </li>
                                <li class="griditem">
                                    <a href="#">
                                        <i class="fas fa-cat"></i>
                                        <p> Gatos</p>
                                    </a>
                                </li>
                                <li class="griditem">  <a href="#">
                                    <i class="fas fa-bone"></i>
                                    <p> Otras mascotas</p>
                                </a>
                            </li>
                                <li class="griditem">  <a href="#">
                                    <i class="fas fa-paw"></i>
                                    <p> Organizaciones y rescates</p>
                                </a>
                            </li>
                            </ul>

                        </div>
                    </div>
                    <div class="tarjetas-container">
                        <div class="tarjeta">
                            <img src={descarga1}></img>
                            <h3>Momo</h3>
                        </div>
                        <div class="tarjeta">
                            <img src={descarga2} alt="Imagen 2"></img>
                            <h3>Darla</h3>
                        </div>
                        <div class="tarjeta">
                            <img src={descarga3} alt="Imagen 3"></img>
                            <h3>Dario</h3>
                        </div>
                        <div class="tarjeta1">
                            <a href="#">
                            <i class="fas fa-fish"></i>
                            <h3>345 mascotas más que buscan un hogar.</h3>
                            </a>
                        </div> 
                    </div>    
            </div>
            <section class="story-touts">
                <h2>¿Estás planeando adoptar?</h2>
                <div class="containera">
                    
                    <div class="story-tout">
                        <i class="fas fa-bone"></i>
                        <h4>Registro para adoptadores</h4>
                        <p> Llena el registro para adoptadores, ve si cumples con los requisitos.</p>
                    </div>
                    <div class="story-tout">
                        <i class="fas fa-cat"></i>
                        <h4>Conoce a más mascotas y sus cuidados</h4>
                        <p>Conoce a más animalitos y los respectivos cuidados que debes tener con ellos.</p>
                    </div>
                    <div class="story-tout">
                        <i class="fas fa-fish"></i>
                        <h4>Preguntas frecuentes sobre la adopción</h4>
                        <p>encuentra aquí todo lo que necesitas saber para adoptar a un animalito.</p>
                    </div>
                </div>
            </section>
            
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
    export default Shop