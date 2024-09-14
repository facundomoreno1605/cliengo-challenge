const { CustomError } = require('../utils');

// eslint-disable-next-line no-unused-vars
const errorHandler = async (err, req, res, next) => {
  console.log('Error occurred:', err);

  if (err instanceof CustomError) {
    const { message, statusCode } = err;
    return res.status(statusCode).json({ message });
  }

  return res.status(500).json({ message: 'Internal server error.' });
};

module.exports = errorHandler;
