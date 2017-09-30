const assert = require('assert');
const app = require('../../src/app');

describe('\'formSubmissions\' service', () => {
  it('registered the service', () => {
    const service = app.service('form-submissions');

    assert.ok(service, 'Registered the service');
  });
});
