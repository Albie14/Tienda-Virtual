const sqlite3 = require('sqlite3').verbose();

const dataBase = new sqlite3.Database('./database.sqlite', (err)=>{
    if(err){
        console.log('Error conectando a base de datos', err.message);
    }else{
        console.log('Base de datos conectada')
//crea la tabla de usuario que no existe 

        dataBase.run(`
            CREATE TABLE IF NOT EXISTS users(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre TEXT NOT NULL,
                apellido TEXT NOT NULL,
                correo TEXT NOT NULL UNIQUE,
                telefono TEXT NOT NULL,
                contrasena TEXT NOT NULL

            )`,(err)=>{
                if(err){
                    console.log('Error creando tabla users: ', err.message);
                }else{
                    console.log('Tabla users verificada o creada correctamente')
            }
            }
        );
    };
});

module.exports = dataBase;
