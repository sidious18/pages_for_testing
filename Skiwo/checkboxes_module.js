var checkboxesModule = (function() {
  //
  // selectors that receive or are involved to some functional
  //
  var checkboxLabel = ".accept-data-checkbox-imitation";
  var radioLabel = ".accept-data-checkbox-imitation.radio-btn";
  var labelChackedState = "is-checked";

  function toggleChackedState(self) {
    self.toggleClass(labelChackedState);
  }

  function highlightChechedLabels() {
    if ($(this).hasClass(labelChackedState)) {
      document.getElementById($(this).attr("for")).checked = true;
    }
    if (document.getElementById($(this).attr("for")).checked === true) {
      $(this).addClass(labelChackedState)
    }
  }

  // invitation functionality section

  function radioBtnFunctionality(e) { 
    if ($(this).data("radio-name")) {
      var ralatedName = $(this).data("radio-name");
      e.stopPropagation();

      $(radioLabel + "[data-radio-name='" + ralatedName + "']").removeClass(labelChackedState);
      $(this).addClass(labelChackedState);
    };
  }  // end of invitation functionality section

  function initCheckboxes() {
    $(checkboxLabel).on("click", function(e) {
      toggleChackedState($(e.target));
    });

    $(checkboxLabel).each(highlightChechedLabels);

    // invitation functionality section

    $(".accept-data-one-field.with-checkboxes > div").on("click", function() {
      $(this).find(radioLabel).trigger("click");
    });

    $(radioLabel).on("click", radioBtnFunctionality);
  };

  return {
    init: initCheckboxes
  }

}());
