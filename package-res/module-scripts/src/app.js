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

define(['common-ui/angular',
        'common-ui/angular-route',
        'common-ui/angular-ui-bootstrap',
        'angular-translate',
        'Base'

        // Models
        ,'src/models/model/Dashboard'
        ,'src/models/model/element/ComponentElement'
        ,'src/models/model/Property'
        ,'src/models/model/element/layout/ColumnLayoutElement'
        ,'src/models/model/element/layout/RowLayoutElement'
        ,'src/models/definition/elementDefinition/PropertyDefinition'
        ,'src/models/definition/elementDefinition/ComponentDefinition'
    ],

       function (angular, angularRoute, uiBootstrap, translate, Base
              // Models
              , Dashboard, Component, Property, Column, Row, PropertyDefinition, ComponentDefinition
    ) {

        console.log("Required app.js ");

        // define application module
        var app = angular.module('cd3e', ['ngRoute', 'ui.bootstrap', 'ngSanitize', 'pascalprecht.translate']);

        app.config(['$routeProvider', function ($routeProvider) {

            $routeProvider.when('/',
                {
                    templateUrl: 'src/partials/cd3e.html',
                    controller: 'applicationController'
                });

            $routeProvider.otherwise(
                {
                    redirectTo: '/'
                });

        }]);

        app.config(['$translateProvider', function ($translateProvider) {

            $translateProvider.useStaticFilesLoader({
                prefix: 'lang/messages_',
                suffix: '.properties',
                fileFormat: 'properties'

            });
            // TODO: SESSION_LOCALE AS INJECTED VARIABLE INSTEAD OF GLOBAL
            $translateProvider.preferredLanguage(SESSION_LOCALE)
                .fallbackLanguage('en');

        }]);

        // Disabling history in order to work with Firefox. See [MARKET-184] for more info.
        app.config(['$provide', function ($provide) {
            $provide.decorator('$sniffer', ['$delegate', function ($delegate) {
                $delegate.history = false;
                return $delegate;
            }]);
        }]);

        //enable CORS in Angular http requests
        /*app.config(['$httpProvider', function($httpProvider) {
         $httpProvider.defaults.useXDomain = true;
         delete $httpProvider.defaults.headers.common['X-Requested-With'];
         }]);*/

        app.filter('encodeURI', function () {
            return encodeURI;
        });

        // region Models
        app.factory( 'Dashboard',function() { return  Dashboard; } );
        app.factory( 'Component', function() { return Component;} );
        app.factory( 'Property', function() { return Property;} );
        app.factory( 'Row', function() { return Row;} );
        app.factory( 'Column', function() { return Column;} );

        app.factory( 'PropertyDefinition', function() { return PropertyDefinition; } );
        app.factory( 'ComponentDefinition', function() { return ComponentDefinition; } );

        // endregion

        return app;
    }
);
