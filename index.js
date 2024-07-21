const express = require("express")
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 9000
const userModel = require("./models/UserModel");
const userRoutes = require("./routes/routes");
const app = express()

connectDB();


app.get("/",(req,res)=>{
    res.send("Huzaifa fyp backend");
})

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(
  cors({
    origin: "*",
    allowOrigin: true,
    optionsSuccessStatus: 200, 
  })
);

app.use(express.json());
app.use(userRoutes)
const server = app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
