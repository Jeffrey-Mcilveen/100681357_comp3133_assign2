const mongoose = require("mongoose")


const UserSchema = new mongoose.Schema({
    userName:{
        type: String,
        required:[true,"Please enter user name"],
        unique: [true,"That username is taken please choose another"]
    },
    firstName:{
        type: String,
        required:[true,"Please enter first name"]

    },
    lastName:{
        type: String,
        required:[true,"Please enter last name"]
    },
    password:{
        type:String,
        minlength: 6,
        
        required:[true,"Please enter password"]
        
    },
    email:{
        type:String,
        unique:[true,"Duplicate email are not alowed"],
        required:true,
        validate: function(value) {
            var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            return emailRegex.test(value);
          }
    },
    type:{
        type:String,
        enum: ['customer','admin'],
        required: true
    }
})
const user = mongoose.model("user",UserSchema)
module.exports = user