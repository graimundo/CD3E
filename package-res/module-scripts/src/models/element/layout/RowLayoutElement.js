define(['../LayoutElement'], function(LayoutElement){
  var RowLayoutElement;

  RowLayoutElement = LayoutElement.extend({
    constructor: function(id, name, properties, parent, children){
      this.base(id, name, properties, parent, children);
    }
  });

  return RowLayoutElement;
});
