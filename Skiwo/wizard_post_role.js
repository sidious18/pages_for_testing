var wizardPostRoleModule = (function() {
  // ======================================================================================
  // variables
  //=======================================================================================

  var mainWizardCont = ".js-wizard-main-cont";

  var addNameStep = ".js-add-name-step";
  var addPhoneStep = ".js-add-phone-step";
  var enterCodeStep = ".js-enter-code-step";
  var addSkillStep = ".js-add-skill-step";
  var addAddressStep = ".js-add-address-step";
  var finalStep = ".js-final-step";

  var avatarLable = ".js-chose-avatar";
  var avatarInput = ".js-upload-avatar";
  var nameInputFirst = ".js-first-name";
  var nameInputLast = ".js-last-name";
  var sendNameAvatarBtn = ".js-send-name-avatar";

  var telCodeInput = ".js-tel-code";
  var telNumberInput =  ".js-tel-number";
  var verifyCodeBtn = ".js-verify-code-button";
  var codeInput = ".js-code-input";
  var codeEnteredNumber = ".js-entered-phone-number";

  var skillLangFromId = ".js-lang-from";
  var skillLangToId = ".js-lang-to";
  var skillQualificationId = ".js-qualification";
  var skillQualificationItem = ".js-qualification-item";
  var skillVideoPrice = ".js-video-type-price";
  var skillPhonePrice = ".js-phone-type-price";
  var skillLocationPrice = ".js-location-type-price";
  var skillHubPrice = ".js-hub-type-price";
  var skillSaveBtn = ".js-save-skill-btn";
  var skillSaveAndAdd = ".js-save-add-new-btn";

  var addressGender = ".js-user-gender";
  var addressDayOB = ".js-day-of-birth";
  var addressMonthOB = ".js-month-of-birth";
  var addressYearOB = ".js-year-of-birth";
  var addressLine1 = ".js-user-address-1";
  var addressLine2 = ".js-user-address-2";
  var addressCounty = ".js-user-county";
  var addressPostcode = ".js-user-postcode";
  var addressCity = ".js-user-city";
  var addressCountry = ".js-user-country";
  var addressSaveBtn = ".js-save-address-btn";

  var choseRolePath = "/set_info";
  var settedAvatarClass = "is-with-avatar";
  var personIDInput = ".js-current-person-id";
  var exampleClass = "is-example";
  var progressClass = "in-progress";
  var userAvatar = "";
  var personID = "";
  var phoneCode = "";
  var phoneNumber = "";
  var firstName = "";
  var lastName = "";
  var langFromID = "";
  var langToID = "";
  var qualificationID = "";
  var videoPrice = "";
  var phonePrice = "";
  var locationPrice = "";
  var hubPrice = "";
  var isBusiness = false;
  var sendAJAX = false;
  
  var conversionHasBeenTracked = false;

  var skipBtn = ".js-skip-step";
  var backBtn = ".js-back-btn";

  var addNameClone;
  var addPhoneClone;
  var enterCodeClone;
  var addSkillClone;
  var addAddressClone;
  var finalStepClone;

  // ======================================================================================
  // functions
  //=======================================================================================

  // handlers =============================================================================
  function avatarInputHandler(e) {
    if (filesUploadingModule.validateAvatar(e.target)) {
      filesUploadingModule.blobToBase64(e.target, setAvatar);
    } else {
      showErrorsModule.showMessage({
        fileTypeError: window.__("You can only attach .jpg, .png, .gif types of files")
      }, "main-error");
    }
  };

  function sendNameAvatarHandler(e) {

      var dataForServer = {
      person: {
        id: personID,
        first_name: $(nameInputFirst).val(),
        last_name: $(nameInputLast).val(),
        avatar: userAvatar
      }
    };

    $(e.target).addClass(progressClass);

    $.ajax({
      url: choseRolePath,
      type: "PATCH",
      data: JSON.stringify(dataForServer),
      dataType: 'json',
      contentType: 'application/json',
      success: function(response) {
        turnOffWizard(function() {
          var cloneClone = addPhoneClone.clone(true);

          firstName = dataForServer.person.first_name;
          lastName = dataForServer.person.last_name;

          $(addNameStep).remove();
          $(mainWizardCont).append(cloneClone);
          document.querySelector(telNumberInput).focus();
          showErrorsModule.hideMessage();
          trackConversion();
        });
      },
      error: function(response) {
        var errors = $.parseJSON(response.responseText);
        showErrorsModule.showMessage(errors, "main-error");
        $(e.target).removeClass(progressClass);
      }
    });
  };

  function skipStepHandler(e) {
    var nextStep = $(e.target).attr("data-to-step");
    var cloneClone;

    showErrorsModule.hideMessage();

    switch (nextStep) {
      case "skill":
        cloneClone = addSkillClone.clone(true);
        $(addPhoneStep).remove();
        $(mainWizardCont).append(cloneClone);
        break;
      case "address":
        cloneClone = addAddressClone.clone(true);
        $(addSkillStep).remove();
        $(mainWizardCont).append(cloneClone);
        break;
      case "final":
        cloneClone = finalStepClone.clone(true);
        if (isBusiness) {
          $(addPhoneStep).remove();
        } else {
          $(addAddressStep).remove();
        }
        $(mainWizardCont).append(cloneClone);
        break;
    }
  };

  function backStepHandler(e) {
    var prevStep = $(e.target).attr("data-to-step");
    var cloneClone;

    showErrorsModule.hideMessage();

    switch (prevStep) {
      case "skill":
        cloneClone = addSkillClone.clone(true);
        $(addAddressStep).remove();
        fillSkillStep(cloneClone);
        customSelectsModule.setInitialValues(cloneClone);
        $(mainWizardCont).append(cloneClone);
        break;
      case "phone":
        cloneClone = addPhoneClone.clone(true);
        $(addSkillStep).remove();
        fillPhoneNumberStep(cloneClone);
        $(mainWizardCont).append(cloneClone);
        document.querySelector(telNumberInput).focus();
        break;
      case "name":
        cloneClone = addNameClone.clone(true);
        $(addPhoneStep).remove();
        fillNameStep(cloneClone);
        $(mainWizardCont).append(cloneClone);
        document.querySelector(nameInputFirst).focus();
        break;
    }
  };

  function sendSkillInfo(e) {
    var ajaxData = {
      skill: {
        person_id: personID,
        lang_from_id: $(skillLangFromId).val(),
        lang_to_id: $(skillLangToId).val(),
        qualification_id: $(skillQualificationId).val(),
        phone_price: $(skillPhonePrice).val() || 0,
        video_price: $(skillVideoPrice).val() || 0,
        hub_price: $(skillHubPrice).val() || 0,
        in_person_price: $(skillLocationPrice).val() || 0,
        currency_id: 2
      }
    };

    $(e.target).addClass(progressClass);

    $.ajax({
      url: 'people/' + personID + '/update_skill',
      type: "PATCH",
      data: JSON.stringify(ajaxData),
      dataType: 'json',
      contentType: 'application/json',
      success: function(response) {
        var cloneClone;

        langFromID = ajaxData.skill.lang_from_id;
        langToID = ajaxData.skill.lang_to_id;
        qualificationID = ajaxData.skill.qualification_id;
        videoPrice = ajaxData.skill.video_price;
        phonePrice = ajaxData.skill.phone_price;
        locationPrice = ajaxData.skill.in_person_price;
        hubPrice = ajaxData.skill.hub_price;

        if ($(e.target).is(skillSaveAndAdd)) {
          cloneClone = addSkillClone.clone(true);

          $(addSkillStep).remove();
          $(mainWizardCont).append(cloneClone);
          showErrorsModule.hideMessage();
        } else {
          cloneClone = addAddressClone.clone(true);

          $(addSkillStep).remove();
          $(mainWizardCont).append(cloneClone);
          showErrorsModule.hideMessage();
        }
      },
      error: function (response) {
        var errors = $.parseJSON(response.responseText);
        showErrorsModule.showMessage(errors, "main-error");
        $(e.target).removeClass(progressClass);
      }
    });
  };

  function sendAddressInfo(e) {
    var ajaxData = {
      id: personID,
      person: {
        sex: $(addressGender).val() ? $(addressGender).val() : ""
      }
    };

    $(e.target).addClass(progressClass);

    $.ajax({
      url: "/people/update_interpreter_profile",
      type: "PATCH",
      data: JSON.stringify(ajaxData),
      dataType: 'json',
      contentType: 'application/json',
      success: function(response) {
        var cloneClone = finalStepClone.clone(true);

        $(addAddressStep).remove();
        $(mainWizardCont).append(cloneClone);
        showErrorsModule.hideMessage();
      },
      error: function(response) {
        var errors = $.parseJSON(response.responseText);
        showErrorsModule.showMessage(errors, "main-error");
        $(e.target).removeClass(progressClass);
      }
    });
  };

  // helper functions ==============================================================================
  
  function trackConversion(){
    if (conversionHasBeenTracked) return;
    conversionTracking.trackSignUp( isBusiness );
    conversionHasBeenTracked = true;
  }

  function focusSendCodeBtn(e) {
    $(e.target).val().length === 4 ? document.querySelector(verifyCodeBtn).focus() : "";
  }

  function clearCodeInput(e) {
    $(e.target).val("");
  }

  function setAvatar(e) {
    $(avatarLable).addClass(settedAvatarClass);
    $(avatarLable).attr("style", "background-image: url(" + e.target.result + ");");
    userAvatar = e.target.result;
  }

  function fillNameStep(elem) {
    elem.find(nameInputFirst).val(firstName);
    elem.find(nameInputLast).val(lastName);
    if (userAvatar) {
      elem.find(avatarLable).addClass(settedAvatarClass);
      elem.find(avatarLable).attr("style", "background-image: url(" + userAvatar + ");");
    }
  }

  function fillSkillStep(elem) {
    elem.find(skillLangFromId).val(langFromID);
    elem.find(skillLangToId).val(langToID);
    elem.find(skillQualificationId).val(qualificationID);
    elem.find(skillVideoPrice).val(videoPrice);
    elem.find(skillPhonePrice).val(phonePrice);
    elem.find(skillLocationPrice).val(locationPrice);
    elem.find(skillHubPrice).val(hubPrice);
  }

  // functions for init =============================================================================

  function cloneElements() {
    addNameClone = $(addNameStep).clone(true);
    addPhoneClone = $(addPhoneStep).clone(true);
    enterCodeClone = $(enterCodeStep).clone(true);
    addSkillClone = $(addSkillStep).clone(true);
    addAddressClone = $(addAddressStep).clone(true);
    finalStepClone = $(finalStep).clone(true);

    $(addNameStep).remove();
    $(addPhoneStep).remove();
    $(enterCodeStep).remove();
    $(addSkillStep).remove();
    $(addAddressStep).remove();
    $(finalStep).remove();

    addNameClone.removeClass(exampleClass);
    addPhoneClone.removeClass(exampleClass);
    enterCodeClone.removeClass(exampleClass);
    addSkillClone.removeClass(exampleClass);
    addAddressClone.removeClass(exampleClass);
    finalStepClone.removeClass(exampleClass);
  }

  function fillPhoneNumberStep(elem) {
    if (phoneCode && phoneNumber) {
      elem.find(telCodeInput).val(phoneCode);
      elem.find(telNumberInput).val(phoneNumber);
      customSelectsModule.setInitialValues(elem);
    }
  }

  function turnOffWizard(callback) {
    $.ajax({
      url: 'set_wizard',
      type: "POST",
      data: JSON.stringify({
        person: {
          wizard: false,
          id: personID
        }
      }),
      dataType: 'json',
      contentType: 'application/json',
      success: function(response) {
        callback();
      },
      error: function (response) {
        var main_error = response.responseJSON.message;
        if (main_error) {
          showErrorsModule.showMessage([main_error], "main-error");
        }
        console.log(response);
      }
    });
  }

  function showFirstStep() {
    var cloneClone = addNameClone.clone(true);

    if (sendAJAX) {
      turnOffWizard(function() {
        $(mainWizardCont).append(cloneClone);
        document.querySelector(nameInputFirst).focus();
        trackConversion();
      });
    } else {
      $(mainWizardCont).append(cloneClone);
      document.querySelector(nameInputFirst).focus();
    }
  }

  // init function ============================================================================================

  function initPostRoleWizard(htmlData, userID) {
    personID = userID || $(personIDInput).val();

    var phoneVerificationParams = {
      containerSelector: mainWizardCont,
      humanID: personID,
      handlersSelector: mainWizardCont,
      phoneCallback: function() {
        var cloneClone = enterCodeClone.clone(true);

        phoneCode = $(telCodeInput).val();
        phoneNumber = $(telNumberInput).val();

        $(addPhoneStep).remove();
        cloneClone.find(codeEnteredNumber).text(phoneCode + phoneNumber);
        $(mainWizardCont).append(cloneClone);
        document.querySelector(codeInput).oninput = focusSendCodeBtn;
        document.querySelector(codeInput).onfocus = clearCodeInput;
        document.querySelector(codeInput).focus();
        showErrorsModule.hideMessage();
      },
      phoneErrorCallback: function(response) {
        var errors = $.parseJSON(response.responseText);
        showErrorsModule.showMessage(errors, "main-error");
        if ($(enterCodeStep).length) {
          $(enterCodeStep).attr("style", "margin-top: -152px;");
        }
      },
      codeCalback: function(uNumber, uCode) {
        var cloneClone;

        if(isBusiness) {
          cloneClone = finalStepClone.clone(true);
        } else {
          cloneClone = addSkillClone.clone(true);
        }

        $(enterCodeStep).remove();
        $(mainWizardCont).append(cloneClone);
        showErrorsModule.hideMessage();
      },
      tryAgainCallback: function() {
        var cloneClone = addPhoneClone.clone(true);

        fillPhoneNumberStep(cloneClone);

        $(enterCodeStep).remove();
        $(mainWizardCont).append(cloneClone);
        showErrorsModule.hideMessage();
      }
    };

    $(personIDInput).remove();
    htmlData ? (function() {
      $(mainWizardCont).html(htmlData.html);
      customSelectsModule.init();
    }()) : "";

    if (!$(addSkillStep).length) {
      isBusiness = true;
    }

    if (htmlData && (htmlData.first_name || htmlData.last_name || htmlData.avatar) || ($(nameInputFirst).val() || $(nameInputLast).val())) {
      sendAJAX = true;
    }

    verifyPhoneModule.init(phoneVerificationParams);
    tabOrderModule.init();
    $(avatarInput).on("change", avatarInputHandler);
    $(skillQualificationId).val($(skillQualificationItem).last().attr("data-id"));
    customSelectsModule.setInitialValues($(addSkillStep));
    cloneElements();

    $(mainWizardCont).on("click", sendNameAvatarBtn, sendNameAvatarHandler);
    $(mainWizardCont).on("click", skillSaveBtn, sendSkillInfo);
    $(mainWizardCont).on("click", skillSaveAndAdd, sendSkillInfo);
    $(mainWizardCont).on("click", addressSaveBtn, sendAddressInfo);
    $(mainWizardCont).on("click", skipBtn, skipStepHandler);
    $(mainWizardCont).on("click", backBtn, backStepHandler);

    showFirstStep();
  }

  return {
    init: initPostRoleWizard
  };

}());
