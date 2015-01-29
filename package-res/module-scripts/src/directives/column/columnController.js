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
            'columnController',
            // dependencies
            [ '$scope', '$timeout', 'dropService', '$rootScope',
              // controller
              function ( $scope, timer, dropService, $rootScope ) {

                  // region controller methods
                  $scope.$watch( 'column', function ( dashboard ) {
                      var x = 42;
                  });


                  // endregion

                  // region scope bindings
                  $scope.onDropCallback = dropService.getDropHandler(
                      function(element, category, droppedElementType){
                          if (category === 'layout'){
                              $scope.column.addChild( element );
                          } else if (category === 'component') {
                              $scope.column.setComponent( element );
                          }
                      }
                  );
                  $scope.onElementSelection = function(element){
                      console.log('clicked on column' + element.getName() );
                      $rootScope.selectedElement = element;
                  };
                  // endregion

                  // region controller init
                  // endregion
              }]
        );
    }
);
