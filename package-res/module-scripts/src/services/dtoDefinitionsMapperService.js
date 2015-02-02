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
    function ( app, _) {
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

                    function quoteProperty(line){
                        var cleanLine = line;
                        var propValue = cleanLine.split(': ');
                        if (propValue.length > 1){
                            cleanLine = '"'+ propValue[0] + '":' + propValue.slice(1).join(': ');
                        }
                        return cleanLine;
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

                                cleanLine = quoteProperty(cleanLine);
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

                                cleanLine = quoteProperty(cleanLine);
                                return cleanLine;

                            }).join('');
                        });
                        return _.map(properties, blockToJson);
                    }

                    function parseEntries (blocks, regex){
                        var parsedBlocks = _.map(blocks, function(block){
                            return _.map(block.split('\n'), function(line){
                                var cleanLine =  line.trim()
                                        .replace(/^var.*/, '{')
                                        .replace(/}$/, '')
                                        .replace('});', '}')
                                        .replace(/getStub: f.*/, '')
                                        .replace(regex, '')

                                //.split('\t').join('')
                                ;
                                if (cleanLine.indexOf('return') >= 0 && cleanLine.indexOf('Model.getStub') > 0){
                                    cleanLine = '"_componentID":"' + cleanLine.replace(/Model.getStub.*/, '').replace(/\s*return /, '').trim()+'"';
                                }

                                cleanLine = quoteProperty(cleanLine);
                                return cleanLine;

                            }).join('');
                        });
                        return _.map(parsedBlocks, blockToJson);
                    }

                    function toDefinitionBlocks( definitionsDTO ) {
                        var blocks = definitionsDTO
                                .replace(/\t/g, ' ')
                                .split('\n\n');

                        var blockGroups = _.groupBy( blocks, function(block){
                            if ( block.split(' = BaseModel.create({').length > 1 ){
                                return 'components';
                            } else if ( block.split('PropertiesManager.register').length > 1 ){
                                return 'properties';
                            } else  if ( block.split('CDFDDComponentsArray.push').length > 1){
                                return 'componentEntries';
                            } else  if ( block.split('CDFDDDatasourcesArray.push').length > 1){
                                return 'datasourceEntries';
                            } else if ( block.split('SelectRenderer.extend({').length > 1){
                                return 'propertyEnum';
                            } else {
                                return 'unknown';
                            }
                        });

                        var components = _.groupBy( _.filter( parseComponents(  blockGroups.components),  _.isObject), 'name');
                        var properties = _.groupBy( _.filter( parseProperties(  blockGroups.properties),  _.isObject), 'type');
                        var datasourceEntries = _.chain( parseEntries(  blockGroups.datasourceEntries, /CDFDDDatasourcesArray.push.*/) )
                                .filter(_.isObject)
                                .groupBy('_componentID')
                                .value();
                        var componentEntries = _.chain( parseEntries(  blockGroups.componentEntries, /CDFDDComponentsArray.push.*/) )
                                .filter(_.isObject)
                                .groupBy('_componentID')
                                .value();

                        var visualComponents = {};
                        var otherComponents = {};
                        _.each( components, function(component, key) {
                            if (component[0].properties && _.contains(component[0].properties, 'htmlObject')){
                                visualComponents[key] = component[0];
                            } else {
                                otherComponents[key] = component[0];
                            }
                        });

                        return {
                            //raw: blocks,
                            components: _.omit(visualComponents, _.keys(datasourceEntries)),
                            otherComponents: _.omit(otherComponents, _.keys(datasourceEntries)),
                            componentEntries: componentEntries,
                            datasources: _.pick(otherComponents, _.keys(datasourceEntries)),
                            properties:  _.object(_.map(properties, function(v, k) {
                                return [k, v[0]];
                            })),
                            unprocessed: _.omit(blockGroups, 'components', 'properties', 'datasources')
                        };
                    };

                    return {
                        toDefinitionBlocks:  toDefinitionBlocks
                    };
                }
            ]);

        return service;
    }
);
