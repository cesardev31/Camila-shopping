const app = require("./app");
const initDB = require("./config/init-db");

require("dotenv").config();

const port = process.env.PORT || 3001;

initDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`servidor corriendo y escuchando en el puerto: ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error al iniciar la base de datos:", err);
  });
