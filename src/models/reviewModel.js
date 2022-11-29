//______________________ Import or Require Modules ________________________________

const mongoose = require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId;
var validator = require('validator');

//____________________________ Creating Schema _____________________________________

const reviewSchema = new mongoose.Schema({
    bookId : {
        type : objectId,
        required: [true, "Please provide the bookId"],
        ref : "Book"
       },
    reviewedBy : {
        type : String,
        required: [true, "Please provide the reviewedBy"],
        trim : true,
        default : "Guest"
    },
    reviewedAt : {
        type : Date,
        required: [true, "Please provide the reviewedAt"],
    },
    rating : {
    type : Number,
    required: [true, "Please provide the rating"],
    min: [1, "Min rating can be 1"],
    max: [5, "Max rating can be 5"],
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

