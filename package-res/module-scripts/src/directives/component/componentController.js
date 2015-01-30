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
          'componentController',
          // dependencies
          ['$scope', '$rootScope',
            // controller
            function ($scope, $rootScope) {

              // region controller methods
              function selectElement(element) {
                $rootScope.selectedElement = element;
              }

              function isSelected() {
                return $scope.component == $rootScope.selectedElement;
              }

              // endregion

              // region scope bindings
              $scope.onElementSelection = selectElement;

              $scope.isSelected = isSelected;

              $scope.onRemoveButtonClick = function (component) {
                console.log("removed component" + component.getName());
                $rootScope.dashboard.removeElement(component);
              };

              $scope.getSelectedType = function() {
                return $scope.component.getType().replace(/component/i, "");
              };
              // endregion

              // region controller init
              // endregion
            }]
      );
    }
);
