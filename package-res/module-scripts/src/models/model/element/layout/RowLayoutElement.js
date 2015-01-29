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
        var size = Math.floor( 12 / this.getChildren().length );
        _.each( this.getChildren(), function( child ){
          child.setWidth( size );
        });
         
      }

      return added;
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
