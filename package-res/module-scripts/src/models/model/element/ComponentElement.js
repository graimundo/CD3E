define(['../Element'], function(Element){
  var ComponentElement;

  ComponentElement = Element.extend({
    constructor: function(id, name, properties){
      this.base(id, name, properties);
    },

    setHtmlObject: function( htmlObject ) {
      this.getProperties()['HtmlObject'].setValue( htmlObject );
      return this;
    },

    getHtmlObject: function() {
      return this.getProperties()['HtmlObject'].getValue();
    }

  });


  return ComponentElement;
});
