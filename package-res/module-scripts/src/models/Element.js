define(['./Property','Base'], function(Property, Base){
  var Element;
  
  Element = Base.extend({
    /**
     * Element ID
     */
    _id: "",
    
    /**
     * Element Name
     */
    _name: "",
    
    /**
     * List of Property
     */
    _properties: [],

    constructor: function (id, name, properties){
      this._id = id;
      this._name = name;
      this._properties = properties;
    },

    /**
     * *
     * @returns {string}
     */
    getId: function (){
      return this._id;
    },

    /**
     * *
     * @param id
     */
    setId: function (id){
      this._id = id;
      return this;
    },
    
    /**
     * * 
     * @returns {string}
     */
    getName: function(){
     return this._name;
    },

    /**
     * *
     * @param name
     */
    setName: function(name){
      this._name = name;
    },

    /**
     * * 
     * @returns {*}
     */
    getProperties: function(){
      return this._properties;
    },

    /**
     * *
     * @param property
     */
    setProperties: function(property){
      this._properties = property;
    }
  });
  
  return Element;
});
