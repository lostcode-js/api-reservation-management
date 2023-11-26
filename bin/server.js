const app = require('../src/app');
const { initDatabase }       = require('../src/database')
require('dotenv').config()

const port = process.env.APP_PORT ?? '8000';

Promise.resolve()
.then(initDatabase)
.then(() => new Promise((resolve, reject) => {
  const server = require('http').createServer(app).listen(port, '0.0.0.0', err =>
    err ? reject(err) : resolve(server)
  )
}))
.then(() => console.log('Servidor iniciado com sucesso!', `porta: ${port}`))
.catch((error) => console.error("Erro ao iniciar servidor", error))