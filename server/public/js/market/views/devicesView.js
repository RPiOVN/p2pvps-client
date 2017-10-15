/*global define*/
//Define libraries this file depends on.
define([
	'jQuery-2.1.4.min',
	'underscore_1.3.3',
	'backbone_0.9.2',  
  'text!../../../js/market/templates/devices.html'
], function ($, _, Backbone, DevicesTemplate) {
	'use strict';

	var DevicesView = Backbone.View.extend({

		tagName:  'div',
    
    el: '#devicesView', 

		template: _.template(DevicesTemplate),

		// The DOM events specific to an item.
		events: {
      'click #addNewDeviceBtn': 'loadDeviceEditor',
      //'click .deviceDelete': 'deleteDevice'
		},

		initialize: function () {

		},

    render: function () {
      //debugger;
      
      this.$el.html(this.template);
      
      $('#devicesView').show();
      
      this.populateDevices();
      
			return this;
		},
    
    openModal: function() {
      //debugger;
      //global.modalView.render();
      global.modalView.openModal();
    },
    
    //Load the device editor. This function is called when the user clicks the '+Add New Device' button.
    loadDeviceEditor: function() {
      //debugger;
      
      global.deviceEditorView.render();
    },
    
    //This function is called when the user clicks the 'Delete' button associated with a device.
    deleteDevice: function(deviceId) {
      debugger;
      
      var thisView = this;
      
      //Validation & Error Handling
      if(deviceId == '')
        return;
      
      $.get('/api/devicePublicData/'+deviceId+'/remove', '', function(data) {
        if(!data.success) {
          console.error('Deleting devicePublicData model from server was not successful!');
        } else {
          thisView.render();
        }
      })
      .fail( function(jqxhr, textStatus, error) {
        //This is the error handler.
        debugger;

        log.push('Error while trying to delete device public data model '+deviceId+'in devicesView.js/deleteDevice().');
        //sendLog();
        console.error('Communication error with server while execute devicesView.js/deleteDevice()');
        
      });
    },
    
    //This function is called by render(). It populates the DOM by cloning the scaffold and populating it with device data
    //from the database.
    populateDevices() {
      //debugger;
      
      var thisView = this; //For maintaining scope.
      
      $.get('/api/devicePublicData/list', '', function(data) {
        //debugger;
        
        var deviceList = data.collection;
        var myDevices = [];
        var myUserId = userdata._id;
        
        //Loop through all the devices and collect the ones that belong to this user.
        for(var i=0; i < deviceList.length; i++) {
          var thisDevice = deviceList[i];
          
          if(thisDevice.ownerUser == myUserId) {
            myDevices.push(thisDevice);
          }
        }
        
        //Exit if there are no devices
        if(myDevices.length == 0)
          return;
        
        //Create a line item for each device associated with this user
        for(var i=0; i < myDevices.length; i++) {
          var thisDevice = myDevices[i];
          var thisRow = global.devicesView.$el.find('.deviceScaffold').clone();
          
          thisRow.removeClass('deviceScaffold');
          
          thisRow.find('.deviceId').text(thisDevice._id);
          thisRow.find('.deviceName').text(thisDevice.deviceName);
          thisRow.find('.deviceDescription').find('p').text(thisDevice.deviceDesc);  
          thisRow.find('.deviceDelete').attr('onclick', 'global.devicesView.deleteDevice("'+thisDevice._id+'")');
          
          global.devicesView.$el.find('#deviceList').append(thisRow);
          thisRow.show();
        }
        
        
        
      })
      .fail( function(jqxhr, textStatus, error) {
        //This is the error handler.
        debugger;

        log.push('Error while trying to list device public data in devicesView.js/populateDevices().');
        //sendLog();
        console.error('Communication error with server while execute devicesView.js/populateDevices()');
        
      });
    }
    
	});

  //debugger;
	return DevicesView;
});
