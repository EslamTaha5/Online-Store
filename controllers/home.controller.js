const pmodels = require('../models/product.model');

exports.getHome = (req, res, next) => {
    if (!req.session.name) {

        req.session.name = "Guest";
    }
    let category = req.query.category;

    let categories = ['phone', 'computer', 'clothes', 'computer accessories'];
    let lst = {
        'All':'',
        'Phones':'',
        'Beauty':'',
        'Computer':'',
        'Clothes':''
    }
    lst[category] = 'selected';
    let product_promise;
    if (category && categories.includes(category)) {
        product_promise = pmodels.getProductbyCategory(category);
    } else {
        product_promise = pmodels.AllProd();
    }
    product_promise.then(products=>{
        //console.log(`Home\n${req.session.name} ${req.session.userId}`);
        res.render('index',{
            products:products,
            lst : lst,
            name : req.session.name,
            isUser : req.session.userId,
            isAdmin : req.session.isAdmin,
            valid : req.flash('valid')[0],
            pageTitle : "Online Store"
        })
    }).catch(err =>{
        //console.log(err);
        res.redirect('/error');
    })
}