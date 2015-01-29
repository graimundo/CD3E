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
                              var category =  ui.helper.attr('data-category');
                              var droppedElementType =  ui.helper.attr('data-element-type');
                              console.log("Dropped: " + droppedElementType);

                              if (category === 'layout'){
                                  definitionsProvider.getLayoutDefinitions().then(function(layoutDef){
                                      var element = layoutElementFactory.create( layoutDef[droppedElementType] );
                                      callback( element, category, droppedElementType);
                                  });
                              } else if (category === 'component'){
                                  definitionsProvider.getComponentDefinitions().then(function(componentDef){
                                      var component = componentElementFactory.create( componentDef[droppedElementType] );
                                      callback( component, category, droppedElementType);
                                  });
                              }


                          };
                      }
                  };
              }
            ]);

        return service;
    });
