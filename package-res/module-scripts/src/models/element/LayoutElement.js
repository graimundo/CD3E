define(['../Element'], function(Element){
  var LayoutElement;

  LayoutElement = Element.extend({
    /**
     * A list of layout elements
     */
    _children: [],

    /**
     * The component* 
     */
    _component: undefined,
    
    constructor: function(id, name, properties, children, component){
      this.base(id, name, properties);
      this._children = children;
      this._component = component;
    },

    /**
     * * 
     * @returns {*}
     */
    getChildren: function(){
      return this._children.clone();
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
      this._children.add(child);
      
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
     * @returns {boolean}
     * @private
     */
    _canAddChild: function() {
      return this.getComponent() != undefined;
    },

    /**
     * *
     * @param layoutElement
     * @returns {boolean}
     */
    canAddChild: function(layoutElement){},

    /**
     * * 
     * @returns {null}
     */
    getComponent: function() {
      return this._component;
    },

    /**
     * * 
     * @param component
     * @returns {boolean}
     */
    setComponent: function(component) {
      if ( !this.canAddComponent() ) {
        return false;
      }
      this._component = component;
      return true;
    },

    /**
     * *
     * @private
     */
    _clearComponent: function(){
      this.setComponent( undefined );
      return this;
    },

    /**
     * * 
     * @returns {boolean}
     */
    canAddComponent: function() {
      return this.getChildren().length == 0;
    }
  });
  
  
  return LayoutElement;
});
