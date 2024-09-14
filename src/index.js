const server = require('./server');
const configs = require('./configs');

const initializeServer = async () => {
  server.listen(configs.PORT, () => {
    console.log(`Server is running on port ${configs.PORT}`);
  });
};

(async () => {
  await initializeServer();
})();
