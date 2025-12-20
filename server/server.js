const express = require("express");
const cors = require("cors");
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require("path");

const app = express();

app.use(express.json());

const PORT = 8080;
const corsOptions = {
  origin: ["http://localhost", "http://localhost:5173"],
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get("/", (req, res) => {
  res.json({ message: "Test" });
});

require("./routes/jogadores.routes.js")(app);
require("./routes/clubes.routes.js")(app);

app.listen(PORT, () => {
  console.log(`Server running in port: ${PORT}`);
});

const swaggerDefinition =  {
  openapi: '3.0.1',
  info: {
    title: 'API Clubes Futebol | Documentação | 2025',
    version: '1.0.0',
    description: 'Documentação da REST API do trabalho Prático de PW',
    contact: {
      name: 'IPVC . ESTG . Guilherme Magalhães e Gonçalo Magalhães',
      email: ''
    }
  },
  basePath: '/',
}


const swaggerOptions = {
  swaggerDefinition,
  apis : ['./routes/*.js']
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));