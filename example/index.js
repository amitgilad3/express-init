const initService = require("../src/init-service");
const port = 3000
const routes = [{ method: 'get', route: '/status', middleware: [(req, res) => res.ok()] }]
initService(routes, port);