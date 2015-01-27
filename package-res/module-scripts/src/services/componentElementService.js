'use strict';

define(
    [
      'cd3e',
      'common-ui/underscore'
    ],
    function (app, _) {
      console.log("Required services/layoutElementService.js");

      var service = app.factory('componentElementService',
          [
            'ComponentElement',
            function (ComponentElement) {
              
              /**
               * *
               * @param layoutDefinition
               * @returns {ComponentElement}
               */
              function createComponentElement( componentDefinition ) {
                return new ComponentElement( componentDefinition );
              }
            }
          ]);
    });
