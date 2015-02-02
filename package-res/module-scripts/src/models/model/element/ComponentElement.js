define(['../Element'], function(Element){
  var ComponentElement;

  ComponentElement = Element.extend({
    _cdfComponent: undefined,
    
    getCdfComponent: function(){
      return this._cdfComponent;
    },
    
    createCdfComponent: function(cdfDashboard){
      var myself = this;
      
      var opts = {};
      opts['name'] = myself.getName();
      _.each( myself.getProperties(), function(prop){
        opts[prop.getName()] = prop.getValue();
      });
      opts['htmlObject'] = myself.getHtmlObject()+'Component';

      var compName = myself.getType().substring(10);
      compName = compName.charAt(0).toUpperCase() + compName.slice(1);

      require(['cdf/components/'+compName], function (Component) {
        var component = new Component(cdfDashboard, opts);
        cdfDashboard.addComponent(component);
        cdfDashboard.update(component);
        myself._cdfComponent = component;
      });
    },
    
    constructor: function(id, name, properties){
      this.base(id, name, properties);
    },

    setHtmlObject: function( htmlObject ) {
      var htmlObjectProperty = this.getProperties()['htmlObject'];
      if ( htmlObjectProperty ){
        htmlObjectProperty.setValue(htmlObject);
      }
      return this;
    },

    getHtmlObject: function() {
      var htmlObjectProperty = this.getProperties()['htmlObject'];
      if ( htmlObjectProperty ){
        return htmlObjectProperty.getValue();
      }
      return;
    }

  });
  return ComponentElement;
});
