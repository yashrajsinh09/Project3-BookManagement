const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0;
}

const isValidNumber = function (num) {
    const reg = /^[0-9]{10}$/;
    return reg.test(String(num));
}

const isValidpass = function (password) {
    const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
    return reg.test(String(password));
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email));
}

const isValidName = function (abc) {
    if (typeof abc === 'undefined') return false;
    if (typeof abc != 'string' && abc.trim().length === 0) return false
    const regex = /^[a-z/\s/A-Z]{3,100}$/;
    return regex.test(String(abc));
}


module.exports={isValidRequestBody,isValidNumber,isValidEmail,isValidpass,isValidName}