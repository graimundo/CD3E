'use strict';

define(
    [
      'cd3e',
      'common-ui/underscore'
    ],
    function (app, _) {

      var componentFactory = app.factory('componentElementFactory',
          [
            'Component', 'propertyFactory',
            function ( Component, propertyFactory ) {

              /**
               * *
               * @param layoutDefinition
               * @returns {ComponentElement}
               */
              function createComponentElement( componentDefinition ) {
                var componentType = componentDefinition.getType();
                var propertyMap = _.object(
                    _.map ( componentDefinition.getPropertyDefinitions(),
                        function ( propertyDefinition, key ) {
                          var property = propertyFactory.create( propertyDefinition );
                          property.setName( key );
                          return [ key, property ];
                        }
                    )
                );

                var component = new Component()
                    .setType( componentType )
                    .setProperties( propertyMap )
                    .setName( _.uniqueId( "Component" ) );

                return component;
              }

              return {
                create: createComponentElement
              };
            }
          ]);

      return componentFactory;
    });
