const { CustomError } = require('../utils');

// throwCustomErrorService Errors
const ExternalProviderError = (provider) =>
  new CustomError(`Error with external provider: ${provider}.`, 500);

module.exports = {
  ExternalProviderError
};
