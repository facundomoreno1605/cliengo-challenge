const { CommonErrors } = require('../common');

const getRocketsData = async () => {
  try {
    const response = await fetch('https://api.spacexdata.com/v3/rockets');
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    throw CommonErrors.ExternalProviderError('SpaceX');
  }
};

const getLaunchesData = async () => {
  try {
    const response = await fetch('https://api.spacexdata.com/v3/launches');
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    throw CommonErrors.ExternalProviderError('SpaceX');
  }
};

module.exports = {
  getRocketsData,
  getLaunchesData
};
