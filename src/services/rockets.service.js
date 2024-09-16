const { spaceXProvider } = require('../external-providers');

const getAllRockets = () => {
  return spaceXProvider.getRocketsData();
};

const getRocketsLaunches = async () => {
  const [rockets, launches] = await Promise.all([
    spaceXProvider.getRocketsData(),
    spaceXProvider.getLaunchesData()
  ]);

  const rocketsLookup = rockets.reduce((acc, rocket) => {
    acc[rocket.rocket_id] = rocket;
    return acc;
  }, {});

  const mergedData = launches.map((launch) => {
    const rocket = rocketsLookup[launch.rocket.rocket_id];

    return {
      flight_number: launch.flight_number,
      mission_name: launch.mission_name,
      rocket: {
        rocket_id: rocket.rocket_id,
        rocket_name: rocket.rocket_name,
        description: rocket.description,
        images: rocket.flickr_images
      },
      payloads: launch.rocket.second_stage.payloads.map((payload) => ({
        payload_id: payload.payload_id,
        manufacturer: payload.manufacturer,
        type: payload.payload_type
      }))
    };
  });

  return mergedData;
};

module.exports = {
  getAllRockets,
  getRocketsLaunches
};
