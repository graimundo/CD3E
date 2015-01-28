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
        'common-ui/underscore',
        'Base'
    ],

    function ( app, _ , Base ) {
        console.log("Required controllers/toolboxController.js");

        app.controller( 'toolBoxController',
            // dependencies
            [ '$scope', 'definitionsProvider',
            // controller
            function ( $scope, definitionsProvider ) {

                // TODO: move dummy creation into service
                var DummyFactory = Base.extend({
                    constructor: function() {
                        this._name = _.uniqueId("Factory");
                    },

                    _name: undefined,
                    getName: function() {
                        return this._name;
                    }
                });

                // region controller methods
                function createDummyFactories( numberOfFactories ) {
                    return _.chain( _.range(numberOfFactories) )
                        .map( function () { return new DummyFactory(); } )
                        .value();
                }

                $scope.onStartDragItem = function(event, ui, data){
                    //console.log("Started dragging item #" + JSON.stringify(data));
                };


                // endregion

                // region scope bindings
                //$scope.factories = createDummyFactories(10);

                // endregion

                // region controller init
                definitionsProvider.getLayoutDefinitions().then( function( layoutDefinitions ) {
                    $scope.layoutDefinitions = _.toArray( layoutDefinitions );
                });

                definitionsProvider.getComponentDefinitions().then( function( componentDefinitions ) {
                    $scope.componentDefinitions = _.toArray( componentDefinitions ) ;
                })

                // endregion
            }]
        );
    }
);
