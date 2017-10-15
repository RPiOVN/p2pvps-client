/*global define*/
//Define libraries this file depends on.
define([
	'jQuery-2.1.4.min',
	'underscore_1.3.3',
	'backbone_0.9.2',  
  'text!../../../js/market/templates/dashboard.html',
  'Chart.min'
], function ($, _, Backbone, DashboardTemplate, Chart) {
	'use strict';

	var DashboardView = Backbone.View.extend({

		tagName:  'div',
    
    el: '#dashboardView', 

		template: _.template(DashboardTemplate),

		// The DOM events specific to an item.
		events: {
      
		},

		initialize: function () {

		},

    render: function () {
      //debugger;
      
      this.$el.html(this.template);
      
      $('#dashboardView').show();
      
			return this;
		},
    
    openModal: function() {
      //debugger;
      //global.modalView.render();
      global.modalView.openModal();
    },
    
    
    
	});

  //debugger;
	return DashboardView;
});
