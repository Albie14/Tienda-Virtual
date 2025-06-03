const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./auth');//importa la ruta desde donde viene las autorizaciones
const sqlite3 = require('sqlite3').verbose();

dotenv.config();
const app = express();
app.use(express.json());

//configuracion de sqlite
const dataBase = new sqlite3.Database('./database.sqlite', (err)=>{
    if(err){
        console.log('Error al conectar con la base de datos: ',err.message );
    }else{
        console.log('conectado a SQLite');
    }
});

app.use('/api/auth', authRoutes);

app.listen(3000, ()=>{
    console.log("servidor en localhost:3000")
});