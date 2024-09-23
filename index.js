const express = require("express");
const path = require('path');
const Session = require('express-session')
const SessionStore = require('connect-mongodb-session')(Session);
const flash = require('connect-flash')
const app = express();


const Mongourl = 'mongodb+srv://i777slam73:L7csLd6NWvSfGnWv@ecommerce.uz9xj.mongodb.net/?retryWrites=true&w=majority&appName=ecommerce'
app.use(express.static(path.join(__dirname, 'images')));

app.use(express.static(path.join(__dirname, '/')));
app.use(express.static(path.join(__dirname, 'assets')));

const ST = new SessionStore({
    uri: Mongourl,
    collection: 'sessions'
})
app.use(Session({
    secret: 'this is my secret=',
    saveUninitialized: false,
    store: ST
}));

app.use(flash());
app.set('view engine', 'ejs');
app.set('views', 'views');


// routes 
const homeRoute = require('./routes/home.routes');
const signupRoute = require('./routes/signup.routes');
const loginRoute = require('./routes/login.routes');
const logout = require('./routes/logout.routes');

const productRoute = require('./routes/product.routes');
const adminRoute = require('./routes/admin.routes');
const ordersRoute = require('./routes/order.routes');
const cartRoute = require('./routes/cart.routes');
app.use('/', homeRoute);
app.use('/', signupRoute);
app.use('/', loginRoute);
app.use('/product', productRoute);
app.use('/admin', adminRoute);
app.use('/', logout);
app.use('/cart', cartRoute);
app.use('/orders', ordersRoute)
const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`Listining to port ${port}`);
});


app.get('error', (req, res, next) => {
    res.status(500);
    res.render('error', {
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin,
        pageTitle: 'Not Allowed',
    })
})
app.use((req, res, next) => {
    res.status(404);
    res.render('pageNotFound', {
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin,
        pageTitle: 'Not Found',
    })
})