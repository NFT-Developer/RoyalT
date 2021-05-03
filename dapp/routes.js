const routes = require("next-routes")();

routes.add("/dashboard", "/").add("/r/:releaseID", "/release");

module.exports = routes;
