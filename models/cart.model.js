const mongoose = require('mongoose');
const Mongourl = 'mongodb+srv://i777slam73:L7csLd6NWvSfGnWv@ecommerce.uz9xj.mongodb.net/?retryWrites=true&w=majority&appName=ecommerce'
const { reject } = require('bcrypt/promises');
const { userById } = require('./autuser.models');
const { AllProd } = require('./product.model');

const cartSchema = mongoose.Schema({
    name:String,
    userId: String,
    price: Number,
    productId: String,
    amount: Number,
    timest: Number,
    image: String
});
const cartItem = mongoose.model('cart', cartSchema);

exports.addItem = (item)=>{
    return new Promise((resolve, reject)=>{
        mongoose.connect(Mongourl)
        .then(()=>{
            const newItem = new cartItem(item);

            //console.log(newItem);
            return newItem.save();
        })
        .then(()=>{
            mongoose.disconnect();
            resolve();

        })
        .catch(error=>{
            mongoose.disconnect();
            console.log(error);
            reject(error)
        })
    })
}

exports.deleteItem = (cardId, userId)=>{
    return new Promise((resolve, reject)=>{
        mongoose.connect(Mongourl)
        .then(()=>{
            if (cardId == "delete_all")
                return cartItem.deleteMany({ userId: userId });
            else
                return cartItem.findByIdAndDelete(cardId);
        }).then(() => {
            mongoose.disconnect();
            resolve();
        }).catch(err => {
            mongoose.disconnect();
            reject(err)
        });
    })
}

exports.getItemByCartId = (cartId) =>{
    return new Promise((resolve, reject) => {
        mongoose.connect(Mongourl).
        then(() => {
            return cartItem.findById(cartId);
        }).then((item) => {
            mongoose.disconnect();
            resolve(item);
        }).catch(err => {
            console.log(err);
            mongoose.disconnect();
            reject(err)
        });
    });
}

exports.getItemsByUser = (userId) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(Mongourl).
        then(() => {
            return cartItem.find({ userId: userId }, {}, { sort: { timestamp: 1 } });
        }).then((items) => {
            mongoose.disconnect();
            resolve(items);
        }).catch(err => {
            mongoose.disconnect();
            reject(err)
        });
    })
}
exports.getItemByProductId = (productId) => {
    return new Promise((resolve, reject)=>{
        mongoose.connect(Mongourl)
        .then(()=>{
            return cartItem.find({productId:productId});
        }).then((item) => {
            mongoose.disconnect();
            resolve(item);
        }).catch(err => {
            mongoose.disconnect();
            reject(err)
        });
    })
}

exports.editItem = (cardId, newItem)=>{
    return new Promise((resolve, reject) => {
        mongoose.connect(Mongourl).
        then(() => {
            return cartItem.updateOne({ _id: cardId }, newItem);
        }).then(() => {
            mongoose.disconnect();
            resolve();
        }).catch(err => {
            mongoose.disconnect();
            reject(err)
        });
    })
}