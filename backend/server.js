const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

// home route
app.get("/", (req, res) => {
  res.send("Backend server is running");
});

// test API
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend API working" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});