define([ 'Base'], function( Base){
    var ElementDefinition;

    ElementDefinition = Base.extend({
        // region Properties

        getType: function() {
            return this._valueType;
        },
        setType: function ( type ) {
            this._type = type;
            return this;
        },
        _type: undefined,

        getTypeDescription: function() {
            return this._typeDescription;
        },
        setTypeDescription: function( description ) {
            this._typeDescription = description;
        },
        _typeDescription: undefined,

        // endregion

        constructor: function ( type, typeDescription ){
            this.setType( type );
            this.setTypeDescription( typeDescription );
        }
    });

    return ElementDefinition;
});
