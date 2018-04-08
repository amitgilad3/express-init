 /**
 * @name init-service
 * @param {Array<Object>} routes - array of routes, example route { method: 'get', route: '/', middleware: [fn] }
 * @param {number} port - port to run service (default 3036)
 * @description Initializes an express application running on specified port  to routes and
 * @example
 * const initService = reqiure("@bit/amit.express.global.service");
 * const port = 3000
 * const routes = [{ method: 'get', route: '/status', middleware: [(req, res) => res.ok()] }]
 * initService(routes, port);
 */
module.exports = (routes = [], port = 3036) => {
  const app = require('express')();
  require('../init')(app);
  const logger = require('../logger');
  const router = require('express-promise-router')();    
  routes.map(({ method, route, middleware }) => router[method](route, middleware));
  router.use((err, req, res, next) => { logger.error(err); if (!res.finished) res.error(err); });      
  app.use(router);
  return app.listen(port, logger.info(`server is listening on port: ${port}`));  
};