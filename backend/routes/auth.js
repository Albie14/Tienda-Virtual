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
                        console.warn('⚠️ Correo ya registrado:', correo)
                        return res.status(409).json({error: 'El correo ya está registrado.'})
                    }
                    console.error('❌ Error al insertar en base de datos:', err.message)
                    return res.status(500).json({error: 'Error en registro de usuario'});
                }
                console.log('usuario registrado ID: ', this.lastID);
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
    try{
        const {correo} =  req.query;

        if(!correo){
            console.warn('no se envio correo en consulta');
            return res.status(400).json({error: 'Correo es requerido'});
        }

        dataBase.get(`SELECT * FROM users WHERE correo = ?`, [correo], (err, row)=>{
            if(err){
                console.log('Error consultando correo:', err.message);
                return res.status(500).json({error: 'Error en el servidor'})
            }
            if(row){
                console.log('Correo ya registrado:', correo);
            }else{
                console.log('Correo sin usar por otro usuario:', correo);
            }
            return res.status(200).json({exists: !!row})
        })

    }catch{
            console.error('Error inesperado en /check-email:', error.message);
            return res.status(500).json({ error: 'Error inesperado', detalle: error.message });
        }
})

//Inicio de sesion
const limiteIntentosClave = rateLimit({
    windowMs: 2*60*100, //2minutos para ingresar clave correcta
    max:3,
    message: "intento fallido, maximo de intento tres (3), el usuario sera bloqueado",
    standardHeaders: true,
    legacyHeaders: false
})

router.post('/login', limiteIntentosClave, (req, res)=>{
    try{
        console.log('📢 Se recibió una solicitud de login con:', req.body);

        const {correo, contrasena} = req.body;
        dataBase.get(`SELECT * FROM users WHERE correo = ?`, [correo], (err, usuario)=>{
            if(err){
                console.error('Error en la consulta:', err.message);
                return res.status(500).json({error: 'Error interno del servidor'});
            }
            if(!usuario){
                console.warn('Usuario no encontrado:', correo);
                return res.status(400).json({success: false, error: 'correo_incorrecto'})
            }
            bcrypt.compare(contrasena, usuario.contrasena)
                .then(isMatch =>{
                    if (!isMatch) {
                    return res.status(401).json({success: false, error: 'clave_incorrecta' });
                }

            console.log('Clave secreta JWT:', process.env.JWT_SECRET);
            const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                correo: usuario.correo,
                success: true,
                token
            });
            })
            .catch(error => {
                console.error('Error al comparar contraseñas:', error.message);
                return res.status(500).json({ error: 'Error al verificar contraseña' });
            });
        });
    }catch (error){
            console.log("Error inesperado: ", error.message);
            res.status(500).json({error: 'Error en servidor'})
    }
});

//Actualizar  usuario en SQLite
router.put('/update/:id', async(req, res)=>{
    const {nombre, apellido, correo, telefono}= req.body;

    dataBase.run(
        `UPDATE users SET nombre = ?, apellido = ?, correo = ?, telefono = ? WHERE id = ?`,
            [nombre, apellido, correo, telefono, req.params.id],
            function(err){
            if(err){
            console.error(`❌ Error al actualizar usuario: ${err.message}`);
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