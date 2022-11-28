//______________________ Import or Require Modules ________________________________

const mongoose = require('mongoose')
//____________________________ Creating Schema _____________________________________

const UserSchema = new mongoose.Schema({
   title : {
    type : String,
    required : true,
    trim : true,
    enum : [ "Mr" , "Mrs" , "Miss" ]
   },
   name : {
    type : String,
    required : true,
   },
   phone : {
    type : String,
    required : true,
    unique  : true
   },
   email : {
    type : String,
    required : true,
    unique  : true
   },
   password : {
    type : String,
    required : true,
   },
   address : {
    street: { type : string},
    city: {type : string},
    pincode: {type : string}
   }

}, {timestamps: true})

//__________________________ Exporting User Schema ___________________________________________

module.exports = new mongoose.model('User', UserSchema)

