 import mysql2 from 'mysql2';
 import express from 'express';
 import path from 'path';
 import sequelize from './utils/sequilize';
 import csurf from 'csurf';
 import flash from 'connect-flash';
 import exphbs from 'express-handlebars';
 import routerHome from './routes/home';
 import routerAdd from './routes/add';
 import routerLogin from './routes/auth';
 import profile from './routes/profile';
 import routerSensors from './routes/sensors';
//  import mongoose from 'mongoose';
//  import session from 'express-session';
//  import connectMongo = require('connect-mongodb-session');
//  const MongoDBStore = connectMongo(session);
 import constMiddleware from './middleware/variables';
 import keys from './keys';
 import error404 from './middleware/404';
 import userMiddleware from './middleware/user';
 import fileMiddleware from './middleware/file';
 
 const app = express();


//   const store = new MongoDBStore({
//     collection: 'sessions',
//     uri: keys.MONGODB_URI
// });

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: 'hbs'
}));

app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.urlencoded({extended: true}));
// app.use(session({
//     secret: keys.SECRET_SESSION,
//     resave: false,
//     saveUninitialized: false,
//     store
// }));
// app.use(fileMiddleware.single('avatar'));
// app.use(csurf());
// app.use(flash());
// app.use(constMiddleware);
// app.use(userMiddleware);

app.use(routerHome);
// app.use('/add', routerAdd);
app.use(routerSensors);
// app.use(routerLogin);
// app.use(profile);
// app.use(error404);

 const PORT = process.env.PORT || 3000;

 const start = async () => {
    try {
    await sequelize.sync();
    app.listen(PORT, () => {
        console.log(`server  is running on port ${PORT}`);
    })
 }
    catch(err) {
        console.log(err);
 }
}
start();
