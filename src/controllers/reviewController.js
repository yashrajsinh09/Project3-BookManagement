//______________________ Import or Require Modules ________________________________

const reviewModel = require("../models/reviewModel")
const bookModel = require("../models/bookModel")


//______________________ create reviewModel ____________________________________

const createReview = async function (req, res) {
    try {
      let bookId = req.params.bookId;
      let data = req.body;

      data["bookId"] = bookId
      let reviewCreated = await reviewModel.create(data);
  
      if (reviewCreated) {
        let updatedBook = await bookModel.findOneAndUpdate(
          { _id: bookId },
          { $inc: { reviews: 1 } },
          { new: true, upsert: true }
        );
        updatedBook['reviewData'] = reviewCreated
        return res
          .status(201)
          .send({ status: true, message: "Review published", data: reviewCreated });
      }
    } catch (err) {
      return res.status(500).send({ status: false, message: err.message });
    }
  };

  const updateReview = async function (req, res) {
    try {
      let data = req.body;
      let bookId = req.params.bookId;
      let reviewId = req.params.reviewId;
  
      if (!bookId) {
        return res
          .status(400)
          .send({ status: false, message: "bookId is not present" });
      }


      let findReview = await reviewModel.findOne({ _id: reviewId });
  
      if (!findReview) {
        return res.status(404).send({
          status: false,
          message: "A review with this id does not exists",
        });
      }
  
      if (findReview.isDeleted === true) {
        return res
          .status(404)
          .send({ status: false, message: "This review has been deleted" });
      }
  
  
      let updateReview = await reviewModel.findOneAndUpdate(
        { _id: reviewId },
        { $set: { ...data } },
        { new: true, upsert: true }
      );
        return res.status(200).send({
          status: false,
          message: "review updated successfully",
          data: updateReview,
        });
    } catch (err) {
      return res.status(500).send({ status: false, message: err.message });
    }
  };
module.exports = {createReview,updateReview}
