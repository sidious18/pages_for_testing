var payoutMethodModule = (function() {
  var mainPayoutCont = ".payout__page-wrapper";
  var newPaymentBox = ".new-interpreter-payout";
  var applyNewPayoutBtn = ".js-payout-end-wizard";
  var payoutName = ".js-name";
  var payoutCountry = ".js-country";
  var payoutFirstAddress = ".js-adress-1";
  var payoutSecondAddress = ".js-adress-2";
  var payoutCity = ".js-city";
  var payoutState = ".js-state";
  var payoutPostal = ".js-postal";
  var payoutBankAccount = ".js-bank-acc-num";
  var payoutJsOrgNum = ".js-org-num";
  var payoutAccountHolder = ".js-acc-holder"

  function deletePayoutMethod(deleteLink) {
    var url = $(deleteLink).parents('.delete-payout').data('deleteUrl')

    $.ajax({
      url: url,
      type: 'DELETE',
      data: { format: 'js' },
      success: function(success) {
        $(".delete-payout").removeClass("is-active");
      }
    });
  };

  function makePayoutInfoObject() {
    var payoutObject = {
      account_bank: {
        person_id: $(newPaymentBox).data("person-id"),
        name: $(payoutName).val(),
        country: $(payoutCountry).val(),
        address_1: $(payoutFirstAddress).val(),
        address_2: $(payoutSecondAddress).val(),
        city: $(payoutCity).val(),
        state: $(payoutState).val(),
        code: $(payoutPostal).val(),
        bank_account_num: $(payoutBankAccount).val(),
        organization_num: $(payoutJsOrgNum).val(),
        payout_method_attributes: {
          is_in: false,
          person_id: $(newPaymentBox).data("person-id")
        }
      }
    }

    return payoutObject;
  };

  function payoutJSONMaker() {
    var payoutResultObject = makePayoutInfoObject();

    return JSON.stringify(payoutResultObject);
  };

  function submitPayoutData(event) {
    event.preventDefault();
    var payout_params = payoutJSONMaker();
    var id = $(newPaymentBox).data("person-id");
    $.ajax({
      url: '/people/'+id+'/bank_accounts',
      type: 'POST',
      data: payout_params,
      dataType: 'json',
      contentType: 'application/json',
      success: function(response) {
        setTimeout(function(){
          window.location.href = response.location;
        }, 1500);
      },
      error: function(response) {
        var main_error = response.responseJSON.message;
        if (main_error) {
          showErrorsModule.showMessage([main_error], "main-error");
        } else {
          var errors = $.parseJSON(response.responseText);
          showErrorsModule.showMessage(errors, "special-error");
        }
      }
    });
  };

  function initPayoutMethod() {
    if ($(newPaymentBox).length) {
      $(applyNewPayoutBtn).on("click",submitPayoutData);
    }
    $(".js-add-paypal-select-btn").on("click", function() {
      if (!$(".js-paypal-acc").length) {
        $(".js-payout-content").addClass("is-hidden");
        $(".js-add-paypal-form").removeClass("is-hidden");
      } else {
        showErrorsModule.showMessage([window.__("You can have only one PayPal account")], "main-error");
        setTimeout(function() {
          showErrorsModule.hideMessage();
        }, 3000);
      }
    });
    $(mainPayoutCont).on("click", ".js-add-more-btn", function() {
      $(".js-select-payout-cont").toggleClass("is-hidden");
      if (!$(".js-select-payout-cont").hasClass("is-hidden")) {
        $(".js-add-more-btn").text(window.__("Cancel"));
      } else {
        $(".js-add-more-btn").text(window.__("Add payout method"));
      }
    });
    $(mainPayoutCont).on("click", ".js-paypal-back-btn", function() {
      $(".js-payout-content").removeClass("is-hidden");
      $(".js-add-paypal-form").addClass("is-hidden");
    });
    $(".js-add-paypal-select-btn").on("click", function() {
      if (!$(".js-paypal-acc").length) {
        $(".js-payout-content").addClass("is-hidden");
        $(".js-add-paypal-form").removeClass("is-hidden");
      }
    });
    if ($(".js-paypal-acc").length > 1) {
      $(".js-paypal-form-row" + " *").remove();
    } else if ($(".js-add-paypal-form").length > 1) {
      $(".js-paypal-render-row" + " *").remove();
    }
    if ($(".js-paypal-acc").length > 0 || $(".js-invoice-payout").length > 0) {
      $(".js-select-payout-cont").addClass("is-hidden");
      $(".js-add-more-btn").removeClass("is-hidden");
    } else {
      $(".js-select-payout-cont").removeClass("is-hidden");
      $(".js-add-more-btn").addClass("is-hidden");
    }
    $(mainPayoutCont).on("click", ".js-delete-bank-account-btn", function(e) {
      e.preventDefault();

      $(".js-delete-invoice-modal")
        .addClass("is-active")
        .data('deleteUrl', e.target.getAttribute('href'));
    });
    $(mainPayoutCont).on("click", ".js-delete-paypal-account-btn", function(e) {
      e.preventDefault();

      $(".js-delete-paypal-modal")
        .addClass("is-active")
        .data('deleteUrl', e.target.getAttribute('href'));
    });
    $(mainPayoutCont).on('click', '.js-delete-payout-confirm', function(e){
      deletePayoutMethod(e.target);
    });
    $(mainPayoutCont).on("click", ".accept-data-close-cross, .js-close-payout-modal", function(e) {
      e.preventDefault();

      $(".container-for-modal.delete-payout").removeClass("is-active");
    });
  }

  return {
    init: initPayoutMethod
  };

})();
