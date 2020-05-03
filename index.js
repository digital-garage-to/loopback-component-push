// Copyright IBM Corp. 2013,2019. All Rights Reserved.
// Node module: loopback-component-push
// This file is licensed under the Artistic License 2.0.
// License text available at https://opensource.org/licenses/Artistic-2.0

'use strict';

const SG = require('strong-globalize');
SG.SetRootDir(__dirname);

/**
 * Export the connector
 */
const loopback = require('loopback');
const PushConnector = require('./lib/push-connector');

require('./lib/builtin-models')(loopback);

exports = module.exports = PushConnector;
