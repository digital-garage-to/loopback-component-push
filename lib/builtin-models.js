// Copyright IBM Corp. 2015,2019. All Rights Reserved.
// Node module: loopback-component-push
// This file is licensed under the Artistic License 2.0.
// License text available at https://opensource.org/licenses/Artistic-2.0

'use strict';

const assert = require('assert');

module.exports = function(registry) {
  registry.Installation = createModel(
    require('../models/installation.json'),
    require('../models/installation.js'),
  );

  registry.PushNotification = createModel(
    require('../models/push-notification.json'),
    require('../models/push-notification.js'),
  );

  function createModel(definitionJson, customizeFn) {
    // Clone the JSON definition to allow applications
    // to modify model settings while not affecting
    // settings of new models created in the local registry
    // of another app.
    // This is needed because require() always returns the same
    // object instance it loaded during the first call.
    definitionJson = cloneDeepJson(definitionJson);

    const Model = registry.createModel(definitionJson);
    customizeFn(Model);
    return Model;
  }
};

// Because we are cloning objects created by JSON.parse,
// the cloning algorithm can stay much simpler than a general-purpose
// "cloneDeep" e.g. from lodash.
function cloneDeepJson(obj) {
  const result = Array.isArray(obj) ? [] : {};
  assert.equal(Object.getPrototypeOf(result), Object.getPrototypeOf(obj));
  for (const key in obj) {
    const value = obj[key];
    if (typeof value === 'object') {
      result[key] = cloneDeepJson(value);
    } else {
      result[key] = value;
    }
  }
  return result;
}
