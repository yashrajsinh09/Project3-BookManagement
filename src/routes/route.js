const express = require("express");
const bookController = require("../controllers/bookController");
const userController = require("../controllers/userController");
const reviewController = require("../Controllers/reviewController");
const middleware = require("../Middleware/auth");
const router = express.Router();

router.get("/test", (req, res) => {
  return res.send({ status: true, message: "This is My Group3 Project" });
});

router.post(
  "/books",
  middleware.authentication,
  middleware.authorization,
  bookController.createBook
);
router.get("/books", bookController.getBooks);
router.get("/books/:bookId", bookController.getBooksById);
router.put(
  "/books/:bookId",
  middleware.authentication,
  middleware.authorization,
  bookController.updateBooks
);
router.delete(
  "/books/:bookId",
  middleware.authentication,
  middleware.authorization,
  bookController.deleteBook
);
router.post("/register", userController.createUser);
router.post("/login", userController.login);
router.post("/books/:bookId/review", reviewController.createReview);
router.put("/books/:bookId/review/:reviewId", reviewController.updateReview);
router.delete("/books/:bookId/review/:reviewId", reviewController.deleteReview);

router.all("*", (req, res) => {
  res.status(404).send(`Cannot find ${req.originalUrl}`);
});

module.exports = router;
