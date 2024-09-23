const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Mongourl = 'mongodb+srv://i777slam73:L7csLd6NWvSfGnWv@ecommerce.uz9xj.mongodb.net/?retryWrites=true&w=majority&appName=ecommerce'
const user_schema = mongoose.Schema({
    name:String,
    email:String,
    isAdmin:{
        type : Boolean,
        default: false
    },
    password:String
})

const User = mongoose.model('user', user_schema);

exports.addNewUser = (name, email, role,password) =>{
    return new Promise((resolve, reject)=>{
        mongoose.connect(Mongourl)
        .then(()=>{
            return User.findOne({email:email});
        })
        .then(user=>{
            if(user){
                mongoose.disconnect();
                reject('Already existed user!');
            }else{
                return bcrypt.hash(password, 10);
            }
        }).then(pass=>{
            const new_user = new User( {
                name:name,
                email:email,
                password:pass
            })
            console.log("User : " + new_user);
            return new_user.save();
        }).then(()=>{
            mongoose.disconnect();
            resolve();
        }).catch((error)=>{
            console.log(error);
            mongoose.disconnect();
            reject();
        })

    })
}
exports.get_user = (email, password) => {
    return new Promise((resolve, reject)=>{
        mongoose.connect(Mongourl)
        .then(()=>{
            return User.findOne({email:email});
        })
        .then(user => {
            if(!user){
                mongoose.disconnect();
                reject("User not found!");
            }else{
                return bcrypt.compare(password, user.password)
                .then(equal => {
                    if(equal){
                        mongoose.disconnect();
                        resolve([user._id, user.name, user.isAdmin]);
                    }else{
                        mongoose.disconnect();
                        
                        reject("Incorrect Password!");
                    }
                })
            }
        })
        .catch(err=>{
            reject(err);
        })
    })
}
exports.userById = (ID) => {
    return new Promise((resolve, reject)=>{
        mongoose.connect(Mongourl)
        .then(()=>{
            return User.findById(ID);
        })
        .then(user=>{
            mongoose.disconnect();
            resolve(user);
        })
        .catch(err=>{
            mongoose.disconnect();
            reject(err);
        })
    })
}