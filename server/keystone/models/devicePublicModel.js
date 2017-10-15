var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Device Public Model
 * ==================
 */

var DevicePublicModel = new keystone.List('DevicePublicModel');

DevicePublicModel.add({ 
  ownerUser: { type: Types.Relationship, ref: 'User' },
	rentStartDate: { type: String },
  rentStopDate: { type: String },
  deviceName: { type: String },
  deviceDesc: { type: String },
  rentHourlyRate: { type: String },
  subdomain: { type: String },
  httpPort: { type: String },
  sshPort: { type: String },
  memory: { type: String },
  diskSpace:  { type: String },
  processor:  { type: String },
  internetSpeed:  { type: String },
  checkinTimeStamp: { type: String }
});

DevicePublicModel.register();
