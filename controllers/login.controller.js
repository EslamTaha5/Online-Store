const authModel = require('../models/autuser.models');
const validResult = require('express-validator').validationResult;

exports.getlogin = (req, res, next)=>{
    res.render('login',{
        loginError : req.flash("loginError")[0],
        validationErrors : req.flash("validationErrors"),
        isUser: false,
        isAdmin: req.session.isAdmin,
        pageTitle: "Log In"
    });
}
exports.postlogin = (req, res, next) =>{
    if(validResult(req).isEmpty()){
        authModel.get_user(req.body.email,req.body.password)
        .then((id)=>{
            
            
            req.session.userId = id[0];
            req.session.name = id[1];
            req.session.isAdmin = id[2];
          //  console.log(`id ${id[0]}\n name ${id[1]}\nisAdmin ${id[2]}`);
            res.redirect('/');
        })
        .catch(err =>{
          //  console.log(err);
            req.flash("Login Error");
            res.redirect("login");
        })
    }else{
        req.flash("validationErrors", validResult(req).array());
        //console.log(JSON.stringify(validResult(req).array()) + ' ' + req.body.email);
        res.redirect("login");
    }
}