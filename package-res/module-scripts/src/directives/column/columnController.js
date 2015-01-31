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
          'columnController',
          // dependencies
          ['$scope', '$timeout', 'definitionsProvider', '$rootScope', 'layoutElementFactory', 'componentElementFactory',
            // controller
            function ($scope, timer, definitionsProvider, $rootScope, layoutElementFactory, componentElementFactory) {
              var dropHandlers = {
                'component': elementDropCallback,
                'column': elementDropCallback,
                'row': elementDropCallback,
                'layoutDefinition': layoutDefinitionDropCallback,
                'componentDefinition': componentDefintionDropCallback
              };
              
              function elementDropCallback (element, dest){
                $rootScope.dashboard.moveElement(element, dest);
              }

              function layoutDefinitionDropCallback(type){
                definitionsProvider.getLayoutDefinitions().then(function(layoutDef){
                  var element = layoutElementFactory.create( layoutDef[type] );
                  $scope.column.addChild(element);
                });
              }
              
              function componentDefintionDropCallback(type){
                definitionsProvider.getComponentDefinitions().then(function(componentDef){
                  var component = componentElementFactory.create( componentDef[type] );
                  $scope.column.setComponent(component);
                });
              }
              
              
              // region controller methods
              function selectElement(element) {
                $rootScope.selectedElement = element;
              }

              function isSelected() {
                return $scope.column == $rootScope.selectedElement;
              }

              // endregion

              // region scope bindings
              $scope.onDropCallback = function(event, ui) {
                var draggableType = ui.helper.attr("data-draggable-type"),
                    draggableOptions = JSON.parse(ui.helper.attr('data-draggable-options'));
                
                var targetDraggableType = event.target.attributes['data-draggable-type'].value,
                    targetDraggableOptions = JSON.parse(event.target.attributes['data-draggable-options'].value);

                var callback = dropHandlers[draggableType];
                if( draggableType.indexOf('Definition') > 0 ) { //definition drop
                  callback( draggableOptions.type );
                } else {
                  var element = $rootScope.dashboard.getDescendantElement(draggableOptions.id),
                      destination = $rootScope.dashboard.getDescendantElement(targetDraggableOptions.id);
                  callback(element, destination);
                }
              };

              $scope.selectSelf = function () {
                selectElement( $scope.column );
              };

              $scope.dragSelectSelf = function () {
                selectElement( $scope.column );
                $scope.$apply();
              };

              $scope.isSelected = isSelected;

              $scope.onRemoveButtonClick = function (element) {
                console.log("removed row" + element.getName());
                $rootScope.dashboard.removeElement(element);
              };

              $scope.jqyouiOptions = {
                helper: function(event){
                  var dragObject = $('<div/>');
                  dragObject
                      .addClass(event.currentTarget.classList[0])
                      .addClass('dragging-object')
                      .attr('data-draggable-options', event.currentTarget.attributes['data-draggable-options'].value)
                      .attr('data-draggable-type', event.currentTarget.attributes['data-draggable-type'].value)

                  return dragObject;
                },
                cursor: 'move',
                greedy: true,
                containment: ".layoutBox-body",
                opacity: 1,
                cursorAt: { left: 10, top: 10 }

              };
              // endregion

              // region controller init
              // endregion
            }]
      );
    }
);
