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
//var window;

define(
    [
        'cd3e',
        'common-ui/underscore',
        'Base'
    ],
    function ( app, _, Base) {
        console.log( "Required services/componentTemplateProvider.js" );

        var service = app.factory(
            'componentTemplateProvider',
            ['$http', '$q', 'dtoDefinitionsMapperService', 'ComponentDefinition', 'PropertyDefinition',
             function ( $http, $q, dtoMapper, ComponentDefinition, PropertyDefinition) {
                 var componentDefinitions = {}, // store all components here
                     propertyDefinitions = {}; // store all properties here

                 var cdeDefinitionsUrl = CONTEXT_PATH + 'plugin/pentaho-cdf-dd/api/renderer/getComponentDefinitions';
                 var definitionsPromise = null;

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

                                 //return response.data;
                                 return dtoMapper.toTemplates( response.data );
                             }
                         );
                     }

                     return definitionsPromise;
                 }

                 function getLayoutDefinitions(){
                     return getDefinitions().then(function (definitions){

                     });
                 }

                 function processProperty( propertyName, propertyList, componentName){
                     var p = propertyName,
                         property = []; //key, value

                     if (_.isString(p)){
                         property = [p,  propertyList[p][0].stub];
                     } else {
                         if (p.owned){
                             property = [p.name, propertyList[componentName + '_' + p.name][0].stub];
                         } else {
                             property = [p.alias, propertyList[p.name].stub];
                         }
                     }
                     return new PropertyDefinition(property[0], property[1].description, property[1].type, property[0].value );

                 }

                 /*
                 {
                    preExecution: preExecutionPropDefinition,
                 }
                  */
                 function getPropertyDefinitions(){
                     return getDefinitions().then(function (definitions){
                         propertyDefinitions = _.object(
                             _.keys(definitions.properties),
                             _.map(definitions.properties, function(propertyDef){
                                 return new PropertyDefinition( propertyDef[0].type, propertyDef[0].description )
                                     .setValueType( propertyDef[0].stub.type )
                                     .setDefaultValue( propertyDef[0].stub.value )
                                 ;
                             })
                         );
                         return _.clone(propertyDefinitions);
                     });
                 }

                 function getComponentDefinitions(){
                     return $q.all(getDefinitions(), getPropertyDefinitions()).then(function (definitions){
                         //window.definitions = definitions;
                         _.each( definitions.components, function( definitionArray, key){
                             var definition = definitionArray[0];
                             var componentDefinitionRaw =  _.omit(definition, 'properties');
                             componentDefinitionRaw.properties = {};
                             _.each(definition.properties, function(p){
                                 var propName;

                                 if (_.isString(p)){
                                     propName = p;
                                 } else {
                                     if (p.owned){
                                         propName = p.name;
                                     } else {
                                         propName = p.alias;
                                     }
                                 }

                                 componentDefinitionRaw.properties[propName] = propertyDefinitions[propName];
                             });
                             componentDefinitions[key] = new ComponentDefinition(key, key,  componentDefinitionRaw.properties);
                         });
                         return componentDefinitions;
                     });
                 }

                 var ComponentTemplateProvider = Base.extend(
                     {
                         /// Specify service here
                         getComponentTemplates: undefined,
                         getLayoutTemplates: undefined,
                         getDefinitions: getDefinitions

                     },
                     {
                         /// Specify static stuff here
                     }
                 );

                 //return new ComponentTemplateProvider();

                 return {
                     /// Specify service here
                     getPropertyDefinitions: getPropertyDefinitions,
                     getComponentDefinitions: getComponentDefinitions,
                     getLayoutDefinitions: undefined
                 };
             }
            ]);

        return service;
    }
);
