const mongoose = require("mongoose")

const listingSchema = new mongoose.Schema({
    listing_id:{
        type: String,
        required:[true,"Please enter ID"]
    },
    listing_title:{
        type: String,
        required:[true,"Please enter title"]
    },
    description:{
        type: String,
        required:[true,"Please enter description"]
    },
    street:{
        type: String,
        required:[true,"Please enter street"]
    },
    city:{
        type: String,
        required:[true,"Please enter city"]
    },
    postal_code:{
        type: String,
        required:[true,"Please enter Postal code"]
    },
    price:{
        type: Number,
        required:[true,"Please enter price"]
    },
    email:{
        type: String,
        required:true,
        validate: function(value) {
            var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            return emailRegex.test(value);
          }
    },
    username:{
        type: String,
        required:[true,"Please enter username"]
    }
    
})
const listing = mongoose.model("listing",listingSchema)
module.exports = listing