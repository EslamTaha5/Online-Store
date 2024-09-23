const authModel = require('../models/autuser.models');
const validResult = require('express-validator').validationResult;

exports.getSignup = (req, res, next)=>{
    res.render('signup',{
        authErr : req.flash("authErr")[0],
        validationErrors : req.flash("validationErrors"),
        isUser: false,
        isAdmin: false,
        pageTitle: "Sign Up"
    });
}
exports.postSignup = (req, res, next) =>{
    if(validResult(req).isEmpty()){
        authModel.addNewUser(req.body.name, req.body.email, req.body.role, req.body.password)
        .then(()=>{
            res.redirect("login");
        })
        .catch(err =>{
          //  console.log('Error Here ' + err);
            req.flash("authErr");
            res.redirect("signup");
        })
    }else{
       // console.log("errors:"+JSON.stringify(validResult(req)));
        req.flash("validationErrors", validResult(req).array());
        res.redirect("signup");
    }
}