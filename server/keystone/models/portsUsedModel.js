var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Files Model - an array of JSON strings listing the available files for each user.
 * ==========
 */

var PortsUsedModel = new keystone.List('PortsUsedModel', {});

PortsUsedModel.add({
  usedPorts: { type: Types.TextArray }
});


PortsUsedModel.defaultColumns = 'usedPorts';
PortsUsedModel.register();