'use strict';

define(
    [
        'cd3e',
        'common-ui/underscore'
    ],
    function (app, _) {

        var service = app.factory(
            'dropService',
            [
                'definitionsProvider',  'layoutElementFactory', 'componentElementFactory',
                function ( definitionsProvider,  layoutElementFactory, componentElementFactory) {

                  return {
                      getDropHandler: function ( callback ){
                          return function(event, ui){
                              if (!_.isFunction(callback)){
                                  return;
                              }
                              var droppedElement =  ui.helper.attr('data-element');
                              var droppedElementType =  ui.helper.attr('data-element-type');
                              console.log("Dropped: " + droppedElementType);

                              if (droppedElement === 'layout'){
                                  definitionsProvider.getLayoutDefinitions().then(function(layoutDef){
                                      var element = layoutElementFactory.create( layoutDef[droppedElementType] );
                                      callback( element, droppedElement, droppedElementType);
                                  });
                              } else if (droppedElement === 'component'){
                                  definitionsProvider.getComponentDefinitions().then(function(componentDef){
                                      var component = componentElementFactory.create( componentDef[droppedElementType] );
                                      callback( component, droppedElement, droppedElementType);
                                  });
                              }


                          };
                      }
                  };
              }
            ]);

        return service;
    });
