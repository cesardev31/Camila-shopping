const { Router } = require("express");
const salesRouter = require("./sales.routes");
const productsRouter = require("./products.routes");
const rolesRouter = require('./roles.routes');
/*const usersRouter = require('./users.routes');
 */

const routerApi = (app) => {
  const router = Router();
  app.use("/api/v1", router);

  router.use("/sales", salesRouter);
  router.use("/products", productsRouter);
  router.use('/roles', rolesRouter); 
  //router.use('/users', usersRouter);
  
};

module.exports = routerApi;
