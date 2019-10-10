const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const routerHome = require('./routes/home');
const routerAdd = require('./routes/add');
const routerLogin = require('./routes/auth');
const routerSensors = require('./routes/sensors');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const constMiddleware = require('./middleware/variables');

const MONGODB_URI = 'mongodb+srv://IlyaIvanchikov:456455741852www))@weather-km4rd.mongodb.net/detector';
const app = express();


const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})
const store = new MongoStore({
    collection: 'sessions',
    uri: MONGODB_URI
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: 'some secret value',
    resave: false,
    saveUninitialized: false,
    store
}));
app.use(constMiddleware);

app.use(routerHome);
app.use('/add', routerAdd);
app.use(routerSensors);
app.use(routerLogin);

const PORT = process.env.PORT || 3000;


const start = async () => {
    try {
    await mongoose.connect(MONGODB_URI, {useNewUrlParser: true, 
                                 useUnifiedTopology: true,
                                 useFindAndModify: false})
    app.listen(PORT, () => {
        console.log(`server  is running on port ${PORT}`);
    })
 }
    catch(err) {
        console.log(err);
 }
}
start();
