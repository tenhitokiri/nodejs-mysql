const app = require('./src/index');

//conexión asincrona para levantar el servidor
async function main() {
    await app.listen(app.get('port'));
    console.log(`Servidor Ejecutandose en el puerto ${app.get('port')}`);
}

main();