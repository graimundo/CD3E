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

    function ( app, _ ) {

        app.controller(
            'dashboardController',
            // dependencies
            [ '$scope', '$timeout', 'dashboardService', 'dropService',
              // controller
              function ( $scope, timer, dashboardService, dropService) {

                  // region controller methods
                  $scope.$watch( 'dashboard', function ( dashboard ) {
                      var x = 42;
                  });

                  $scope.$watch( 'selectedElement', function ( element ) {
                      if(!element) return;
                      console.log('dashboard: selectedEleemnt' + element.getName());
                  });

                  var onDropCallback = dropService.getDropHandler(
                      function(element, category, droppedElementType){
                          if (category === 'layout'){
                              $scope.dashboard.addRootElement( element );
                          }
                      }
                  );

                  // endregion

                  // region scope bindings
                  $scope.onDropCallback = onDropCallback;
                  // endregion

                  // region controller init
                  // region controller init
                  //$scope.dashboard = dashboardService.create();
                  // endregion
              }]
        );
    }
);
