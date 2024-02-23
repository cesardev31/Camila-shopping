const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

// Inicialización de rutas
const routerApi = require("./api/routes/index");
routerApi(app);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== "test") {
    console.error(err.stack);
  }
  res.status(500).json({ message: err.message });
});
module.exports = app;
