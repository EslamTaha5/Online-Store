exports.isValid = (req, res, next) =>{
    if(!req.session.userID){
        next();
    }else{
        res.redirect('/login');
    }
}
exports.inValid = (req, res, next) => {
    if(!req.session.userID){
        next();
    }else{
        res.redirect('/');
    }
}