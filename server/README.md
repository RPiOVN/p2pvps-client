# site-template-connextcms
This is a template for customizing ConnextCMS/KeystoneJS for a new website.
It's a slimmed down copy of the [ConnextCMS Plugin Template](https://github.com/skagitpublishing/plugin-template-connextcms). 
The main difference is the `/connextcms` directory present in Plugins is missing from
Sites. This template contains the basic files required to
customize a website served by KeystoneJS and (optionally) managed with ConnextCMS.

## File Structure
    |--keystone/
    |  This is where the KeystoneJS specific files live.
    |  |--models/
    |  |  Add any KeystoneJS models that your plugin needs to this directory.
    |  |--routes/
    |  |  This directory contains the handlers for any new APIs
    |  |  |--exampleRouter.js
    |  |  |  KeystoneJS reads this file to add new View and API paths to the KeystoneJS router.
    |  |  |--exampleplugin.js
    |  |  |  This is a demo/example API handler file.
    |  |--templates/views/
    |  |  This directory contains the KeystoneJS Views
    |  |  |--test.hbs
    |  |  |  This is an example KeystoneJS view.
    |  |  |--loggedinuser.hbs
    |  |  |  This is an example KeystoneJS view that is only accessible to logged in users.
    |  |  |--index.hbs
    |  |  |  This files contains the HTML displayed on the homepage.
    |  |--template/views/layouts/
    |  |  |--default.hbs
    |  |  |  This files contains the HTML that make up the header (navigation menu) and footer of the site.
    |--merge-plugin
    |  Bash shell script for merging your site into a working installation of ConnextCMS and KeystoneJS.
    |  This file assumes you are installing into your home directory (~). If not, change the file paths in this script.


# Installation
The easiest way to get started with ConnextCMS and KeystoneJS is to [clone a demo Droplet](http://connextcms.com/page/clone-your-own). 
This provides you with an operational website out-of-the-box. Follow these [installation instructions](https://github.com/skagitpublishing/connextCMS/wiki/2.-Installation#cloning-the-live-demo)
after recieving your copy of the demo droplet.

If you're not sold on using Droplets and want to develop your website on a different platform,
consider [cloning the Docker image for ConnextCMS](https://github.com/christroutner/docker-connextcms). 
This will also allow you to easily get ConnextCMS and KeystoneJS up and running on any OS or hardware platform
that can run Docker.

Regardless of platform, the installation instructions below assume you are starting with a working copy
of ConnextCMS and KeystoneJS.

1. Start by creating a directory to host this repository. It's assumed that you are following
[ConnextCMS best practices](https://github.com/skagitpublishing/ConnextCMS/wiki/2.-Installation#installation-best-practice) 
and have a `keystone4` and `connextCMS` directory in your home directory. 
For documentation purposes, it's assumed the directory hosting this repository is `~/theme`.

2. Clone this repository and enter the newly created directory:
```
git clone https://github.com/skagitpublishing/site-template-connextcms
cd site-template-connextmcs
```

3. Run the merge script:
`./merge-plugin`

This will copy the index.hbs and default.hbs files that contain the HTML of the hompage and navigation menu, respectively.
You should notice that the homepage on the default installation of ConnextCMS will have changed after running the merge script.
Edit these files with your own HTML to customize the site.



# Design Overview
ConnextCMS now has hooks to allow the development of Sites, similar in nature to WordPress *Themes*. 
Sites allow new websites and web apps to
develop their code base totally independent of the KeystoneJS or ConnextCMS code base. Seprate ConnextCMS *core* and *Site*
code can be updated without one breaking the other. This site template has been developed for the following reasons:

1. To give an example on how JavaScript developers can create their own ConnextCMS/KeystoneJS web apps.

2. To illustrate the various interfaces between KeystoneJS and ConnextCMS. To show where and how the two systems interact and where they are independent.

3. Show how to integrate a HTML template into a new KeystoneJS/ConnextCMS site.


## KeystoneJS
Keystone has its own system for routing API calls, displaying views, and creating database models. ConnextCMS relies heavily on
the API routes and interacts with database models through these APIs. The ConnextCMS dashboard is contained in a single 
KeystoneJS view, but otherwise does not interact with any other KeystoneJS view. This template allows you to create 
new KeystoneJS routes, views, and models as you see fit.

### Keystone Routes
* The API *routes* for this example plugin are defined in `keystone/routes/exampleRouter.js`. This file gets read by Keystone's
`routes/index.js` file when KeystoneJS starts.

* The API *handler* functions for this example plugin live in `keystone/routes/api/exampleplugin.js`. This is the code 
that gets executed when your plugin API is called. 

### Keystone Views
In ConnextCMS, KeystoneJS is configured to use the [Handlebar template language](http://handlebarsjs.com/) for its views. 
View files end with extension .hbs, but HTML can be
copied and pasted into these files. The ConnextCMS Dashboard is a single Keystone View configured for the path `/dashboard`. 
The `/edituser` view which lets users change their password is another example of a Keystone View. 

This plugin contains example views: 
`/test` is a publically accessible view and `/loggedinuser` is a private view, accessible only to logged
in users.

The route for Keystone Views are defined in the `keystone/routes/exampleRouter.js` file, but the website content is 
defined by the .hbs file in the `keystone/templates/views` directory.

### Keystone Models
In many ways KeystoneJS Models act as an API to MongoDB, the database used to power KeystoneJS. Read up on the 
[KeystoneJS model documentation](http://keystonejs.com/docs/database/) for more information.

Any model files in this directory with the same name as default KeystoneJS or ConnextCMS model files will overwrite
those default files. This is useful if you need to add a field to an existing model. For example, if you need
to add a field called 'middleName' to the User model, just copy the default User.js model from KeystoneJS 
and place it in this directory, and add your field. Your updated model will overwrite the default model when the
`merge-plugin` script is executed.


## Support Files
`merge-plugin` is a bash script file that places your plugin files in the appropriate location, according to
[ConnextCMS installation best practices](https://github.com/skagitpublishing/ConnextCMS/wiki/2.-Installation#installation-best-practice).
