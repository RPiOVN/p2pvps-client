/*global define*/
//Define libraries this file depends on.
define([
	'jQuery-2.1.4.min',
	'underscore_1.3.3',
	'backbone_0.9.2',  
  'text!../../../js/market/templates/marketplace.html'
], function ($, _, Backbone, MarketTemplate) {
	'use strict';

	var MarketView = Backbone.View.extend({

		tagName:  'div',
    
    el: '#marketView', 

		template: _.template(MarketTemplate),

		// The DOM events specific to an item.
		events: {

		},

		initialize: function () {

		},

    render: function () {
      //debugger;
      
      this.$el.html(this.template);
      
      $('#marketView').show();
      
			return this;
		},
    
    openModal: function() {
      //debugger;
      //global.modalView.render();
      global.modalView.openModal();
    }
    
	});

  //debugger;
	return MarketView;
});
