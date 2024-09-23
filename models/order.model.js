const mongoose = require('mongoose');
const Mongourl = 'mongodb+srv://i777slam73:L7csLd6NWvSfGnWv@ecommerce.uz9xj.mongodb.net/?retryWrites=true&w=majority&appName=ecommerce'
const cartModel = require('./cart.model');
const userModel = require('./autuser.models');
const { reject } = require('bcrypt/promises');

const orderSchema = mongoose.Schema({
    name:String,
    price: Number,
    amount: Number,
    userId: String,
    cartId: String,
    address: String,
    status: String,
    userEmail: String,
    timestamp: Number,
});
const orderItem = mongoose.model('order', orderSchema);
exports.addItem = (userId, address, cartId)=>{
    return new Promise((resolve, reject)=>{
        cartModel.getItemByCartId(cartId)
        .then(item=>{
            let newItem;
            userModel.userById(userId)
            .then(user=>{
                newItem = new orderItem({
                    name:item.name,
                    price: item.price,
                    amount: item.amount,
                    userId:userId,
                    cartId:cartId,
                    address:address,
                    status:'Pending',
                    userEmail: user.email,
                    timestamp:Date.now()
                });
            }).then(()=>{
                mongoose.connect(Mongourl)
                .then(()=>{
                    return newItem.save();
                })
                .then(()=>{
                    mongoose.disconnect();
                    cartModel.deleteItem(cartId);
                    resolve();
                })
                .catch(err=>{
                    console.log(err);
                    mongoose.disconnect();
                    reject(err);
                });
            }).catch(err=>{
                console.log(err);
                    mongoose.disconnect();
                    reject(err);
            });
        });
    });
}

exports.getItemByUserId = (userId)=>{
    return new Promise((resolve, reject) =>{
        mongoose.connect(Mongourl)
        .then(()=>{
            return orderItem.find({userId:userId},{},{sort:{timestamp:1}});
        })
        .then((items)=>{
            mongoose.disconnect();
            resolve(items);
        })
        .catch(err=>{
            mongoose.disconnect();
            console.log(err);
            reject(err);
        })
    })
}

exports.deleteItem = (orderId, userId) => {
    console.log(orderId + ' ' + userId);
    return new Promise((resolve, reject) => {
        mongoose.connect(Mongourl)
        .then(()=>{
            if(orderId == "delete_all"){
                return orderItem.deleteMany({userId:userId});
            }else{
                return orderItem.findByIdAndDelete(orderId);
            }
        }).then(() => {
            console.log("Deleted");
            mongoose.disconnect();
            resolve();
        }).catch(err => {
            console.log("Failed");
            mongoose.disconnect();
            reject(err)
        });
    })
}

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        mongoose.
        connect(Mongourl).
        then(() => {
            return orderItem.find({}, {}, { sort: { timestamp: 1 } });
        }).then((items) => {
            mongoose.disconnect();
            resolve(items);
        }).catch(err => {
            mongoose.disconnect();
            reject(err)
        });
    })
}

exports.getOrdersByCategory = (category) => {
    return new Promise((resolve, reject) => {
        mongoose.
        connect(Mongourl).
        then(() => {
            return orderItem.find({ status: category }, {}, { sort: { timestamp: 1 } });
        }).then((items) => {
            mongoose.disconnect();
            resolve(items);
        }).catch(err => {
            mongoose.disconnect();
            reject(err)
        });
    })
}
exports.getOrdersByEmail = (email, category) => {
    return new Promise((resolve, reject) => {
        mongoose.
        connect(Mongourl).
        then(() => {
            if (category != 'All')
                return orderItem.find({ userEmail: email, status: category }, {}, { sort: { timestamp: 1 } });
            return orderItem.find({ userEmail: email }, {}, { sort: { timestamp: 1 } });
        }).then((items) => {
            mongoose.disconnect();
            resolve(items);
        }).catch(err => {
            mongoose.disconnect();
            reject(err)
        });
    })
}

exports.editItem = (OrderId, newData) => {
    return new Promise((resolve, reject) => {
        mongoose.
        connect(Mongourl).
        then(() => {
            return orderItem.updateOne({ _id: OrderId }, newData);
        }).then(() => {
            mongoose.disconnect();
            resolve();
        }).catch(err => {
            mongoose.disconnect();
            reject(err)
        });
    })
}