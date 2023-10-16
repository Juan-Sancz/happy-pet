/*const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');*/

import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';

const app = express();
app.use(express.json());
app.use(cookieParser());
/*app.use(express.static('public'))*/
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
const storage =  multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, 'public/images');
  },
  filename: (req, file, cb)=>{
    cb(null, file.fieldname + ' ' + Date.now() + path.extname(file.originalname));
  }
})

const upload = multer({
  storage: storage
})

app.options('*', (req, res) => {
  res.status(200).end();
});


const  db = mysql.createConnection({
  host: "localhost",
  user:"root",
  password:"",
  database:"HappyPet"
})

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if(!token){
    return res.json({Message: "We need token please provide it"})
  }else{
    jwt.verify(token, "our-jsonwebtoken-secret-key", (err, decoded) => {
      if(err){
        return res.json({Message: "Authentication error"});
      }else{
        req.nombre = decoded.nombre;
        next();
      }
    })
  }
}
app.get('/', verifyUser,(req, res) =>{
  return res.json({Status: "success", nombreToken: req.nombre})
})

app.post('/register', (req, res) => {
  const sql = "INSERT INTO usuarios (`nombre`, `apellido`, `email`,`pass`,`tel`,`direccion`) Values (?)";
  const values = [
    req.body.nombre,
    req.body.apellido,
    req.body.email,
    req.body.pass,
    req.body.tel,
    req.body.dir,
  ]
  db.query(sql, [values], (err, data) => {
    if(err) return res.json(err);
    return res.json(data);
  })
})

app.post('/regispet', (req, res) => {
  const sql = "INSERT INTO mascota (`nombre`, `especie`, `raza`,`edad`,`descripcion`) Values (?) WHERE ";
  const values = [
    req.body.nombre,
    req.body.especie,
    req.body.raza,
    req.body.edad,
    req.body.des,
  ]
  db.query(sql, [values], (err, data) => {
    if(err) return res.json(err);
    return res.json(data);
  })
})

app.post('/adop', (req, res) => {

  const values =[req.body.id];
    return res.json(values);
  })


app.post('/login', (req, res) => {
  const sql = "SELECT * FROM usuarios WHERE email = ? AND pass = ?";
  db.query(sql, [req.body.email, req.body.pass], (err, data) => {
    if(err) {
      return res.json(err);
    }
    if(data.length > 0){
      const nombreToken = data[0].nombre;
      const token = jwt.sign({nombreToken}, "our-jsonwebtoken-secret-key", {expiresIn: '1d'});
      res.cookie('token', token);
      return res.json({Status: "success"});  
    }else{
      return res.json({Message: "Usuario no existe"});
    }
  })
})
app.post('/imgUpload',  upload.single('image'), (req, res) => {
  const image = req.file.filename;
  const sql = "UPDATE mascota SET image = ? WHERE duenio_id = ?";
  const nombreToken1 = req.body.nombreToken;
  db.query(sql, [image, nombreToken1], (err, result) =>{
    if(err) return res.json({Message: "error"})
    return res.json({Status: "success"});
  })
})

app.get('/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({Status: "success"});
})

app.get('/mascotas', (req, res) => {
  const sql = "SELECT * FROM mascota";
  db.query(sql, (err, data) => {
    if(err) return res.json(err);
    return res.json(data);
  })
})




/*app.get('/usuarios', (req, res)=>{
  const sql = "SELECT * FROM usuarios";
  db.query(sql, (err , data) =>{
    if(err) return res.json(err);
    if(err){
      console.log(err);
    }
    console.log(data);
    return res.json(data);
  })
})*/

app.listen(3001, ()=>{
  console.log(`Server is running on port 3001`);
})

