//______________________ Import or Require Modules ________________________________

const mongoose = require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId;

//____________________________ Creating Schema _____________________________________

const bookSchema = new mongoose.Schema(
   {
   title : {type : String, required : true,trim : true, unique : true},
   excerpt : {type : String, required : true },
   userId : {type : objectId,required : true,unique : true,ref : "User"},
   ISBN : {type : String,required : true,trim : true,unique : true},
   category : {type : String,required : true,trim : true },
   subcategory : {
    type : [ String ],
    required : true,
   },
   reviews : {
    type : Number,
    default : 0,
   },
   deletedAt : {
    type : Date
   },
   isDeleted : {
    type : Boolean,
    default : false
   },
   releasedAt : {
    type : Date,
    required : true,
   }

}, {timestamps: true})

//__________________________ Exporting Book Schema ___________________________________________

module.exports = new mongoose.model('Book', bookSchema)

