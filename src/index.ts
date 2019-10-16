 import express from 'express';
 import path from 'path';
 import exphbs from 'express-handlebars';
 import routerHome from './routes/home';
 import routerAdd from './routes/add';
 import routerLogin from './routes/auth';
 import routerSensors from './routes/sensors';
 import mongoose from 'mongoose';
 import session from 'express-session';
 import connectMongo = require('connect-mongodb-session');
 const MongoDBStore = connectMongo(session);
 import constMiddleware from './middleware/variables';

 const MONGODB_URI = 'mongodb+srv://IlyaIvanchikov:456455741852www))@weather-km4rd.mongodb.net/detector';
 const app = express();


  const store = new MongoDBStore({
    collection: 'sessions',
    uri: MONGODB_URI
});

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: 'hbs'
}));

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
