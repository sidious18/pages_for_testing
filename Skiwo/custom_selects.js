// custom selects functional
var customSelectsModule = (function() {

  //
  //  custom select elements
  //
  var customSelect = ".custom-select";
  var customSelectOpened = ".custom-select.is-opened";
  var customSelectValue = ".custom-select-value";
  var customSelectList = ".custom-select-list";
  var customSelectItem = ".custom-select-list-item";
  var customSelectHiddenInput = ".custom-select-hidden-input";
  var customSelectDefaultValue = ".custom-select-default-value";
  var customSelectTypingInput = ".custom-select-typing-input";
  var notHiddenItem = ".custom-select-list-item:not(.is-hidden)";
  var highlightedItem = ".custom-select-list-item.is-highlighted"
  var flagIcons = ".custom-select-icon";
  var openedStateClass = "is-opened";
  var errorsStateClass = "is-with-error-field";
  var localizationInput = ".js-i18n-switcher";
  var daySelect = ".js-day-select";
  var monthSelect = ".js-month-select";
  var futureYearSelect = ".js-future-year-select";
  var pastYearSelect = ".js-past-year-select";
  var birthYearSelect = ".js-birth-year-select";
  var hourSelect = ".js-hour-select";
  var minuteSelect = ".js-minute-select";
  //
  //  end of custom select elements
  //

  function fillInSelects(index, select) {
    var CSList = $(select).find(customSelectList);
    var itemForCloning = $("<li></li>");
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var formatedIndex;
    var li;
    var i;
    var lim;

    itemForCloning.addClass(customSelectItem.slice(1));
    currentDate = null;

    if ($(select).is(daySelect)) {
      for (i = 1, lim = 31; i <= lim; i += 1) {
        formatedIndex = i;
        li = itemForCloning.clone(true);
        if (i < 10) {
          formatedIndex = "0" + String(formatedIndex);
        }
        li.attr("data-id", formatedIndex);
        li.text(formatedIndex);
        CSList.append(li);
      }
    } else if ($(select).is(monthSelect)) {
      for (i = 1, lim = 12; i <= lim; i += 1) {
        formatedIndex = i;
        li = itemForCloning.clone(true);
        if (i < 10) {
          formatedIndex = "0" + String(formatedIndex);
        }
        li.attr("data-id", formatedIndex);
        li.text(formatedIndex);
        CSList.append(li);
      }
    } else if ($(select).is(futureYearSelect)) {
      for (i = +currentYear, lim = +currentYear + 7; i <= lim; i += 1) {
        li = itemForCloning.clone(true);
        li.attr("data-id", i);
        li.text(i);
        CSList.append(li);
      }
    } else if ($(select).is(pastYearSelect)) {
      for (i = +currentYear, lim = +currentYear - 70; i >= lim; i -= 1) {
        li = itemForCloning.clone(true);
        li.attr("data-id", i);
        li.text(i);
        CSList.append(li);
      }
    } else if ($(select).is(birthYearSelect)) {
      for (i = +currentYear - 18, lim = +currentYear - 90; i >= lim; i -= 1) {
        li = itemForCloning.clone(true);
        li.attr("data-id", i);
        li.text(i);
        CSList.append(li);
      }
    } else if ($(select).is(hourSelect)) {
      for (i = 0, lim = 23; i <= lim; i += 1) {
        formatedIndex = i;
        li = itemForCloning.clone(true);
        if (i < 10) {
          formatedIndex = "0" + String(formatedIndex);
        }
        li.attr("data-id", formatedIndex);
        li.text(formatedIndex);
        CSList.append(li)
      }
    }
    else if ($(select).is(minuteSelect)) {
      for (i = 0, lim = 59; i <= lim; i += 1) {
        formatedIndex = i;
        li = itemForCloning.clone(true);
        if (i < 10) {
          formatedIndex = "0" + String(formatedIndex);
        }
        li.attr("data-id", formatedIndex);
        li.text(formatedIndex);
        CSList.append(li)
      }
    }
  }


  function setInitialValues(cont) {
    var selects = cont ? cont.find(customSelect) : $(customSelect);
    var hiddenInput = selects.find(customSelectHiddenInput);
    var defaultInput = selects.find(customSelectDefaultValue);
    var value = selects.find(customSelectValue);
    var appropriateItem;

    selects.each(function() {
      var hiddenInput = $(this).find(customSelectHiddenInput);
      var defaultValue = $(this).find(customSelectDefaultValue);
      var value = $(this).find(customSelectValue);
      var appropriateItem;

      if (!hiddenInput.val()) {
        value.html(defaultValue.text());
      } else {
        appropriateItem = $(this).find(customSelectItem + "[data-id='" + hiddenInput.val() + "']");
        value.html(appropriateItem.text());
        if ($(this).is(".skiwo-header__lang-select")) {
          $(this).find(".custom-initial-flag").addClass(appropriateItem.attr("data-flag-class"));
        }
      }
    });
  };

  function changeFlags(item) {
    // TODO: fix problem with language select
  };

  function openAndCloseSelects() {
    var CSValue = $(this).find(customSelectValue);
    var CSTypingInput = $(this).find(customSelectTypingInput);
    var CSListItems = $(this).find(customSelectItem);

    if ($(this).hasClass(openedStateClass)) {
      $(this).removeClass(openedStateClass);

      if ($(this).hasClass("with-typing")) {
        CSTypingInput.blur();
        CSTypingInput.val("");
        CSListItems.removeClass("is-hidden");
        CSListItems.removeClass("is-highlighted");
      }

    } else if (!$(this).hasClass(openedStateClass)) {
      if ($(customSelectOpened).length) {
        pressEnterLogic($(customSelectOpened).find(customSelectTypingInput));
        if (!$(customSelectOpened).is($(this))) {
          $(customSelect).removeClass(openedStateClass);
        }
      }
      $(this).addClass(openedStateClass);

      if ($(this).hasClass("with-typing")) {
        CSTypingInput.focus();
      }
    }

    $(this).removeClass(errorsStateClass);
  };

  function setChosenValue() {
    var select = $(this).parents(customSelect);
    var hiddenInput = select.find(customSelectHiddenInput);
    var value = select.find(customSelectValue);
    var idValue = $(this).data("id");
    var textValue = $(this).text();

    hiddenInput.val(idValue);
    value.html(textValue);
    if (select.is(".skiwo-header__lang-select")) {
      select.find(".custom-initial-flag").addClass($(this).attr("data-flag-class"));
    }
    hiddenInput.trigger("change");
  }

  function filterCSItemsWhileTyping() {
    var parentCS = $(this).parents(customSelect);
    var initialItems = parentCS.find(customSelectItem);
    var initialItemsHolder = parentCS.find(customSelectList);
    var inputsValue = $(this).val().toLowerCase();

    initialItems.each(function() {
      var itemsLoweredText = $(this).text().toLowerCase();

      if (itemsLoweredText.indexOf(inputsValue) < 0) {
        $(this).addClass("is-hidden");
      } else {
        $(this).removeClass("is-hidden");
      }

    });

    function letterSort(str){
        var s = str.toLowerCase(), sl = s.length;
        return function sort(a,b){
            var aText = a.innerHTML,
                bText = b.innerHTML;
            var am = +( aText.length >= sl && aText.slice(0, sl).toLowerCase() === s ),
                bm = +( bText.length >= sl && bText.slice(0, sl).toLowerCase() === s );
            if( am ^ bm ) return bm - am;
            return aText.localeCompare(bText);
        };
    }

    initialItems.sort(letterSort(inputsValue));
    initialItems.detach().appendTo(initialItemsHolder);
  }

  function pressEnterLogic(input) {
    var firstAppropriateItem = input.parents(customSelect).find(notHiddenItem).first();
    var particularHighlightedItem = input.parents(customSelect).find(highlightedItem);

    if (input.val() && particularHighlightedItem.length) {
      particularHighlightedItem.trigger("click");
    } else if (input.val() && firstAppropriateItem.length) {
      firstAppropriateItem.trigger("click");
    } else {
      if (!input.parents(customSelect).find(customSelectHiddenInput).val()) {
        input.parents(customSelect).find(customSelectItem).first().trigger("click");
        input.val(input.parents(customSelect).find(customSelectItem).first().text());
      } else {
        input.parents(customSelect).find(customSelectItem + "[data-id='" + input.parents(customSelect).find(customSelectHiddenInput).val() + "']").trigger("click");
      }
    }

    if (input.is(".js-with-tab-order")) {
      tabOrderModule.useTabOrder(input);
    };
  }

  function setValueAfterEnterClick(e) {
    var self = $(this);

    if (e.keyCode === 13) {
      pressEnterLogic(self);
    };
  };

  function downArrowHandler(e) {
    if (e.keyCode === 40) {
      var firstAppropriateItem = $(this).parents(customSelect).find(notHiddenItem).first();
      var particularHighlightedItem = $(this).parents(customSelect).find(highlightedItem);

      if (particularHighlightedItem.length) {
        var nextMatchingItem = particularHighlightedItem.next(notHiddenItem);
        particularHighlightedItem.removeClass("is-highlighted");

        if (nextMatchingItem.length) {
          nextMatchingItem.addClass("is-highlighted");
          $(this).val(nextMatchingItem.text());
        } else {
          firstAppropriateItem.addClass("is-highlighted");
          $(this).val(firstAppropriateItem.text());
        }

      } else {
        firstAppropriateItem.addClass("is-highlighted");
        $(this).val(firstAppropriateItem.text());
      }
    }
  }

  function upArrowHandler(e) {
    if (e.keyCode === 38) {
      var lastAppropriateItem = $(this).parents(customSelect).find(notHiddenItem).last();
      var particularHighlightedItem = $(this).parents(customSelect).find(highlightedItem);

      if (particularHighlightedItem.length) {
        var prevMatchingItem = particularHighlightedItem.prev(notHiddenItem);
        particularHighlightedItem.removeClass("is-highlighted");

        if (prevMatchingItem.length) {
          prevMatchingItem.addClass("is-highlighted");
        } else {
          lastAppropriateItem.addClass("is-highlighted");
        }

      } else {
        lastAppropriateItem.addClass("is-highlighted");
      }
    }
  }

  function initCustomSelects() {
    document.addEventListener("click", function(e) {
      if (!e.target.matches(customSelect + "," + customSelect + " *")) {
        if ($(customSelectOpened).length) {
          pressEnterLogic($(customSelectOpened).find(customSelectTypingInput));
        }
        $(customSelect).removeClass(openedStateClass);
      };
    });

    $(customSelect).each(fillInSelects);

    $(customSelect).on("click", openAndCloseSelects);
    $(customSelect).on("click", customSelectItem, setChosenValue);
    $(customSelectTypingInput).on("input", filterCSItemsWhileTyping);
    $(customSelectTypingInput).on("keydown", setValueAfterEnterClick);
    $(customSelectTypingInput).on("keydown", downArrowHandler);
    $(customSelectTypingInput).on("keydown", upArrowHandler);

    $(localizationInput).on("change", function() {
      var lang = $(this).val();
      document.cookie = "locale=nb;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/; secure";
      $.post( "/application/save_locale", { locale: lang } ).done(function() {
        location.reload();
      });
    });

    setInitialValues();
  }

  return {
    init: initCustomSelects,
    setInitialValues: setInitialValues
  }

}());
