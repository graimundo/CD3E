define(['../LayoutElement'], function(LayoutElement){
  var RowLayoutElement;

  RowLayoutElement = LayoutElement.extend({
    constructor: function(id, name, properties, parent, children){
      this.base(id, name, properties, parent, children);
    },

    /**
     * *
     * @param layoutElement
     * @returns {boolean}
     */
    canAddChild: function(/*LayoutElement*/ layoutElement) {
      var canAdd = this.base( layoutElement )
          && !(layoutElement instanceof RowLayoutElement);
      return canAdd;
    },

    /**
     * *
     * @returns {boolean}
     */
    canAddComponent: function() {
      return false;
    }
  });

  return RowLayoutElement;
});
