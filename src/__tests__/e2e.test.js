const { describe, it, expect, beforeEach } = require('@jest/globals');

const supertest = require('supertest');
const app = require('../server');
const { CommonErrors } = require('../common');
const { spaceXProvider } = require('../external-providers');

beforeEach(() => {
  jest.restoreAllMocks();
});

describe(':: E2E TESTS ::', () => {
  describe(':: Testing GET /rockets ::', () => {
    it('Should return status 200', async () => {
      const response = await supertest(app).get('/api/rockets');
      expect(response.status).toBe(200);
    });
  });

  describe(':: Testing GET /rockets/launches ::', () => {
    it('Should return status 500 if failed to fetch rockets from SpaceX provider', async () => {
      const ProviderError = CommonErrors.ExternalProviderError('SpaceX');
      jest
        .spyOn(spaceXProvider, 'getRocketsData')
        .mockRejectedValue(ProviderError);

      const response = await supertest(app).get('/api/rockets/launches');

      expect(response.status).toBe(ProviderError.statusCode);
      expect(response.body.message).toBe(ProviderError.message);
    });

    it('Should return status 500 if failed to fetch launches from SpaceX provider', async () => {
      const ProviderError = CommonErrors.ExternalProviderError('SpaceX');
      jest
        .spyOn(spaceXProvider, 'getLaunchesData')
        .mockRejectedValue(ProviderError);

      const response = await supertest(app).get('/api/rockets/launches');

      expect(response.status).toBe(ProviderError.statusCode);
      expect(response.body.message).toBe(ProviderError.message);
    });

    it('Should return status 200', async () => {
      const response = await supertest(app).get('/api/rockets/launches');

      expect(response.status).toBe(200);

      expect(response.body).toHaveProperty('rocketLaunches');
      expect(response.body.rocketLaunches).toBeInstanceOf(Array);

      for (const rocketLaunch of response.body.rocketLaunches) {
        expect(rocketLaunch).toHaveProperty('flight_number');
        expect(rocketLaunch).toHaveProperty('mission_name');
        expect(rocketLaunch).toHaveProperty('rocket');
        expect(rocketLaunch.rocket).toHaveProperty('rocket_id');
        expect(rocketLaunch.rocket).toHaveProperty('rocket_name');
        expect(rocketLaunch.rocket).toHaveProperty('description');
        expect(rocketLaunch.rocket).toHaveProperty('images');
        expect(rocketLaunch).toHaveProperty('payloads');
      }
    });
  });
});
