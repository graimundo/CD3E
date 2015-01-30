define(['Base', 'common-ui/underscore', './element/LayoutElement', './element/layout/RowLayoutElement', './element/layout/ColumnLayoutElement', './element/ComponentElement'],
    function(Base, _, LayoutElement, RowLayoutElement, ColumnLayoutElement, ComponentElement ){
  var Dashboard;
  
  Dashboard = Base.extend({
    /**
     * The root elements of the Dashboard
     */
    _rootElements: [],
    
    constructor: function(rootElements){
      this._rootElements = rootElements ? rootElements : [];
    },

    /**
     * * 
     * @returns {*}
     */
    getRootElements: function(){
      return this._rootElements;
    },

    /**
     * * 
     * @param layoutElements
     */
    setRootElements: function(rootElements){
      this._rootElements = rootElements;
      return this;
    },

    /**
     * *
     * @param RowLayoutElement rootElement
     */
    addRootElement: function( /*RowLayoutElement*/rootElement ) {
      if( rootElement instanceof RowLayoutElement ) {
        this._rootElements.push( rootElement );
        return true;
      } else {
        console.log( "Adding element different than RowLayoutElement. Blocking");
        return false;
      }
    },

    removeElement: function ( element ) {
      if ( element instanceof LayoutElement ) {
        return this._removeLayoutElement( element );
      } else if (element instanceof ComponentElement ) {
        return this._removeComponent( element );
      }

      throw { message: "Unknown element type to remove.", element: element };
    },

    /**
     * *
     * @param RowLayoutElement rootElement
     * @returns {Dashboard}
     */
    _removeRootElement: function( /*RowLayoutElement*/rootElement ) {
      var elementToRemoveIndex = -1;
      
      var rootElements = this.getRootElements();
      _.each( rootElements, function( element, index ){
        if( rootElement.getId() ==  element.getId() ) {
          elementToRemoveIndex = index;
          return;
        }
      });
      
      if( elementToRemoveIndex >= 0 ) {
        rootElements.splice(elementToRemoveIndex, 1);
        this.setRootElements( rootElements );
      }
      return this;
    },

    _removeLayoutElement: function( element ) {
      var myself = this;
      
      _.each( this.getRootElements(), function( root ){
        if( root.getId() == element.getId() ) {
          myself._removeRootElement( element );
          return;
        } else {
          root._removeLayoutElement(element);
        }
      });
    },
    
    _removeComponent: function( component ) {
      var myself = this;
      var rootElements = this.getRootElements();
      _.each( rootElements, function( element, index ) {
        myself._removeComponentFromElement( element, component);
      });
    },
    
    _removeComponentFromElement: function( element, component ) {
      var myself = this;
      if( element instanceof ColumnLayoutElement) {
        var elementComponent = element.getComponent();
        if( elementComponent && component.getId() == elementComponent.getId() ) {
          element.clearComponent();
        } 
      }
      _.each(element.getChildren(), function(element){
        myself._removeComponentFromElement( element, component );
      });

      return;
    },

    /***
     * Moves an element from an element into another element
     * @param element
     * @param targetElement
     */
    moveElement: function( element, targetElement ) {
      if ( element instanceof ComponentElement ) {
        return this._moveComponent( element, targetElement );
      }
      
      if (targetElement) {
        return this._moveLayoutElement(element, targetElement);
      } /*else {
        
      }   */
    },

    moveToRoot: function( rootElement ) {
      if( rootElement instanceof RowLayoutElement ) {
        this.removeElement(rootElement);
        this.addRootElement( rootElement );
      }
    },

    _moveLayoutElement: function ( layoutElement, target ) {
      if ( !this._isLayoutContainer( target )
          || !target.canAddChild( layoutElement )) {
        return false;
      }

      this._removeLayoutElement( layoutElement );
      return target.addChild( layoutElement );
    },

    _moveComponent: function ( component, target ) {
      if ( !this._isComponentContainer( target ) 
        || !target.canAddComponent()) {
        return false;
      }
      this._removeComponent( component );
      target.setComponent( component );
    },

    getDescendantElements: function ( ) {
      var children = this.getRootElements();
      return children.concat( _.flatten( _.map( children, function( child ) { return child.getDescendantElements() } )));
    },

    getDescendantElement: function( elementId ) {
      return _.find( this.getDescendantElements(), function( element ) { return element.getId() == elementId; } );
    },

    // TODO: change this to element?
    _isLayoutContainer: function ( element ) {
      return element instanceof LayoutElement;
    },

    _isComponentContainer: function ( element ) {
      return element instanceof ColumnLayoutElement;
    }

  });
  
  return Dashboard;
});
