const pModel = require('../models/product.model');
const ordModel = require('../models/order.model');
const moment = require('moment');
const { validationResult } = require('express-validator');

exports.Add = (req, res, next) =>{
    res.render("addproduct",{
        validationsError : req.flash("validationErrors"),
        isUser:true,
        isAdmin:true,
        pageTitle : "Add Product"
    });
}
exports.postAdd = (req, res, next) =>{
    pModel.addProduct({
        name : req.body.name,
        image: req.file.filename,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category
    }).then(()=>{
        res.redirect("/");
    }).catch(error=>{
       // console.log(error);
        res.redirect('error');
    })
}

exports.getOrders = (req, res, next)=>{
    let category = req.query.category;

    let categories = ['phone', 'computer', 'clothes', 'computer accessories'];
    let lst = {
        'All':'',
        'Phones':'',
        'Clothes':'',
        'Computer':'',
        'Computer Accessories':''
    }
    lst[category] = 'selected';
    let product_promise;
    let email = req.query.email;
    if(email && email != ''){
        product_promise = ordModel.getOrdersByEmail(email, category);
    }else if(category && categories.includes(category)){
        product_promise = ordModel.getOrdersByCategory(category);
    }else{
        product_promise = ordModel.getAll();
    }
    product_promise.then((items)=>{

        for (var i = 0; i < items.length; i++) {
            items[i].final_date = moment(items[i].timestamp).format("DD/MM/YYYY h:mm")
            let  lst = {
                'pending': '',
                'sent': '',
                'completed': '',
            };
            lst[items[i].status] = 'selected';
            items[i].lst = lst
        }
        res.render('manageorders', {
            items,
            isUser: true,
            isAdmin: req.session.isAdmin,
            lst: lst,
            pageTitle: 'Manage Orders',
        })
    })
    .catch(err => {
       // console.log(err);
        res.redirect('/error')
    });
    
}
exports.saveOrder = (req, res, next) => {
    ordersModel.editItem(req.body.orderId, { status: req.body.status, timestamp: Date.now() })
        .then(() => {
            res.redirect('/admin/orders');
        }).catch(err => {
           // console.log(err);
            res.redirect('/error')
        })
}

exports.getProducts = (req, res, next)=>{
    let category = req.query.category
    let categories = ['phone', 'computer', 'clothes', 'computer accessories'];
    let lst = {
        'All':'',
        'Phones':'',
        'Clothes':'',
        'Computer':'',
        'Computer Accessories':''
    }
    lst[category] = 'selected';
    let product_promise;
    if(category && categories.includes(category)){
        product_promise = pModel.getProductbyCategory(category);
    }else{
        product_promise = pModel.AllProd();
    }
    product_promise
    .then((items)=>{
        res.render("manageproducts", {
            items,
            isUser: true,
            lst: lst,
            isAdmin: req.session.isAdmin,
            pageTitle: 'Manage Products'
        })
    })
}
exports.deleteProduct = (req, res, next)=>{
   // console.log('Here', req.body);
    pModel.deleteProduct(req.body.productId)
    .then(()=>{
        res.redirect('/admin/products');
    })
    .catch(err=>{
       // console.log(`Error while deleting + ${err}`);
        res.redirect('/error');
    })
}