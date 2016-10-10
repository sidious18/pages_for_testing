var verifyPhoneModule = (function() {
  //
  // selectors that receive or are involved to some functional
  //
  var verifyPhoneModal = ".container-for-modal.verify-phone";
  var permissionErrorModal = ".container-for-modal.permission-error";

  // inputs for retrieve verification data
  var telCodeInput = ".js-user-tel-code";
  var telNumberInput = ".js-user-tel-number";
  // var fullTelNumberInModalInput = "#verify-phone";
  var codeModalInput = "#verify-phone-country-code";
  var numberModalInput = "#verify-phone-number";
  var verificationCodeInput = "#verify-phone-code";
  // selectors for binding events
  var accountVerifyPhoneBtn = ".js-verify-phone-btn";
  var modalVerifyPhoneBtn = ".js-verify-phone-button";
  var closePhoneModalCross = ".js-close-verify-phone-modal";
  var sentCodeOneMoreTimeBtn = ".js-try-again-verify-number";
  var verifyCodeBtn = ".js-verify-code-button";
  var closePermissionModal = ".js-close-permission-error-modal"
  var userID = "";
  var firstStepCallback;
  var firstStepErrorCallback;
  var secondStepCallback;
  var tryAgainCallback;
  var userCode;
  var userNumber;


  //
  // functions
  //
  function showPhoneModal(obj) {
    var telObj = obj;

    return function() {
      userCode = telObj.tel && telObj.tel.tel_code ? telObj.tel.tel_code : "";
      userNumber = telObj.tel && telObj.tel.tel_number ? telObj.tel.tel_number : "";
      $('.accept-data-error-msg').removeClass("with-error");
      if ($(telCodeInput).length && $(telNumberInput).length) {
        userCode = $(telCodeInput).val();
        userNumber = $(telNumberInput).val();
      }
      $(verifyPhoneModal).addClass("is-active");
      $(codeModalInput).val(userCode || "+47");
      $(numberModalInput).val(userNumber);
      $(codeModalInput).focus();
    }
  };

  function closePhoneModal() {
    $(verifyPhoneModal).removeClass("is-active");
    $(verifyPhoneModal).find(".accept-data-error-msg").html('');
    $(verifyPhoneModal).find(".accept-data-error-msg").removeClass("with-error");
  }

  function sendPhoneForVerification() {
    var phone_code = $(codeModalInput).val();
    var phone_number = $(numberModalInput).val();
    var personId = userID || $(codeModalInput).data('person-id');

    $(modalVerifyPhoneBtn).addClass("in-progress");
    $(verifyPhoneModal).find(".accept-data-error-msg").html('');
    $(verifyPhoneModal).find(".accept-data-error-msg").removeClass("with-error");

    $.post("/people/" + personId + "/add_phone/",
      { number: phone_number,
        code: phone_code })
    .success(function(){
      $(modalVerifyPhoneBtn).removeClass("in-progress");
      firstStepCallback();
    })
    .error(function (response) {
      var main_error = response.responseJSON.message;
      if (main_error) {
        showErrorsModule.showMessage([main_error], "main-error");
      } else if (firstStepErrorCallback) {
        firstStepErrorCallback(response);
        $(modalVerifyPhoneBtn).removeClass("in-progress");
      } else {
        $(modalVerifyPhoneBtn).removeClass("in-progress");
        var errors = $.parseJSON(response.responseText);
        showErrorsModule.showMessage(errors, "modal-error");
      }
    });
  }

  function sentCodeOneMoreTime() {
    tryAgainCallback();
  }

  function sendCodeForVerification() {
    var token = $(verificationCodeInput).val();
    var personId = userID || $(verificationCodeInput).data('person-id');

    if (token) {
      $(verifyCodeBtn).addClass("in-progress");
      $.ajax({
        url: "/people/" + personId + "/verify_phone/" + token,
        type: 'PATCH',
        contentType: false,
        processData: false,
        error: function (response) {
          if (firstStepErrorCallback) {
            firstStepErrorCallback(response);
          } else {
            var errors = $.parseJSON(response.responseText);
            showErrorsModule.showMessage(errors, "modal-error");
            $(verifyCodeBtn).removeClass("in-progress");
          }
        },
        success: function () {
          $(verifyCodeBtn).removeClass("in-progress");
          showErrorsModule.hideMessage();
          secondStepCallback(userNumber, userCode);
        }
      });
    }
  }

  function initPhoneVerification(params) {
    var telObj = params.obj;
    var containerSelector = params.containerSelector;
    var forHandlersSelector = params.handlersSelector || verifyPhoneModal;
    userID = params.humanID;
    firstStepCallback = params.phoneCallback;
    firstStepErrorCallback = params.phoneErrorCallback;
    secondStepCallback = params.codeCalback;
    tryAgainCallback = params.tryAgainCallback;


    $(containerSelector).on("click", accountVerifyPhoneBtn, showPhoneModal(telObj));
    $(closePhoneModalCross).on("click", closePhoneModal);
    $(forHandlersSelector).on("click", modalVerifyPhoneBtn, sendPhoneForVerification);

    $(forHandlersSelector).on("click", sentCodeOneMoreTimeBtn, sentCodeOneMoreTime);
    $(forHandlersSelector).on("click", verifyCodeBtn, sendCodeForVerification);
    $(closePermissionModal).on("click", verifyPhoneModal, function() {
      $(permissionErrorModal).removeClass("is-active");
    });
    $(permissionErrorModal).on("click", closePermissionModal, function() {
      $(permissionErrorModal).removeClass("is-active");
    });
  };

  return {
    init: initPhoneVerification
  };

}());
