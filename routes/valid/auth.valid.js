exports.isValid = (req, res, next) =>{
    if(req.session.userId){
        next();
    }else{
        res.redirect('/login');
    }
}
exports.inValid = (req, res, next) => {
    if(!req.session.userId){
        next();
    }else{
        res.redirect('/');
    }
}