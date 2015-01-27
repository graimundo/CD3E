define(['../ElementDefinition'], function( ElementDefinition){
    var PropertyDefinition;

    PropertyDefinition = ElementDefinition.extend({
        // region Properties
        getValueType: function() {
            return this._valueType;
        },
        setValueType: function ( valueType ) {
            this._valueType = valueType;
            return this;
        },
        _valueType: undefined,

        getDefaultValue: function() {
            return this._defaultValue;
        },
        setDefaultValue: function( defaultValue ) {
            this._defaultValue = defaultValue;
            return this;
        },
        _defaultValue: undefined,

        // endregion
        constructor: function( type, typeDescription, valueType, defaultValue ){
            this.base( type, typeDescription );
            this.setValueType( valueType );
            this.setDefaultValue( defaultValue );
        }
    });


    return PropertyDefinition;
});
