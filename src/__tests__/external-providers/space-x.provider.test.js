const { describe, it, expect, beforeEach } = require('@jest/globals');

const { spaceXProvider } = require('../../external-providers');
const { CommonErrors } = require('../../common');

const mockRocketsData = require('../mocks/rockets-data.mock.json');
const mockLaunchesData = require('../mocks/launches-data.mock.json');
require('jest-fetch-mock').enableMocks();

beforeEach(() => {
  jest.restoreAllMocks();
  fetch.resetMocks();
});

describe(':: Testing SpaceX Provider', () => {
  describe(':: Testing getRocketsData function', () => {
    it('Should return status 500 if failed to fetch rockets data', async () => {
      fetch.mockRejectOnce(new Error('Failed to fetch'));

      try {
        await spaceXProvider.getRocketsData();
      } catch (error) {
        expect(error).toStrictEqual(
          CommonErrors.ExternalProviderError('SpaceX')
        );
      }
    });

    it('Should return rockets data', async () => {
      fetch.mockResponseOnce(JSON.stringify(mockRocketsData));

      const rockets = await spaceXProvider.getRocketsData();
      expect(rockets).toStrictEqual(mockRocketsData);
    });
  });

  describe(':: Testing getLaunchesData function', () => {
    it('Should return status 500 if failed to fetch launches data', async () => {
      fetch.mockRejectOnce(new Error('Failed to fetch'));

      try {
        await spaceXProvider.getLaunchesData();
      } catch (error) {
        expect(error).toStrictEqual(
          CommonErrors.ExternalProviderError('SpaceX')
        );
      }
    });

    it('Should return launches data', async () => {
      fetch.mockResponseOnce(JSON.stringify(mockLaunchesData));

      const launches = await spaceXProvider.getLaunchesData();
      expect(launches).toStrictEqual(mockLaunchesData);
    });
  });
});
