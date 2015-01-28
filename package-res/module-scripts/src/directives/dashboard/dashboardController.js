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
            [ '$scope', 'dashboardService','definitionsProvider', 'layoutElementFactory',
              // controller
              function ( $scope, dashboardService, definitionsProvider, layoutElementFactory ) {

                  // region controller methods
                  $scope.$watch( 'dashboard', function ( dashboard ) {
                      var x = 42;
                  });

                  $scope.onDropCallback = function(event, ui){
                      var droppedElement =  ui.helper.attr('data-element');
                      var droppedElementType =  ui.helper.attr('data-element-type');
                      console.log("Dropped: " + droppedElementType);

                      if (droppedElement === "layout") {
                          definitionsProvider.getLayoutDefinitions().then(
                              function(layoutDef){
                                  console.log( JSON.stringify( layoutDef[droppedElementType] ));
                                  var element = layoutElementFactory.create( layoutDef[droppedElementType] );
                                  $scope.dashboard.addRootElement( element );
                              }
                          );
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
