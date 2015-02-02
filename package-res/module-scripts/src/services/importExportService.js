'use strict';

define(
    [
        'cd3e',
        'common-ui/underscore',
        'common-ui/jquery'
    ],
    function (app, _, $) {

        var service = app.factory(
            'importExportService',
            [
                '$rootScope', '$http', '$q', 'definitionsProvider',
                function ( $rootScope, $http, $q, definitionsProvider ) {

                    function createContent( dashboard, filename){

                        var cdfStructure = {
                            "layout": {
                                "title": "CD3E Sample Dashboard:" + filename,
                                "rows": []
                            },
                            "components": {
                                "rows": []
                            },
                            "datasources": {
                                "rows": []
                            },
                            "filename": _.compact(filename.split('/')).join('/') + '.wcdf' //get rid of first "/home"
                        };

                        function convertProperty( property, name ){
                            return {
                                name: name,
                                value: property.getValue() + "",
                                type: property.getType()
                            };
                        }

                        function convertNode(node, parentId){
                            var typeDesc = {
                                LayoutRow: "Row",
                                LayoutColumn: "Column"
                            }[node.getTypeDescription()] || node.getTypeDescription();

                            var type = {
                                LayoutColumn: "LayoutBootstrapColumn"
                            }[node.getType()] || node.getType();


                            return {
                                id: node.getId(),
                                type: type,
                                typeDesc: typeDesc,
                                parent: parentId,
                                properties: _.map(node.getProperties(), convertProperty)
                            };
                        }

                        function iterateLayout (roots, parentId){
                            var components = [];
                            _.each(roots, function(node){
                                cdfStructure.layout.rows.push( convertNode(node, parentId));
                                var children = node.getChildren();
                                if (children.length > 0){
                                    // columns containing components don't have children
                                    components.push( iterateLayout(children, node.getId()) );
                                } else {
                                    var component = node.getComponent();
                                    if ( component ){
                                        //console.log('Found Component' + component.getName());
                                        components.push( component );

                                    }
                                }
                            });
                            return _.flatten( components );
                        }

                        function groupComponents( components, definitions) {
                            return _.object(
                                _.map(components, function(component) {
                                    var key = component.getType();
                                    var entry = definitions.componentEntries[key];
                                    return [key, (entry ? [entry[0], component] : undefined)];
                                })
                            );
                        }

                        return definitionsProvider._getDefinitions().then(function(definitions) {
                            var roots = dashboard.getRootElements();
                            // Insert the layout tree into cdfStructure
                            var componentList = iterateLayout(roots, 'UnIqEiD');

                            // Group components and insert them into cdfStructure
                            var componentTree = _.groupBy(groupComponents( componentList, definitions), function(obj) {
                                return obj[0].category;
                            });
                            _.each(componentTree, function(components, group) {
                                // Create a group
                                var label = definitions.componentEntries[components[0][1].getType()][0].categoryDesc;
                                cdfStructure.components.rows.push({
                                    "id": group,
                                    "name": label,
                                    "type": "Label",
                                    "typeDesc": "<i>Group</i>",
                                    "parent": "UnIqEiD",
                                    "properties": [{
                                            "name": "Group",
                                            "value": label,
                                            "type": "Label"
                                        }]
                                });
                                // Populate the group with its components
                                _.each(components, function(component) {
                                    cdfStructure.components.rows.push(
                                        convertNode(component[1], group)
                                    );
                                });
                            });

                            return {
                                operation: 'saveas',
                                file:  filename +".wcdf",
                                title: filename.split('/').reverse()[0], //"CD3E Sample",
                                description: "CD3E Sample",
                                cdfstructure: JSON.stringify(cdfStructure, true, ' ')
                            };

                        });


                    }

                    /***
                     * POST a multipart/form-data request that the CDE endpoint syncronizer/saveDashboard can understand
                     */
                    function submitForm(url, content, parseFunction){
                        var deferred = $q.defer();
                        function toFormData(content){
                            var fd = new FormData();
                            angular.forEach(content, function(el, key){
                                fd.append(key, el);
                            });
                            return fd;
                        }
                        var xhr = new XMLHttpRequest();
                        xhr.open( 'POST', url, true );
                        xhr.onreadystatechange = function() {
                            if (xhr.readyState==4){
                                if (xhr.status==200) {
                                    var result;
                                    if (angular.isFunction(parseFunction)){
                                        result = parseFunction(xhr.responseText);
                                    } else {
                                        result = xhr.responseText;
                                    }
                                    deferred.resolve(result);
                                } else {
                                    deferred.reject(xhr);
                                }
                            }
                        };
                        xhr.send( toFormData( content ) );
                        return deferred.promise;
                    }

                    /***
                     * Save the dashboard asynchronously. Returns a promise
                     */
                    function save(dashboard, filename){
                        return createContent(dashboard, filename).then( function(content){
                            console.log('Saving dashboard to '+ filename);
                            console.log('Content dump:' + content.cdfstructure);

                            var saveDashboardUrl = CONTEXT_PATH + 'plugin/pentaho-cdf-dd/api/syncronizer/saveDashboard';
                            var successFunction = function(result){
                                if (result && result.status == "true") {
                                    console.log("Dashboard saved successfully");
                                } else {
                                    console.log("Errors saving file: " + result.result);
                                }
                                return result;
                            };
                            return submitForm(saveDashboardUrl, content, JSON.parse).then( successFunction );
                        });

                    }


                    return {
                        save: save
                    };
                }
            ]);

        return service;
    });
