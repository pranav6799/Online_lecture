const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const connectDb = require("./connectDb");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");


const authRouter = require("./Routes/authRoutes");
const courseRouter = require("./Routes/courseRoutes");
const scheduleRouter = require("./Routes/scheduleRoutes");




app.use(cors( origin: 'http://localhost:6001'));
app.use(morgan("dev"));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));




app.use("/api/v1/user", authRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/schedule", scheduleRouter);

app.use((err, req, resp, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Error Occur";
  return resp.status(statusCode).json({
    status: false,
    message,
    statusCode,
  });
});

app.use(express.static(path.join(__dirname,'/client/dist')))

app.get('*',(req,resp)=> resp.sendFile(path.join(__dirname, "/client/dist/index.html")))

const port = 6001;
connectDb();

const server = app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
