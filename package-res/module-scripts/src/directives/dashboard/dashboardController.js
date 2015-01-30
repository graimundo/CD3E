/*
 * Copyright 2002 - 2014 Webdetails, a Pentaho company.  All rights reserved.
 *
 * This software was developed by Webdetails and is provided under the terms
 * of the Mozilla Public License, Version 2.0, or any later version. You may not use
 * this file except in compliance with the license. If you need a copy of the license,
 * please go to  http://mozilla.org/MPL/2.0/. The Initial Developer is Webdetails.
 *
 * Software distributed under the Mozilla Public License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or  implied. Please refer to
 * the license for the specific language governing your rights and limitations.
 */

'use strict';

define(
    [
      'cd3e',
      'common-ui/underscore'
    ],

    function (app, _) {

      app.controller(
          'dashboardController',
          // dependencies
          ['$scope', '$timeout', 'definitionsProvider', '$rootScope', 'layoutElementFactory', 'componentElementFactory',
            // controller
            function ($scope, timer, definitionsProvider, $rootScope, layoutElementFactory, componentElementFactory) {
              var dropHandlers = {
                'component': elementDropCallback,
                'column': elementDropCallback,
                'row': elementDropCallback,
                'layoutDefinition': layoutDefinitionDropCallback
              };

              function elementDropCallback (element, dest){
                $rootScope.dashboard.moveToRoot(element);
              }

              function layoutDefinitionDropCallback(type){
                definitionsProvider.getLayoutDefinitions().then(function(layoutDef){
                  var element = layoutElementFactory.create( layoutDef[type] );
                  $scope.dashboard.addRootElement(element);
                });
              }

              // region controller methods
              $scope.$watch('dashboard', function (dashboard) {
                var x = 42;
              });

              $scope.onDropCallback = function (event, ui) {
                var draggableType = ui.helper.attr("data-draggable-type"),
                    draggableOptions = JSON.parse(ui.helper.attr('data-draggable-options'));

                var callback = dropHandlers[draggableType];
                if (draggableType.indexOf('Definition') > 0) { //definition drop
                  callback(draggableOptions.type);
                } else {
                  var element = $rootScope.dashboard.getDescendantElement(draggableOptions.id);
                  callback(element);
                }
              };

              // endregion

              // region scope bindings
              // endregion

              // region controller init
              // region controller init
              //$scope.dashboard = dashboardService.create();
              // endregion
            }]
      );
    }
);
