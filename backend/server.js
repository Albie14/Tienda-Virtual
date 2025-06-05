const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');//importa la ruta desde donde viene las autorizaciones

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.listen(3001, ()=>{
    console.log("servidor en localhost:3001")
});



