define(['../LayoutElement'], function (LayoutElement) {
  var ColumnLayoutElement;

  ColumnLayoutElement = LayoutElement.extend({
    /**
     * Column width
     */
    _width: 12,

    constructor: function (id, name, properties, parent, children, width) {
      this.base(id, name, properties, parent, children);
      this._width = width;
    },

    /**
     * *
     * @returns {number}
     */
    getWidth: function () {
      return this._width;
    },

    /**
     * *
     * @param width
     */
    setWidth: function (width) {
      this._width = width;
    },

    /**
     * *
     * @param layoutElement
     * @returns {boolean}
     */
    canAddChild: function (/*LayoutElement*/ layoutElement) {
      if (layoutElement instanceof ColumnLayoutElement || !this._canAddChild()) {
        return false;
      } else {
        return true;
      }
    }
  });

  return ColumnLayoutElement;
});
