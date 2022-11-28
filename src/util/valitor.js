const mongoose = require('mongoose');

//isValidBody
const isValidBody = (data) => {
    if (Object.keys(data).length > 0)
        return true
    return false
};

//text
const isValidText = (text) => {
    const regex = /^[A-Za-z0-9_ ]{2,}$/.test(text)
    return regex
}

//mongoDbId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

//ISBN 
const isValidISBN = (ISBN) => {
    const regex = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/.test(ISBN)
    return regex
}

//for ReleasedAt
const isValidReleasedAt = (date) =>  moment.utc(releasedAt, "YYYY-MM-DD", true).isValid(date)
   

module.exports = {isValidBody,isValidText,isValidObjectId,isValidISBN,isValidReleasedAt}