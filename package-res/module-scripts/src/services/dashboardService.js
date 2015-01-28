'use strict';

define(
    [
      'cd3e',
      'common-ui/underscore'
    ],
    function (app, _) {
      console.log("Required services/dashboardService.js");

      var service = app.factory('dashboardService', [
        'Dashboard', 'componentElementFactory', 'layoutElementFactory', 'definitionsProvider',
        function (Dashboard, componentFactory, layoutFactory, definitionsProvider) {
          var dashboard;

          function createDashboard() {
            dashboard = new Dashboard(null /*null root elements*/);
            definitionsProvider.getLayoutDefinitions().then(function(layoutDefinitions){
              var layoutsArray = _.toArray(layoutDefinitions);
              var row = layoutFactory.create(layoutsArray[0]);
              dashboard.addRootElement(row);
            });
            return dashboard;
          }

          return {
            create: createDashboard
          };
        }
      ]);

      return service;
    });
