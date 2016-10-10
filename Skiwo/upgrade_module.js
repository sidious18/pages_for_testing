var upgradeToEnterpriseModule = (function() {
  var mainUpgradeCont = ".js-upgrade-main-cont";

  //
  // inputs
  //
  var orgNumberInput = ".js-org-number";
  var compNameInput = ".js-company-name";
  var telCodeInput = ".js-tel-code";
  var telNumberInput = ".js-tel-number";
  var addressLineOneInput = ".js-address-1";
  var addressLineTwoInput = ".js-address-2";
  var countyInput = ".js-county";
  var postCodeInput = ".js-post-code";
  var cityInput = ".js-city";
  var countryInput = ".js-country";
  var uploadLogoInput = ".js-upload-logo";
  var adminEmailInput = ".js-admin-email";
  var authorityEmailInput = ".js-authority-email";
  var contactTelCode = ".js-person-tel-code";
  var contactTelNumber = ".js-person-tel-number";
  var contactTelCont = ".js-person-tel-cont";
  var contactFullTelCont = ".js-full-tel-cont";
  var contactFullTelInput = ".js-full-tel-input";

  // other
  var personIdInput = ".js-current-person-id";
  var personTelCodeInput = ".js-current-person-phone-code";
  var personTelNumberInput = ".js-current-person-phone-number";
  var uploadedLogoImg = ".js-uploaded-logo";
  var authorityCheckbox = ".js-authority-checkbox";
  var termsCheckbox = ".js-terms-checkbox";
  var submitBtn = ".js-submit-form-btn";
  var progressClass = "in-progress";
  var hiddenClass = "is-hidden";
  var upgradePath = "";
  var companyLogo;
  var userID;
  var personTelCode;
  var personTelNumber;

  // functions
  function pullUpgradeInfo() {
    var result = {
      enterprise: {
        address_attributes: {}
      }
    };

    result.enterprise.owner_id = userID;
    result.enterprise.name = $(compNameInput).val();
    result.enterprise.phone_code = $(telCodeInput).val();
    result.enterprise.phone_number = $(telNumberInput).val();
    result.enterprise.org_number = $(orgNumberInput).val();
    result.enterprise.logo = companyLogo;
    result.enterprise.admin_email = $(adminEmailInput).val();
    result.enterprise.auth_email = $(authorityEmailInput).val();
    result.enterprise.address_attributes.line_1 = $(addressLineOneInput).val();
    result.enterprise.address_attributes.line_2 = $(addressLineTwoInput).val();
    result.enterprise.address_attributes.county = $(countyInput).val();
    result.enterprise.address_attributes.postcode = $(postCodeInput).val();
    result.enterprise.address_attributes.city = $(cityInput).val();
    result.enterprise.address_attributes.country = $(countryInput).val();
    result.enterprise.contact_phone_code = $(contactTelCode).val() && $(contactTelNumber).val() ? $(contactTelCode).val() : "";
    result.enterprise.contact_phone_number = $(contactTelCode).val() && $(contactTelNumber).val() ? $(contactTelNumber).val() : "";

    return result;
  }

  function afterBase64Function(e) {
    companyLogo = String(e.target.result);
    $(uploadedLogoImg).removeClass("is-hidden");
    $(uploadedLogoImg).attr("src", companyLogo);
  }

  function setCompanyLogo(eve) {
    if (filesUploadingModule.validateAvatar(eve.target)) {
      filesUploadingModule.blobToBase64(eve.target, afterBase64Function);
    } else {
      showErrorsModule.showMessage({
        fileTypeError: window.__("You can only attach .jpg, .png, .gif types of files")
      }, "main-error");
    }
  }

  function redirectToURL(url) {
    var destination = url;

    return function() {
      window.location.href = destination;
    };
  }

  function upgradeAJAXSuccess(response) {
    removeProgressFromSubmit();
    showErrorsModule.showMessage(window.__("Your profile has been successfully upgraded to Enterprise."), "main-success");
    setTimeout(redirectToURL("/"), 3000);
  }

  function upgradeAJAXError(response) {
    var common_errors = response.responseJSON.errors;
    var main_error = response.responseJSON.message;
    removeProgressFromSubmit();
    if (common_errors) {
      showErrorsModule.showMessage(common_errors, "main-error");
    } else if (main_error) {
      showErrorsModule.showMessage([main_error], "main-error");
    }
  }

  function addProgressToSubmit() {
    $(submitBtn).addClass(progressClass);
  }

  function removeProgressFromSubmit() {
    $(submitBtn).removeClass(progressClass);
  }

  function sendUpgradeInfo() {
    var ajaxData = pullUpgradeInfo()

    $.ajax({
      url: '/enterprises',
      type: "POST",
      data: JSON.stringify(ajaxData),
      dataType: 'json',
      contentType: 'application/json',
      beforeSend: addProgressToSubmit,
      success: upgradeAJAXSuccess,
      error: upgradeAJAXError
    });
  }

  function checkTermsAndConditions() {
    if ($(termsCheckbox).get()[0].checked) {
      sendUpgradeInfo();
    } else {
      showErrorsModule.showMessage([window.__("You can not upgrade your profile if you do not agree with Terms and Conditions")], "main-error");
      $(termsCheckbox).focus();
      setTimeout(showErrorsModule.hideMessage, 3000);
    }
  }

  function toggleAuthorityEmailValue() {
    $(this).get()[0].checked ? (function() {
      $(authorityEmailInput).val($(adminEmailInput).val());
      $(authorityEmailInput).get()[0].disabled = true;
      $(contactTelCode).val(personTelCode);
      $(contactTelNumber).val(personTelNumber);
      $(contactTelNumber).get()[0].disabled = true;
      customSelectsModule.setInitialValues($(mainUpgradeCont));
      $(contactTelCont).addClass(hiddenClass);
      $(contactFullTelCont).removeClass(hiddenClass);
      $(contactFullTelInput).val(personTelCode + personTelNumber);
    }()) : (function() {
      $(authorityEmailInput).val("");
      $(authorityEmailInput).get()[0].disabled = false;
      $(contactTelCode).val("+47");
      $(contactTelNumber).val("");
      $(contactTelNumber).get()[0].disabled = false;
      $(contactTelCont).removeClass(hiddenClass);
      $(contactFullTelCont).addClass(hiddenClass);
      customSelectsModule.setInitialValues($(mainUpgradeCont));
    }());
  }

  //
  // init function
  //
  function initUpgradeModule() {
    userID = $(personIdInput).val();
    personTelCode = $(personTelCodeInput).val();
    personTelNumber = $(personTelNumberInput).val();
    $(personIdInput).remove();
    $(personTelCodeInput).remove();
    $(personTelNumberInput).remove()
    companyLogo = "";

    $(mainUpgradeCont).on("click", submitBtn, checkTermsAndConditions);
    $(uploadLogoInput).on("change", setCompanyLogo);
    $(authorityCheckbox).on("change", toggleAuthorityEmailValue);
  };

  return {
    init: initUpgradeModule
  };

}());
