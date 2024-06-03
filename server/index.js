const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const router = require('./router/index');
const cros = require('cors')

dotenv.config({ path: './config.env' })
const app = express();

var corsOptions = {
    origin: '*',
}


require('./controllers/mongoDb')
app.use(cros(corsOptions));

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/Images', express.static(__dirname + '/Images'))

app.use(router)


app.listen(process.env.PORT || 8000, () => { console.log('server is on 8000') })