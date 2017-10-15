/*
 *  8/20/17 CT: This model is obsolete. It's only left here to make one of the mock-ups function. 
 *  This code will be removed in the future.
 */

var keystone = require('keystone');

/**
 * ExamplePluginModel Model
 * ==================
 */

var DeviceModel = new keystone.List('DeviceModel');

DeviceModel.add({
	port: { type: String },
  username: { type: String },
  password: { type: String }
});

DeviceModel.register();