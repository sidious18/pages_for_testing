var paymentMethodModule = (function() {

  //
  // selectors that receive or are involved to some functional
  //
  var paymentMethodModal = ".js-payment-modal";
  var allTabs = ".js-payment-tab";
  var cardsTab = ".js-card-tab";
  var invoicesTab = ".js-invoice-tab";
  var modalContainer = ".js-modal-cont";

  // selectors for binding events
  var newCardTile = ".js-add-new-payment";
  var closeCardModalCross = ".js-close-card-modal";
  var tabSwitcherMain = ".js-payment-switcher";
  var tabSwitcherToCards = ".js-card-switcher";
  var tabSwitcherToInvoices = ".js-invoice-switcher";
  var addNewCardBtn = ".js-add-new-card";
  var addNewInvoiceBtn = ".js-add-new-invoice";
  var cardNumberInput = "#card-number";
  var removeCard = '.js-remove-card';
  var invoiceFullName =".invoice-full-name";

  //
  // functions
  //
  function openModalForNewCard() {
    $(paymentMethodModal).addClass("is-active");
    $(tabSwitcherToCards).addClass("is-active");
    $(allTabs).addClass("is-hidden");
    $(cardsTab).removeClass("is-hidden");
    $("body").attr("style","-webkit-overflow-scrolling:touch; ");
    $("body").attr("style",$("body").attr("style") + "overflow:hidden; position:fixed; top:0px; bottom:0px; left:0px; right:0px; ");
  }

  function closeModalForNewCard() {
    $(paymentMethodModal).removeClass("is-active");
    $(tabSwitcherMain).removeClass("is-active");
    $(allTabs).removeClass("is-hidden");
    $(".accept-data-error-msg").removeClass("with-error");
    showErrorsModule.removeErrors();
    $("body").attr("style","");
  }

  function switchTabs() {
    showErrorsModule.hideMessage();
    showErrorsModule.removeErrors();
    $(tabSwitcherMain).removeClass("is-active");
    $(allTabs).addClass("is-hidden");
    if ($(this).hasClass("js-card-switcher")) {
      $(tabSwitcherToCards).addClass("is-active");
      $(cardsTab).removeClass("is-hidden");
    } else if ($(this).hasClass("js-invoice-switcher")) {
      $(tabSwitcherToInvoices).addClass("is-active");
      $(invoicesTab).removeClass("is-hidden");
    }
  }

  function setNewPaymentMethod() {
    showErrorsModule.removeErrors();
    $(this).addClass("in-progress");
    var pbKey=$('[data-stripe=pb_key]').val();
    var card = {};
    var errors = {};

    var number = $('[data-stripe=number]').val();

    var cvc = $('[data-stripe=cvc]').val();
    var expMonth = $('[data-stripe=exp_month]').val();
    var expYear = $('[data-stripe=exp_year]').val();
    var first_name = $('[data-stripe=first_name]').val();
    var last_name = $('[data-stripe=last_name]').val();
    var address_zip = $('[data-stripe=postal]').val();

    if(number) {
      card.number = number;
    } else {
      errors.card_number = window.__('Card number is required');
    };

    if(cvc) {
      card.cvc = cvc;
    } else {
      errors.cvc = window.__('CVC is required');
    };

    if(expMonth != "mm" && expMonth != "" ) {
      card.expMonth = expMonth;
    } else {
      errors.month = window.__('Expiration month is required');
    };

    if(expYear != "yyyy" && expYear != "" ) {
      card.expYear = expYear;
    } else {
      errors.year = window.__('Expiration year is required');
    };

    if (first_name && last_name) {
      card.name = first_name + last_name;
    } else {
      if (!first_name) {
        errors.card_first_name = window.__('First name is required');
      }
      if (!last_name) {
        errors.card_last_name = window.__('Last name is required');
      }
    };

    if(address_zip) {
      card.address_zip = address_zip;
    } else {
      errors.address_zip = window.__('Postal code is required');
    };

    if (Object.keys(errors).length != 0) {
      $(addNewCardBtn).removeClass("in-progress");
      showErrorsModule.showMessage(errors, "modal-error");
    } else {
      Stripe.setPublishableKey(pbKey);
      Stripe.card.createToken(card, stripeResponseHandler);
    }
  }

  function createPayment(dataParams, type) {
    var routeId = $('[data-person=id]').val();
    var routeKey = $(modalContainer).data('routeKey');
    $.ajax({
      url: '/' + routeKey + '/' + routeId + '/payment_methods',
      type: 'POST',
      data: JSON.stringify({person_id: routeId, data_params: dataParams, type: type}),
      dataType: 'json',
      contentType: 'application/json',
      success: function (response) {
        setTimeout(function () {
          $(addNewCardBtn).removeClass("in-progress");
          $(addNewInvoiceBtn).removeClass("in-progress");
          closeModalForNewCard();
          window.location.href = response.location;
        }, 500);
      },
      error: function (response) {
        $(addNewCardBtn).removeClass("in-progress");
        $(addNewInvoiceBtn).removeClass("in-progress");
        var main_error = response.responseJSON.message;
        if (main_error) {
          showErrorsModule.showMessage([main_error], "main-error");
        } else {
          var errors = JSON.parse(response.responseText);
          showErrorsModule.showMessage(errors, "modal-error");
        }
      }
    });
  }

  // handle response from stripe
  function stripeResponseHandler(status, response) {
    var errorMessages = {
      incorrect_number: window.__("The card number is incorrect"),
      invalid_number: window.__("The card number is not a valid credit card number"),
      number: window.__("The card number is not a valid credit card number"),
      invalid_expiry_month: window.__("The card's expiration month is invalid"),
      exp_month: window.__("The card's expiration month is invalid"),
      invalid_expiry_year: window.__("The card's expiration year is invalid"),
      exp_year: window.__("The card's expiration year is invalid"),
      expired_card: window.__("The card has expired"),
      cvc: window.__("The card's security code is incorrect"),
      incorrect_zip: window.__("The card's zip code failed validation"),
      card_declined: window.__("The card was declined"),
      missing: window.__("There are no card details for a customer that is being charged"),
      processing_error: window.__("An error occurred while processing the card"),
      rate_limit:  window.__("An error occurred because of high demand at the moment. Please let us know if you get this error a lot."),
      undefined: window.__("Invalid params")
    };

    var errorCodes = {
      incorrect_number: 'card_number',
      number: 'card_number',
      invalid_number: 'card_number',
      invalid_expiry_month: 'month',
      exp_month: 'month',
      invalid_expiry_year: 'year',
      exp_year: 'year',
      cvc: 'cvc',
      incorrect_zip: 'zip'
    };

    if (response.error) {
      $(addNewCardBtn).removeClass("in-progress");

      var errors = {};
      if (!response.error.param) {
        var requiredFields = ['number', 'exp_month', 'exp_year', 'cvc'];
        for (var i = 0; i < requiredFields.length; i++) {
          errors[errorCodes[requiredFields[i]]] = errorMessages[requiredFields[i]];
        }
      } else {
        errors[errorCodes[response.error.param]] = errorMessages[response.error.param];
      }

      showErrorsModule.showMessage(errors, "modal-error");
    } else {
      // response contains id and card, which contains additional card details
      var cardToken = cardParams(response.id);
      createPayment(cardToken, "card");
    }
  };

  function setNewInvoice() {
    $(this).addClass("in-progress");
    var invoice;

    invoice = {
      org_number: $('#invoice-org-number').val(),
      first_name: $('#invoice-first-name').val(),
      last_name: $('#invoice-last-name').val(),
      email: $('#invoice-email').val(),
      tel_code: $('.js-tel-code').val(),
      tel_number: $('#invoice-phone').val(),
      postal_code: $('#invoice-postal-code').val(),
      country: $('.js-country').val()
    };

    createPayment(invoice, "invoice");
  }


  // handle card params
  function cardParams(token) {
    var last4 = last4digits();
    var expMonth = $('[data-stripe=exp_month]').val();
    var expYear = $('[data-stripe=exp_year]').val();
    return {
      last4: last4,
      exp_month: expMonth,
      exp_year: expYear,
      stripe_token: token
    };
  }

  // get last four digits from card number
  function last4digits() {
    var card_number = $('[data-stripe=number]').val();
    var lastFour = card_number.substr(card_number.length - 4);

    return lastFour;
  }

  function cc_format(value) {
    var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    var matches = v.match(/\d{4,16}/g);
    var match = matches && matches[0] || ''
    var parts = []
    for (i=0, len=match.length; i<len; i+=4) {
      parts.push(match.substring(i, i+4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return value
    }
  }

  function formatCardNumber() {
    $(this).val(cc_format($(this).val()));
  }

  function showFullName(){
    for(i=0; i < $(invoiceFullName).length; i++){
      if ($(invoiceFullName).eq(i)[0].scrollWidth > $(invoiceFullName).eq(i).innerWidth()) {
        $(invoiceFullName).eq(i).parent().append
          ('<div class="invoice-full-name-show">'
              + '<span></span>'
              + '<span></span>'
              + '<span></span>'
              + '<div class="name-tooltip-cont">'
              + $(invoiceFullName).eq(i).text()
              + '</div>'
          +'</div>');
      }
    }
  }

  function initPaymentMethod() {
    $(cardNumberInput).on("input", formatCardNumber);
    $(newCardTile).on('click', openModalForNewCard);
    $(closeCardModalCross).on("click", closeModalForNewCard);
    $(tabSwitcherMain).on("click", switchTabs);
    $(addNewCardBtn).on("click", setNewPaymentMethod);
    $(addNewInvoiceBtn).on("click", setNewInvoice);
    $(removeCard).on("dblclick", function(e){
      e.preventDefault();
    });
    $(removeCard).on("click", function(e){
      e.preventDefault();
    });
    showFullName();
    $(".js-show-payment-modal").on("click", function() {
      var actionLink = $(this).parents(".payment-tile--exist-tile").find(".js-cloned-link").clone(true);
      $(this).parents(".payment-tile--exist-tile").find(".js-cloned-link").remove();
      actionLink.attr("class", "skiwo-btn skiwo-btn--red payout__modal-btn js-replaced-btn");
      actionLink.text("Remove");
      $(".js-delete-payment-modal").find(".js-replaced-btn").replaceWith(actionLink);
      $(".js-delete-payment-modal").addClass("is-active");
    });
    $(".js-close-payment-deleting").on("click", function() {
      $(".js-delete-payment-modal").removeClass("is-active");
    });
  }


  return {
    init: initPaymentMethod
  };

}());
