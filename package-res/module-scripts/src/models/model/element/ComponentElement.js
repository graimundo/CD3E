define(['../Element'], function(Element){
  var ComponentElement;

  ComponentElement = Element.extend({
    constructor: function(id, name, properties){
      this.base(id, name, properties);
    },

    setHtmlObject: function( htmlObject ) {
      var htmlObjectProperty = this.getProperties()['HtmlObject'];
      if ( htmlObjectProperty ){
        htmlObjectProperty.setValue(htmlObject);
      }
      return this;
    },

    getHtmlObject: function() {
      var htmlObjectProperty = this.getProperties()['HtmlObject'];
      if ( htmlObjectProperty ){
        return htmlObjectProperty.getValue();
      }
      return;
    }

  });
  return ComponentElement;
});
