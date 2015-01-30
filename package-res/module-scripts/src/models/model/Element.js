define(['./Property', 'Base'], function (Property, Base) {
  var Element;

  Element = Base.extend({
    /**
     * Element ID
     */
    _id: "",

    /**
     * List of Property
     */
    _properties: [],

    /**
     * Type of the element
     * */
    _type: undefined,

    /**
     * Type Description of the element
     * */
    _typeDescription: undefined,

    constructor: function (id, name, properties, type) {
      this.setId(id);
      this.setName(name);
      this.setProperties( properties);
      this.setType( type);
    },

    /**
     * *
     * @returns {string}
     */
    getId: function () {
      return this._id;
    },

    /**
     * *
     * @param id
     */
    setId: function (id) {
      this._id = !id ? generateGUID() : id;
      return this;

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
    getName: function () {
      var propertyName = this.getProperties()["Name"];
      propertyName = propertyName ? propertyName : this.getProperties()["name"];
      return propertyName ? propertyName.getValue() : undefined;
    },

    /**
     * *
     * @param name
     */
    setName: function (name) {
      var propertyName = this.getProperties()["Name"];
      propertyName = propertyName ? propertyName : this.getProperties()["name"];
      if (propertyName) {
        propertyName.setValue(name);
      }
      return this;
    },

    /**
     * *
     * @returns {*}
     */
    getProperties: function () {
      return this._properties;
    },

    /**
     * *
     * @param property
     */
    setProperties: function (properties) {
      this._properties = properties ? properties : [];
      return this;
    },

    /**
     * *
     * @returns {*}
     */
    getType: function () {
      return this._type;
    },

    setType: function (type) {
      this._type = type;
      return this;
    },
    getTypeDescription: function () {
      return this._typeDescription;
    },

    setTypeDescription: function (typeDescription) {
      this._typeDescription = typeDescription;
      return this;
    }
  });

  return Element;
});
