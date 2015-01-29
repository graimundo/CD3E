define(['../Element', 'common-ui/underscore'], function(Element, _){
  var LayoutElement;

  LayoutElement = Element.extend({
    /**
     * A list of layout elements
     */
    _children: [],
    
    constructor: function(id, name, properties, children){
      this.base(id, name, properties);
      this._children = children ? children : [];
    },

    /**
     * * 
     * @returns {*}
     */
    getChildren: function(){
      return this._children;
      //return this._children.clone();
    },

    /**
     * *
     * @param children
     */
    setChildren: function(children){
      this._children = children;
      this;
    },

    /**
     * * 
     * @param child
     * @returns {boolean}
     */
    addChild: function(child){
      if( !this.canAddChild(child) ) {
        return false;
      }
      this._children.push(child);
      
      return true;
    },

    /**
     * *
     * @param childId
     * @returns {*}
     */
    hasChild: function( childId ){
      return _.any(this.getChildren(), function(child) {
        return child.getId() == childId;
      });
    },
    
    /**
     * *
     * @private
     */
    _clearChildren: function(){
      this.setChildren( [] );
      return this;
    },

    /**
     * *
     * @param layoutElement
     * @returns {boolean}
     */
    canAddChild: function( layoutElement ) {
      return true;
    },

    /**
     * * 
     * @returns {boolean}
     */
    canAddComponent: function() {},
    

    /**
     * *
     * @param RowLayoutElement rootElement
     * @returns {LayoutElement}
     */
    removeElement: function( elementToRemove ) {
      var elementToRemoveIndex = -1;

      var elements = this.getChildren();
      _.each( elements, function( element, index ){
        if( elementToRemove.getId() == element.getId() ) {
          elementToRemoveIndex = index;
          return;
        }
      });

      if( elementToRemoveIndex >= 0 ) {
        elements.splice(elementToRemoveIndex, 1);
        this.setChildren( elements );
        return this;
      } else {
        _.each( elements, function( element ){
          element.removeElement( elementToRemove );
        });
      }
      return this;
    }
  });
  
  return LayoutElement;
});
