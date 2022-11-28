const { isValidObjectId } = require("mongoose")
const bookModel = require("../models/bookModel")
const userModel = require("../models/userModel")
const { isValidBody, isValidText, isValidISBN, isValidReleasedAt } = require("../util/valitor")


//create Books
const createBook = async (req, res) => {
    try {
        const reqBody = req.body;
        let { title, excerpt, userId, ISBN, category, subcategory, releasedAt, } = reqBody;

        if (!isValidBody(reqBody)) return res.status(400).send({ status: false, message: 'Please enter data.' });

        if (!title) return res.status(400).send({ status: false, message: "Please fill title" });
        if (!isValidText(title)) res.status(400).send({ status: false, message:  "is not valid" });
        const existsTitle = await bookModel.findOne({ title })
        if (existsTitle) return res.status(400).send({ status: false, message: `'${title}' is title already exists.` });

        if (!excerpt) return res.status(400).send({ status: false, message: "Please fill excerpt." });
        if (!isValidText(excerpt)) res.status(400).send({ status: false, message: `${excerpt} is not valid.` });

        if (!userId) return res.status(400).send({ status: false, message: "Please fill user Id." });
        if (!isValidObjectId(userId)) res.status(400).send({ status: false, message: `${userId} is not valid.` });

        if (!ISBN) return res.status(400).send({ status: false, message: "Please fill ISBN." });
        if (!isValidISBN(ISBN)) res.status(400).send({ status: false, message: `${ISBN} is not valid.` });
        const existsISBN = await bookModel.findOne({ ISBN })
        if (existsISBN) return res.status(400).send({ status: false, message: `'${ISBN}' this ISBN already exists.` });

        if (!category) return res.status(400).send({ status: false, message: "Please fill category." });
        if (!isValidText(category)) res.status(400).send({ status: false, message: `${category} is not valid.` });

        if (!subcategory) return res.status(400).send({ status: false, message: "Please fill subcategory." });
        if (!isValidText(subcategory)) res.status(400).send({ status: false, message: `${subcategory} is not valid.` });

        if (!releasedAt) return res.status(400).send({ status: false, message: "Must present releseAt" });
        if (!isValidReleasedAt) return res.status(400).send({ status: false, message: "enter date in valid format eg. (YYYY-MM-DD)...!" });

        //creat Book data
        let bookData = await bookModel.create(reqBody)
        res.status(201).send({ status: true, message: "Blog has been created", data: bookData });
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

module.exports = {createBook}