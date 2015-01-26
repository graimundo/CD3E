define(['../Element'], function(Element){
  var ComponentElement;

  ComponentElement = Element.extend({
    constructor: function(id, name, properties){
      this.base(id, name, properties);
    }
  });
  
  return ComponentElement;
});
