define(['../Element'], function(Element){
  var LayoutElement;

  LayoutElement = Element.extend({
    /**
     * Layout element
     */
    _parent: null,
    
    /**
     * A list of layout elements
     */
    _children: [],
    
    constructor: function(id, name, properties, parent, children){
      this.base(id, name, properties);  
      this._parent = parent;
      this._children = children;
    },

    /**
     * * 
     * @returns {null}
     */
    getParent: function(){
      return this._parent;
    },

    /**
     * * 
     * @param parent
     */
    setParent: function(parent){
      this._parent = parent;
    },

    /**
     * * 
     * @returns {*}
     */
    getChildren: function(){
      return this._children;
    },

    /**
     * *
     * @param children
     */
    setChildren: function(children){
      this._children = children;
    }
  });
  
  
  return LayoutElement;
});
