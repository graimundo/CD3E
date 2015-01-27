define(['<Base'], function(Base){
  var Property;
  
  Property = Base.extend({
    /**
     * Name of the Property
     */
    _name: "",
    
    /**
     * Value of the Property
     */
    _value: "",
    
    /**
     * Type of the Property
     */
    _type: "",
    
    constructor: function(name, value, type){
      this._name = name;
      this._value = value;
      this._type = type;
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
    setName: function(name) {
      this._name = name;
    },

    /**
     * * 
     * @returns {string}
     */
    getValue: function(){
      return this._value;
    },

    /**
     * * 
     * @param value
     */
    setValue: function(value){
      this._value = value;
    },

    /**
     * * 
     * @returns {string}
     */
    getType: function(){
      return this._type;
    },

    /**
     * *
     * @param type
     */
    setType: function(type) {
      this._type = type;
    }
  });
 
  return Property;
});
