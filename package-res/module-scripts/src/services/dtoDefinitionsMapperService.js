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
    function ( app, _ ) {
        console.log("Required services/dtoDefinitionsMapperService.js");

        var service = app.factory(
            'dtoDefinitionsMapperService',
            [ //'Plugin',
                function( ) {

                    function blockToJson ( block, idx ) {
                        try {
                            return JSON.parse(block);
                        } catch (e){
                            console.log('##### Error parsing block ' + idx + " = " + block);
                            return block;
                        }
                    }

                    function parseComponents (componentBlocks){
                        var components = _.map(componentBlocks, function(block){
                            return _.map(block.split('\n'), function(line){
                                var cleanLine =  line.trim()
                                        .replace(/^var.*/, '{')
                                        .replace('});', '}')
                                //.replace(/PropertiesManager.register.*/, '')
                                //.split('\t').join('')
                                ;

                                var propValue = cleanLine.split(': ');
                                if (propValue.length > 1){
                                    cleanLine = '"'+ propValue[0] + '":' + propValue.slice(1).join(': ');
                                }

                                cleanLine = cleanLine.replace(/\"\"/g, '"')
                                    .replace('"{name', '{"name')
                                    .replace(/ alias\:/, '"alias":')
                                    .replace(/ owned\:/, '"owned":')
                                    .replace(/\:\",/g, ':"",')
                                ;
                                return cleanLine;

                            }).join('\n');
                        });
                        return _.map(components, blockToJson);
                    }

                    function parseProperties (propertyBlocks){
                        var properties = _.map(propertyBlocks, function(block){
                            return _.map(block.split('\n'), function(line){
                                var cleanLine =  line.trim()
                                        .replace(/^var.*/, '{')
                                        .replace('});', '}')
                                        .replace(/PropertiesManager.register.*/, '')
                                //.split('\t').join('')
                                ;

                                var propValue = cleanLine.split(': ');
                                if (propValue.length > 1){
                                    cleanLine = '"'+ propValue[0] + '":' + propValue.slice(1).join(': ');
                                }
                                return cleanLine;

                            }).join('');
                        });
                        return _.map(properties, blockToJson);
                    }

                    function toTemplates( definitionsDTO ) {
                        var templates = {};
                        var blocks = definitionsDTO
                                .replace(/\t/g, ' ')
                                .split('\n\n');

                        var blockGroups = _.groupBy( blocks, function(block){
                            if ( block.split(' = BaseModel.create({').length > 1 ){
                                return 'components';
                            } else if ( block.split('PropertiesManager.register').length > 1 ){
                                return 'properties';
                            } else {
                                return 'unknown';
                            }
                        });

                        var components = _.groupBy( parseComponents( blockGroups.components ), 'name');
                        var properties = _.groupBy( parseProperties( blockGroups.properties ), 'type');

                        return {
                            components: components,
                            properties: properties
                        };
                    };

                    return {
                        toTemplates: toTemplates
                    };
                }
            ]);

        return service;
    }
);
