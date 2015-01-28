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

define( [ 'cd3e' ],
    function ( app ) {

      app.directive('row', ['$compile', function( $compile ) {
        return {
          restrict: 'E', // 'A' must be used for IE8 compatibility
          replace: true, //replaces the custom directive element with the corresponding expanded HTML, to be HTML-compliant.
          templateUrl: 'src/directives/row/rowTemplate.html',
          controller: 'rowController',
          //isolate scope
          scope: {
            // define directive input / output here
            row: "="
          },
          link: function ( scope, element, attrs) {
            if ( scope.row.getChildren().length > 0 ) {
             var compiled = $compile( '<column data-ng-repeat="column in row.getChildren()" data-column="column"></column>' )(scope);
              element.append(compiled);
            }
          }
        };
      }]);
    }
);

