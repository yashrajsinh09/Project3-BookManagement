const express = require("express");
const route = require("./routes/route");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://yashrajsinh09:yashraj2727@assignment.lhpfmud.mongodb.net/group3Database",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("MongoDB is Connected"))
  .catch((err) => console.log(err));

app.use("/", route);

app.listen(port, () => {
  console.log(`Express is Running on ${port}`);
});
