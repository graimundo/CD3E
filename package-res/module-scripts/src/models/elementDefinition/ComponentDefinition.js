define(['../ElementDefinition'], function (ElementDefinition) {
  var ComponentDefinition;

  ComponentDefinition = ElementDefinition.extend({
    // region Properties

    getPropertyDefinitions: function () {
      return this._propertyDefinitions;
    },
    setPropertyDefinitions: function (propertyDefinitionMap) {
      this._propertyDefinitions = propertyDefinitionMap;
      return this;
    },
    _propertyDefinitions: {},

    // endregion

    constructor: function (type, typeDescription, propertyDefinitions) {
      this.base(type, typeDescription);
      this.setPropertyDefinitions(propertyDefinitions);
    }
  });

  return ComponentDefinition;
});
