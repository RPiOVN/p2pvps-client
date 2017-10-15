var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Device Private Model
 * ==================
 */

var DevicePrivateModel = new keystone.List('DevicePrivateModel');

DevicePrivateModel.add({
  renterUser: { type: Types.Relationship, ref: 'User' },
  serverSSHPort: { type: String },
  deviceUser: { type: String },
  devicePassword: { type: String }
});

DevicePrivateModel.register();
