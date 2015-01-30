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
                '$rootScope', '$http',
                function ( $rootScope, $http ) {

                    function createContent( dashboard, filename){

                        var cdfStructure = {
                            "layout": {
                                "title": "CD3E Sample Dashboard",
                                "rows": []
                            },
                            "components": {
                                "rows": []
                            },
                            "datasources": {
                                "rows": []
                            },
                            "filename": filename + '.wcdf'
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
                            _.each(roots, function(node){
                                cdfStructure.layout.rows.push( convertNode(node, parentId));
                                var children = node.getChildren();
                                if (children.length > 0){
                                    // columns containing components don't have children
                                    iterateLayout(children, node.getId());
                                } else {
                                    var component = node.getComponent();
                                    if ( component ){
                                        //console.log('Found Component' + component.getName());
                                        component._
                                        cdfStructure.components.rows.push( convertNode(component, 'UnIqEiD'));

                                    }
                                }
                            });
                        }

                        var roots = dashboard.getRootElements();
                        iterateLayout(roots, 'UnIqEiD');

                        return {
                            operation: 'saveas',
                            file:  filename +".wcdf",
                            title: "CD3DE Sample",
                            description: "CD3DE Sample",
                            cdfstructure: JSON.stringify(cdfStructure, true, ' ')
                        };
                    }

                    function save(dashboard, filename){


                        var content = createContent(dashboard, filename);
                        console.log('Saving dashboard to '+ filename + $.fn.jquery);
                        console.log('Content dump:' + content.cdfstructure);

                        var saveDashboardUrl = CONTEXT_PATH + 'plugin/pentaho-cdf-dd/api/syncronizer/saveDashboard';
                        var successFunction = function(result) {
                            if (result && result.status == "true") {
                                console.log("Dashboard saved successfully");
                            } else {
                                console.log("Errors saving file: " + result.result);
                            }
                        };

                        function toFormData(content){
                            var fd = new FormData();
                            angular.forEach(content, function(el, key){
                                fd.append(key, el);
                            });
                            return fd;
                        }

                        var xhr = new XMLHttpRequest();
                        xhr.open( 'POST', saveDashboardUrl, true );
                        xhr.onreadystatechange = function() {
                            if (xhr.readyState==4 && xhr.status==200) {
                                successFunction( JSON.parse(xhr.responseText));
                            }
                        };
                        xhr.send( toFormData( content ) );

                    }

                    return {
                        save: save
                    };
                }
            ]);

        return service;
    });
