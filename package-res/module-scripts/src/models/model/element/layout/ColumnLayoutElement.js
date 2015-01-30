define(['../LayoutElement'], function (LayoutElement) {
  var ColumnLayoutElement;

  ColumnLayoutElement = LayoutElement.extend({
    /**
     * Column width
     */
    _width: 6,

    /**
     * The component*
     */
    _component: undefined,

    constructor: function (id, name, properties, parent, children, width, component) {
      this.base(id, name, properties, parent, children);
      this._width = width ? width : 6;
      this._component = component;
    },

    /**
     * *
     * @returns {number}
     */
    getWidth: function () {
      return this._width;
    },

    /**
     * *
     * @param width
     */
    setWidth: function (width) {
      this._width = width;
    },

    /**
     * *
     * @param layoutElement
     * @returns {boolean}
     */
    canAddChild: function (/*LayoutElement*/ layoutElement) {
      var canAdd = this.base( layoutElement )
          && !this.getComponent()
          && !(layoutElement instanceof ColumnLayoutElement);
      return canAdd;
    },
    
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
      if( component ) {
        component.setHtmlObject( this.getName() );
      }
      this._component = component;
      return true;
    },

    /**
     * *
     * @private
     */
    clearComponent: function(){
      this.setComponent( undefined );
      return this;
    },

    /**
     * *
     * @returns {boolean}
     */
    canAddComponent: function() {
      return this.getChildren().length == 0;
    },

    getDescendantElements: function() {
      if ( this.getComponent() ) {
        return [ this.getComponent() ];
      }

      return this.base();
    }
  });

  return ColumnLayoutElement;
});
