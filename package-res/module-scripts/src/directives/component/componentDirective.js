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

      app.directive('component', [ '$window', function( $window ) {
        return {
          restrict: 'E', // 'A' must be used for IE8 compatibility
          replace: true, //replaces the custom directive element with the corresponding expanded HTML, to be HTML-compliant.
          templateUrl: 'src/directives/component/componentTemplate.html',
          controller: 'componentController',
          //isolate scope
          scope: {
            // define directive input / output here
              component: "="
          },
          link: function (scope, element, attrs) {
            var opts = {};
            opts['name'] = scope.component.getName();
            _.each( scope.component.getProperties(), function(prop){
              opts[prop.getName()] = prop.getValue();
            });
            opts['htmlObject'] = scope.component.getHtmlObject()+'Component';
            
            var compName = scope.component.getType().substring(10);
            compName = compName.charAt(0).toUpperCase() + compName.slice(1);
            
            require(['cdf/components/'+compName], function (Component) {
              var component = new Component($window.cdfDashboard, opts);
              $window.cdfDashboard.addComponent(component);
              $window.cdfDashboard.update(component);
            });
          }
        };
      }]);
    }
);
