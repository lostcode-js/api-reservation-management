const express = require('express');
const app = express();

//Rotas
const index = require('./routes/index');
const userRoute = require('./routes/usersRoute');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', index);
app.use('/user', userRoute);

module.exports = app;