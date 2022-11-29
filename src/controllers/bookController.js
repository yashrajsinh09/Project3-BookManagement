const { isValidObjectId } = require("mongoose")
const bookModel = require("../models/bookModel")
const reviewModel = require("../models/reviewModel")
const userModel = require("../models/userModel")
const { isValidBody, isValidText, isValidISBN, isValidReleasedAt } = require("../util/valitor")


//create Books
const createBook = async (req, res) => {
    try {
        const reqBody = req.body;
        let { title, excerpt, userId, ISBN, category, subcategory, releasedAt, } = reqBody;

        if (!isValidBody(reqBody)) return res.status(400).send({ status: false, message: 'Please enter data.' });
     
        if (!title) return res.status(400).send({ status: false, message: "Please fill title." });
        if (!isValidText(title)) return res.status(400).send({ status: false, message: `${title} is not valid.` });
        const existsTitle = await bookModel.findOne({ title })
        if (existsTitle) return res.status(400).send({ status: false, message: `'${title}' this title already exists.` });

        if (!excerpt) return res.status(400).send({ status: false, message: "Please fill excerpt." });
        if (!isValidText(excerpt)) return res.status(400).send({ status: false, message: `${excerpt} is not valid.` });

        // userId validation
        if (!userId) return res.status(400).send({ status: false, message: "Please fill user Id." });
        if (!isValidObjectId(userId)) res.status(400).send({ status: false, message: `${userId} is not valid.` });
        const validUser = await userModel.findById({_id:userId})
        if(!validUser) return res.status(404).send({status:false,message:`${userId}  userId not exist`})
   

        if (!ISBN) return res.status(400).send({ status: false, message: "Please fill ISBN." });
        if (!isValidISBN(ISBN)) return res.status(400).send({ status: false, message: `${ISBN} is not valid.` });
        const existsISBN = await bookModel.findOne({ ISBN })
        if (existsISBN) return res.status(400).send({ status: false, message: `'${ISBN}' this ISBN already exists.` });
      
        if (!category) return res.status(400).send({ status: false, message: "Please fill category." });
        if (!isValidText(category)) return res.status(400).send({ status: false, message: `${category} is not valid.` });
 
        if (!subcategory) return res.status(400).send({ status: false, message: "Please fill subcategory." });
        if (!isValidText(subcategory)) return res.status(400).send({ status: false, message: `${subcategory} is not valid.` });
  
        if (!releasedAt) return res.status(400).send({ status: false, message: "Must present releseAt" });
        if (!isValidReleasedAt) return res.status(400).send({ status: false, message: "enter date in valid format eg. (YYYY-MM-DD)...!" });
        //creat Book data
       let bookData = await bookModel.create(reqBody)
       return res.status(201).send({ status: true, message: "Success", data: bookData });
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}


const getBooks = async (req, res) => {
    try {
        const reqQuery = req.query;
        const { userId, category,subcategory } = reqQuery;

        if (userId)
            if (!isValidObjectId(userId)) return res.status(400).send({ status: false, message: 'user Id is not valid.' })
        if (category)
            if (!isValidText(category)) return res.status(400).send({ status: false, message: 'Enter valid category.' })
        if (subcategory)
            if  (!isValidText(subcategory)) return res.status(400).send({ status: false, message: 'Enter valid subactegory.' })

        if ((Object.keys(reqQuery).length === 0) || (userId || category || subcategory)) {

            const book = await bookModel.find({ $and: [{ isDeleted: false}, reqQuery] })
            .select({title:1, excerpt:1,category:1,releasedAt:1,userId:1, reviews:1}).sort({title:1});

            if (book.length === 0) return res.status(404).send({ status: false, message: 'book not found.' });

            return res.status(200).send({ status: true, data: book });
        } else return res.status(400).send({ status: false, message: 'Invalid query.' });

    } catch (err) {
        console.log(err)
        res.status(500).send({ status: false, error: err.message });
    }
};


const getBooksById = async function (req, res) {
    try {
      let bookId = req.params.bookId;
  
      if (!isValidObjectId(bookId)) return res.status(400).send({ status: false, message: "BookId is not valid" })
    
      let result = await bookModel.findOne({ _id: bookId, isDeleted: false })
      .select({_id:1,title:1,excerpt:1,userId:1,category:1,subcategory:1,isDeleted:1,reviews:1,releasedAt:1,createdAt:1,updatedAt:1}).lean()

      if (!result) return res.status(404).send({ status: false, message: "Book does Not Exist" })
  
      const allRevies = await reviewModel.find({ bookId }).select({ _id: 1, bookId: 1, reviewedBy: 1, reviewedAt: 1, rating: 1, review: 1 })
        result.reviewsData =allRevies
   
      return res.status(200).send({ status: true, Data: result });
    } catch (err) {
      return res.status(500).send({ status: false, message: err.message });
    }
  }
  
module.exports = {createBook,getBooks,getBooksById}
