const mongoose = require('mongoose');
const Mongourl = 'mongodb+srv://i777slam73:L7csLd6NWvSfGnWv@ecommerce.uz9xj.mongodb.net/?retryWrites=true&w=majority&appName=ecommerce'
const prod_schema = mongoose.Schema({
    name:String,
    price:Number,
    image: String,
    description: String,
    category: String,
    rate: Number    
})

const product = mongoose.model('product', prod_schema);
exports.AllProd = ()=>{
    return new Promise(
        (resolve, reject)=>{
            mongoose.connect(Mongourl)
            .then(()=>{
                return product.find({});
            })
            .then(prod=>{
                mongoose.disconnect();
                resolve(prod);
            })
            .catch(error =>{
                reject(error);
            })
        }
    )
}
exports.getProductbyCategory = (data)=>{
    return new Promise(
        (resolve, reject)=>{
            mongoose.connect(Mongourl)
            .then(()=>{
                return product.find({category:data});
            })
            .then(prod=>{
                mongoose.disconnect();
                resolve(prod);
            })
            .catch(error =>{
                reject(error);
            })
        }
    )
}

exports.getProductById = id => {
    return new Promise((resolve, reject) => {
        mongoose.connect(Mongourl).then(() => {
            return product.findById(id);
        }).then(product => {
            mongoose.disconnect();
            resolve(product);
        }).catch(err => reject(err));
    })
}

exports.addProduct = (data) => {
    console.log(`product\n ${JSON.stringify(data)}`);
    return new Promise((resolve, reject) => {
        mongoose.connect(Mongourl).then(() => {
            let prod = new product(data)
            return prod.save();
        }).then(() => {
            mongoose.disconnect();
            resolve();
        }).catch(err => {
            mongoose.disconnect();
            reject(err)
        });
    })
}

exports.deleteProduct = (prodId)=>{
    return new Promise((resolve, reject)=>{
        mongoose.connect(Mongourl)
        .then(()=>{
            
            return product.findByIdAndDelete(prodId);
        }).then(() => {
            mongoose.disconnect();
            resolve();
        }).catch(err => {
            mongoose.disconnect();
            reject(err)
        });
    })
}