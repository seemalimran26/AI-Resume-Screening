const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

require("./conn");

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  }),
);

const UserRoutes = require("./Routes/user");
const ResumeRoutes = require("./Routes/resume");

app.use("/api/user", UserRoutes);
app.use("/api/resume", ResumeRoutes);

app.get("/", (req, res) => {
  res.send("API IS WORKING");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("backend is running on port", PORT);
});
