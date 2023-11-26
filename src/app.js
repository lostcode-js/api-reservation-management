const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors({
    origin: ['*'],
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

app.use('/api', require('./routes'))

module.exports = app;