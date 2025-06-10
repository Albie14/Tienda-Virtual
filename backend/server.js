const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');//importa la ruta desde donde viene las autorizaciones
const app = express();
const PORT = 3001;

dotenv.config();
app.use(cors());
app.use(express.json());

// esta especificacion hace que se pueda reconocer los estilos, el window estaba bloqueando la hoja de estilo
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'; style-src 'self' https://www.gstatic.com https://fonts.googleapis.com;");

    next();
});

app.use('/css', express.static(path.resolve(__dirname, '../css')));
app.use('/html', express.static(path.resolve(__dirname, '../html')));
app.use('/js', express.static(path.resolve(__dirname, '../js')));
app.use('/imagenes', express.static(path.resolve(__dirname, '../imagenes')));

app.use('/api/auth', authRoutes);


app.listen(PORT, ()=> { console.log(`Servidor en localhost:${PORT}`)});

const {mostrarUsuariosGuardados} = require('./routes/database');//para mostrar los usuarios almacenados en la base de datos
 //aqui se llama la funcion que muestra los datos, se comenta a conveniencia
// mostrarUsuariosGuardados();

//agregar una GET ruta  para cargar los archivo del json que carga los productos, hacer el codigo reusable, usar como base el index, y la misma extructura sirva para oferta, damas, caballeros, basicamente crar modulos de secciones para importar en la paginas
//investigar principios de programacon KISS SOLID
//poner un comando en package que funcione para correr el servidor
//mejorar hover para ingresae usuario