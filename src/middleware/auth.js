const jwt = require("jsonwebtoken");
const bookModel = require("../models/bookModel");
exports.authentication = function (req, res, next) {
  try {
    let token = req.headers["token"];
    if (!token) {
      return res
        .status(401)
        .send({ status: false, msg: "You are not logged in" });
    }
    try {
      let decodeToken = jwt.verify(token, "group-3");

      req.token = decodeToken;
    } catch (err) {
      return res.status(401).send({
        status: false,
        message:
          "Either the token is expired or is invalid, Please log-in again",
      });
    }
    next();
  } catch (err) {
    return res.status(500).send({ status: false, err: err.message });
  }
};

exports.authorization = async (req, res, next) => {
  try {
    const book = await bookModel.findOne({ _id: req.params.bookId });
    const books = JSON.parse(JSON.stringify(book)); //Deep Copy

    const userId = req.body.userId || books.userId;

    if (req.token.userId != userId) {
      return res.status(403).send({
        status: false,
        msg: "You are not authorized to perform this action",
      });
    }

    next();
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};
