const express = require('express');
const cors = require('cors');
const { initDatabase } = require('./src/database/index.js')

require('dotenv').config()

const app = express()
const port = process.env.APP_PORT ?? '8000';

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/uploads', express.static('public/uploads'));

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));

app.use('/api', require('./src/routes/index.js'))

app.get("/", (req, res) => {
  res.send("Hello World!")
})

Promise.resolve()
  .then(initDatabase)
  .then(() => new Promise((resolve, reject) => {
    const server = require('http').createServer(app).listen(port, '0.0.0.0', err =>
      err ? reject(err) : resolve(server)
    )
  }))
  .then(() => console.log('Servidor iniciado com sucesso!', `porta: ${port}`))
  .catch((error) => console.error("Erro ao iniciar servidor", error))
