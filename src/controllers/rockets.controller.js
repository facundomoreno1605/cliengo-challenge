const { RocketService } = require('../services');

const getRockets = async (req, res) => {
  const rockets = await RocketService.getAllRockets();

  return res.json({ rockets });
};

const getRocketsLaunches = async (req, res) => {
  const rocketLaunches = await RocketService.getRocketsLaunches();

  return res.json({ rocketLaunches });
};

module.exports = { getRockets, getRocketsLaunches };
