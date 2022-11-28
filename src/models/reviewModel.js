//______________________ Import or Require Modules ________________________________

const mongoose = require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId;

//____________________________ Creating Schema _____________________________________

const reviewSchema = new mongoose.Schema({
    bookId : {
        type : objectId,
        required : true,
        ref : "Book"
       },
    reviewedBy : {
        type : String,
        required : true,
        trim : true,
        default : "Guest"
    },
    reviewedAt : {
        type : Date,
        required : true,
    },
    rating : {
    type : Number,
    required : true,
    },
    review : {
     type : String,   
    },
    isDeleted : 
    { type : Boolean, 
      default: false},
}, {timestamps: true})

//__________________________ Exporting Review Schema ___________________________________________

module.exports = new mongoose.model('Review', reviewSchema)

