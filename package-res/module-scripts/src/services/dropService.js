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



                          };
                      }
                  };
              }
            ]);

        return service;
    });
