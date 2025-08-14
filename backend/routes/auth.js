const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const dataBase = require('./database');
const rateLimit = require("express-rate-limit");//para poner limites de intentos a ingresar la clave
console.log('router delete-user cargado')
//Registro usuario en SQLite

router.post('/register', async(req, res)=>{
    try {
        const { nombre, apellido, correo, telefono, contrasena, terminos } = req.body;
        
        if (!nombre || !apellido || !correo || !telefono || !contrasena || !terminos) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
        }

        const clave = await bcrypt.hash(contrasena, 10);

        dataBase.run
        (`INSERT INTO users(nombre, apellido, correo, telefono, contrasena, terminos) VALUES (?, ?, ?, ?, ?, ?)`,
            [nombre, apellido, correo, telefono, clave, terminos],
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
        console.error('❌ Error inesperado:', error);
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
            // if(row){
            //     console.log('Correo ya registrado:', correo);
            // }else{
            //     console.log('Correo sin usar por otro usuario:', correo);
            // }
            return res.status(200).json({exists: !!row})
        })

    }catch{
            console.error('Error inesperado en /check-email:', error.message);
            return res.status(500).json({ error: 'Error inesperado', detalle: error.message });
        }
})
// comparar el registro de correo para la actualizacion de clave 
const clavesTemporales = {}; /* simula la memoria de la clave por defecto */

router.post('/verificacion-email', (req, res)=>{
    console.log('ENDPOINT alcanzado')
    try{
        const {correo} = req.body;
        dataBase.get(`SELECT * FROM users WHERE correo = ?`, [correo], (err, row)=>{
        if(err) return res.status(500).json({mensaje: 'Error-en-servidor'});
        if(!row) return res.status(404).json({mensaje: 'Correo-no-encotrado'});

        const claveTemporalUnica = Math.floor(10000 + Math.random()*90000).toString();
        clavesTemporales[correo] = claveTemporalUnica;

        // esta es la clave que muestra em consola de navegador para validar, asi accede al segundo modulo y pueda comparar y cambiar la clave
        res.json({claveTemporalUnica});
        })
    }catch{
        console.error('Error inesperado en /verificacion-email:', error.message);
        return res.status(500).json({ error: 'Error inesperado', detalle: error.message });
    }
})
// ruta de verificacion
router.use((req, res, next) => {
  console.log(`➡️ Recibida ${req.method} a ${req.originalUrl}`);
  next();
});


//verificacion clave por defecto y actualizacion de clave
router.put('/actualizar-clave', async(req, res)=>{
    const {correo, nuevaContrasena} = req.body;
    if(!correo || !nuevaContrasena){
        return res.status(400).json({error: 'faltan-datos-obligatorios'});
    }
    try{
        const hash = await bcrypt.hash(nuevaContrasena, 10);
        dataBase.run('UPDATE users SET contrasena = ? WHERE correo = ?', [hash, correo], function(err){
            if(err) {
                console.error('Error al actualizar clave: ', err.message)
                return res.status(500).json({error: 'Error-en-servidor'});
            }
            if(this.changes === 0){
                return res.status(404).json({error: 'Usuario-no-encontrado'})
            }
            res.json({success: true, mensaje: `clave actualizada, correo: ${correo}`})
        })
    }catch(error){
        console.error('Error al encriptar clave:', error.message);
        res.status(500).json({mensaje: 'Error interno del servidor'})
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
    const {correo, contrasena} = req.body;
    try{
        dataBase.get(`SELECT * FROM users WHERE correo = ?`, [correo], (err, usuario)=>{
            if(err){
                console.error('Error en la consulta:', err.message);
                return res.status(500).json({error: 'Error interno del servidor'});
            }
            if(!usuario){
                console.warn('Usuario no encontrado:', correo);
                return res.status(401).json({success: false, error: 'correo_incorrecto'})
            }
            bcrypt.compare(contrasena, usuario.contrasena)
                .then(isMatch =>{
                    if (!isMatch) {
                        console.warn('clave incorrecta');
                    return res.status(401).json({success: false, error: 'clave_incorrecta' });
                }
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

// Eliminar usuario en base de datos
router.post('/delete-user', async(req, res)=>{
    const {correo} = req.body;

        if(!correo){
            console.warn('correo invalido')
            return res.status(400).json({error: 'el correo es obligatorio para eliminar usuario'})
        }        
        dataBase.run('DELETE FROM users WHERE correo = ?', [correo], function(err){
            console.log('Ejecutando DELTE para correo: ', correo)
            if(err){
                console.error('Error al eliminar usuario: ', err.message);
                return res.status(500).json({error: 'Error al eliminar el usuario'})
            }
            if(this.changes == 0){
                console.warn('no se encontro usuario con ese correo: ', correo);
                return res.status(404).json({error: 'usuario no encontrado'})
            }
            console.log('usuario eliminado con correo: ', correo);
            return res.json({message: 'usuario eliminado exitosamente'})
        })
})
module.exports = router;