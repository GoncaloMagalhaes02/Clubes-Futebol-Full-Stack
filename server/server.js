const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 8080;
const corsOptions = {
  origin: "http://localhost",
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Test" });
});

app.listen(PORT, () => {
  console.log(`Server running in port: ${PORT}`);
});
