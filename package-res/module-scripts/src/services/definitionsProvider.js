/*
 * Copyright 2002 - 2014 Webdetails, a Pentaho company.  All rights reserved.
 *
 * This software was developed by Webdetails and is provided under the terms
 * of the Mozilla Public License, Version 2.0, or any later version. You may not use
 * this file except in compliance with the license. If you need a copy of the license,
 * please go to  http://mozilla.org/MPL/2.0/. The Initial Developer is Webdetails.
 *
 * Software distributed under the Mozilla Public License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or  implied. Please refer to
 * the license for the specific language governing your rights and limitations.
 */


'use strict';

define(
    [
        'cd3e',
        'common-ui/underscore',
        'Base'
    ],
    function ( app, _, Base) {

        var service = app.factory(
            'definitionsProvider',
            ['$http', '$q', 'dtoDefinitionsMapperService', 'ComponentDefinition', 'PropertyDefinition',
             function ( $http, $q, dtoMapper, ComponentDefinition, PropertyDefinition) {

                 var cdeDefinitionsUrl = CONTEXT_PATH + 'plugin/pentaho-cdf-dd/api/renderer/getComponentDefinitions';

                 var definitionsPromise = null;
                 var componentDefinitionsPromise = null;
                 var propertyDefinitionsPromise = null;
                 var layoutDefinitionsPromise = null;

                 function isResponseError( response ) {
                     return response.status != 200; //data.statusMessage.code.substring(0,5).toLowerCase() == 'error';
                 }


                 /***
                  * Fetch data, parse it and create intermediate objects
                  */
                 function getDefinitions() {
                     if ( definitionsPromise === null ) {
                         definitionsPromise = $http.get( cdeDefinitionsUrl ).then(
                             function ( response ) {
                                 if ( isResponseError( response ) ) {
                                     console.log( "Failed getting CDE component definitions from server." );
                                     return $q.reject( response.data.statusMessage );
                                 }

                                 var definitions = dtoMapper.toDefinitionBlocks( response.data );
                                 return definitions;
                             }
                         );
                     }
                     return definitionsPromise;
                 }

                 function getLayoutDefinitions(){
                     if (layoutDefinitionsPromise === null) {
                         return getPropertyDefinitions().then(function (propertyDef){
                             var rowProps = [
                                 'name', 'cssClass'
                             ];
                             var colProps = rowProps;

                             return {
                                 // TODO: Change ComponentDefinition to LayoutDefinition
                                 LayoutRow: new ComponentDefinition(
                                     'LayoutRow', 'Row',
                                     _.object( rowProps, _.map(rowProps, function(prop){
                                         return propertyDef[prop];
                                     }))
                                 ),
                                 LayoutColumn: new ComponentDefinition(
                                     'LayoutColumn', 'Column',
                                     _.object( colProps, _.map(colProps, function(prop){
                                         return propertyDef[prop];
                                     }))
                                 )
                             };
                         });
                     }
                     return layoutDefinitionsPromise;
                 }


                 function getPropertyDefinitions(){
                     if (propertyDefinitionsPromise === null){
                         return getDefinitions().then(function (definitions){
                             var propertyDefinitions = _.object(
                                 _.keys(definitions.properties),
                                 _.map(definitions.properties, function(propertyDef){
                                     return new PropertyDefinition( propertyDef[0].type, propertyDef[0].description )
                                         .setValueType( propertyDef[0].stub.type )
                                         .setDefaultValue( propertyDef[0].stub.value )
                                     ;
                                 })
                             );
                             return propertyDefinitions;
                         });
                     }
                     return propertyDefinitionsPromise;
                 }

                 function getComponentDefinitions(){
                     if ( componentDefinitionsPromise === null ) {
                         componentDefinitionsPromise = $q.all( [getDefinitions(), getPropertyDefinitions()]).then(function (result){
                             var definitions = result[0];
                             var propDef = result[1];
                             var componentDefinitions = {};
                             _.each( definitions.components, function( definitionArray, key){
                                 var definition = definitionArray[0];
                                 var componentDefinitionRaw =  _.omit(definition, 'properties');
                                 componentDefinitionRaw.properties = {};
                                 _.each(definition.properties, function(p){
                                     var propName, propType;
                                     if (_.isString(p)){
                                         // Global property
                                         propName = p;
                                         propType = p;
                                     } else {
                                         if (p.owned){
                                             // Custom property
                                             propName = p.name;
                                             propType = componentDefinitionRaw.name + '_' + p.name;
                                         } else {
                                             // Renamed global property
                                             propName = p.alias;
                                             propType = p.name;
                                         }
                                     }
                                     componentDefinitionRaw.properties[propName] = propDef[propType];
                                 });
                                 componentDefinitions[key] = new ComponentDefinition(key, componentDefinitionRaw.description,  componentDefinitionRaw.properties);
                             });
                             return componentDefinitions;
                         });
                     }
                     return componentDefinitionsPromise;
                 }


                 var ComponentTemplateProvider = Base.extend(
                     {
                         /// Specify service here
                         // The following methods return promises that yield maps:
                         getComponentDefinitions: getComponentDefinitions, // map { componentType: ComponentDefinition }
                         getPropertyDefinitions: getPropertyDefinitions, // map { propertyType: propertyDefinition }
                         getLayoutDefinitions: getLayoutDefinitions // map { layoutType: ComponentDefinition }

                     },
                     {
                         /// Specify static stuff here
                     }
                 );
                 return new ComponentTemplateProvider();
             }
            ]);

        return service;
    }
);
