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
     * @param child
     * @returns {boolean}
     */
    addChild: function( child ){
      var added = this.base( child );
      if( added ) {
        this._recalculateChildrenSize();
      }
      return added;
    },

    _removeLayoutElement: function( elementToRemove ) {
      var result = this.base( elementToRemove );

      this._recalculateChildrenSize();
      return result;
    },

    _recalculateChildrenSize: function() {
      var size = Math.floor( 12 / this.getChildren().length );
      _.each( this.getChildren(), function( child ){
        child.setWidth( size );
      });
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
