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
const isValidReleasedAt = (date) =>  moment.utc(releasedAt, "YYYY-MM-DD", true).isValid(date)

const isValidNumber = function (num) {
    const reg = /^[0-9]{10}$/;
    return reg.test(String(num));
}

const isValidpass = function (password) {
    const reg =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
    return reg.test(String(password));
}

//email validation
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email));
}

//name validation
const isValidName = function (abc) {
    if (typeof abc === 'undefined') return false;
    if (typeof abc != 'string' && abc.trim().length === 0) return false
    const regex = /^[a-z/\s/A-Z]{3,100}$/;
    return regex.test(String(abc));
}
   

module.exports = {isValidBody,isValidText,isValidObjectId,isValidISBN,isValidReleasedAt,isValidNumber,isValidEmail,isValidName,isValidpass}