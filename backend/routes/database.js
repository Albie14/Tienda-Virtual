const sqlite3 = require('sqlite3').verbose();

// Conexión a base de datos
const dataBase = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('❌ Error al conectar a la base de datos:CREATE TABLE users', err.message);
    } else {
        console.log('Base de datos conectada');
        //CREAR tabla de base de datos
        dataBase.run(`
            CREATE TABLE IF NOT EXISTS users(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre TEXT NOT NULL,
                apellido TEXT NOT NULL,
                correo TEXT NOT NULL UNIQUE,
                telefono TEXT NOT NULL,
                contrasena TEXT NOT NULL,
                terminos BOOLEAN NOT NULL
            )
        `, (err) => {
            if (err) {
                console.error('❌ Error al crear la tabla users:', err.message);
            } else {
                console.log('✔️ Tabla users creada correctamente');

                // Mostrar estructura (opcional)
                // dataBase.all("PRAGMA table_info(users)", (err, rows) => {
                //     if (err) console.error(err);
                //     else console.table(rows);
                // });
            }
        });
    }
});

module.exports = dataBase;
