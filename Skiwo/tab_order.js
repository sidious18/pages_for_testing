var tabOrderModule = (function() {
  var tabOrderElement = ".js-with-tab-order";
  var toNextElementDataAttr = "data-tab-to-elem";
  var nameElementDataAttr = "data-tab-name";

  function defineElemDirection(self, direction, e){
    if(direction ==="prev"){
      var elem = $('[' + toNextElementDataAttr + '="' + self.attr(nameElementDataAttr) + '"]');
    } else{
      var elem = $("[" + nameElementDataAttr + "='" + self.attr(toNextElementDataAttr) + "']");
    }
    if(elem.length){
      if(e){
        e.preventDefault();
      }
      goToElem.apply(self, elem);
    }
  }

  function goToElem(elem){
    if ($(elem).length && $(elem).is(".custom-select-typing-input")) {
      $(elem).parents(".custom-select").trigger("click");
    } else {
      if (this.is(".custom-select-typing-input")) {
        this.parents(".custom-select").removeClass("is-opened");
      }
      $(elem).focus();
    }
  }

  function initTabOrder() {
    $(tabOrderElement).on("keydown", function(e) {
      var self = $(this);
      if(e.shiftKey && e.keyCode === 9){
        defineElemDirection(self, "prev", e);
      } else if(e.keyCode === 9){
        defineElemDirection(self, "next", e);
      }
    });
  };

  return {
    init: initTabOrder,
    useTabOrder: defineElemDirection
  };

}());
