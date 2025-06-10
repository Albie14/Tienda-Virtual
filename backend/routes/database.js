const sqlite3 = require('sqlite3').verbose();
const fs = require('fs'); //crea reporte es formato .csv para ver los usuarios
const path = require('path');//necesario para la creacion de reporte de usuario


//coexion a base de datos
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

//funcion para generar informe de usuarios

function exportarUsuariosCSV(){
    const csvArchivo = path.join(__dirname, `usuario_${Date.now()}.csv`);
    const cabeceraDatos = fs.createWriteStream(csvArchivo);

    //creacion de cabecera del CSV
    cabeceraDatos.write('id,nombre,apellido,correo,telefono\n');

    //toma los datos de la base de datos
    datosGuardados.each('SELECT id, nombre, apellido, correo, telefono FROM users', (err, row) =>{
        if(err){
            console.log(err.message);
            return;
        }
        //crea la fila en CSV por cada ID registrado
        const fila = `${row.id},${row.nombre},${row.apellido},${row.correo},${row.telefono}\n`;
        cabeceraDatos.write(fila);
    }, (err, cantidad) =>{
        if(err){
            console.error(err.message);
        }else{
            console.log(`Exportacion de datos completa ${cantidad}. Registros Guardados en ${csvArchivo}`)
        }
        //cierre de archivo y la base de datos
        cabeceraDatos.end();
    });
}

//funcion para mostrar los datos guardados por consola
function mostrarUsuariosGuardados(){
    dataBase.all('SELECT *FROM users', (err, rows)=>{
        if(err){
            console.error('Error al obtener usuarios: ', err.message);
            return;
        }
        console.log('Usuarios registrados:');
        console.table(rows);
    })
}
// aqui se exporta tanto la base de datos como el reporte CSV
module.exports = {dataBase, exportarUsuariosCSV, mostrarUsuariosGuardados};

