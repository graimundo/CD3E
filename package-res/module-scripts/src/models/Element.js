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

    /**
     * Type of the element
     * */
    _type: undefined,

    constructor: function (id, name, properties, type){
      this._id = !id ? generateGUID() : id;
      this._name = name;
      this._properties = properties;
      this._type = type;

      function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      };

      function generateGUID() {
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
      };
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
    },

    /**
     * * 
     * @returns {*}
     */
    getType: function() {
      return this.getType();
    },
    
    setType: function(type){
      this._type = type;
      return this;
    }
  });
  
  return Element;
});
