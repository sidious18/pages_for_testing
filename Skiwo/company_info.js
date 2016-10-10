var companyInfoModule = (function() {
  var compInfoMainCont = ".js-comp-info-main";
  var compInfoEditBtn = ".js-comp-info-edit-btn";
  var compInfoActionBtnsCont = ".js-action-btns-cont";
  var progressClass = "in-progress";
  var exampleClass = "is-example";
  var hiddenClass = "is-hidden";
  var enterpriseIDInput = ".js-enterprise-id";
  var enterprisePath = "/enterprises/";
  var avatarAngle = 0;
  var avatarPrevAngle = 0;
  var enterpriseID;
  var ownerID;
  var addressID;
  var userAvatar;
  var companyInfoData;

  // avatar section
  var logoSection = ".js-logo-section";
  var logoPictureCont = ".js-comp-logo-cont";
  var logoEditBtn = ".js-edit-comp-logo";
  var logoPicture = ".js-render-comp-logo";
  var logoRenderCompName = ".js-comp-logo-name";
  var logoFormBlock = ".js-comp-logo-form";
  var logoRotateBtn = ".js-rotate-comp-logo-btn";
  var logoInput = ".js-comp-logo-input";
  var logoSaveBtn = ".js-save-comp-logo";
  var logoCancelBtn = ".js-cancel-comp-logo";

  // name orgnumber section
  var nameOrgnumSection = ".js-comp-name-orgnum-section";
  var nameOrgnumRenderBlock = ".js-comp-name-orgnum";
  var nameOrgnumEditBtn = ".js-edit-comp-name-orgnum";
  var renName = ".js-ren-comp-name";
  var renOrgnum = ".js-ren-org-num";
  var nameOrgnumFormBlock = ".js-comp-name-orgnum-form";
  var formCompNameInput = ".js-save-comp-name";
  var formCompOrgnumInput = ".js-save-comp-org-num";
  var nameOrgnumSaveBtn = ".js-save-comp-name-orgnum";
  var nameOrgnumCancelBtn = ".js-cancel-comp-name-orgnum";

  // company address section
  var addressSection = ".js-comp-address-section";
  var addressRenderBlock = ".js-comp-address";
  var addressEditBtn = ".js-edit-comp-address";
  var renAddressLine1 = ".js-comp-address-line-1";
  var renAddressLine2 = ".js-comp-address-line-2";
  var renAddressCounty = ".js-comp-address-county";
  var renAddressPostCity = ".js-comp-address-post-city";
  var renAddressCountry = ".js-comp-address-country";
  var addressFormBlock = ".js-comp-address-form";
  var saveAddress1 = ".js-comp-address-1";
  var saveAddress2 = ".js-comp-address-2";
  var saveCounty = ".js-comp-county";
  var savePostcode = ".js-comp-post-code";
  var saveCity = ".js-comp-city";
  var saveCountry = ".js-comp-country";
  var addressSaveBtn = ".js-save-comp-address";
  var addressCancelBtn = ".js-cancel-comp-address";

  // emails section
  var emailsSection = ".js-emails-section";
  var emailsRenderBlock = ".js-emails";
  var emailsEditBtn = ".js-edit-comp-emails";
  var redAdminEmail = ".js-ren-admin-email";
  var redAuthorityEmail = ".js-ren-auth-email";
  var emailsFormBlock = ".js-emails-form";
  var saveAdminEmail = ".js-admin-email";
  var saveAuthorityEmail = ".js-auth-email";
  var emailsSaveBtn = ".js-save-comp-emails";
  var emailsCancelBtn = ".js-cancel-comp-emails";

  // phones section
  var phonesSection = ".js-phones-section";
  var phonesRenderBlock = ".js-phones";
  var phonesEditBtn = ".js-edit-comp-phones";
  var renCompanyContact = ".js-ren-comp-contact";
  var renPersonContact = ".js-ren-person-contact";
  var phonesFormBlock = ".js-phones-form";
  var saveCompanyTelCode = ".js-comp-tel-code";
  var saveCompanyTelNymber = ".js-comp-tel-number";
  var savePersonTelCode = ".js-person-tel-code";
  var savePersonTelNumber = ".js-person-tel-number";
  var phonesSaveBtn = ".js-save-comp-phones";
  var phonesCancelBtn = ".js-cancel-comp-phones";

  // template clones
  var logoCompanyNameClone,
      logoFormClone,
      nameOrgnumRenderClone,
      nameOrgnumFormClone,
      addressRenderClone,
      addressFormClone,
      emailsRenderClone,
      emailsFormClone,
      phonesRenderClone,
      phonesFormClone;

  function makeNameOrgnumRenParams() {
    return {
      clone: nameOrgnumRenderClone,
      elements: [nameOrgnumRenderBlock, nameOrgnumFormBlock],
      contElement: nameOrgnumSection,
      handlerParams: [
        [renName, companyInfoData.name], 
        [renOrgnum, companyInfoData.org_number]
      ]
    };
  }
  function makeAddressRenParams() {
    return {
      clone: addressRenderClone,
      elements: [addressRenderBlock, addressFormBlock],
      contElement: addressSection,
      handlerParams: [
        [renAddressLine1, companyInfoData.address.line_1], 
        [renAddressLine2, companyInfoData.address.line_2],
        [renAddressCounty, companyInfoData.address.county],
        [renAddressPostCity, [companyInfoData.address.postcode, companyInfoData.address.city].join(" ")],
        [renAddressCountry, companyInfoData.address.country],
      ]
    };
  };
  function makeEmailsRenParams() {
    return {
      clone: emailsRenderClone,
      elements: [emailsRenderBlock, emailsFormBlock],
      contElement: emailsSection,
      handlerParams: [
        [redAdminEmail, companyInfoData.admin_email], 
        [redAuthorityEmail, companyInfoData.auth_email]
      ]
    };
  };
  function makePhonesRenParams() {
    return {
      clone: phonesRenderClone,
      elements: [phonesRenderBlock, phonesFormBlock],
      contElement: phonesSection,
      handlerParams: [
        [renCompanyContact, [companyInfoData.phone_code, companyInfoData.phone_number].join("")], 
        [renPersonContact, [companyInfoData.contact_phone_code, companyInfoData.contact_phone_number].join("")]
      ]
    };
  };
  function makeAvatarRenParams() {
    return {
      clone: logoCompanyNameClone,
      elements: [logoRenderCompName, logoFormBlock],
      contElement: logoSection,
      handlerParams: [
        [logoRenderCompName, companyInfoData.name]
      ]
    };
  };
  function makeNameOrgnumFormParams() {
    return {
      clone: nameOrgnumFormClone,
      elements: [nameOrgnumRenderBlock, nameOrgnumFormBlock],
      contElement: nameOrgnumSection,
      handlerParams: [
        [formCompNameInput, companyInfoData.name], 
        [formCompOrgnumInput, companyInfoData.org_number]
      ]
    };
  };
  function makeAddressFormParams () {
    return {
      clone: addressFormClone,
      elements: [addressRenderBlock, addressFormBlock],
      contElement: addressSection,
      handlerParams: [
        [saveAddress1, companyInfoData.address.line_1], 
        [saveAddress2, companyInfoData.address.line_2],
        [saveCounty, companyInfoData.address.county],
        [savePostcode, companyInfoData.address.postcode],
        [saveCity, companyInfoData.address.city],
        [saveCountry, companyInfoData.address.country],
      ]
    };
  };
  function makeEmailsFormParams () {
    return {
      clone: emailsFormClone,
      elements: [emailsRenderBlock, emailsFormBlock],
      contElement: emailsSection,
      handlerParams: [
        [saveAdminEmail, companyInfoData.admin_email], 
        [saveAuthorityEmail, companyInfoData.auth_email]
      ]
    };
  };
  function makePhonesFormParams () {
    return {
      clone: phonesFormClone,
      elements: [phonesRenderBlock, phonesFormBlock],
      contElement: phonesSection,
      handlerParams: [
        [saveCompanyTelCode, companyInfoData.phone_code], 
        [saveCompanyTelNymber, companyInfoData.phone_number],
        [savePersonTelCode, companyInfoData.contact_phone_code],
        [savePersonTelNumber, companyInfoData.contact_phone_number]
      ]
    };
  };
  function makeAvatarFormParams () {
    return {
      clone: logoFormClone,
      elements: [logoRenderCompName, logoFormBlock],
      contElement: logoSection,
      handlerParams: []
    };
  };
  var avatarFormParams = {
    elements: [logoRenderCompName, logoFormBlock],
    contElement: logoSection,
    handlerParams: []
  };


  // functions
  function cloneClones() {
    logoCompanyNameClone = $(logoRenderCompName).clone(true);
    logoFormClone = $(logoFormBlock).clone(true);
    nameOrgnumRenderClone = $(nameOrgnumRenderBlock).clone(true);
    nameOrgnumFormClone = $(nameOrgnumFormBlock).clone(true);
    addressRenderClone = $(addressRenderBlock).clone(true);
    addressFormClone = $(addressFormBlock).clone(true);
    emailsRenderClone = $(emailsRenderBlock).clone(true);
    emailsFormClone = $(emailsFormBlock).clone(true);
    phonesRenderClone = $(phonesRenderBlock).clone(true);
    phonesFormClone = $(phonesFormBlock).clone(true);

    $(logoRenderCompName).remove();
    $(logoFormBlock).remove();
    $(nameOrgnumRenderBlock).remove();
    $(nameOrgnumFormBlock).remove();
    $(addressRenderBlock).remove();
    $(addressFormBlock).remove();
    $(emailsRenderBlock).remove();
    $(emailsFormBlock).remove();
    $(phonesRenderBlock).remove();
    $(phonesFormBlock).remove();

    logoCompanyNameClone.removeClass(exampleClass);
    logoFormClone.removeClass(exampleClass);
    nameOrgnumRenderClone.removeClass(exampleClass);
    nameOrgnumFormClone.removeClass(exampleClass);
    addressRenderClone.removeClass(exampleClass);
    addressFormClone.removeClass(exampleClass);
    emailsRenderClone.removeClass(exampleClass);
    emailsFormClone.removeClass(exampleClass);
    phonesRenderClone.removeClass(exampleClass);
    phonesFormClone.removeClass(exampleClass);
  }

  function removeEditBtns() {
    var clonesArr = [
      logoCompanyNameClone,
      logoFormClone,
      nameOrgnumRenderClone,
      nameOrgnumFormClone,
      addressRenderClone,
      addressFormClone,
      emailsRenderClone,
      emailsFormClone,
      phonesRenderClone,
      phonesFormClone
    ];

    $(compInfoEditBtn).remove();

    for (var i = 0, lim = clonesArr.length; i < lim; i += 1) {
      clonesArr[i].find(compInfoEditBtn).remove();
    }
  }

  function editAndCancelBtnsHandler(params, hideEditBtn) {
    var p = params;
    var c = hideEditBtn;

    return function() {
      var params = p;
      var hideEditBtn = c;
      var cloneClone = params.clone.clone(true);
      var arrForRemoving = params.elements;
      var appendTo = params.contElement;
      var handlerParams = params.handlerParams;
      var i, lim;

      for (i = 0, lim = arrForRemoving.length; i < lim; i += 1) {
        $(arrForRemoving[i]).remove();
      }

      cloneClone = insertData(cloneClone, handlerParams);
      $(appendTo).append(cloneClone);

      if (hideEditBtn) {
        $(hideEditBtn).addClass(hiddenClass);
      }
    }
  }

  function insertData(elem, arr) {
    var neededElem;

    for (var i = 0, lim = arr.length; i < lim; i += 1) {
      neededElem = elem.find(arr[i][0]).length ? elem.find(arr[i][0]) : elem;
      neededElem.is("input") ? neededElem.val(arr[i][1]) : neededElem.text(arr[i][1]);
    }

    if (elem.find(".custom-select").length) {
      customSelectsModule.setInitialValues(elem);
    }

    return elem;
  }

  function rerenderView(obj, showEditBtn) {
    var cloneClone = obj.clone.clone(true);
    var arrForRemoving = obj.elements;
    var appendTo = obj.contElement;
    var handlerParams = obj.handlerParams;
    var i, lim;

    for (i = 0, lim = arrForRemoving.length; i < lim; i += 1) {
      $(arrForRemoving[i]).remove();
    }
    cloneClone = insertData(cloneClone, handlerParams);
    $(appendTo).append(cloneClone);
    if (showEditBtn) {
      $(showEditBtn).removeClass(hiddenClass);
    }
  }

  function avatarInputHandler(eve) {
    if (filesUploadingModule.validateAvatar(eve.target)) {
      filesUploadingModule.blobToBase64(eve.target, updateAvatarView);
    } else {
      showErrorsModule.showMessage({
        fileTypeError: window.__("You can only attach .jpg, .png, .gif types of files")
      }, "main-error");
    }
  }

  function sendUpdatedData(data, sCallback, eCallback, progressSelector) {
    $.ajax({
      url: enterprisePath + enterpriseID,
      type: "PATCH",
      data: JSON.stringify(data),
      dataType: 'json',
      contentType: 'application/json',
      beforeSend: function() {
        addProgressClass(progressSelector);
      },
      success: sCallback,
      error: eCallback,
      complete: function() {
        removeProgressBar(progressSelector);
      }
    });
  }

  function saveNameOrgnumData(e) {
    var name = $(formCompNameInput).val();
    var orgNum = $(formCompOrgnumInput).val();

    var ajaxData = {
      id: enterpriseID,
      enterprise: {
        name: name,
        org_number: orgNum
      }
    };

    sendUpdatedData(
      ajaxData,
      function() {
        companyInfoData.name = name;
        companyInfoData.org_number = orgNum;
        rerenderView(makeNameOrgnumRenParams());
      },
      function(response) {
        var errors = response.errors;
        showErrorsModule.showMessage(errors, "main-error")
      },
      nameOrgnumSection
    );
  }

  function saveAddressData(e) {
    var address1 = $(saveAddress1).val();
    var address2 = $(saveAddress2).val();
    var county = $(saveCounty).val();
    var postcode = $(savePostcode).val();
    var city = $(saveCity).val();
    var country = $(saveCountry).val();

    var ajaxData = {
      id: enterpriseID,
      enterprise: {
        address_attributes: {
          id: addressID,
          line_1: address1,
          line_2: address2,
          county: county,
          postcode: postcode,
          city: city,
          country: country
        }
      }
    };

    sendUpdatedData(
      ajaxData,
      function() {
        companyInfoData.address.line_1 = address1;
        companyInfoData.address.line_2 = address2;
        companyInfoData.address.county = county;
        companyInfoData.address.postcode = postcode;
        companyInfoData.address.city = city;
        companyInfoData.address.country = country;
        rerenderView(makeAddressRenParams());
      },
      function(response) {
        var errors = response.errors;
        showErrorsModule.showMessage(errors, "main-error")
      },
      addressSection
    );
  }

  function saveEmailsData() {
    var adminEmain = $(saveAdminEmail).val();
    var authEmail = $(saveAuthorityEmail).val();

    var ajaxData = {
      id: enterpriseID,
      enterprise: {
        auth_email: authEmail,
        admin_email: adminEmain
      }
    };

    sendUpdatedData(
      ajaxData,
      function() {
        companyInfoData.auth_email = authEmail;
        companyInfoData.admin_email = adminEmain;
        rerenderView(makeEmailsRenParams());
      },
      function(response) {
        var errors = response.errors;
        showErrorsModule.showMessage(errors, "main-error")
      },
      emailsSection
    );
  }

  function savePhonesData() {
    var compTelCode = $(saveCompanyTelCode).val();
    var compTelNumber = $(saveCompanyTelNymber).val();
    var personTelCode = $(savePersonTelCode).val();
    var personTelNumber = $(savePersonTelNumber).val();

    var ajaxData = {
      id: enterpriseID,
      enterprise: {
        phone_code: compTelCode,
        phone_number: compTelNumber,
        contact_phone_code: personTelCode,
        contact_phone_number: personTelNumber
      }
    };

    sendUpdatedData(
      ajaxData,
      function() {
        companyInfoData.phone_code = compTelCode;
        companyInfoData.phone_number = compTelNumber;
        companyInfoData.contact_phone_code = personTelCode;
        companyInfoData.contact_phone_number = personTelNumber;
        rerenderView(makePhonesRenParams());
      },
      function(response) {
        var errors = response.errors;
        showErrorsModule.showMessage(errors, "main-error");
      },
      phonesSection
    );
  }

  function updateAvatarView(picture) {
    var avatar = typeof picture === "object" ? (function() {
      avatarPrevAngle = 0;
      return picture.target.result;
    }()) : picture;
    avatarAngle = 0;

    if (avatar) {
      $(logoPicture).attr("style", "background-image: url(" + avatar + ");transform: rotate(" + avatarPrevAngle + "deg);");
      userAvatar = avatar
    } else if (userAvatar) {
      $(logoPicture).attr("style", "background-image: url(" + userAvatar + ");transform: rotate(" + avatarPrevAngle + "deg);");
    } else {
      $(logoPicture).attr("style", "");
      userAvatar = "";
    }
  }

  function saveAvatarData() {
    var avatar = userAvatar;

    if (avatar || avatarAngle) {
      var ajaxData = {
        id: enterpriseID,
        enterprise: {
          logo: avatar,
          image_rotation: (avatarAngle - avatarPrevAngle) || ""
        }
      };

      sendUpdatedData(
        ajaxData,
        function() {
          if (userAvatar) {
            companyInfoData.logo = userAvatar;
          }
          userAvatar = "";
          avatarPrevAngle = avatarAngle;
          rerenderView(makeAvatarRenParams(), logoEditBtn);
          updateAvatarView(companyInfoData.logo);
        },
        function(response) {
          var errors = response.errors;
          showErrorsModule.showMessage(errors, "main-error")
        },
        logoSection
      );
    }
  }

  function addProgressClass(selector) {
    $(selector).find(compInfoActionBtnsCont).addClass(progressClass);
  }

  function removeProgressBar(selector) {
    $(selector).find(compInfoActionBtnsCont).removeClass(progressClass);
  }

  function rotateCompLogo() {
    if (companyInfoData.logo || userPhoto) {
      avatarAngle = (avatarAngle + 90)%360;
      $(logoPicture).attr("style", $(logoPicture).attr("style") + "transform: rotate(" + avatarAngle + "deg);") ;
    }
  }

  function getCompanyInfoData() {
    return $.get(enterprisePath + enterpriseID + ".json").promise();
  }

  function initCompanyInfo() {
    enterpriseID = $(enterpriseIDInput).val();
    $(enterpriseIDInput).remove();
    $(logoInput).on("change", avatarInputHandler);
    avatarAngle = 0;
    cloneClones();

    var companyInfoGetPromise = getCompanyInfoData();
    companyInfoGetPromise.done(function(response) {
      companyInfoData = response;
      console.log(companyInfoData);
      addressID = companyInfoData.address.id;
      ownerID = companyInfoData.owner.id;

      var startParams = [makeAvatarRenParams(), makeNameOrgnumRenParams(), makeAddressRenParams(), makeEmailsRenParams(), makePhonesRenParams()];

      for (var i = 0, lim = startParams.length; i < lim; i += 1) {
        rerenderView(startParams[i]);
      }

      updateAvatarView(companyInfoData.logo);
      if (companyInfoData.logo) {
        userAvatar = companyInfoData.logo;
      }
      if (!companyInfoData.can_edit) {
        removeEditBtns();
      }

      $(compInfoMainCont).on("click", nameOrgnumEditBtn, editAndCancelBtnsHandler(makeNameOrgnumFormParams()));
      $(compInfoMainCont).on("click", addressEditBtn, editAndCancelBtnsHandler(makeAddressFormParams()));
      $(compInfoMainCont).on("click", emailsEditBtn, editAndCancelBtnsHandler(makeEmailsFormParams()));
      $(compInfoMainCont).on("click", phonesEditBtn, editAndCancelBtnsHandler(makePhonesFormParams()));
      $(compInfoMainCont).on("click", logoEditBtn, editAndCancelBtnsHandler(makeAvatarFormParams(), logoEditBtn));

      $(compInfoMainCont).on("click", nameOrgnumCancelBtn, editAndCancelBtnsHandler(makeNameOrgnumRenParams()));
      $(compInfoMainCont).on("click", addressCancelBtn, editAndCancelBtnsHandler(makeAddressRenParams()));
      $(compInfoMainCont).on("click", emailsCancelBtn, editAndCancelBtnsHandler(makeEmailsRenParams()));
      $(compInfoMainCont).on("click", phonesCancelBtn, editAndCancelBtnsHandler(makePhonesRenParams()));
      $(compInfoMainCont).on("click", logoCancelBtn, function() {
        rerenderView(makeAvatarRenParams(), logoEditBtn);
        updateAvatarView(companyInfoData.logo)
      });

      $(compInfoMainCont).on("click", nameOrgnumSaveBtn, saveNameOrgnumData);
      $(compInfoMainCont).on("click", addressSaveBtn, saveAddressData);
      $(compInfoMainCont).on("click", emailsSaveBtn, saveEmailsData);
      $(compInfoMainCont).on("click", phonesSaveBtn, savePhonesData);
      $(compInfoMainCont).on("click", logoSaveBtn, saveAvatarData);

      $(compInfoMainCont).on("click", logoRotateBtn, rotateCompLogo);
    });
    companyInfoGetPromise.fail(function() {
      alert("Something goes wrong!!!");
    })
  }

  return {
    init: initCompanyInfo
  };
}());
