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
        console.log("Required controllers/applicationController.js");

        app.controller( 'applicationController',
            // dependencies
            [ '$scope', 'Dashboard', 'componentElementFactory', 'layoutElementFactory', 'definitionsProvider',
            // controller
            function ( $scope, Dashboard, componentFactory, layoutFactory, definitionsProvider ) {

                // region controller methods
                function createDummyDashboard( depth, numChildren, probabilityOfComponent ) {
                    var dashboard = new Dashboard();
                    for( var i = 0; i < numChildren; i++ ) {
                        createDummyRow( depth - 1, numChildren, probabilityOfComponent )
                            .then ( function ( row ) {
                                dashboard.addRootElement( row );
                        });
                    }

                    /*
                    definitionsProvider.getLayoutDefinitions().then(function(layoutDefinitions){
                        var layoutsArray = _.toArray(layoutDefinitions);
                        var row = layoutFactory.create(layoutsArray.LayoutRow);
                        dashboard.addRootElement(row);
                    });
                     */

                    return dashboard;
                }

                function createDummyRow( depth, numChildren, probabilityOfComponent ) {
                    return definitionsProvider.getLayoutDefinitions()
                        .then( function ( layoutDefinitions ) {
                            var rowDefinition = layoutDefinitions.LayoutRow;
                            var row = layoutFactory.create( rowDefinition );
                            var insertedComponent = insertComponent( row, probabilityOfComponent );
                            if ( depth != -1 && !insertedComponent ) {
                                for( var i = 0; i < numChildren; i++ ) {
                                    createDummyColumn( depth - 1, numChildren, probabilityOfComponent )
                                        .then( function ( column )  {
                                            row.addChild( column );
                                    });
                                }
                            }
                            return row;
                        })
                }

                function createDummyColumn( depth, numChildren, probabilityOfComponent ) {
                    return definitionsProvider.getLayoutDefinitions()
                        .then( function ( layoutDefinitions ) {
                            var columnDefinition = layoutDefinitions.LayoutColumn;
                            var column = layoutFactory.create( columnDefinition );
                            var insertedComponent = insertComponent( column, probabilityOfComponent );
                            if ( depth != -1 && !insertedComponent ) {
                                for( var i = 0; i < numChildren; i++ ) {
                                    createDummyRow( depth - 1, numChildren, probabilityOfComponent )
                                        .then( function ( row )  {
                                            row.addChild( column );
                                        });
                                }
                            }
                            return column;
                        })
                }

                function createDummyComponent() {
                    return definitionsProvider.getComponentDefinitions()
                        .then( function ( componentDefinitions ) {
                            var definitionsArray = _.toArray( componentDefinitions );
                            var componentDefinition = definitionsArray[_.random( definitionsArray.length )];
                            return componentFactory.create( componentDefinition  )
                    })
                }

                function insertComponent( layoutElement, probabilityOfComponent ) {
                    if ( _.random( 100 ) <= probabilityOfComponent ) {
                        createDummyComponent().then( function ( component ) {
                            layoutElement.setComponent( component );
                        } );
                        return true;
                    }
                    return false;
                }

                // endregion

                // region scope bindings
                $scope.dashboard = createDummyDashboard( 5, 3, 20 );
                // endregion

                // region controller init
                // endregion
            }]
        );
    }
);

