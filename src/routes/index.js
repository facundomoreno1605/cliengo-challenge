const rocketsRoutes = require('./rockets.routes');

const setRoutes = (app) => {
  app.use('/api', rocketsRoutes);
};

module.exports = setRoutes;
