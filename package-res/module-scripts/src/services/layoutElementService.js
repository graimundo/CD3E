'use strict';

define(
    [
      'cd3e',
      'common-ui/underscore'
    ],
    function (app, _) {
      console.log("Required services/layoutElementService.js");


      var service = app.factory('layoutElementService',
          [
            'ColumnLayoutElement', 'RowLayoutElement',
            function (ColumnLayoutElement, RowLayoutElement) {
              
              /**
               * *
               * @param layoutDefinition
               * @returns {*}
               */
              function createLayoutElement( layoutDefinition ) {
                if ( layoutDefinition.type == "ROW" ) {
                  return new RowLayoutElement();
                } else if ( layoutDefinition.type == "COLUMN" ) {
                  return new ColumnLayoutElement();
                }
              }
            }
          ]);
    });
