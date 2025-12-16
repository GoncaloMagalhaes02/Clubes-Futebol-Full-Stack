const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());

const PORT = 8080;
const corsOptions = {
  origin: "http://localhost",
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Test" });
});

app.listen(PORT, () => {
  console.log(`Server running in port: ${PORT}`);
});

require("./routes/jogadores.routes.js")(app);
