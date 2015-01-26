define(['Base'], function(){
  var Dashboard;
  
  Dashboard = Base.extend({
    /**
     * The components of the Dashboard
     */
    _componentElements: [],
    
    /**
     * The layout elements of the dashboard
     */
    _layoutElements: [],
    
    constructor: function(componentElements, layoutElements){
      this._componentElements = componentElements;
      this._layoutElements = layoutElements;
    },

    /**
     * * 
     * @returns {*}
     */
    getComponents: function(){
      return this._componentElements;
    },

    /**
     * * 
     * @param componentElements
     */
    setComponents: function(componentElements) {
      this._componentElements = componentElements;
    },

    /**
     * * 
     * @returns {*}
     */
    getLayoutElements: function(){
      return this._layoutElements;
    },

    /**
     * * 
     * @param layoutElements
     */
    setLayoutElements: function(layoutElements){
      this._layoutElements = layoutElements;
    }
  });
  
  return Dashboard;
});
