define(['Base', 'common-ui/underscore', './element/layout/RowLayoutElement'], function(Base, _, RowLayoutElement){
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
      //return this._rootElements.slice();
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
      } else {
        console.log( "Adding element different than RowLayoutElement. Blocking");
      }
      
      return this;
    },

    /**
     * *
     * @param RowLayoutElement rootElement
     * @returns {Dashboard}
     */
    removeRootElement: function( /*RowLayoutElement*/rootElement ) {
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

    removeElement: function( element ) {
      var myself = this;
      
      _.each( this.getRootElements(), function( root ){
        if( root.getId() == element.getId() ) {
          myself.removeRootElement( element );
          return;
        } else {
          root.removeElement(element);
        }
      });
    }
    
  });
  
  return Dashboard;
});
