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
                  var propertyMap = _.object(
                      _.map ( layoutDefinition.getPropertyDefinitions(),
                          function ( layoutDefinition, key ) {
                            var property = propertyFactory.create( layoutDefinition );
                            property.setName( key );
                            return [ key, property ];
                          }
                      )
                  );

                  var element = new elementConstructor()
                      .setType( elementType )
                      .setProperties( propertyMap )
                      .setName( _.uniqueId( elementType ) );

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
