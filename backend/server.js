const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');//importa la ruta desde donde viene las autorizaciones
const app = express();
const PORT = 3001;

dotenv.config({path: path.resolve(__dirname, '.env')});
app.use(cors());
app.use(express.json());    

app.use('/css', express.static(path.resolve(__dirname, '../css')));
app.use('/html', express.static(path.resolve(__dirname, '../html')));
app.use('/js', express.static(path.resolve(__dirname, '../js')));
app.use('/imagenes', express.static(path.resolve(__dirname, '../imagenes')));

app.use('/api/auth', authRoutes);  //rutas de los endpoints generados en auth.js

app.listen(PORT, ()=> { console.log(`Servidor en localhost:${PORT}`)});

