'use strict';

define(
    [
      'cd3e',
      'common-ui/underscore'
    ],
    function (app, _) {

      var propertyFactory = app.factory('propertyFactory',
          [
            'Property',
            function ( Property ) {
              
              /**
               * *
               * @param propertyDefinition
               * @returns {Property}
               */
              function createProperty( propertyDefinition ) {
                var property = new Property()
                    .setType( propertyDefinition.getType() )
                    .setName( propertyDefinition.getName() )
                    .setValue( propertyDefinition.getDefaultValue() );

                return property;
              }

              return {
                create: createProperty
              }
            }
          ]);

      return propertyFactory;
    });
