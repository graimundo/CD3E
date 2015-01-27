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
    function ( app, _, Base ) {
        console.log( "Required services/componentTemplateProvider.js" );

        var service = app.factory(
            'componentTemplateProvider',
            ['$http', '$q', 'dtoDefinitionsMapperService',
             function ( $http, $q, dtoMapper) {
                 var componentDefinitions = {}, // store all components here
                     propertyDefinitions = {}; // store all properties here

                 var cdeDefinitionsUrl = CONTEXT_PATH + 'plugin/pentaho-cdf-dd/api/renderer/getComponentDefinitions';
                 var definitionsPromise = null;

                function isResponseError( response ) {
                    return response.status != 200; //data.statusMessage.code.substring(0,5).toLowerCase() == 'error';
                }

                 /***
                  * Fetch data, parse it and create objects
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

                 function getComponentDefinitions(){
                     return getDefinitions().then(function (definitions){
                         //window.definitions = definitions;
                         var components = {};
                         _.each( definitions.components, function( definitionArray, key){
                             var definition = definitionArray[0];
                             var c =  _.omit(definition, 'properties');
                             var properties = {};
                             _.each(definition.properties, function(p){
                                 if (_.isString(p)){
                                     properties[p] =  definitions.properties[p][0].stub;
                                 } else {
                                     if (p.owned){
                                         //console.log('component '+ key + ' :' + JSON.stringify(p));
                                         //console.log('property def =' + JSON.stringify(definitions.properties[key + '_' + p.name]));
                                         properties[p.name] = definitions.properties[key + '_' + p.name][0].stub;
                                     } else {
                                         properties[p.alias] = definitions.properties[p.name].stub;
                                     }
                                 }
                             });
                             c.properties = properties;
                             components[key] = c;
                         });
                         return components;
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
                     getComponentDefinitions: getComponentDefinitions,
                     getLayoutDefinitions: undefined
                 };
             }
            ]);

        return service;
    }
);
