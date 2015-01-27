define(['Base', 'underscore'], function(Base, _){
  var Dashboard;
  
  Dashboard = Base.extend({
    /**
     * The root elements of the Dashboard
     */
    _rootElements: [],
    
    constructor: function(rootElements){
      this._rootElements = rootElements;
    },

    /**
     * * 
     * @returns {*}
     */
    getRootElements: function(){
      return this._rootElements.clone();
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
      this._rootElements.add( rootElement );
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
        this.setRootElements( rootElements.splice(elementToRemoveIndex, 1) );
      }
      return this;
    } 
    
  });
  
  return Dashboard;
});
