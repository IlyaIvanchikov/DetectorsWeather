const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const routerHome = require('./routes/home');
const routerAdd = require('./routes/add');
const routerSensors = require('./routes/sensors');
const app = express();

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(routerHome);
app.use('/add', routerAdd);
app.use(routerSensors);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server  is running on port ${PORT}`);
})