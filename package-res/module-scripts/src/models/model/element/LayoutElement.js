define(['../Element'], function(Element){
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
    canAddChild: function(layoutElement) {},

    /**
     * * 
     * @returns {boolean}
     */
    canAddComponent: function() {}
  });
  
  return LayoutElement;
});
