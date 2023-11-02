const express = require("express");
const cookieParser = require("cookie-parser")
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.use(cors({
  origin: [`http://localhost:3000`, 'http://13.48.67.62:4000','*'],
  credentials: true, // Enable credentials, including cookies
}));
//route import
const blogs = require("./routes/blogRoute");
const user = require("./routes/userRoutes");


app.use("/api/v1", user);
app.use("/api/v1", blogs);


//middleware for error
const errorMiddleware = require("./middleware/errors");
app.use(errorMiddleware);
module.exports = app