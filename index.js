const cookieParser = require('cookie-parser');
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const passport_local = require('./config/passport-strategy')
const port = 8080;
const app = express();
const path = require('path');
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());

app.use(session({
    name: 'urmit',
    secret: 'codeadmin',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 10000 * 60 * 60
    }
}));
app.use(passport.initialize());
app.use(passport.session())
app.use(passport.datashow)


// const db = require('./config/mongoose');

const mongoose = require('mongoose')

const url = 'mongodb+srv://urmitkraiyani:Urmit6968@cluster0.qih6ye4.mongodb.net/controlepanel?retryWrites=true&w=majority';

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(url, connectionParams)
    .then(() => {
        console.log('Connected to database ')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

const admin = require('./models/adminmodel');
app.use(cookieParser());
app.use(express.static('asset'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/', require('./routes/admintable/route'));
app.use('/User', require('./routes/User-route/user_route'));

app.listen(port, (err) => {
    if (err) {
        console.log('port is not working');
    }
    return console.log("port is working", port);
});