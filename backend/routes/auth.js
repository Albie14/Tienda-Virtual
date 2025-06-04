const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();
const dataBase = require('./database');


//Registro usuario en SQLite
router.post('/register', async(req, res)=>{
    const {nombre, apellido, correo, telefono, contraseña} =  req.body;
    const clave = await bcrypt.hash(contraseña, 10);

    dataBase.run(`INSERT INTO users(nombre, apellido, correo, telefono, contraseña) VALUES (?, ?, ?)`,
        [nombre, apellido, correo, telefono, contraseña],
        function(err){
        if(err){
            return res.status(500).json({error: 'Error en registro de usuario'});
        }
        res.json({message: 'Usuario registrado exitosamente', id: this.lastID})
    });
})

//Inicio de sesion
router.post('/login', async(req, res)=>{
    const {correo, contraseña} = req.body;
    dataBase.get(`SELECT * FROM users WHERE correo = ?`, [correo], async (err, usuario)=>{
        if(err || !usuario){
            return res.status(400).json({error: 'Usuario no encontrado'});
        }
        if(!await bcrypt.compare(contraseña, usuario.contraseña)){
            return res.status(400).json({error: 'contraseña incorrecta'})
        }
        const token = jwt.sign({id: usuario.id}, process.env.JWT_SECRET, {expiresIn: '1h'});
            res.json({token});
    });
});

//Actaulizar  usuario en SQLite
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