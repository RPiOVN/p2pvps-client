/*global define*/
//Define libraries this file depends on.
define([
	'jQuery-2.1.4.min',
	'underscore_1.3.3',
	'backbone_0.9.2',  
  'text!../../../js/market/templates/rentals.html'
], function ($, _, Backbone, RentalTemplate) {
	'use strict';

	var RentalView = Backbone.View.extend({

		tagName:  'div',
    
    el: '#rentalView', 

		template: _.template(RentalTemplate),

		// The DOM events specific to an item.
		events: {

		},

		initialize: function () {

		},

    render: function () {
      //debugger;
      
      this.$el.html(this.template);
      
      $('#rentalView').show();
      
			return this;
		},
    
    openModal: function() {
      //debugger;
      //global.modalView.render();
      global.modalView.openModal();
    }
    
	});

  //debugger;
	return RentalView;
});
