
const {Schema ,model, now} = require('mongoose');

const orderSchema = Schema({
    userId : Schema.Types.ObjectId,
    ingredients : [{
        type :{type:String},
        amount : Number,
    }],
    customer : {
        address : String,
        paymentType : String,
        phone: String
    },
    price:Number,
    orderTime :{type:Date ,default: Date.now}
})

module.exports.Order = model("Order",orderSchema)