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
                var component = new Component()
                    .setType( componentType )
                    .setName( _.uniqueId( componentType ) );

                var properties = _.map( componentDefinition.getPropertyDefinitions(),
                    function ( propertyDefinition ) {
                      return propertyFactory.create( propertyDefinition );
                    }
                );
                component.setProperties( properties );

                return component;
              }

              return {
                create: createComponentElement
              }
            }
          ]);

      return componentFactory;
    });
