define([
	//'jQuery-2.1.4.min',
	'underscore_1.3.3',
	'backbone_0.9.2',
  //'bootstrap.3.3.6',
  //'js.cookie',
	'../../js/market/views/leftMenuView.js',
  '../../js/market/views/dashboardView.js',
  //'../../js/market/views/logWorkView.js',
  //'../../js/market/model/logWorkModel.js',
  //'../../js/market/model/logWorkCollection.js',
  //'../../js/market/views/WorkReportView.js',
  //'../../js/market/model/projectModel.js',
  //'../../js/market/model/projectCollection.js',
  '../../js/market/model/userModel.js',
  '../../js/market/model/userCollection.js',
  //'../../js/market/views/projectView.js',
  '../../js/app/views/modalView.js',
  '../../js/market/views/editProfile.js',
  //'/js/lib/bootstrap-table.js',
  'adminlte',
  'logs',
  '../../js/market/views/marketplaceView.js',
  '../../js/market/views/rentalView.js',
  '../../js/market/views/devicesView.js',
  '../../js/market/views/deviceEditor.js'
//], function ($, _, Backbone, Bootstrap, Cookie,
], function (_, Backbone, //Bootstrap,
              LeftMenuView, DashboardView, 
              UserModel, UserCollection,
              ModalView, EditProfileView,
              AdminLTE, Logs,
              MarketView, RentalView, DevicesView, DeviceEditorView
             ) {

  
  //Global Variables
  global = new Object(); //This is where all global variables will be stored.  
  //global.serverIp = serverData.serverIp; 
  //global.serverPort = serverData.serverPort;
  //global.privatePagesSection = serverData.privatePagesSection;
  //global.nrpPort = "8000";
  //global.nodemailerPort = "3000";
  //var csrftoken = ""; //Will host the CSRF token for POST calls.
  
  //TinyMCE state.
  global.tinymce = new Object();
  global.tinymce.initialized = false;
  global.tinymce.currentModelIndex = null;
  global.tinymce.selectedImage = null;
  
  //debugger;
  
  detectBrowser(); //Log the current browser and OS being used.
  
  /*
  if(global.logWorkCollection == undefined) {
    global.logWorkModel = new LogWorkModel();
    
    global.logWorkCollection = new LogWorkCollection();
    global.logWorkCollection.fetch();
  }
  
  if(global.projectCollection == undefined) {
    global.projectModel = new ProjectModel();
    
    global.projectCollection = new ProjectCollection();
    global.projectCollection.fetch();
  }
  */
  
  if(global.userCollection == undefined) {
    global.userModel = new UserModel();
    
    global.userCollection = new UserCollection();
    global.userCollection.fetch();
  }
  
  
  global.leftMenuView = new LeftMenuView();
  global.leftMenuView.render();

  
  //Initialize the dashboard
  global.dashboardView = new DashboardView();
  //debugger;
  global.dashboardView.render();
  
  //global.logWorkView = new LogWorkView();
  //global.workReportView = new WorkReportView();
  //global.projectView = new ProjectView();
  
  global.marketView = new MarketView();
  global.rentalView = new RentalView();
  global.devicesView = new DevicesView();
  global.deviceEditorView = new DeviceEditorView();
  
  //Create the modal and render the view.
  global.modalView = new ModalView();
  global.modalView.render();
  
  global.editProfileView = new EditProfileView();
 
  //Load the user name and avatar
  global.updateAvatar = function() {
    if(userdata) {
      //debugger;

      if(userdata.avatarUrl) {
        $('.user-menu').find('img').attr('src', userdata.avatarUrl);
      }

      $('.user-header').find('p').text(userdata.name.first+' '+userdata.name.last);
      $('.user-menu').find('span').html('<span>'+userdata.name.first+'  <i class="fa fa-caret-square-o-down"></i></span>');
    }
  };
  global.updateAvatar();
  
  //Get the public settings JSON file..
  $.getJSON('/js/publicsettings.json', '', function(data) {
    //debugger;
    global.privatePagesSection = data.privatePagesSection;
  })
  //If sending the data to the server fails:
  .fail(function( jqxhr, textStatus, error ) {
    debugger;

    console.error('Error trying to retrieve JSON data from /js/publicsettings.js');
  });
  
  //Hide the preloader after everything finished loading and document is ready.
  $(document).ready(function() {
    $('#loader-wrapper').hide();
  });
  
  log.push('Finished executing logwork_app.js');
  
  
  /*** BEGIN GLOBAL FUNCTIONS ***/
  
  /*** END GLOBAL FUNCTIONS ***/
});
