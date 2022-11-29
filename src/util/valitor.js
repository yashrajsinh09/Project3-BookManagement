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
function isValidISBN(ISBN) {
    const regex = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/.test(ISBN);
    return regex;
}

//for ReleasedAt
const isValidReleasedAt = (date) => {
// moment.utc(releasedAt, "YYYY-MM-DD", true).isValid(date)
const regex =  /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/.test(date)
return regex
}   

module.exports = {isValidBody,isValidText,isValidObjectId,isValidISBN,isValidReleasedAt}