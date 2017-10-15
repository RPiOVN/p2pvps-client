/*global define*/
//Define libraries this file depends on.
define([
	'jQuery-2.1.4.min',
	'underscore_1.3.3',
	'backbone_0.9.2',  
  'text!../../../js/market/templates/editProfile.html'
  //'/js/lib/bootstrap-table.js'
], function ($, _, Backbone, EditProfileTemplate) {
            //  BootstrapTable
            // ) {
	'use strict';

	var EditProfileView = Backbone.View.extend({

		tagName:  'div',
    
    el: '#editProfileView', 

		template: _.template(EditProfileTemplate),

		// The DOM events specific to an item.
		events: {
      //'click #submitButton': 'logWork',
      'click #updateUserData': 'updateUserData',
      //'change #showProfile': 'toggleAbout'
		},

		initialize: function () {

		},

    render: function () {
      //debugger;
      try {
        log.push('Executing editProfileView.js/render()');
      
        this.$el.html(this.template);

        $('#editProfileView').show();

        //Fill in the form with the user data
        this.$el.find('#firstName').val(userdata.name.first);
        this.$el.find('#lastName').val(userdata.name.last);
        this.$el.find('#inputEmail').val(userdata.email);

        if(userdata.avatarUrl) {
          //this.$el.find('#avatarImageDiv').append('<img class="img-responsive center-block" src="/uploads/avatars/'+userdata.avatar.filename+'" />');
          this.$el.find('#avatarImage').attr('src', userdata.avatarUrl);
        }

        //If the user begins to fill out the password field, show the second/confirmation password field.
        this.$el.find('#inputPassword1').focus(function() {
          global.editProfileView.$el.find('#hiddenPassword').show();
        })


      
      } catch(err) {
        debugger;
        var msg = 'Error in editProfileView.js/render() Error: '+err.message;
        console.error(msg);
        log.push(msg);
        sendLog();
        
        global.modalView.closeModal(); //Hide the waiting screen.
      }
      
			return this;
		},
    
    //This function is called when the user clicks the 'Update Profile' button.
    updateUserData: function() {
      //debugger;
      try {
        log.push('Executing editProfileView.js/updateUserData()');

        /*** START USERNAME, PASSWORD, AND NAME ***/
        //Get user data from the server
        $.get('/api/users/'+userdata._id, '', function(data) {
          //debugger;

          //Update the user information
          data.user.name.first = global.editProfileView.$el.find('#firstName').val();
          data.user.name.last = global.editProfileView.$el.find('#lastName').val();
          data.user.email = global.editProfileView.$el.find('#inputEmail').val();

          //Update the password if it's not blank and both entries match
          var password = global.editProfileView.$el.find('#inputPassword1').val();

          if((password != "") && (password == global.editProfileView.$el.find('#inputPassword2').val())) {
            data.user.password = password;
          } else if(password != global.editProfileView.$el.find('#inputPassword2').val()){        
            global.modalView.modalData.title = 'Password Mismatch';
            global.modalView.modalData.body = '<p>Passwords do not match!</p>';
            global.modalView.modalData.btn1 = '';
            global.modalView.modalData.btn2 = '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';
            global.modalView.updateModal();
            global.modalView.openModal();

            return;
          }


          /*** END USERNAME, PASSWORD, AND NAME ***/



          /*** START PROFILE PAGE ***/
          //'Public Profile Page' checkbox is checked.
          if($('#showProfile:checked').length) {
            data.user.publicProfile = true;
            data.user.about = global.editProfileView.$el.find('#aboutText').val();

            //debugger;
            //If the privateMapData flag is true, then mark it as false, execute the API, and update the UI to reflect these changes.
            if(data.user.privateMapData) {
              data.user.privateMapData = false;
            }

          //'Public Profile Page' checkbox is NOT checked.
          } else {
            data.user.publicProfile = false;
          }


          /*** END PROFILE PAGE ***/



          /*** START AVATAR ***/
          //Store the updated user data into a new variable.
          var updatedUserData = data.user;

          //If a new avatar image has been uploaded, then send it to the server.
          if( $('#avatarInput').get(0).files[0] != undefined ) {

            //Create a promise that resolves after the avatar image has been uploaded.
            var uploadAvatarImagePromise = global.editProfileView.uploadAvatarImage();

            //This function gets executed the when promise resolves.
            uploadAvatarImagePromise.done(function(data) {
              //debugger;

              if(data.collection)
                console.log('Newly uploaded user avatar GUID: '+data.collection._id);

              //Add the new avatar GUID and image URL to the user data model.
              updatedUserData.avatar = data.collection._id;
              updatedUserData.avatarUrl = '/uploads/avatars/'+data.collection.image.filename;

              //Update the user model with the link to the new avatar image
              global.editProfileView.sendUpdatedUserData(updatedUserData);

            });
            uploadAvatarImagePromise.fail(function(err) {
              debugger;
              var msg = 'Error trying to upload new user Avatar!';
              console.error(msg);
              log.push(msg);
            })

          //New avatar image was not uploaded, but user data still needs to be updated.
          } else {
            //Update the user model with new data.
            global.editProfileView.sendUpdatedUserData(updatedUserData);
          }
          /*** END AVATAR ***/

        })

        //Downloading user data model failed.
        .fail(function(jqXHR, textStatus, errorThrown) {
          debugger;
          var msg = 'There was an error communicating with the server';
          console.error(msg);
          log.push(msg);

          if(jqXHR.responseText) {
            var msg = 'Error: '+jqXHR.responseText;
            console.error(msg);
            log.push(msg);
          }
        });

      } catch(err) {
        debugger;
        var msg = 'Error in editProfileView.js/updateUserData() Error: '+err.message;
        console.error(msg);
        log.push(msg);
        sendLog();
        
        global.modalView.closeModal(); //Hide the waiting screen.
      }
    },
    
    //This function is called by updateUserData(). It's purpose is to send the updated user data
    //to the server.
    sendUpdatedUserData: function(updatedUserData) {
      //debugger;      
      try {
        log.push('Executing editProfileView.js/sendUpdatedUserData()');

        //Send the updated info to the server
        $.post('/api/users/'+userdata._id+'/update', updatedUserData, function(data) { 
          //debugger;

          var oldUserData = userdata;

          //Update the global userdata variable.
          userdata = data.user;

          //Update the user avatar on the front end
          global.updateAvatar();

          //If the privacy settings have changed...
          if(oldUserData.privateMapData != userdata.privateMapData) {
            debugger;

            //If the privateMapData was changed to false, execute the code needed to create a public map.
            if(!userdata.privateMapData) {
              global.mapSettingsView.$el.find('#makePublicCheckbox').prop('checked', true); //Check the checkbox.
              global.mapSettingsView.changePrivacy(); //Execute the API to generate the public map.
            }
          }

          //Confirm data sent successfully
          global.modalView.modalData.title = 'Success!';
          global.modalView.modalData.body = '<p>User data updated successfully!</p>';
          global.modalView.modalData.btn1 = '';
          global.modalView.modalData.btn2 = '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';
          global.modalView.updateModal();
          global.modalView.openModal();

        })

        //Uploading updated user data failed.
        .fail(function(jqXHR, textStatus, errorThrown) {
          debugger;
          var msg = 'There was an error sending user data to the server';
          console.error(msg);
          log.push(msg);

          if(jqXHR.responseText) {
            var msg = 'Error: '+jqXHR.responseText;
            console.error(msg);
            log.push(msg);
          }
        });

      } catch(err) {
        debugger;
        var msg = 'Error in editProfileView.js/sendUpdatedUserData() Error: '+err.message;
        console.error(msg);
        log.push(msg);
        sendLog();
        
        global.modalView.closeModal(); //Hide the waiting screen.
      }
    },
    
    //This function is called when the user clicks the 'Choose File' button. It converts the
    //uploaded image file into a thumbnail image.
    loadThumbnail: function() {
      //debugger;
      try {
        log.push('Choose File button clicked in Edit Profile View. Executing editProfileView.js/loadThumbnail().');

        //Error Handling
        if( $('#avatarInput').get(0).files[0] == undefined ) {
          log('Add New Image aborted. File not selected.');

          global.modalView.errorModal('Error: Please select a file.');
          return;
        }

        var imageFile = $('#avatarInput').get(0).files[0];
        var imageToUpload = $('#avatarImage')[0];

        //Display the selected image file in the browser
        var reader = new FileReader();      //Create a new FileReader object

        reader.onload = (function(aImg) {   //These functions are executed when the FileReader
            return function(e) {            //finishes reading the image file.
                aImg.src = e.target.result; //It displays the image file.
                //global.imageAddNewView.get_image_info();
            }; 
        })(imageToUpload);

        reader.readAsDataURL(imageFile);    //Read the selected file with the FileReader.

        log.push('loadThumbnail() successfuly executed. Image rendered.')
      } catch(err) {
        debugger;
        var msg = 'Error in editProfileView.js/loadThumbnail() Error: '+err.message;
        console.error(msg);
        log.push(msg);
        sendLog();
        
        global.modalView.closeModal(); //Hide the waiting screen.
      }
    },
    
    //This function is called from updateUserData(). It's returns a promise that resolves after an avatar image has successfully been uploaded.
    uploadAvatarImage: function() {
      //debugger;
      try {
        log.push('Executing editProfileView.js/uploadAvatarImage()');
        
        var selectedFile = $('#avatarInput').get(0).files[0];

        //Create the FormData data object and append the file to it.
        var newFile = new FormData();
        newFile.append('image_upload', selectedFile); //This is the raw file that was selected

        //Create a new promise object (jQuery called them Deferred).
        var promise = $.Deferred();

        //Upload the image to the server.
        var opts = {
          url: '/api/useravatar/create',
          data: newFile,
          cache: false,
          contentType: false,
          processData: false,
          type: 'POST',

          success: function(data){

            var avatarId = data.image_upload._id;

            //GET the newly created useravatar DB entry to get all the filename of the public image.
            //This is needed to get the GUID and the new file name.
            $.get('/api/useravatar/'+avatarId, '', function(data) {
              promise.resolve(data);
            });

          },

          //This error function is called if the POST fails for submitting the file itself.
          error: function(err) {
            //debugger;
            promise.reject(err);
          }

        };

        //Execute the AJAX operation, and return a promise.
        jQuery.ajax(opts);      
        return promise;
        
      } catch(err) {
        debugger;
        var msg = 'Error in editProfileView.js/uploadAvatarImage() Error: '+err.message;
        console.error(msg);
        log.push(msg);
        sendLog();
        
        global.modalView.closeModal(); //Hide the waiting screen.
      }
    },
    
    
    
	});
  

  //debugger;
	return EditProfileView;
});
