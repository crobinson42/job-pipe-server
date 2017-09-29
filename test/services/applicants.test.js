const assert = require('assert');
const app = require('../../src/app');

describe('\'applicants\' service', () => {
  it('registered the service', () => {
    const service = app.service('applicants');

    assert.ok(service, 'Registered the service');
  });
});
