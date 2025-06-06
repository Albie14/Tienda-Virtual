const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');//importa la ruta desde donde viene las autorizaciones
const PORT = 3001;

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/html', express.static(path.join(__dirname, '../html')));
app.use('/js', express.static(path.join(__dirname, '../js')));
app.use('/imagenes', express.static(path.join(__dirname, '../imagenes')));
app.use('/css', express.static(path.join(__dirname, '../')));

app.use('/api/auth', authRoutes);

app.listen(PORT, ()=>{
console.log(`Servidor en localhost:${PORT}`);
});



