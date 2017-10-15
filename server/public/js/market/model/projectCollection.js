define([
  'jQuery-2.1.4.min',
	'underscore_1.3.3',
	'backbone_0.9.2',
  './projectModel.js',
], function ($, _, Backbone, ProjectModel) {

  
  //Create an empty Collection to hold all the posts.
  var ProjectCollection = Backbone.Collection.extend({ //Collection Class
    model: ProjectModel,
    //url: 'http://'+global.serverIp+':'+global.serverPort+'/api/postcategory/list',
    url: '',

    //parse is called when data is returned from the server after a fetch() call.
    //Parse allows me to massage non-standard data before it is returned to the collection.
    parse: function(response) {
      //debugger;
      
      if(response.projects.length == 0) {
        log.push('Empty data returned by server when trying to retrieve Project collection. Most likely due to a new DB.');
        return [global.projectModel];
      } else {
        return response.projects;
      }
    },

    refreshView: false,
    
    initialize: function() {
      //This function is often used for debugging, so leave it here.
      //this.on('change', function(model) {
      //  debugger;
      //});

      //this.url = 'http://'+global.serverIp+':'+global.serverPort+'/api/postcategory/list',
      this.url = '/api/projects/list',
      
      this.on('add', function() {
        debugger;
      });

      this.on('reset', function() {
        //debugger;

        if(this.refreshView) {
          this.refreshView = false;
          //global.categoriesView.render();
        }
        
        //Assumption: this funciton is only called when opening the image gallery. Therefore we need to call it again and
        //finish populating the image library.
        log.push('Finished retrieving Project Collection data from server.');

      });
    }
  });
  
  return ProjectCollection;

});
