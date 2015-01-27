'use strict';

define(
    [
      'cd3e',
      'common-ui/underscore'
    ],
    function (app, _) {

      var service = app.factory('layoutElementFactory',
          [
            'Column', 'Row', 'propertyFactory',
            function ( ColumnLayoutElement, RowLayoutElement, propertyFactory ) {

              var knownLayoutTypes = {
                LayoutRow: RowLayoutElement,
                LayoutColumn: ColumnLayoutElement
              };

              /**
               * *
               * @param layoutDefinition
               * @returns {*}
               */
              function createLayoutElement( layoutDefinition ) {
                var elementConstructor = knownLayoutTypes[layoutDefinition.getType()];
                if ( elementConstructor ) {
                  var elementType = layoutDefinition.getType();
                  var element = new elementConstructor()
                      .setType( elementType )
                      .setName( _.uniqueId( elementType ) );

                  var properties = _.map( layoutDefinition.getPropertyDefinitions(),
                      function ( propertyDefinition ) {
                        return propertyFactory.create( propertyDefinition );
                      }
                  );
                  element.setProperties( properties );

                  return element;
                }

                return undefined;
              }

              return {
                create: createLayoutElement
              }

            }
          ]
      );

      return service;
    });
