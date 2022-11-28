//__________________________ Import : Necessary Package and Modules ___________________________________________

const express = require("express");
const route=require('./routes/route')
const mongoose = require("mongoose");
const app = express();
const port = process.env.port || 3000;
app.use(express.json());

//__________________________ Connection : MongoDB Cluster ___________________________________________

mongoose
  .connect("mongodb+srv://yashrajsinh09:yashraj2727@assignment.lhpfmud.mongodb.net/group3Database", {
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB is Connected"))
  .catch((err) => console.log(err));

app.use("/",route)

//__________________________ Listen : Port ___________________________________________

app.listen(port, (req, res) => {
  console.log(`Express is Running on ${port}`);
});
