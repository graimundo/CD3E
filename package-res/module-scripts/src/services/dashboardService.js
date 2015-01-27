'use strict';

define(
    [
      'cd3e',
      'common-ui/underscore'
    ],
    function (app, _) {
      console.log("Required services/dashboardService.js");


      var service = app.factory('dashboardService',
          function() {
            var dashboard;

            function createDashboard() {
              dashboard = new Dashboard(null /*null root elements*/);
            }
          });
    });
