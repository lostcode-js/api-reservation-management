const express = require('express');
const app = express();

//Rotas
const index = require('./routes/index');
const personRoute = require('./routes/personRoute');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', index);
app.use('/person', personRoute);


app.use(vhost(__dirname + '/app'))
app.use((request, response) => response.status(404).json({error: 'Hic Sunt Dracones'}))

module.exports = app;