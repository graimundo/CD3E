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
      if( layoutElement instanceof RowLayoutElement || !this._canAddChild() ) {
        return false;
      } else {
        return true;
      }
    }
  });

  return RowLayoutElement;
});
