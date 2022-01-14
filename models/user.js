const {Schema , model} = require('mongoose');
const jwt =require('jsonwebtoken');
const userSchema = Schema({
    name :{
        type: String,
        required: true,
    },
    email:{
        type:String,
        maxlength: 255,
        minlength : 8,
        unique: true,
        required : true,
    },
    password :{
        type : String,
        minLength : 5,
        maxLength : 1024,
        required : true,
    }
})
userSchema.methods.generateJWT = function(){
    const token = jwt.sign({id:this._id,email:this.email},process.env.JWT_SECRET_KEY,{expiresIn: "3h"})
    return token
}

module.exports.User = model('User',userSchema);