const express = require("express")
const mongoose = require("mongoose")
const app = express()
const route = require("./route/route.js")

app.use(express.json())
mongoose.connect("mongodb+srv://payal-chaudhary:BDoIPGJ3FjU4qpys@cluster0.jjm7nst.mongodb.net/tailweb",
{useNewUrlparser:true}
)

.then(()=>"MongoDb connected")
.catch((error)=>console.log(error))
app.use("/",route);
app.listen(process.env.PORT || 3000, function () {
    console.log("Express app running on port " + (process.env.PORT || 3000));
  });