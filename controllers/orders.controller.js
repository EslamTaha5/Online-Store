const Order = require('../models/order.model')
const validationResult = require('express-validator').validationResult;
const moment = require('moment');
exports.getOrders = (req, res, next)=>{
    Order.getItemByUserId(req.session.userId)
    .then((items)=>{
        for (var i = 0; i < items.length; i++) {
            items[i].final_date = moment(items[i].timestamp).format("DD/MM/YYYY h:mm")
        }
        res.render('orders', {
            items,
            isUser: true,
            isAdmin: req.session.isAdmin,
            pageTitle: 'Orders',
        });
    }).catch(err=>{
       // console.log(err);
        res.redirect('/error');
    })
}
exports.addOrder = (req, res, next)=>{
  //  console.log(req.body.address)
    Order.addItem(
        req.session.userId, req.body.address, req.body.cardId
    ).then(()=>{
        res.redirect('/orders');
    }).catch((err)=>{
        res.redirect('/error'); 

    })
}
exports.deleteOrder = (req, res, next) => {
    //console.log(JSON.stringify(req.body) + ' ' + JSON.stringify(req.session));
    Order.deleteItem(req.body.orderId, req.session.userId).then(() => {
        res.redirect('/orders');
    }).catch(err => {
       // console.log(err);
        res.redirect('/error')
    })
}