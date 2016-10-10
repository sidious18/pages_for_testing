var transactionHistoryModule = (function () {
  //
  // selectors that receive or are involved to some functional
  //
  var transHistoryCont = ".trans-history-page";

  // transaction history tabs
  var mainTabsSelector = ".trans-history-tab";
  var completeTab = ".trans-history-tab.complete-tab";
  var futureTab = ".trans-history-tab.future-tab";

  // tabs switchers
  var mainTabsSwitchersSelector = ".trans-history-tabs-switcher-btn";
  var toCompleteTabSwitcher = ".trans-history-tabs-switcher-btn.to-complete-tab";
  var toFutureTabSwitcher = ".trans-history-tabs-switcher-btn.to-future-tab";

  // selectors for getting filter values
  var paymentMethodFilterComplete = ".js-payment-method-complete";
  var paymentMethodFilterFuture = ".js-payment-method-future";
  var yearFilter = ".js-year";
  var monthFromFilter = ".js-month-from";
  var monthToFilter = ".js-month-to";

  // selectors for setting data
  var infoDataContShared = ".trans-history-info-main-cont";
  var infoDataContComplete = ".trans-history-tab.complete-tab .trans-history-info-main-cont";
  var infoDataContFuture = ".trans-history-tab.future-tab .trans-history-info-main-cont";
  var infoDataContContentWrapper = ".trans-history-info-content-wrapper";
  var rowMarkupExample = ".trans-history-info-row.is-example";
  var dateCell = ".trans-history-info-cell.is-date-cell";
  var paymentTypeCell = ".trans-history-info-cell.payment-type-cell";
  var languageElement = ".trans-history-info-language";
  var personNameElement = ".trans-history-info-person-name";
  var timeRangeElement = ".trans-history-info-time";
  var amountCell = ".trans-history-info-cell.is-amount-cell";
  var transactionAttachment = ".trans-history-info-attachment";
  var transactionHeader = ".trans-history-info-cell.is-receipt-cell";

  var exampleClone;

  function cloneExampleRow() {
    exampleClone = $(rowMarkupExample).clone(true);
    exampleClone.removeClass("is-example");
    $(rowMarkupExample).remove();
  };

  function setReceivedData(elem, obj) {
    var date = obj.date;
    var paymentType = obj.payment_type;
    var languages = obj.languages;
    var personName = obj.person_name;
    var amount = obj.amount;
    var timeRange = obj.time;
    var attachment_url = obj.attachment_url;

    elem.find(dateCell).html(date);
    elem.find(paymentTypeCell).html(paymentType);
    elem.find(languageElement).html(languages);
    elem.find(personNameElement).html(personName);
    elem.find(amountCell).html(amount);
    elem.find(timeRangeElement).html(timeRange);
    if (attachment_url) {
      elem.find(transactionAttachment).attr('href', attachment_url);
      elem.find(transactionAttachment).attr('hidden', false);
    }

    return elem;
  };

  function showAllData(array) {
    var oneContainer = $("<div></div>");
    var cloneForIterating;

    if (!checkReceipts(array)) {
      $(transactionHeader).remove();
      exampleClone.find(transactionHeader).remove();
      exampleClone.find(transactionAttachment).remove();
      $(transHistoryCont).removeClass("with-receipts");
    }

    for (var i = 0, lim = array.length; i < lim; i += 1) {
      cloneForIterating = exampleClone.clone(true);
      oneContainer.append(setReceivedData(cloneForIterating, array[i]));
    }

    $(infoDataContContentWrapper).remove();
    oneContainer.addClass(infoDataContContentWrapper.slice(1));

    if ($(completeTab).hasClass("is-active")) {
      $(infoDataContComplete).append(oneContainer);
    } else if ($(futureTab).hasClass("is-active")) {
      $(infoDataContFuture).append(oneContainer);
    }
  };

  function checkReceipts(array) {
    var result = false;
    for (var i = 0, lim = array.length; i < lim; i += 1) {
      if (array[i].attachment_url) {
        result = true;
        return result;
      }
    }
    return result;
  }

  function showProperTab() {
    if (!$(this).hasClass("is-active")) {
      $(mainTabsSwitchersSelector).removeClass("is-active");
      $(mainTabsSelector).removeClass("is-active");
      if ($(this).is(toCompleteTabSwitcher)) {
        $(completeTab).addClass("is-active");
        $(this).addClass("is-active");

        getDataFromServer();
      } else if ($(this).is(toFutureTabSwitcher)) {
        $(futureTab).addClass("is-active");
        $(this).addClass("is-active");

        getDataFromServer();
      }
    }
  };

  function getInfoFromFilters() {
    var paymentMethod = $(completeTab).hasClass("is-active") ? $(paymentMethodFilterComplete).val() : $(paymentMethodFilterFuture).val();
    var year = $(yearFilter).val();
    var monthFrom = $(monthFromFilter).val();
    var monthTo = $(monthToFilter).val();
    var type = $(completeTab).hasClass("is-active") ? "complete" : "future";

    return {
      payment_method: paymentMethod,
      year: year,
      monthFrom: monthFrom,
      monthTo: monthTo,
      type: type
    };
  }

  function getDataFromServer() {
    var filterData = getInfoFromFilters();

    $.ajax({
      url: '/find_transactions',
      type: "get",
      dataType: 'json',
      contentType: 'application/json',
      data: {transaction_filters: filterData},
      success: function (response) {
        var result = JSON.parse(response.data);

        showAllData(result);
      },
      error: function(response) {
        var main_error = response.responseJSON.message;
        if (main_error) {
          showErrorsModule.showMessage([main_error], "main-error");
        }
      }
    });
  }

  function initTransactionHistory() {
    (function() {
      var currentDate = new Date();
      var currentMonth = currentDate.getMonth();
      var formatedMonth = (function() {
        return (currentMonth + 1) < 10 ? "0" + String(currentMonth + 1) : String(currentMonth + 1);
      }());
      $(monthFromFilter).val(formatedMonth);
      customSelectsModule.setInitialValues($(completeTab));
    }());

    cloneExampleRow();
    getDataFromServer();

    $(mainTabsSwitchersSelector).on("click", showProperTab);
    $(paymentMethodFilterComplete).on("change", getDataFromServer);
    $(paymentMethodFilterFuture).on("change", getDataFromServer);
    $(yearFilter).on("change", getDataFromServer);
    $(monthFromFilter).on("change", getDataFromServer);
    $(monthToFilter).on("change", getDataFromServer);
  };

  return {
    init: initTransactionHistory
  };

}());
