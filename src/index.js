(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.DMasker = factory();
  }
}(this, function() {
  var INITIAL_MASK = "+9999",
      addKeyupListener = function(element) {
        var me = this;
        element.addEventListener('keyup', function(e) {
          var val;
          e.target.value.length === 1 ? val = '+'+e.target.value: val = e.target.value;
          me.masks.map(function(mask) {
            if (val === mask.code) {
              VMasker(element).unMask();
              VMasker(element).maskPattern(mask.mask);
            }
          })
        })
      }

  var DynamicMasker = function(elements, masks) {
    this.elements = elements;
    this.masks = masks;
  }
  
  DynamicMasker.prototype.init = function(element, masks) {
    for (var i = 0, len = this.elements.length; i < len; i++) {
      VMasker(this.elements[i]).maskPattern(INITIAL_MASK);
      addKeyupListener.call(this, this.elements[i]);
    }
  }

  DMasker = function(el, masks) {
    if (!el) {
      throw new Error("DynamicMasker: There is no element to bind.");
    }
    if (!VMasker) {
      throw new Error("Can't find vanilla-masker library, please first add it to your page!");
    }
    var elements = ("length" in el) ? (el.length ? el : []) : [el];
    return new DynamicMasker(elements, masks);
  }

  return DMasker;
}));