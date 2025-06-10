const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();
const dataBase = require('./database');
const rateLimit = require("express-rate-limit");//para poner limites de intentos a ingresar la clave

//Registro usuario en SQLite
router.post('/register', async(req, res)=>{
    try {
        const { nombre, apellido, correo, telefono, contrasena } = req.body;
        
        if (!nombre || !apellido || !correo || !telefono || !contrasena) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
        }

        const clave = await bcrypt.hash(contrasena, 10);

        dataBase.run
        (`INSERT INTO users(nombre, apellido, correo, telefono, contrasena) VALUES (?, ?, ?, ?, ?)`,
            [nombre, apellido, correo, telefono, clave],
            function(err){
                if(err){
                    if(err.message.includes('UNIQUE constraint failed: users.correo')){
                        console.log('⚠️ Correo ya registrado:', correo)
                        return res.status(409).json({error: 'El correo ya está registrado.'})
                    }
                    console.error('❌ Error al insertar en base de datos:', err.message)
                    return res.status(500).json({error: 'Error en registro de usuario'});
                }

                return res.json({
                    message: 'usuario registrado exitosamente',
                    id: this.lastID,
                });
        });
    }catch(error){
        console.error('❌ Error inesperado:', error.message);
        res.status(500).json({ error: 'Error en el servidor' });
    }
})

//Verificacion de correo que no este registrado

router.get('/check-email', (req, res)=>{
    const {correo} =  req.query;

    if(!correo){
        return res.status(400).json({error: 'Correo es requerido'});
    }

    dataBase.get(`SELECT * FROM users WHERE correo = ?`, [correo], (err, row)=>{
        if(err){
            console.log('Error consultando correo:', err.message);
            return res.status(500).json({error: 'Error en el servidor'})
        }
        if(row){
            return res.status(200).json({exists: true});
        }else{
            return res.status(200).json({exists: false});
        }
    })
})

//Inicio de sesion
const limiteIntentosClave = rateLimit({
    windowMs: 2*60*100, //2minutos para ingresar clave correcta
    max:3,
    message: "intento fallido, maximo de intento tres (3), el usuario sera bloqueado",
    standardHeaders: true,
    
    legacyHeaders: false
})

router.post('/login', limiteIntentosClave, async(req, res)=>{
    const {correo, contrasena} = req.body;
    dataBase.get(`SELECT * FROM users WHERE correo = ?`, [correo], async (err, usuario)=>{
        if(err){
            return res.status(500).json({error: 'Error interno del servidor'});
        }
        if(!usuario){
            return res.status(404).json({error: 'Usuario no encontrado'})
        }
        if(!await bcrypt.compare(contrasena, usuario.contrasena)){
            return res.status(401).json({error: 'contraseña incorrecta'})
        }
        const token = jwt.sign({id: usuario.id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.json({
            success: true, //se incluye esta clave para que el frontend reconozca la verificacion y que estan los datos en la base de datos
            token});
    });
});

//Actualizar  usuario en SQLite
router.put('/update/:id', async(req, res)=>{
    const {nombre, apellido, correo, telefono}= req.body;

    dataBase.run(
        `UPDATE users SET nombre = ?, apellido = ?, correo = ?, telefono = ? WHERE id = ?`,
            [nombre, apellido, correo, telefono, req.params.id],
            function(err){
            if(err){
            return res.status(500).json({error: 'Error al actualizar usuario'})
        }
        res.json({message: 'Usuario actualizado'});
    });
});

// Eliminar usuario en SQLite
router.delete('/delete/:id', async (req, res)=>{
    dataBase.run(`DELETE FROM users WHERE id = ?`, [req.params.id], function(err){
        if(err){
            return res.status(500).json({error: 'Error al eliminar usuario' });
        }
        res.json({message: 'Usuario Eliminado'});
    });
});

module.exports = router;