const express = require("express");
const dbConnection = require("./config/database");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const cloudinaryConnect = require("./config/cloudinary");
const CourseRoutes = require("./routes/Course");
const PaymentsRoutes = require("./routes/Payments");
const ProfileRoutes = require("./routes/Profile");
const UserRoutes = require("./routes/User");
const fileupload = require("express-fileupload");
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(PaymentsRoutes);
app.use(ProfileRoutes);
app.use(CourseRoutes);
app.use(UserRoutes);
require("dotenv").config();
const PORT = process.env.PORT;

dbConnection();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
cloudinaryConnect();
app.get("/", (req, res) => {
  res.send("<h1>running mega project</h1>");
});
