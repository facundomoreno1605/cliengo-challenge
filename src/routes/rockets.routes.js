const { Router } = require('express');
const { RocketsController } = require('../controllers');
const { asyncHandlerMiddleware } = require('../middlewares');

const router = new Router();
const path = '/rockets';

router.get(path, asyncHandlerMiddleware(RocketsController.getRockets));

router.get(
  `${path}/launches`,
  asyncHandlerMiddleware(RocketsController.getRocketsLaunches)
);

module.exports = router;
