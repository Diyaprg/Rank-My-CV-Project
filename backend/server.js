const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://rank-my-cv-project.vercel.app"
  ]
}));
app.use(express.json());
app.use("/api/resume", require("./routes/resumeRoutes"));


connectDB();

app.get("/", (req, res) => {
    res.send("ATS Backend Running...");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});