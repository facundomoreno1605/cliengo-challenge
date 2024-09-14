const { describe, it, expect, beforeEach } = require('@jest/globals');

const { RocketService } = require('../../services');
const { spaceXProvider } = require('../../external-providers');
const mockRocketsData = require('../mocks/rockets-data.mock.json');
const mockLaunchesData = require('../mocks/launches-data.mock.json');

beforeEach(() => {
  jest.restoreAllMocks();
});

describe(':: Testing Rocket Service', () => {
  describe(':: Testing getAllRockets function', () => {
    it('Should return rockets data', async () => {
      jest
        .spyOn(spaceXProvider, 'getRocketsData')
        .mockResolvedValue(mockRocketsData);

      const rockets = await RocketService.getAllRockets();

      expect(spaceXProvider.getRocketsData).toHaveBeenCalledTimes(1);
      expect(rockets).toStrictEqual(mockRocketsData);
    });
  });

  describe(':: Testing getRocketsLaunches function', () => {
    it('Should return merged data', async () => {
      jest
        .spyOn(spaceXProvider, 'getRocketsData')
        .mockResolvedValue(mockRocketsData);
      jest
        .spyOn(spaceXProvider, 'getLaunchesData')
        .mockResolvedValue(mockLaunchesData);

      const rocketLaunches = await RocketService.getRocketsLaunches();

      expect(spaceXProvider.getRocketsData).toHaveBeenCalledTimes(1);
      expect(spaceXProvider.getLaunchesData).toHaveBeenCalledTimes(1);

      for (const rocketLaunch of rocketLaunches) {
        expect(rocketLaunch).toHaveProperty('flight_number');
        expect(rocketLaunch).toHaveProperty('mission_name');
        expect(rocketLaunch).toHaveProperty('rocket');
        expect(rocketLaunch.rocket).toHaveProperty('rocket_id');
        expect(rocketLaunch.rocket).toHaveProperty('rocket_name');
        expect(rocketLaunch.rocket).toHaveProperty('description');
        expect(rocketLaunch.rocket).toHaveProperty('images');
        expect(rocketLaunch).toHaveProperty('payloads');
        expect(rocketLaunch.payloads).toBeInstanceOf(Array);
        for (const payload of rocketLaunch.payloads) {
          expect(payload).toHaveProperty('payload_id');
          expect(payload).toHaveProperty('manufacturer');
          expect(payload).toHaveProperty('type');
        }
      }
    });
  });
});
