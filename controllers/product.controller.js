const prodModel = require('../models/product.model');

exports.getProduct = (req, res, next)=>{
    let id = req.params.id;
    prodModel.getProductById(id).then((product)=>{
        res.render('product', {
            product:product,
            isUser:true,
            isAdmin: req.session.isAdmin,
            validationsError: req.flash('validationsError')[0],
            pageTitle: 'Products',
        });
    }).catch(err=>{
        res.redirect('error');
    })
}
