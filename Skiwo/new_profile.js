var newProfileModule = (function() {
  var profileData;
  var isBusiness = true;
  var profileUpdatePath = "/people/update_interpreter_profile";


  //
  // selectors that receive or are involved to some functional
  //

  //
  // shared
  //
  var pulsarProgress = ".js-pulsar-progress";
  var profileMainTag = ".js-profile-main-element";
  var editBtnLink = ".js-edit-btn-link";
  var mainProfileElement = ".js-profile-page";
  var mainSkillsInfoCont = ".js-skills-info-section";
  var exampleClass = "is-example";
  var hiddenClass = "is-hidden";
  var checkboxesList = ".js-checkboxes-list";
  var checkboxesListItem = ".js-checkboxes-list-item";
  var checkboxLabel = ".js-profile-edit-checkbox-label";
  var checkboxText = ".js-profile-edit-checkbox-text";
  var checkedClass = "is-checked";
  var checkboxInput = ".js-profile-edit-checkbox-input";
  var personIDElem = ".js-current-person-id";
  var defaultUserAvatar = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyB3aWR0aD0iMjZweCIgaGVpZ2h0PSIyNnB4IiB2aWV3Qm94PSIwIDAgMjYgMjYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+ICAgICAgICA8dGl0bGU+dXNlcl9pY288L3RpdGxlPiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4gICAgPGRlZnM+PC9kZWZzPiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4gICAgICAgIDxnIGlkPSJEZXNrdG9wX2ludml0ZV9mb3JtIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNTQwLjAwMDAwMCwgLTI3Ny4wMDAwMDApIiBzdHJva2U9IiMzOEU0QUUiPiAgICAgICAgICAgIDxnIGlkPSJHcm91cC04IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyODUuMDAwMDAwLCAyNjcuMDAwMDAwKSI+ICAgICAgICAgICAgICAgIDxnIGlkPSJHcm91cCI+ICAgICAgICAgICAgICAgICAgICA8ZyBpZD0idXNlcl9pY28iIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI1Ni4wMDAwMDAsIDEwLjAwMDAwMCkiPiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xOS45MDI2NzI0LDIxLjYxNzg0NDggQzE5LjE3NTA4NjIsMTkuNzIzODc5MyAxNy43NDkyMjQxLDE4LjE3NTYwMzQgMTUuOTQxNDY1NSwxNy4yODI1IEMxNC45NTI2NzI0LDE4LjAzMzM2MjEgMTMuNzIzMzYyMSwxOC40ODMzNjIxIDEyLjM4NTQzMSwxOC40ODMzNjIxIEMxMS4wNDgzNjIxLDE4LjQ4MzM2MjEgOS44MTkwNTE3MiwxOC4wMzMzNjIxIDguODMwMjU4NjIsMTcuMjgyNSBDNi45MTA0MzEwMywxOC4yMzE2Mzc5IDUuNDIwNzc1ODYsMTkuOTE4NzA2OSA0Ljc0MTQ2NTUyLDIxLjk3NTYwMzQiIGlkPSJTdHJva2UtMSI+PC9wYXRoPiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik04LjA3NjgxMDM0LDEyLjA1MzcwNjkgQzguMDc2ODEwMzQsOS42NzM1MzQ0OCAxMC4wMDYxMjA3LDcuNzQ1MDg2MjEgMTIuMzg1NDMxLDcuNzQ1MDg2MjEgQzE0Ljc2NTYwMzQsNy43NDUwODYyMSAxNi42OTQ5MTM4LDkuNjczNTM0NDggMTYuNjk0OTEzOCwxMi4wNTM3MDY5IEMxNi42OTQ5MTM4LDE0LjQzMzg3OTMgMTQuNzY1NjAzNCwxNi4zNjIzMjc2IDEyLjM4NTQzMSwxNi4zNjIzMjc2IEMxMC4wMDYxMjA3LDE2LjM2MjMyNzYgOC4wNzY4MTAzNCwxNC40MzM4NzkzIDguMDc2ODEwMzQsMTIuMDUzNzA2OSBMOC4wNzY4MTAzNCwxMi4wNTM3MDY5IFoiIGlkPSJTdHJva2UtMyI+PC9wYXRoPiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0wLjQzMTAzNDQ4MywxMi42MTQxMzc5IEMwLjQzMTAzNDQ4Myw2LjAxMTU1MTcyIDUuNzgzNjIwNjksMC42NTg5NjU1MTcgMTIuMzg2MjA2OSwwLjY1ODk2NTUxNyBDMTguOTg3OTMxLDAuNjU4OTY1NTE3IDI0LjM0MDUxNzIsNi4wMTE1NTE3MiAyNC4zNDA1MTcyLDEyLjYxNDEzNzkgQzI0LjM0MDUxNzIsMTkuMjE2NzI0MSAxOC45ODc5MzEsMjQuNTY5MzEwMyAxMi4zODYyMDY5LDI0LjU2OTMxMDMgQzUuNzgzNjIwNjksMjQuNTY5MzEwMyAwLjQzMTAzNDQ4MywxOS4yMTY3MjQxIDAuNDMxMDM0NDgzLDEyLjYxNDEzNzkgTDAuNDMxMDM0NDgzLDEyLjYxNDEzNzkgWiIgaWQ9IlN0cm9rZS01Ij48L3BhdGg+ICAgICAgICAgICAgICAgICAgICA8L2c+ICAgICAgICAgICAgICAgIDwvZz4gICAgICAgICAgICA8L2c+ICAgICAgICA8L2c+ICAgIDwvZz48L3N2Zz4="

  //
  // lang skills
  //
  // render
  var skillsLangSection = ".js-lang-skills-section";
  var skillMainCont = ".js-skill-main-cont";
  var skillOneCertifCont = ".js-one-certif";
  var skillsLangInfoCont = ".js-lang-info-cont";
  var skillWaitingText = ".js-waiting-text";
  var skillDeclinedText = ".js-declined-text";
  var skillWaitingClass = "is-waiting";
  var skillsPricesNote = ".js-prices-note";
  var skillsVideoRow = ".js-video-type-row";
  var skillsPhoneRow = ".js-phone-type-row";
  var skillsLocationRow = ".js-location-type-row";
  var skillsHubRow = ".js-hub-type-row";
  var skillsLangDetailsCont = ".js-lang-details-cont";
  var renLangFrom = ".js-render-lang-from";
  var renLangFromDialect = ".js-render-lang-from-dialect";
  var renLangFromAccent = ".js-render-lang-from-accent";
  var renLangTo = ".js-render-lang-to";
  var renLangToDialect = ".js-render-lang-to-dialect";
  var renLangToAccent = ".js-render-lang-to-accent";
  var renQualification = ".js-render-qualification";
  var renCertifTitle = ".js-render-certif-title";
  var renCertifLink = ".js-render-certif-path";
  var renVideoPrice = ".js-render-video-price";
  var renPhonePrice = ".js-render-phone-price";
  var renLocationPrice = ".js-render-location-price";
  var renHubPrice = ".js-render-hub-price";
  var renCurrency = ".js-render-currency";

  // posting
  var skillFormMainCont = ".js-skill-form";
  var skillAddSkillBtn = ".js-add-new-skill-btn";
  var skillAddBtnSection = ".js-add-skil-btn-section";
  var skillSaveBtn = ".js-save-one-skill";
  var skillDeleteBtn = ".js-delete-one-skill-btn";
  var skillCancelBtn = ".js-cancel-one-skill-saving";
  var skillEditBtn = ".js-edit-current-skill";
  var skillExpandDetails = ".js-expand-lang-details";
  var skillsCollapsedCont = ".js-collapsed-cont";
  var skillVerifyPhoneBtn = ".js-verify-phone-btn";
  var skillsFormUploadCertifCont = ".js-form-upload-certif-cont";
  var skillsTypesCont = ".js-types-cont";
  var skillDeleteCertifBtn = ".js-delete-certif";
  var postLangFrom = ".js-lang-from";
  var postLangFromDialect = ".js-lang-from-dialect";
  var postLangFromAccent = ".js-lang-from-accent";
  var postLangTo = ".js-lang-to";
  var postLangToDialect = ".js-lang-to-dialect";
  var postLangToAccent = ".js-lang-to-accent";
  var postQualification = ".js-qualification";
  var postCertifTitle = ".js-certif-title";
  var postCertifFile = ".js-new-certificate-file";
  var postVideoPrice = ".js-video-type-price";
  var postPhonePrice = ".js-phone-type-price";
  var postLocationPrice = ".js-location-type-price";
  var postHubPrice = ".js-hub-type-price";

  //
  // avatar
  //
  // render
  var avatarSection = ".js-avatar-section";
  var avatarCont = ".js-avatar-cont";
  var renUserAvatar = ".js-render-user-avatar";
  var avatarAngle = 0;
  var avatarPrevAngle = 0;

  // posting
  var avatarFormPart = ".js-upload-photo-form-part";
  var avatarShowFormBtn = ".js-show-avatar-form-btn";
  var avatarEditBtn = ".js-edit-avatar";
  var avatarSaveBtn = ".js-save-user-avatar";
  var avatarCancelBtn = ".js-cancel-avatar-saving";
  var postUserAvatar = ".js-upload-avatar";
  var uploadAnimation = ".profile-edit-progress-bar-animation";
  var avatarRotateBtn = ".js-rotate-photo-btn";

  //
  // name
  //
  // render
  var userNameSection = ".js-user-name-section";
  var userNameCont = ".js-user-name-cont";
  var renFirstName = ".js-render-first-name";
  var renLastName = ".js-render-last-name";

  // posting
  var userNameFormPart = ".js-user-name-form-part";
  var userNameSaveBtn = ".js-save-user-name";
  var userNameCancelBtn = ".js-cancel-name-saving";
  var userNameEditBtn = ".js-edit-user-name";
  var postFirstName = ".js-user-first-name";
  var postLastName = ".js-user-last-name";

  //
  // tolk
  //
  // render
  var tolkSection = ".js-tolk-section";
  var renTolkId = ".js-render-tolk-id";

  // posting 
  var tolkFormPart = ".js-tolk-id-form-part";
  var tolkShowFormPartBtn = ".js-show-tolk-id-part";
  var tolkEditBtn = ".js-edit-tolk-id";
  var tolkSaveBtn = ".js-save-tolk-id";
  var tolkCancelBtn = ".js-cancel-tolk-id-saving";
  var postTolkId = ".js-tolk-id";

  //
  // compl hours
  //
  // render
  var complHoursSection = ".js-compl-hours-section";
  var complHoursLabel = ".js-compl-hours-label";
  var renComplHours = ".js-render-compl-hours";

  // posting 
  var complHoursEditBtn = ".js-edit-compl-hours";
  var complHoursBtnsCont = ".js-save-compl-hours-cont";
  var complHoursSaveBtn = ".js-save-compl-hours";
  var complHoursCancelBtn = ".js-cancel-compl-hours-saving";
  var postComplHours = ".js-compl-hours";

  //
  // about
  //
  // render
  var aboutSection = ".js-about-section";
  var renAboutInfo = ".js-render-user-about";

  // posting
  var aboutFormPart = ".js-about-form-part";
  var aboutShowFormPartBtn = ".js-show-about-part";
  var aboutEditBtn = ".js-edit-about";
  var aboutSaveBtn = ".js-save-about";
  var aboutCancelBtn = ".js-cancel-about-saving";
  var postAbout = ".js-user-about";

  //
  // personal info
  //
  // render
  var personInfoSection = ".js-person-info-section";
  var personInfoMainCont = ".js-rendered-person-info";
  var renPersonInfoGender = ".js-render-gender";
  var renPersonInfoDoB = ".js-render-dob";
  var renPersonInfoEmail = ".js-render-email";
  var renPersonInfoTel = ".js-render-tel";
  var renPersonInfoAddress1 = ".js-render-address-1";
  var renPersonInfoAddress2 = ".js-render-address-2";
  var renPersonInfoCounty = ".js-render-county";
  var renPersonInfoPostAndCity = ".js-render-post-city";
  var renPersonInfoCountry = ".js-render-country";

  // posting
  var personInfoFormPart = ".js-person-info-form-part";
  var personInfoShowFormPart = ".js-show-person-info-part";
  var personInfoEditBtn = ".js-edit-person-info";
  var personInfoSaveBtn = ".js-save-person-info";
  var personInfoCancelBtn = ".js-cancel-person-info-saving";
  var personInfoVerifyBtnSection = ".js-address-verify-btn-section";
  var postPersonInfoGender = ".js-user-gender";
  var personInfoGenderValue = ".js-profile-gender-value";
  var postPersonInfoDoBDay = ".js-day-of-birth";
  var postPersonInfoDoBMonth = ".js-month-of-birth";
  var postPersonInfoDoBYear = ".js-year-of-birth";
  var postPersonInfoEmail = ".js-user-email";
  var postPersonInfoTelCode = ".js-user-tel-code";
  var postPersonInfoTelNumber = ".js-user-tel-number";
  var postPersonInfoAddress1 = ".js-user-address-1";
  var postPersonInfoAddress2 = ".js-user-address-2";
  var postPersonInfoCounty = ".js-user-county";
  var postPersonInfoPost = ".js-user-postcode";
  var postPersonInfoCity = ".js-user-city";
  var postPersonInfoCountry = ".js-user-country";

  //
  // areas of expertise
  //
  // render
  var areasSection = ".js-areas-section";
  var renAreas = '.js-render-areas';

  // posting
  var areasFormPart = ".js-areas-form-part";
  var areasShowFormPartBtn = ".js-show-areas-part";
  var areasEditBtn = ".js-edit-areas";
  var areasSaveBtn = ".js-save-areas";
  var areasCancelBtn = ".js-cancel-areas-saving";
  var areasInputDataSelector = "[data-area-id]";
  var areasInputDataAttr = "data-area-id";


  //
  // int methods
  //
  // render
  var methodsSection = ".js-methods-section";
  var renMethods = '.js-render-methods';

  // posting
  var methodsFormPart = ".js-methods-form-part";
  var methodsShowFormPartBtn = ".js-show-methods-part";
  var methodsEditBtn = ".js-edit-methods";
  var methodsSaveBtn = ".js-save-methods";
  var methodsCancelBtn = ".js-cancel-methods-saving";
  var methodsInputDataSelector = "[data-method-id]";
  var methodsInputDataAttr = "data-method-id";

  //
  // assign types
  //
  // render
  var typesSection = ".js-types-section";
  var renTypes = '.js-render-types';

  // posting
  var typesFormPart = ".js-types-form-part";
  var typesShowFormPartBtn = ".js-show-types-part";
  var typesEditBtn = ".js-edit-types";
  var typesSaveBtn = ".js-save-types";
  var typesCancelBtn = ".js-cancel-types-saving";
  var typesInputDataSelector = "[data-type-id]";
  var typesInputDataAttr = "data-type-id";

  //
  // education
  //
  // render
  var eduSection = ".js-education-section";
  var eduMainCont = ".js-edu-info-main-cont";
  var eduPeriodCont = ".js-school-period-cont";
  var renEduSchool = ".js-render-school";
  var renEduSchoolLocation = ".js-render-school-location";
  var renEduSchoolDegree = ".js-render-school-degree";
  var renEduYearFrom = ".js-render-edu-year-from";
  var renEduYearTo = ".js-render-edu-year-to";

  // posting
  var eduFormPart = ".js-edu-form-part";
  var eduSaveBtnsCont = ".js-edu-save-btns";
  var eduAddSchoolBtn = ".js-add-school";
  var eduShowFormPartBtn = ".js-show-education-part";
  var eduEditnBtn = ".js-edit-edu";
  var eduSaveBtn = ".js-save-edu";
  var eduCancelBtn = ".js-cancel-edu-saving";
  var eduDeleteBtn = ".js-delete-school-btn";
  var postEduSchool = ".js-school";
  var postEduSchoolLocation = ".js-school-location";
  var postEduSchoolDegree = ".js-school-degree";
  var postEduYearFrom = ".js-edu-year-from";
  var postEduYearTo = ".js-edu-year-to";

  //
  // courses
  //
  // render
  var coursesSection = ".js-courses-section";
  var renCourses = ".js-render-courses";

  // posting
  var coursesFormPart = ".js-courses-form-part";
  var coursesAddCourseBtn = ".js-add-course";
  var coursesShowFormPartBtn = ".js-show-courses-part";
  var coursesEditBtn = ".js-edit-courses";
  var coursesSaveBtn = ".js-save-courses";
  var coursesCancelBtn = ".js-cancel-courses-saving";
  var postOneCourse = ".js-edu-course";


  //
  // profile invite functional
  //
  var inviteSection = ".js-invite-section";
  var editBtnElement = ".js-edit-prof-btn";
  var invitePersonBtn = ".js-invite-to-job";
  var showInvitePopupBtn = ".js-show-invite-popup";
  var closeInviteModalBtn = ".js-close-invite-modal";
  var inviteModal = ".container-for-modal.invite-popup";
  var inviteJobCont = ".js-invite-job-cont";
  var inviteModalCont = ".invite-modal-cont";
  var inviteJobSubject = ".invite-popup-job-subject";
  var inviteJobDate = ".invite-popup-job-date";
  var inviteJobTime = ".invite-popup-job-time";
  var inviteJobPrice = ".invite-popup-job-price";
  var jobsForInvite = [];
  var oneJobRowClone;

  //
  // profile add skill popup
  //
  var skillPopupCont = ".js-add-skill-popup";
  var skillPopupCross = ".js-close-skill-modal";

  //
  // clones
  //
  var avatarFormPartClone;
  var avatarImgClone;
  var userNameFormClone;
  var tolkFormClone;
  var complHoursBtnsClone;
  var aboutFormClone;
  var personInfoMainContClone;
  var personInfoFormClone;
  var checkboxItemClone;
  var areasFormClone;
  var methodsFormClone;
  var typesFormClone;
  var eduFormClone;
  var eduRenderContClone;
  var coursesFormClone;
  var coursesInputClone;
  var skillsMainClone;
  var skillsFormClone;
  var skillsCertifClone;

  //
  // other
  //
  var userPhoto = "";
  var currentUserId;
  var searchedID;
  var queryID;
  var canEdit;
  var startBreakWord = "<span class='profile-edit-person-word-breaker'>";
  var endBreakWord = "</span>";


  //
  // section functions
  //
  // avatar logic function
  function avatarSectionLogic(eve) {
    var avatarCloneClone = avatarImgClone.clone(true);
    var avatarFormCloneClone = avatarFormPartClone.clone(true);

    if (!eve) {
      if (profileData.avatar_path) {
        $(avatarShowFormBtn).remove();
        $(avatarFormPart).remove();
        $(avatarCont).remove();
        avatarImgClone.find(renUserAvatar).attr("style", "background-image: url(" + profileData.avatar_path + ");transform: rotate(" + avatarPrevAngle + "deg);");
        $(avatarSection).append(avatarImgClone);
      } else {
        if (canEdit) {
          $(avatarShowFormBtn).removeClass(hiddenClass);
        } else {
          $(avatarShowFormBtn).remove();
          avatarImgClone.find(renUserAvatar).attr("src", defaultUserAvatar);
          $(avatarSection).append(avatarImgClone);
        }
      }
    } else {
      if ($(eve.target).is(avatarShowFormBtn) || $(eve.target).is(avatarShowFormBtn + " *")) {
        if (!$(avatarFormPart).length) {
          avatarFormCloneClone.insertAfter($(avatarShowFormBtn));
          avatarFormCloneClone.find(postUserAvatar).on("change", avatarSectionLogic);
        }
      } else if ($(eve.target).is(postUserAvatar)) {
        if (filesUploadingModule.validateAvatar(eve.target)) {
          filesUploadingModule.blobToBase64(eve.target, function (e) { 
            var cloneElem = avatarImgClone.clone(true);
            if ($(avatarCont).length) {
              $(avatarCont).find(renUserAvatar).attr("style", "background-image: url(" + e.target.result + ");");
              userPhoto = String(e.target.result);
              avatarAngle = 0;
              avatarPrevAngle = 0;
            } else {
              $(avatarShowFormBtn).addClass(hiddenClass);
              cloneElem.find(renUserAvatar).attr("style", "background-image: url(" + e.target.result + ");");
              cloneElem.insertBefore(avatarFormPart);
              userPhoto = String(e.target.result);
              avatarAngle = 0;
              avatarPrevAngle = 0;
            }
          });
        } else {
          showErrorsModule.showMessage({
            fileTypeError: window.__("You can only attach .jpg, .png, .gif types of files")
          }, "main-error");
        }
      } else if ($(eve.target).is(avatarCancelBtn)) {
        avatarAngle = 0;
        if (profileData.avatar_path) {
          $(avatarEditBtn).removeClass(hiddenClass);
          showErrorsModule.hideMessage();
          avatarSectionLogic();
        } else {
          $(avatarShowFormBtn).removeClass(hiddenClass);
          $(avatarCont).remove();
          $(avatarFormPart).remove();
        }
      } else if ($(eve.target).is(avatarEditBtn)) {
        $(avatarEditBtn).addClass(hiddenClass);
        avatarFormCloneClone.find(postUserAvatar).on("change", avatarSectionLogic);
        avatarFormCloneClone.insertAfter($(avatarCont));
      } else if ($(eve.target).is(avatarSaveBtn)) {
        if (userPhoto || avatarAngle) {
          var ajaxData = {
            id: queryID,
            person: {
              avatar: userPhoto,
              image_rotation: (avatarAngle - avatarPrevAngle) || ""
            }
          };
          $(avatarSection).addClass("in-progress");

          $.ajax({
            url: profileUpdatePath,
            type: "PATCH",
            data: JSON.stringify(ajaxData),
            dataType: 'json',
            contentType: 'application/json',
            success: function(response) {
              $(avatarEditBtn).removeClass(hiddenClass);
              $(avatarShowFormBtn).remove();
              $(avatarFormPart).remove();
              if (userPhoto) {
                profileData.avatar_path = userPhoto;
              }
              userPhoto = "";
              avatarPrevAngle = avatarAngle;
              $(avatarSection).removeClass("in-progress");
              showErrorsModule.hideMessage();
            },
            error: function(response) {
              var errors = $.parseJSON(response.responseText);
              $(avatarSection).removeClass("in-progress");
              showErrorsModule.showMessage(errors, "main-error");
            }
          });
        } else {
          if (profileData.avatar_path) {
            $(avatarEditBtn).removeClass(hiddenClass);
            showErrorsModule.hideMessage();
            avatarSectionLogic();
          } else {
            $(avatarShowFormBtn).removeClass(hiddenClass);
            $(avatarCont).remove();
            $(avatarFormPart).remove();
          }
        }
      } else if ($(eve.target).is(avatarRotateBtn)) {
        if (profileData.avatar_path || userPhoto) {
          avatarAngle = (avatarAngle + 90)%360;
          $(renUserAvatar).attr("style", $(renUserAvatar).attr("style") + "transform: rotate(" + avatarAngle + "deg);") ;
        }
      }
    }
  };

  // name logic function
  function nameSectionLogic(eve) {
    var nameFormCloneClone = userNameFormClone.clone(true);

    if (!eve) {
      $(renFirstName).text(profileData.first_name);
      $(renLastName).text(profileData.last_name);
    } else {
      if ($(eve.target).is(userNameEditBtn)) {
        $(userNameCont).addClass(hiddenClass);
        nameFormCloneClone.find(postFirstName).val(profileData.first_name);
        nameFormCloneClone.find(postLastName).val(profileData.last_name);
        nameFormCloneClone.insertAfter($(userNameCont));
      } else if ($(eve.target).is(userNameCancelBtn)) {
        showErrorsModule.hideMessage();
        $(userNameFormPart).remove();
        $(userNameCont).removeClass(hiddenClass);
      } else if ($(eve.target).is(userNameSaveBtn)) {
        var ajaxData = {
          id: queryID,
          person: {
            first_name: $(postFirstName).val(),
            last_name: $(postLastName).val()
          }
        };
        $(userNameSection).addClass("in-progress");
        
        $.ajax({
          url: profileUpdatePath,
          type: "PATCH",
          data: JSON.stringify(ajaxData),
          dataType: 'json',
          contentType: 'application/json',
          success: function(response) {
            profileData.first_name = $(postFirstName).val();
            profileData.last_name = $(postLastName).val();
            $(renFirstName).text(profileData.first_name);
            $(renLastName).text(profileData.last_name);
            $(userNameCont).removeClass(hiddenClass);
            $(userNameFormPart).remove();
            $(userNameSection).removeClass("in-progress");
            showErrorsModule.hideMessage();
          },
          error: function(response) {
            var errors = $.parseJSON(response.responseText);
            $(userNameSection).removeClass("in-progress");
            showErrorsModule.showMessage(errors, "main-error");
          }
        });
      }
    }
  };

  // tolk logic function
  function tolkSectionLogic(eve) {
    var tolkFormCloneClone = tolkFormClone.clone(true);

    if (!eve) {
      if (profileData.tolk_id) {
        $(renTolkId).text(profileData.tolk_id);
        $(tolkShowFormPartBtn).addClass(hiddenClass);
        $(tolkEditBtn).removeClass(hiddenClass);
      } else {
        if (canEdit) {
          $(tolkShowFormPartBtn).removeClass(hiddenClass);
          $(tolkEditBtn).removeClass(hiddenClass);
        } else {
          $(tolkSection).remove();
        }
      }
    } else {
      if ($(eve.target).is(tolkShowFormPartBtn)) {
        $(tolkEditBtn).addClass(hiddenClass);
        $(tolkShowFormPartBtn).addClass(hiddenClass);
        tolkFormCloneClone.insertAfter($(tolkShowFormPartBtn));
      } else if ($(eve.target).is(tolkCancelBtn)) {
        showErrorsModule.hideMessage();
        $(tolkFormPart).remove();
        tolkSectionLogic();
      } else if ($(eve.target).is(tolkEditBtn)) {
        $(tolkShowFormPartBtn).addClass(hiddenClass);
        $(tolkEditBtn).addClass(hiddenClass);
        $(renTolkId).text("");
        tolkFormCloneClone.find(postTolkId).val(profileData.tolk_id);
        tolkFormCloneClone.insertAfter($(tolkShowFormPartBtn));
      } else if ($(eve.target).is(tolkSaveBtn)) {
        var ajaxData = {
          id: queryID,
          person: {
            tolk_link: $(postTolkId).val()
          }
        };
        $(tolkSection).addClass("in-progress");
        
        $.ajax({
          url: profileUpdatePath,
          type: "PATCH",
          data: JSON.stringify(ajaxData),
          dataType: 'json',
          contentType: 'application/json',
          success: function(response) {
            profileData.tolk_id = $(postTolkId).val();
            $(tolkFormPart).remove();
            tolkSectionLogic();
            showErrorsModule.hideMessage();
            $(tolkSection).removeClass("in-progress");
          },
          error: function(response) {
            var errors = $.parseJSON(response.responseText);
            $(tolkSection).removeClass("in-progress");
            showErrorsModule.showMessage(errors, "main-error");
          }
        });
      }
    }
  };

  // compl hours logic function
  function complHoursSectionLogic(eve) {
    var btnsCloneClone = complHoursBtnsClone.clone(true);

    if (!eve) {
      profileData.exp_in_hours ? $(renComplHours).text(profileData.exp_in_hours) : $(renComplHours).text("0");
      $(postComplHours).addClass(hiddenClass);
      $(renComplHours).removeClass(hiddenClass);
      $(complHoursEditBtn).removeClass(hiddenClass);
      $(complHoursBtnsCont).remove();
    } else {
      if ($(eve.target).is(complHoursEditBtn)) {
        $(complHoursEditBtn).addClass(hiddenClass);
        $(renComplHours).addClass(hiddenClass);
        profileData.exp_in_hours ? $(postComplHours).val(profileData.exp_in_hours) : $(postComplHours).val("0");
        $(postComplHours).removeClass(hiddenClass);
        btnsCloneClone.insertAfter($(complHoursLabel));
      } else if ($(eve.target).is(complHoursCancelBtn)) {
        showErrorsModule.hideMessage();
        profileData.exp_in_hours ? $(postComplHours).val(profileData.exp_in_hours) : $(postComplHours).val("0");
        complHoursSectionLogic();
      } else if ($(eve.target).is(complHoursSaveBtn)) {
        var ajaxData = {
          id: queryID,
          person: {
            exp_in_hours: !isNaN($(postComplHours).val()) ? $(postComplHours).val() : showErrorsModule.showMessage({exp_in_hours: window.__("Please enter the number of hours")}, "main-error")
          }
        };
        
        if (!isNaN(ajaxData.person.exp_in_hours)) {
          $(complHoursSection).addClass("in-progress");
          $.ajax({
            url: profileUpdatePath,
            type: "PATCH",
            data: JSON.stringify(ajaxData),
            dataType: 'json',
            contentType: 'application/json',
            success: function(response) {
              profileData.exp_in_hours = $(postComplHours).val();
              complHoursSectionLogic();
              showErrorsModule.hideMessage();
              $(complHoursSection).removeClass("in-progress");
            }, 
            error: function(response) {
              var errors = $.parseJSON(response.responseText);
              $(complHoursSection).removeClass("in-progress");
              showErrorsModule.showMessage(errors, "main-error");
            }
          });
        }
      }
    }
  }

  // about logic function
  function aboutSectionLogic(eve) {
    var formCloneClone = aboutFormClone.clone(true);

    if (!eve) {
      if (profileData.about) {
        $(aboutShowFormPartBtn).addClass(hiddenClass);
        $(aboutEditBtn).removeClass(hiddenClass);
        $(renAboutInfo).text(profileData.about);
        $(renAboutInfo).removeClass(hiddenClass);
      } else {
        if (canEdit) {
          $(aboutShowFormPartBtn).removeClass(hiddenClass);
          $(aboutEditBtn).removeClass(hiddenClass);
          $(renAboutInfo).addClass(hiddenClass);
        } else {
          $(aboutSection).remove();
        }
      }
      $(aboutFormPart).remove();
    } else {
      if ($(eve.target).is(aboutEditBtn)) {
        $(aboutShowFormPartBtn).addClass(hiddenClass);
        $(aboutEditBtn).addClass(hiddenClass);
        $(renAboutInfo).addClass(hiddenClass);
        formCloneClone.find(postAbout).val(profileData.about);
        formCloneClone.insertAfter($(renAboutInfo));
      } else if ($(eve.target).is(aboutCancelBtn)) {
        aboutSectionLogic();
      } else if ($(eve.target).is(aboutSaveBtn)) {
        var ajaxData = {
          id: queryID,
          person: {
            about: $(postAbout).val()
          }
        };
        $(aboutSection).addClass("in-progress");
        
        $.ajax({
          url: profileUpdatePath,
          type: "PATCH",
          data: JSON.stringify(ajaxData),
          dataType: 'json',
          contentType: 'application/json',
          success: function(response) {
            profileData.about = $(postAbout).val();
            aboutSectionLogic();
            $(aboutSection).removeClass("in-progress");
            showErrorsModule.hideMessage();
          }, 
          error: function(response) {
            var errors = $.parseJSON(response.responseText);
            $(aboutSection).removeClass("in-progress");
            showErrorsModule.showMessage(errors, "main-error");
          }
        });
      } else if ($(eve.target).is(aboutShowFormPartBtn)) {
        $(aboutShowFormPartBtn).addClass(hiddenClass);
        $(aboutEditBtn).addClass(hiddenClass);
        $(renAboutInfo).addClass(hiddenClass);
        formCloneClone.find(postAbout).val(profileData.about);
        formCloneClone.insertAfter($(renAboutInfo));
      }
    }
  };

  // personal info logic function
  function personInfoSectionLogic(eve) {
    var formCloneClone = personInfoFormClone.clone(true);
    var renderClone = personInfoMainContClone.clone(true);

    function setFormInformation(form) {
      if (!profileData.is_business) {
        if (profileData.gender) {
          form.find(postPersonInfoGender).val(profileData.gender.id);
          customSelectsModule.setInitialValues(form);
        } else {
          form.find(postPersonInfoGender).val("");
          customSelectsModule.setInitialValues(form);
        }
      } else {
        form.find(".js-gender-select").remove();
      }
      if (!profileData.is_business) {
        if (profileData.dob) {
          form.find(postPersonInfoDoBDay).val(profileData.dob.slice(0, 2));
          form.find(postPersonInfoDoBMonth).val(profileData.dob.slice(3, 5));
          form.find(postPersonInfoDoBYear).val(profileData.dob.slice(6));
          customSelectsModule.setInitialValues(form);
        } else {
          form.find(postPersonInfoDoBDay).val("");
          form.find(postPersonInfoDoBMonth).val("");
          form.find(postPersonInfoDoBYear).val("");
          customSelectsModule.setInitialValues(form);
        }
      } else {
        form.find(".js-dob-form-cont").remove();
      }
      if (profileData.email) {
        form.find(postPersonInfoEmail).val(profileData.email);
      } else {
        form.find(postPersonInfoEmail).val("");
      }
      if (profileData.tel && profileData.tel.tel_code && profileData.tel.tel_number) {
        form.find(postPersonInfoTelCode).val(profileData.tel.tel_code);
        form.find(postPersonInfoTelNumber).val(profileData.tel.tel_number);
      } else {
        form.find(postPersonInfoTelCode).val("+47");
        form.find(postPersonInfoTelNumber).val("");
      }
      if (!profileData.is_business) {
        if (profileData.address) {
          if (profileData.address.id) {
            form.attr("data-address-id", profileData.address.id);
          }
          profileData.address.line_1 ? form.find(postPersonInfoAddress1).val(profileData.address.line_1) : form.find(postPersonInfoAddress1).val("");
          profileData.address.line_2 ? form.find(postPersonInfoAddress2).val(profileData.address.line_2) : form.find(postPersonInfoAddress2).val("");
          profileData.address.county ? form.find(postPersonInfoCounty).val(profileData.address.county) : form.find(postPersonInfoCounty).val("");
          profileData.address.postcode ? form.find(postPersonInfoPost).val(profileData.address.postcode) : form.find(postPersonInfoPost).val("");
          profileData.address.city ? form.find(postPersonInfoCity).val(profileData.address.city) : form.find(postPersonInfoCity).val("");
          profileData.address.country ? form.find(postPersonInfoCountry).val(profileData.address.country) : form.find(postPersonInfoCountry).val("");
        } else {
          form.find(postPersonInfoAddress1).val("");
          form.find(postPersonInfoAddress2).val("");
          form.find(postPersonInfoCounty).val("");
          form.find(postPersonInfoPost).val("");
          form.find(postPersonInfoCity).val("");
          form.find(postPersonInfoCountry).val("");
        }
      } else {
        form.find(".js-address-form-cont").remove();
      }
      if (profileData.phone_verified) {
        form.find(personInfoVerifyBtnSection).remove();
      } else if (profileData.is_business) {
        form.find(".js-verify-phone-tooltip").text(window.__("Please add your phone number so we can reach you."));
      }
    }

    if (!eve) {
      if (canEdit) {
        if (!profileData.is_business) {
          if (profileData.gender) {
            renderClone.find(renPersonInfoGender).html(renderClone.find(renPersonInfoGender).html() + profileData.gender.name);
            renderClone.find(renPersonInfoGender).siblings(personInfoShowFormPart).addClass(hiddenClass);
          } else {
            renderClone.find(renPersonInfoGender).text("");
            renderClone.find(renPersonInfoGender).siblings(personInfoShowFormPart).removeClass(hiddenClass);
          }
        } else {
          renderClone.find(".js-gender-ren-row").remove();
        }
        if (!profileData.is_business) {
          if (profileData.dob) {
            renderClone.find(renPersonInfoDoB).html(renderClone.find(renPersonInfoDoB).html() + profileData.dob);
            renderClone.find(renPersonInfoDoB).attr("datetime", profileData.sys_dob);
            renderClone.find(renPersonInfoDoB).siblings(personInfoShowFormPart).addClass(hiddenClass);
          } else {
            renderClone.find(renPersonInfoDoB).text("");
            renderClone.find(renPersonInfoDoB).attr("datetime", "");
            renderClone.find(renPersonInfoDoB).siblings(personInfoShowFormPart).removeClass(hiddenClass);
          }
        } else {
          renderClone.find(".js-dob-ren-row").remove();
        }
        if (profileData.email) {
          renderClone.find(renPersonInfoEmail).html(renderClone.find(renPersonInfoEmail).html() + startBreakWord + profileData.email + endBreakWord);
          renderClone.find(renPersonInfoEmail).siblings(personInfoShowFormPart).addClass(hiddenClass);
        } else {
          renderClone.find(renPersonInfoEmail).text("");
          renderClone.find(renPersonInfoEmail).siblings(personInfoShowFormPart).removeClass(hiddenClass);
        }
        if (profileData.tel && profileData.tel.tel_code && profileData.tel.tel_number) {
          renderClone.find(renPersonInfoTel).html(renderClone.find(renPersonInfoTel).html() + startBreakWord + profileData.tel.tel_code + profileData.tel.tel_number + endBreakWord);
          renderClone.find(renPersonInfoTel).siblings(personInfoShowFormPart).addClass(hiddenClass);
        } else {
          renderClone.find(renPersonInfoTel).text("");
          renderClone.find(renPersonInfoTel).siblings(personInfoShowFormPart).removeClass(hiddenClass);
        }
        if (!profileData.is_business) {
          if (profileData.address && profileData.address.country) {
            renderClone.find(renPersonInfoAddress1).html(renderClone.find(renPersonInfoAddress1).html() + profileData.address.line_1);
            renderClone.find(renPersonInfoAddress2).text(profileData.address.line_2);
            renderClone.find(renPersonInfoCounty).text(profileData.address.county);
            renderClone.find(renPersonInfoPostAndCity).text(profileData.address.postcode + " " + profileData.address.city);
            renderClone.find(renPersonInfoCountry).text(profileData.address.country);
            renderClone.find(renPersonInfoAddress1).siblings(personInfoShowFormPart).addClass(hiddenClass);
          } else {
            renderClone.find(renPersonInfoAddress1).text("");
            renderClone.find(renPersonInfoAddress2).text("");
            renderClone.find(renPersonInfoCounty).text("");
            renderClone.find(renPersonInfoPostAndCity).text("");
            renderClone.find(renPersonInfoCountry).text("");
            renderClone.find(renPersonInfoAddress1).siblings(personInfoShowFormPart).removeClass(hiddenClass);
          }
        } else {
          renderClone.find(".js-address-ren-row").remove();
        }

        $(personInfoFormPart).remove();
        $(personInfoEditBtn).removeClass(renderClone);
        $(personInfoSection).append(renderClone);
      } else {
        $(personInfoSection).remove();
      }
    } else {
      if ($(eve.target).is(personInfoShowFormPart) || $(eve.target).is(personInfoEditBtn)) {
        $(personInfoFormPart).remove();
        $(personInfoMainCont).remove();
        setFormInformation(formCloneClone);
        $(personInfoSection).append(formCloneClone);
      } else if ($(eve.target).is(personInfoSaveBtn)) {
        var ajaxData = {
          id: queryID,
          person: {
            sex: $(postPersonInfoGender).val() ? $(postPersonInfoGender).val() : "",
            birth: $(postPersonInfoDoBYear).val() && $(postPersonInfoDoBMonth).val() && $(postPersonInfoDoBDay).val() ? [$(postPersonInfoDoBYear).val(), $(postPersonInfoDoBMonth).val(), $(postPersonInfoDoBDay).val()].join("-") : "",
            phone_code: $(postPersonInfoTelCode).val() && $(postPersonInfoTelNumber).val() ? $(postPersonInfoTelCode).val() : "",
            phone_number: $(postPersonInfoTelCode).val() && $(postPersonInfoTelNumber).val() ? $(postPersonInfoTelNumber).val() : "",
            address_attributes: {
              id: $(personInfoFormPart).attr("data-address-id") ? $(personInfoFormPart).attr("data-address-id") : "",
              line_1: $(postPersonInfoAddress1).val() ? $(postPersonInfoAddress1).val() : "",
              line_2: $(postPersonInfoAddress2).val() ? $(postPersonInfoAddress2).val() : "",
              city: $(postPersonInfoCity).val() ? $(postPersonInfoCity).val() : "",
              country: $(postPersonInfoCountry).val() ? $(postPersonInfoCountry).val() : "",
              postcode: $(postPersonInfoPost).val() ? $(postPersonInfoPost).val() : "",
              county: $(postPersonInfoCounty).val() ? $(postPersonInfoCounty).val() : "",
              id: $(personInfoFormPart).attr("data-address-id") 
            }
          }
        };
        $(personInfoSection).addClass("in-progress");

        $.ajax({
          url: profileUpdatePath,
          type: "PATCH",
          data: JSON.stringify(ajaxData),
          dataType: 'json',
          contentType: 'application/json',
          success: function(response) {
            if (profileData.gender) {
              profileData.gender.id = $(postPersonInfoGender).val();
              profileData.gender.name = $(personInfoGenderValue).text();
            } else {
              profileData.gender = {};
              profileData.gender.id = $(postPersonInfoGender).val();
              profileData.gender.name = $(personInfoGenderValue).text();
            }
            profileData.dob = $(postPersonInfoDoBYear).val() && $(postPersonInfoDoBMonth).val() && $(postPersonInfoDoBDay).val() ? [$(postPersonInfoDoBDay).val(), $(postPersonInfoDoBMonth).val(), $(postPersonInfoDoBYear).val()].join(".") : "";
            profileData.sys_dob = $(postPersonInfoDoBYear).val() && $(postPersonInfoDoBMonth).val() && $(postPersonInfoDoBDay).val() ? [$(postPersonInfoDoBYear).val(), $(postPersonInfoDoBMonth).val(), $(postPersonInfoDoBDay).val()].join("-") : "";
            profileData.email = $(postPersonInfoEmail).val();
            if (profileData.tel && profileData.tel.tel_code && profileData.tel.tel_number) {
              if (profileData.tel.tel_code !== $(postPersonInfoTelCode).val() || profileData.tel.tel_number !== $(postPersonInfoTelNumber).val()) {
                profileData.phone_verified = false;
                skillsSectionLogic();
              }
              profileData.tel.tel_code = $(postPersonInfoTelCode).val();
              profileData.tel.tel_number = $(postPersonInfoTelNumber).val();
            } else {
              profileData.tel = {};
              profileData.tel.tel_code = $(postPersonInfoTelCode).val();
              profileData.tel.tel_number = $(postPersonInfoTelNumber).val();
            }
            if (profileData.address) {
              if (!profileData.address.id) {
                profileData.address.id = response.address.id;
              }
              profileData.address.line_1 = $(postPersonInfoAddress1).val();
              profileData.address.line_2 = $(postPersonInfoAddress2).val();
              profileData.address.county = $(postPersonInfoCounty).val();
              profileData.address.postcode = $(postPersonInfoPost).val();
              profileData.address.city = $(postPersonInfoCity).val();
              profileData.address.country = $(postPersonInfoCountry).val();
            } else {
              profileData.address = {};
              profileData.address.line_1 = $(postPersonInfoAddress1).val();
              profileData.address.line_2 = $(postPersonInfoAddress2).val();
              profileData.address.county = $(postPersonInfoCounty).val();
              profileData.address.postcode = $(postPersonInfoPost).val();
              profileData.address.city = $(postPersonInfoCity).val();
              profileData.address.country = $(postPersonInfoCountry).val();
            }

            personInfoSectionLogic();
            $(personInfoSection).removeClass("in-progress");
            showErrorsModule.hideMessage();
          },
          error: function(response) {
            var errors = $.parseJSON(response.responseText);
            showErrorsModule.showMessage(errors, "main-error");
            $(personInfoSection).removeClass("in-progress");
          }
        });
      } else if ($(eve.target).is(personInfoCancelBtn)) {
        showErrorsModule.hideMessage();
        personInfoSectionLogic();
      }
    }
  };

  function areasOfExpSectionLogic(eve) {
    if (!eve && isAnyChecked("areas")) {
      $(areasShowFormPartBtn).addClass(hiddenClass);
      $(areasEditBtn).removeClass(hiddenClass);
      renderPostCheckboxesList("areas");
      $(areasFormPart).remove();
      $(renAreas).removeClass(hiddenClass);
    } else if (!eve && !isAnyChecked("areas")) {
      if (canEdit) {
        $(areasShowFormPartBtn).removeClass(hiddenClass);
        $(areasEditBtn).removeClass(hiddenClass);
        $(renAreas + " *").remove();
        $(areasFormPart).remove();
      } else {
        $(areasSection).remove();
      }
    } else {
      if ($(eve.target).is(areasShowFormPartBtn) || $(eve.target).is(areasEditBtn)) {
        var areasForm = createCheckboxesList("areas");
        $(renAreas).addClass(hiddenClass);
        $(areasEditBtn).addClass(hiddenClass);
        $(areasShowFormPartBtn).addClass(hiddenClass);
        areasForm.insertAfter($(renAreas));
      } else if ($(eve.target).is(areasCancelBtn)) {
        $(renAreas).removeClass(hiddenClass);
        $(areasFormPart).remove();
        if (!isAnyChecked("areas")) {
          $(areasShowFormPartBtn).removeClass(hiddenClass);
          $(areasEditBtn).removeClass(hiddenClass);
        } else {
          $(areasShowFormPartBtn).addClass(hiddenClass);
          $(areasEditBtn).removeClass(hiddenClass);
        }
      } else if ($(eve.target).is(areasSaveBtn)) {
        saveDataAfterCheckboxes("areas");
      }
    }
  };

  function interMethodsSectionLogic(eve) {
    if (!eve && isAnyChecked("methods")) {
      $(methodsShowFormPartBtn).addClass(hiddenClass);
      $(methodsEditBtn).removeClass(hiddenClass);
      renderPostCheckboxesList("methods");
      $(methodsFormPart).remove();
      $(renMethods).removeClass(hiddenClass);
    } else if (!eve && !isAnyChecked("methods")) {
      if (canEdit) {
        $(methodsShowFormPartBtn).removeClass(hiddenClass);
        $(methodsEditBtn).removeClass(hiddenClass);
        $(renMethods + " *").remove();
        $(methodsFormPart).remove();
      } else {
        $(methodsSection).remove();
      }
    } else {
      if ($(eve.target).is(methodsShowFormPartBtn) || $(eve.target).is(methodsEditBtn)) {
        var methodsForm = createCheckboxesList("methods");
        $(renMethods).addClass(hiddenClass);
        $(methodsEditBtn).addClass(hiddenClass);
        $(methodsShowFormPartBtn).addClass(hiddenClass);
        methodsForm.insertAfter($(renMethods));
      } else if ($(eve.target).is(methodsCancelBtn)) {
        $(renMethods).removeClass(hiddenClass);
        $(methodsFormPart).remove();
        if (!isAnyChecked("methods")) {
          $(methodsShowFormPartBtn).removeClass(hiddenClass);
          $(methodsEditBtn).removeClass(hiddenClass);
        } else {
          $(methodsShowFormPartBtn).addClass(hiddenClass);
          $(methodsEditBtn).removeClass(hiddenClass);
        }
      } else if ($(eve.target).is(methodsSaveBtn)) {
        saveDataAfterCheckboxes("methods");
      }
    }
  };

  function assignTypesSectionLogic(eve) {
    if (!eve && isAnyChecked("types")) {
      $(typesShowFormPartBtn).addClass(hiddenClass);
      $(typesEditBtn).removeClass(hiddenClass);
      renderPostCheckboxesList("types");
      $(typesFormPart).remove();
      $(renTypes).removeClass(hiddenClass);
    } else if (!eve && !isAnyChecked("types")) {
      if (canEdit) {
        $(typesShowFormPartBtn).removeClass(hiddenClass);
        $(typesEditBtn).removeClass(hiddenClass);
        $(renTypes + " *").remove();
        $(typesFormPart).remove();
      } else {
        $(typesSection).remove();
      }
    } else {
      if ($(eve.target).is(typesShowFormPartBtn) || $(eve.target).is(typesEditBtn)) {
        var typesForm = createCheckboxesList("types");
        $(renTypes).addClass(hiddenClass);
        $(typesEditBtn).addClass(hiddenClass);
        $(typesShowFormPartBtn).addClass(hiddenClass);
        typesForm.insertAfter($(renTypes));
      } else if ($(eve.target).is(typesCancelBtn)) {
        $(renTypes).removeClass(hiddenClass);
        $(typesFormPart).remove();
          $(typesEditBtn).removeClass(hiddenClass);
        if (!isAnyChecked("types")) {
          $(typesShowFormPartBtn).removeClass(hiddenClass);
        } else {
          $(typesShowFormPartBtn).addClass(hiddenClass);
        }
      } else if ($(eve.target).is(typesSaveBtn)) {
        saveDataAfterCheckboxes("types");
        
      }
    }
  };

  // education section
  function educationSectionLogic(eve) {
    // TODO: Clear deleted schools after saving new data

    var formCloneClone;
    var renderCloneClone;

    function isDeletedOnly(arr) {
      var result = true;
      if (profileData.education) {
        for (var i = 0, lim = profileData.education.length; i < lim; i += 1) {
          if (!profileData.education[i]._destroy) {
            result = false;
            break;
          }
        }
      }

      return result;
    }

    if (!eve) {
      if (profileData.education && profileData.education.length && !isDeletedOnly(profileData.education)) {
        $(eduMainCont).remove();
        $(eduFormPart).remove();
        $(eduShowFormPartBtn).addClass(hiddenClass);
        $(eduSaveBtnsCont).addClass(hiddenClass);
        $(eduAddSchoolBtn).addClass(hiddenClass);
        $(eduEditnBtn).removeClass(hiddenClass);

        for (var i = 0, lim = profileData.education.length; i < lim; i += 1) {
          renderCloneClone = eduRenderContClone.clone(true);

          if (!profileData.education[i]._destroy) {
            renderCloneClone.find(renEduSchool).text(profileData.education[i].school);
            renderCloneClone.find(renEduSchoolLocation).text(profileData.education[i].location);
            renderCloneClone.find(renEduSchoolDegree).text(profileData.education[i].degree);
            renderCloneClone.find(renEduYearFrom).text(profileData.education[i].year_from);
            renderCloneClone.find(renEduYearFrom).attr("datetime", profileData.education[i].year_from);
            renderCloneClone.find(renEduYearTo).text(profileData.education[i].year_to);
            renderCloneClone.find(renEduYearTo).attr("datetime", profileData.education[i].year_to);
            if (!profileData.education[i].year_from && !profileData.education[i].year_to) {
              renderCloneClone.find(eduPeriodCont).remove();
            }

            renderCloneClone.insertAfter($(eduShowFormPartBtn));
          }
        }
      } else {
        if (canEdit) {
          $(eduMainCont).remove();
          $(eduFormPart).remove();
          $(eduSaveBtnsCont).addClass(hiddenClass);
          $(eduAddSchoolBtn).addClass(hiddenClass);
          $(eduEditnBtn).removeClass(hiddenClass);
          $(eduShowFormPartBtn).removeClass(hiddenClass);
        } else {
          $(eduSection).remove();
        }
      }
    } else {
      if ($(eve.target).is(eduEditnBtn)) {

        $(eduMainCont).remove();
        $(eduShowFormPartBtn).addClass(hiddenClass);
        $(eduSaveBtnsCont).removeClass(hiddenClass);
        $(eduAddSchoolBtn).removeClass(hiddenClass);
        $(eduEditnBtn).addClass(hiddenClass);

        if (profileData.education) {
          for (var i = 0, lim = profileData.education.length; i < lim; i += 1) {
            formCloneClone = eduFormClone.clone(true);

            formCloneClone.attr("data-item-id", profileData.education[i].id);
            formCloneClone.find(postEduSchool).val(profileData.education[i].school);
            formCloneClone.find(postEduSchoolLocation).val(profileData.education[i].location);
            formCloneClone.find(postEduSchoolDegree).val(profileData.education[i].degree);
            formCloneClone.find(postEduYearFrom).val(profileData.education[i].year_from);
            formCloneClone.find(postEduYearTo).val(profileData.education[i].year_to);
            customSelectsModule.setInitialValues(formCloneClone);

            formCloneClone.insertAfter($(eduShowFormPartBtn));
          }
        } else {
          $(eduMainCont).remove();
          $(eduShowFormPartBtn).addClass(hiddenClass);
          $(eduSaveBtnsCont).removeClass(hiddenClass);
          $(eduAddSchoolBtn).removeClass(hiddenClass);
          $(eduEditnBtn).addClass(hiddenClass);

          formCloneClone = eduFormClone.clone(true);
          formCloneClone.insertAfter($(eduShowFormPartBtn));
        }
      } else if ($(eve.target).is(eduCancelBtn)) {
        educationSectionLogic();
      } else if ($(eve.target).is(eduSaveBtn)) {
        var newEduArray = [],
            newSchoolObj;

        $(eduFormPart).each(function() {
          if ($(this).attr("data-item-id")) {
            if ($(this).hasClass("is-deleted")) {
              newSchoolObj = {};
              newSchoolObj.id = $(this).attr("data-item-id");
              newSchoolObj._destroy = "1";

              newEduArray.push(newSchoolObj);
            } else {
              newSchoolObj = {};
              newSchoolObj.id = $(this).attr("data-item-id");
              newSchoolObj.school = $(this).find(postEduSchool).val();
              newSchoolObj.location = $(this).find(postEduSchoolLocation).val();
              newSchoolObj.degree = $(this).find(postEduSchoolDegree).val();
              newSchoolObj.year_from = $(this).find(postEduYearFrom).val();
              newSchoolObj.year_to = $(this).find(postEduYearTo).val();

              newEduArray.push(newSchoolObj);
            }
          } else {
            if (!$(this).hasClass("is-deleted")) {
              newSchoolObj = {};

              newSchoolObj.school = $(this).find(postEduSchool).val();
              newSchoolObj.location = $(this).find(postEduSchoolLocation).val();
              newSchoolObj.degree = $(this).find(postEduSchoolDegree).val();
              newSchoolObj.year_from = $(this).find(postEduYearFrom).val();
              newSchoolObj.year_to = $(this).find(postEduYearTo).val();

              newEduArray.push(newSchoolObj);
            }
          }
        });

        var ajaxData = {
          id: queryID,
          person: {
            educations_attributes: newEduArray
          }
        };
        $(eduSection).addClass("in-progress");

        $.ajax({
          url: profileUpdatePath,
          type: "PATCH",
          data: JSON.stringify(ajaxData),
          dataType: 'json',
          contentType: 'application/json',
          success: function(response) {
            profileData.education = newEduArray;
            educationSectionLogic();
            $(eduSection).removeClass("in-progress");
            showErrorsModule.hideMessage();
          },
          error: function(response) {
            var errors = $.parseJSON(response.responseText);
            showErrorsModule.showMessage(errors, "main-error");
            $(eduSection).removeClass("in-progress");
          }
        });

      } else if ($(eve.target).is(eduShowFormPartBtn)) {

        $(eduMainCont).remove();
        $(eduShowFormPartBtn).addClass(hiddenClass);
        $(eduSaveBtnsCont).removeClass(hiddenClass);
        $(eduAddSchoolBtn).removeClass(hiddenClass);
        $(eduEditnBtn).addClass(hiddenClass);

        formCloneClone = eduFormClone.clone(true);
        formCloneClone.insertAfter($(eduShowFormPartBtn));

      } else if ($(eve.target).is(eduAddSchoolBtn)) {
        formCloneClone = eduFormClone.clone(true);
        formCloneClone.insertBefore($(eduSaveBtnsCont));
      } else if ($(eve.target).is(eduDeleteBtn)) {
        $(eve.target).parents(eduFormPart).addClass(hiddenClass);
        $(eve.target).parents(eduFormPart).addClass("is-deleted");
      }
    }
  };

  function coursesSectionLogic(eve) {
    var formCloneClone;
    var inputCloneClone;
    var renderItem;

    if (!eve) {
      if (profileData.courses && profileData.courses.length) {
        $(renCourses + " *").remove();
        $(coursesFormPart).remove();
        $(coursesShowFormPartBtn).addClass(hiddenClass);
        $(coursesEditBtn).removeClass(hiddenClass);

        for (var i = 0, lim = profileData.courses.length; i < lim; i += 1) {
          renderItem = $("<li></li>");
          renderItem.text(profileData.courses[i]);
          $(renCourses).append(renderItem);
        }
      } else {
        if (canEdit) {
          $(renCourses + " *").remove();
          $(coursesFormPart).remove();
          $(coursesShowFormPartBtn).removeClass(hiddenClass);
          $(coursesEditBtn).removeClass(hiddenClass);
        } else {
          $(coursesSection).remove();
        }
      }
    } else {
      if ($(eve.target).is(coursesShowFormPartBtn)) {
        formCloneClone = coursesFormClone.clone(true);

        for (var i = 0; i < 3; i += 1) {
          inputCloneClone = coursesInputClone.clone(true);
          inputCloneClone.insertBefore(formCloneClone.find(coursesAddCourseBtn));
        };

        formCloneClone.insertAfter($(renCourses));
        $(coursesShowFormPartBtn).addClass(hiddenClass);
        $(coursesEditBtn).addClass(hiddenClass);
      } else if ($(eve.target).is(coursesCancelBtn)) {
        coursesSectionLogic();
      } else if ($(eve.target).is(coursesEditBtn)) {
        $(renCourses + " *").remove();
        formCloneClone = coursesFormClone.clone(true);

        if (profileData.courses) {
          for (var i = 0, lim = profileData.courses.length; i < lim; i += 1) {
            inputCloneClone = coursesInputClone.clone(true);
            inputCloneClone.find("input").val(profileData.courses[i]);
            inputCloneClone.insertBefore(formCloneClone.find(coursesAddCourseBtn));
          };

          formCloneClone.insertAfter($(renCourses));
          $(coursesShowFormPartBtn).addClass(hiddenClass);
          $(coursesEditBtn).addClass(hiddenClass);
        } else {
          for (var i = 0; i < 3; i += 1) {
            inputCloneClone = coursesInputClone.clone(true);
            inputCloneClone.insertBefore(formCloneClone.find(coursesAddCourseBtn));
          };

          formCloneClone.insertAfter($(renCourses));
          $(coursesShowFormPartBtn).addClass(hiddenClass);
          $(coursesEditBtn).addClass(hiddenClass);
        }
      } else if ($(eve.target).is(coursesAddCourseBtn)) {
        inputCloneClone = coursesInputClone.clone(true);
        inputCloneClone.insertBefore($(coursesAddCourseBtn));
      } else if ($(eve.target).is(coursesSaveBtn)) {
        var newCoursesArr = [];

        $(postOneCourse).each(function() {
          if ($(this).find("input").val()) {
            newCoursesArr.push($(this).find("input").val());
          }
        });

        var ajaxData = {
          id: queryID,
          person: {
            courses: newCoursesArr
          }
        };
        $(coursesSection).addClass("in-progress");
        
        $.ajax({
          url: profileUpdatePath,
          type: "PATCH",
          data: JSON.stringify(ajaxData),
          dataType: 'json',
          contentType: 'application/json',
          success: function(response) {
            profileData.courses = newCoursesArr;
            coursesSectionLogic();
            $(coursesSection).removeClass("in-progress");
            showErrorsModule.hideMessage();
          },
          error: function(response) {
            var errors = $.parseJSON(response.responseText);
            showErrorsModule.showMessage(errors, "main-error");
            $(coursesSection).removeClass("in-progress");
          }
        });
      }
    }
  };

  function skillsSectionLogic(eve) {
    var mainCloneClone;
    var formCloneClone = skillsFormClone.clone(true);
    var certifCloneClone;

    if (!profileData.phone_verified) {
      $(skillsLangSection).addClass("is-unverified");
    } else {
      $(skillsLangSection).removeClass("is-unverified");
    }

    if (!eve) {
      if (!profileData.skills) {
        $(skillMainCont).remove();
        $(skillFormMainCont).remove();
        /*
        if (canEdit) {
          if (profileData.phone_verified) {
            formCloneClone.find(skillVerifyPhoneBtn).remove();
          } else {
            formCloneClone.find(skillVerifyPhoneBtn).remove();
          }
          formCloneClone.find(postQualification).val(profileData.default_qualification_id);
          customSelectsModule.setInitialValues(formCloneClone);
          $(skillsLangSection).append(formCloneClone);
        } else {
          $(skillsLangSection).remove();
        }
        */
      } else {
        $(skillMainCont).remove();
        $(skillFormMainCont).remove();
        for (var i = 0, lim = profileData.skills.length; i < lim; i += 1) {
          if (canEdit || (profileData.skills[i].status === 'approved' && !canEdit)) {
            mainCloneClone = skillsMainClone.clone(true);

            mainCloneClone.attr("data-skill-id", profileData.skills[i].id);
            mainCloneClone.find(renLangFrom).html(mainCloneClone.find(renLangFrom).html() + (profileData.skills[i].lang_from ? profileData.skills[i].lang_from.name : ""));
            profileData.skills[i].dialect_from ? mainCloneClone.find(renLangFromDialect).text(profileData.skills[i].dialect_from) : mainCloneClone.find(renLangFromDialect).parents(skillsLangDetailsCont).addClass(hiddenClass);
            profileData.skills[i].accent_from ? mainCloneClone.find(renLangFromAccent).text(profileData.skills[i].accent_from) : mainCloneClone.find(renLangFromAccent).parents(skillsLangDetailsCont).addClass(hiddenClass);
            mainCloneClone.find(renLangTo).html(mainCloneClone.find(renLangTo).html() + (profileData.skills[i].lang_to ? profileData.skills[i].lang_to.name : ""));
            profileData.skills[i].dialect_to ? mainCloneClone.find(renLangToDialect).text(profileData.skills[i].dialect_to) : mainCloneClone.find(renLangToDialect).parents(skillsLangDetailsCont).addClass(hiddenClass);
            profileData.skills[i].accent_to ? mainCloneClone.find(renLangToAccent).text(profileData.skills[i].accent_to) : mainCloneClone.find(renLangToAccent).parents(skillsLangDetailsCont).addClass(hiddenClass);
            mainCloneClone.find(renQualification).text(profileData.skills[i].qualification ? profileData.skills[i].qualification.name : "");
            if (!profileData.skills[i].dialect_from && !profileData.skills[i].accent_from) {
              mainCloneClone.find(renLangFrom).find(skillExpandDetails).remove();
            }
            if (!profileData.skills[i].dialect_to && !profileData.skills[i].accent_to) {
              mainCloneClone.find(renLangTo).find(skillExpandDetails).remove();
            }
            if (isAnyChecked("types")) {
              if (checkJobTypeSupporting("video")) {
                profileData.skills[i].video_price ? mainCloneClone.find(renVideoPrice).text(profileData.skills[i].video_price) : mainCloneClone.find(renVideoPrice).text("0");
              } else {
                mainCloneClone.find(skillsVideoRow).remove();
              }
              if (checkJobTypeSupporting("phone")) {
                profileData.skills[i].phone_price ? mainCloneClone.find(renPhonePrice).text(profileData.skills[i].phone_price) : mainCloneClone.find(renPhonePrice).text("0");
              } else {
                mainCloneClone.find(skillsPhoneRow).remove();
              }
              if (checkJobTypeSupporting("in_person")) {
                profileData.skills[i].in_person_price ? mainCloneClone.find(renLocationPrice).text(profileData.skills[i].in_person_price) : mainCloneClone.find(renLocationPrice).text("0");
              } else {
                mainCloneClone.find(skillsLocationRow).remove();
              }
              if (checkJobTypeSupporting("hub")) {
                profileData.skills[i].hub_price ? mainCloneClone.find(renHubPrice).text(profileData.skills[i].hub_price) : mainCloneClone.find(renHubPrice).text("0");
              } else {
                mainCloneClone.find(skillsHubRow).remove();
              }
            } else {
              mainCloneClone.find(skillsTypesCont).remove();
            }
            mainCloneClone.find(renCurrency).text(profileData.skills[i].currency ? profileData.skills[i].currency.abbreviation : "");

            if (profileData.skills[i].documentations) {
              for (var j = 0, max = profileData.skills[i].documentations.length; j < max; j += 1) {
                certifCloneClone = skillsCertifClone.clone(true);
                certifCloneClone.find(skillDeleteCertifBtn).remove();
                certifCloneClone.find(renCertifTitle).text(profileData.skills[i].documentations[j].title);
                if (+queryID === +currentUserId || canEdit) {
                  certifCloneClone.find(renCertifLink).attr("href", profileData.skills[i].documentations[j].documentation_files.length ? profileData.skills[i].documentations[j].documentation_files[0].url : "#");
                } else {
                  certifCloneClone.find(renCertifLink).remove();
                }
                mainCloneClone.find(skillsLangInfoCont).append(certifCloneClone);
              }
            }
            if (profileData.skills[i].status === 'waiting' && canEdit) {
              mainCloneClone.addClass(skillWaitingClass);
              mainCloneClone.find(skillDeclinedText).remove();
            } else if (profileData.skills[i].status === 'declined' && canEdit) {
              mainCloneClone.addClass(skillWaitingClass);
              mainCloneClone.find(skillWaitingText).remove();
            } else {
              mainCloneClone.find(skillWaitingText).remove();
              mainCloneClone.find(skillDeclinedText).remove();
              // mainCloneClone.find(skillEditBtn).remove();
              mainCloneClone.find(skillDeleteBtn).remove();
            }

            
            if ($(skillMainCont).length) {
              mainCloneClone.insertAfter($(skillMainCont).eq($(skillMainCont).length - 1));
            } else {
              $(skillsLangSection).append(mainCloneClone);
            }
          }
        }
      }
      if (!canEdit) {
        $(skillAddBtnSection).remove();
        $(skillWaitingText).remove();
        $(skillDeclinedText).remove();
        $(skillDeleteBtn).remove();
      }
    } else {
      if ($(eve.target).is(skillEditBtn)) {
        var editedSkillId = $(eve.target).parents(skillMainCont).attr("data-skill-id");
        var approved = $(eve.target).parents(skillMainCont).hasClass(skillWaitingClass) ? false : true;

        if ($(skillFormMainCont).length) {
          skillsSectionLogic();
        }

        var replacedElement = $(skillsLangSection).find("[data-skill-id='" + editedSkillId + "']");

        for (var i = 0, lim = profileData.skills.length; i < lim; i += 1) {

          if (+profileData.skills[i].id === +replacedElement.attr("data-skill-id")) {
            formCloneClone.attr("data-skill-id", replacedElement.attr("data-skill-id"));
            formCloneClone.find(postLangFrom).val(profileData.skills[i].lang_from ? profileData.skills[i].lang_from.id : "");
            formCloneClone.find(postLangFromDialect).val(profileData.skills[i].dialect_from);
            formCloneClone.find(postLangFromAccent).val(profileData.skills[i].accent_from);
            formCloneClone.find(postLangTo).val(profileData.skills[i].lang_to ? profileData.skills[i].lang_to.id : "");
            formCloneClone.find(postLangToDialect).val(profileData.skills[i].dialect_to);
            formCloneClone.find(postLangToAccent).val(profileData.skills[i].accent_to);
            formCloneClone.find(postQualification).val(profileData.skills[i].qualification ? profileData.skills[i].qualification.id : "");
            if (isAnyChecked("types")) {
              if (checkJobTypeSupporting("video")) {
                profileData.skills[i].video_price ? formCloneClone.find(postVideoPrice).val(profileData.skills[i].video_price) : formCloneClone.find(postVideoPrice).val("");
              } else {
                formCloneClone.find(skillsVideoRow).remove();
              }
              if (checkJobTypeSupporting("phone")) {
                profileData.skills[i].phone_price ? formCloneClone.find(postPhonePrice).val(profileData.skills[i].phone_price) : formCloneClone.find(postPhonePrice).val("");
              } else {
                formCloneClone.find(skillsPhoneRow).remove();
              }
              if (checkJobTypeSupporting("in_person")) {
                profileData.skills[i].in_person_price ? formCloneClone.find(postLocationPrice).val(profileData.skills[i].in_person_price) : formCloneClone.find(postLocationPrice).val("");
              } else {
                formCloneClone.find(skillsLocationRow).remove();
              }
              if (checkJobTypeSupporting("hub")) {
                profileData.skills[i].hub_price ? formCloneClone.find(postHubPrice).val(profileData.skills[i].hub_price) : formCloneClone.find(postHubPrice).val("");
              } else {
                formCloneClone.find(skillsHubRow).remove();
              }
            } else {
              formCloneClone.find(skillsTypesCont).remove();
            }
            formCloneClone.find(renCurrency).text(profileData.skills[i].currency ? profileData.skills[i].currency.abbreviation : "");
            if (profileData.skills[i].documentations && profileData.skills[i].documentations.length) {
              for (var j = 0, max = profileData.skills[i].documentations.length; j < max; j += 1) {
                certifCloneClone = skillsCertifClone.clone(true);

                certifCloneClone.find(renCertifTitle).text(profileData.skills[i].documentations[j].title);
                certifCloneClone.find(renCertifLink).attr("href", profileData.skills[i].documentations[j].documentation_files.length ? profileData.skills[i].documentations[j].documentation_files[0].file : "#");
                certifCloneClone.find(renCertifLink).attr("data-img-id", profileData.skills[i].documentations[j].documentation_files.length ? profileData.skills[i].documentations[j].documentation_files[0].id : "");
                certifCloneClone.attr("data-documentation-id", profileData.skills[i].documentations[j].id);

                certifCloneClone.insertBefore(formCloneClone.find(skillsFormUploadCertifCont));
              }
            }
            formCloneClone.find(postCertifFile).on("change", sendFilesAfterChange);

            if (profileData.phone_verified) {
              formCloneClone.find(skillVerifyPhoneBtn).remove();
            } else {
              formCloneClone.find(skillVerifyPhoneBtn).remove();
            }

            customSelectsModule.setInitialValues(formCloneClone);
            if (approved) {
              formCloneClone.find(skillDeleteBtn).remove()
              formCloneClone.addClass("is-approved-skill");
            }
            replacedElement.replaceWith(formCloneClone);

            break;
          }

        }

      } else if ($(eve.target).is(skillCancelBtn)) {
        showErrorsModule.hideMessage();
        $(skillFormMainCont).remove();
        skillsSectionLogic();
      } else if ($(eve.target).is(skillAddSkillBtn)) {
        if ($(skillFormMainCont).length) {
          var ajaxData = {
            skill: pullInfoFromOneSkill($(skillFormMainCont))
          };
          $(skillFormMainCont).addClass("in-progress");
          
          $.ajax({
            url: 'update_skill',
            type: "PATCH",
            data: JSON.stringify(ajaxData),
            dataType: 'json',
            contentType: 'application/json',
            success: function(response) {
              profileData.skills = response.skills;
              skillsSectionLogic();
              $(skillFormMainCont).removeClass("in-progress");
              $(skillsLangSection).append(formCloneClone);
              showErrorsModule.hideMessage();
            },
            error: function (response) {
              var errors = $.parseJSON(response.responseText);
              showErrorsModule.showMessage(errors, "main-error");
              $(skillFormMainCont).removeClass("in-progress");
            }
          });
        } else {
          formCloneClone.find(postCertifFile).on("change", sendFilesAfterChange);
          if (profileData.phone_verified) {
            formCloneClone.find(skillVerifyPhoneBtn).remove();
          }
          if (isAnyChecked("types")) {
            if (!checkJobTypeSupporting("video")) {
              formCloneClone.find(skillsVideoRow).remove();
            }
            if (!checkJobTypeSupporting("phone")) {
              formCloneClone.find(skillsPhoneRow).remove();
            }
            if (!checkJobTypeSupporting("in_person")) {
              formCloneClone.find(skillsLocationRow).remove();
            }
            if (!checkJobTypeSupporting("hub")) {
              formCloneClone.find(skillsHubRow).remove();
            }
          } else {
            formCloneClone.find(skillsTypesCont).remove();
          }
          formCloneClone.find(postQualification).val(profileData.default_qualification_id);
          customSelectsModule.setInitialValues(formCloneClone);
          $(skillsLangSection).append(formCloneClone);
        }
      } else if ($(eve.target).is(skillSaveBtn)) {
        var ajaxData = {
            skill: pullInfoFromOneSkill($(skillFormMainCont))
          };
        $(skillFormMainCont).addClass("in-progress");
        
        $.ajax({
          url: 'update_skill',
          type: "PATCH",
          data: JSON.stringify(ajaxData),
          dataType: 'json',
          contentType: 'application/json',
          success: function(response) {
            profileData.skills = response.skills;
            if (!$(eve.target).parents(skillFormMainCont).attr("data-skill-id")) {
              $(skillPopupCont).addClass("is-active");
            }
            skillsSectionLogic();
            $(skillFormMainCont).removeClass("in-progress");
            showErrorsModule.hideMessage();
          },
          error: function (response) {
            var errors = $.parseJSON(response.responseText);
            showErrorsModule.showMessage(errors, "main-error");
            $(skillFormMainCont).removeClass("in-progress");
          }
        });
      } else if ($(eve.target).is(skillDeleteBtn)) {
        var parentElem = $(eve.target).parents(skillFormMainCont).length ? $(eve.target).parents(skillFormMainCont) : $(eve.target).parents(skillMainCont);

        if (confirm(window.__("Are you sure you want to delete this skill?"))) {
          if (parentElem.attr("data-skill-id")) {
            var skill = { 
              skill: {
                id: parentElem.attr("data-skill-id") 
              } 
            };

            $.ajax({
              url: 'delete_skill',
              type: 'PATCH',
              data: JSON.stringify(skill),
              dataType: 'json',
              contentType: 'application/json',
              success: function(response) {
                parentElem.remove();
                showErrorsModule.showMessage(response.flash.notice, "main-success");
                setTimeout(showErrorsModule.hideMessage, 5000);
                if (profileData.skills) {
                  for (var i = 0, lim = profileData.skills.length; i < lim; i += 1) {
                    if (+profileData.skills[i].id === +parentElem.attr("data-skill-id")) {
                      profileData.skills.splice(i, 1);
                      break;
                    }
                  }
                }
                skillsSectionLogic();
              },

              error: function(response) {
                var errors = $.parseJSON(response.responseText);
                showErrorsModule.showMessage(errors, "main-error");
              }
            });
          } else {
            parentElem.remove();
            skillsSectionLogic();
          }
        }
      } else if ($(eve.target).is(skillExpandDetails)) {
        $(eve.target).parents(skillsCollapsedCont).toggleClass("is-closed");
      } else if ($(eve.target).is(skillDeleteCertifBtn)) {
        $(eve.target).parents(skillOneCertifCont).remove();
      }
    }

    function checkJobTypeSupporting(type) {
      if (profileData.int_types) {
        for (var i = 0, lim = profileData.int_types.length; i < lim; i += 1) {
          if (profileData.int_types[i].id === type) {
            return profileData.int_types[i].checked;
          }
        }
      } else {
        return false;
      }
    }

    function sendFilesAfterChange(e) {
      if (filesUploadingModule.validateCertif(e.target)) {
        var fileData = new FormData();
        var self = $(e.target).get()[0];
        fileData.append("certificate_file", self.files[0]);
        fileData.append('title', ($(postCertifTitle).val() ? $(postCertifTitle).val() : self.files[0].name));
        $(self).parent().addClass("no-events"); 
        $.ajax({
            url: "/documentations",
            data: fileData,
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST',
            xhr: function() {
                var xhr = $.ajaxSettings.xhr();
                $(self).next(uploadAnimation).css('display','inline-block');
                xhr.upload.onprogress = function(e) {
                    var uploadPercentage = Math.floor(e.loaded / e.total * 100);
                    var animationPosition = uploadPercentage - 100;
                    if(uploadPercentage == 100){
                      setTimeout(function(){
                        $(self).parent().addClass("in-progress"); 
                      },300);
                    }
                    $(self).next(uploadAnimation).css('left',animationPosition + "%");
                };
                return xhr;
            },
            success: function(response) {
              $(e.target).parent().removeClass("in-progress");
              $(e.target).parent().removeClass("no-events");
              $(self).next(uploadAnimation).hide();
              $(self).next(uploadAnimation).css('left', '-100%');
              certifCloneClone = skillsCertifClone.clone(true);
              certifCloneClone.find(renCertifTitle).text(($(postCertifTitle).val() ? $(postCertifTitle).val() : self.files[0].name));
              certifCloneClone.find(renCertifLink).attr("href", response.image_path);
              certifCloneClone.find(renCertifLink).attr("data-img-id", response.id);
              certifCloneClone.insertBefore($(skillFormMainCont).find(skillsFormUploadCertifCont));
              showErrorsModule.hideMessage();
              $(postCertifTitle).val("");
            },
            error: function(response) {
              var errors = $.parseJSON(response.responseText);
              showErrorsModule.showMessage(errors, "main-error");
              $(e.target).parent().removeClass("in-progress");
              $(e.target).parent().removeClass("no-events");
            }
        });
      }
      else{
        showErrorsModule.showMessage({
          fileTypeError: window.__("You can only attach .jpg, .png, .gif, .pdf types of filess")
        }, "main-error");
      }
      
    };

    function pullInfoFromOneSkill(elem) {
      var resultObject = {};

      resultObject.person_id = queryID;
      resultObject.id = elem.attr("data-skill-id");
      resultObject.lang_from_id = elem.find(postLangFrom).val();
      resultObject.lang_to_id = elem.find(postLangTo).val();
      resultObject.documentations = getCertificatesData(elem);
      resultObject.qualification_id = elem.find(postQualification).val();
      resultObject.accent_from = elem.find(postLangFromAccent).val();
      resultObject.accent_to = elem.find(postLangToAccent).val();
      resultObject.dialect_from = elem.find(postLangFromDialect).val();
      resultObject.dialect_to = elem.find(postLangToDialect).val();
      resultObject.phone_price = elem.find(postPhonePrice).val() || 0;
      resultObject.video_price = elem.find(postVideoPrice).val() || 0;
      resultObject.hub_price = elem.find(postHubPrice).val() || 0;
      resultObject.in_person_price = elem.find(postLocationPrice).val() || 0;
      resultObject.currency_id = 2;

      return resultObject
    };

    function getCertificatesData(elem) {
      var resultArray = [];

      elem.find(skillOneCertifCont).each(function() {
        resultArray.push({
          id: $(this).attr("data-documentation-id"),
          title: $(this).find(renCertifTitle).text(),
          documentation_files: [$(this).find(renCertifLink).attr("data-img-id")]
        });
      });

      return resultArray;
    };
  }

  //
  // helper functions
  //

  function renderPostCheckboxesList(sectionName) {
    var itemElem;

    switch (sectionName) {
      case "areas":
        $(renAreas + " *").remove();
        if (profileData.expertise_areas) {
          for (var i = 0, lim = profileData.expertise_areas.length; i < lim; i += 1) {
            if (profileData.expertise_areas[i].checked) {
              itemElem = $("<li></li>");
              itemElem.text(profileData.expertise_areas[i].name);
              $(renAreas).append(itemElem);
            }
          }
        }
        break;
      case "methods":
        $(renMethods + " *").remove();
        if (profileData.interpretation_methods) {
          for (var i = 0, lim = profileData.interpretation_methods.length; i < lim; i += 1) {
            if (profileData.interpretation_methods[i].checked) {
              itemElem = $("<li></li>");
              itemElem.text(profileData.interpretation_methods[i].name);
              $(renMethods).append(itemElem);
            }
          }
        }
        break;
      case "types":
        $(renTypes + " *").remove();
        if (profileData.int_types) {
          for (var i = 0, lim = profileData.int_types.length; i < lim; i += 1) {
            if (profileData.int_types[i].checked) {
              itemElem = $("<li></li>");
              itemElem.text(profileData.int_types[i].name);
              itemElem.addClass("is-with-icon-item");
              itemElem.addClass("is-" + profileData.int_types[i].id);
              $(renTypes).append(itemElem);
            }
          }
        }
        break;
    }
  }

  function isAnyChecked(sectionName) {
    var status = false;

    switch (sectionName) {
      case "areas":
        if (profileData.expertise_areas) {
          for (var i = 0, lim = profileData.expertise_areas.length; i < lim; i += 1) {
            if (profileData.expertise_areas[i].checked) {
              status = true;
              break;
            }
          }
        }
        break;
      case "methods":
        if (profileData.interpretation_methods) {
          for (var i = 0, lim = profileData.interpretation_methods.length; i < lim; i += 1) {
            if (profileData.interpretation_methods[i].checked) {
              status = true;
              break;
            }
          }
        }
        break;
      case "types":
        if (profileData.int_types) {
          for (var i = 0, lim = profileData.int_types.length; i < lim; i += 1) {
            if (profileData.int_types[i].checked) {
              status = true;
              break;
            }
          }
        }
        break;
    }

    return status;
  };

  function createCheckboxesList(sectionName) {
    var checkboxItemCloneClone,
        appropriateListCont,
        formCloneClone,
        result;

    switch (sectionName) {
      case "areas":
        formCloneClone = areasFormClone.clone(true);
        appropriateListCont = formCloneClone.find(checkboxesList);
        if (profileData.expertise_areas) {
          for (var i = 0, lim = profileData.expertise_areas.length; i < lim; i += 1) {
            checkboxItemCloneClone = checkboxItemClone.clone(true);
            checkboxItemCloneClone.find(checkboxInput).attr("data-areas-id", profileData.expertise_areas[i].id);
            checkboxItemCloneClone.find(checkboxText).text(profileData.expertise_areas[i].name);
            if (profileData.expertise_areas[i].checked) {
              checkboxItemCloneClone.find(checkboxInput).get()[0].checked = true;
            }
            appropriateListCont.append(checkboxItemCloneClone);
          }
        }

        result = formCloneClone;
        break;
      case "methods":
        formCloneClone = methodsFormClone.clone(true);
        appropriateListCont = formCloneClone.find(checkboxesList);
        if (profileData.interpretation_methods) {
          for (var i = 0, lim = profileData.interpretation_methods.length; i < lim; i += 1) {
            checkboxItemCloneClone = checkboxItemClone.clone(true);
            checkboxItemCloneClone.find(checkboxInput).attr("data-methods-id", profileData.interpretation_methods[i].id);
            checkboxItemCloneClone.find(checkboxText).text(profileData.interpretation_methods[i].name);
            if (profileData.interpretation_methods[i].checked) {
              checkboxItemCloneClone.find(checkboxInput).get()[0].checked = true;
            }
            appropriateListCont.append(checkboxItemCloneClone);
          }
        }

        result = formCloneClone;
        break;
      case "types":
        formCloneClone = typesFormClone.clone(true);
        appropriateListCont = formCloneClone.find(checkboxesList);
        if (profileData.int_types) {
          for (var i = 0, lim = profileData.int_types.length; i < lim; i += 1) {
            checkboxItemCloneClone = checkboxItemClone.clone(true);
            checkboxItemCloneClone.find(checkboxInput).attr("data-types-id", profileData.int_types[i].id);
            checkboxItemCloneClone.find(checkboxText).text(profileData.int_types[i].name);
            if (profileData.int_types[i].checked) {
              checkboxItemCloneClone.find(checkboxInput).get()[0].checked = true;
            }
            appropriateListCont.append(checkboxItemCloneClone);
          }
        }

        result = formCloneClone;
        break;
    }

    return result;
  };

  function saveDataAfterCheckboxes(sectionName) {
    switch (sectionName) {
      case "areas":
        var ajaxData = {
          id: queryID,
          person: {
            expertise_area_ids: []
          }
        };
        $(areasSection).addClass("in-progress");
        if (profileData.expertise_areas) {
          for (var i = 0, lim = profileData.expertise_areas.length; i < lim; i += 1) {
            if ($("[data-areas-id='" + profileData.expertise_areas[i].id + "']").get()[0].checked) {
              ajaxData.person.expertise_area_ids.push(profileData.expertise_areas[i].id);
            }
          }
        }
        
        $.ajax({
          url: profileUpdatePath,
          type: "PATCH",
          data: JSON.stringify(ajaxData),
          dataType: 'json',
          contentType: 'application/json',
          success: function(response) {
            if (profileData.expertise_areas) {
              for (var i = 0, lim = profileData.expertise_areas.length; i < lim; i += 1) {
                if ($("[data-areas-id='" + profileData.expertise_areas[i].id + "']").get()[0].checked) {
                  profileData.expertise_areas[i].checked = true;
                } else {
                  profileData.expertise_areas[i].checked = false;
                }
              }
            }
            areasOfExpSectionLogic();
            $(areasSection).removeClass("in-progress");
          }
        });
        break;
      case "methods":
        var ajaxData = {
          id: queryID,
          person: {
            interpretation_method_ids: []
          }
        };
        $(methodsSection).addClass("in-progress");
        if (profileData.interpretation_methods) {
          for (var i = 0, lim = profileData.interpretation_methods.length; i < lim; i += 1) {
            if ($("[data-methods-id='" + profileData.interpretation_methods[i].id + "']").get()[0].checked) {
              ajaxData.person.interpretation_method_ids.push(profileData.interpretation_methods[i].id);
            }
          }
        }
        
        $.ajax({
          url: profileUpdatePath,
          type: "PATCH",
          data: JSON.stringify(ajaxData),
          dataType: 'json',
          contentType: 'application/json',
          success: function(response) {
            if (profileData.interpretation_methods) {
              for (var i = 0, lim = profileData.interpretation_methods.length; i < lim; i += 1) {
                if ($("[data-methods-id='" + profileData.interpretation_methods[i].id + "']").get()[0].checked) {
                  profileData.interpretation_methods[i].checked = true;
                } else {
                  profileData.interpretation_methods[i].checked = false;
                }
              }
            }
            interMethodsSectionLogic();
            $(methodsSection).removeClass("in-progress");
          }
        });
        break;
      case "types":
        var ajaxData = {
          id: queryID,
          person: {
            job_types: []
          }
        };
        $(typesSection).addClass("in-progress");
        if (profileData.int_types) {
          for (var i = 0, lim = profileData.int_types.length; i < lim; i += 1) {
            if ($("[data-types-id='" + profileData.int_types[i].id + "']").get()[0].checked) {
              ajaxData.person.job_types.push(profileData.int_types[i].id);
            }
          }
        }
        
        $.ajax({
          url: profileUpdatePath,
          type: "PATCH",
          data: JSON.stringify(ajaxData),
          dataType: 'json',
          contentType: 'application/json',
          success: function(response) {
            if (profileData.int_types) {
              for (var i = 0, lim = profileData.int_types.length; i < lim; i += 1) {
                if ($("[data-types-id='" + profileData.int_types[i].id + "']").get()[0].checked) {
                  profileData.int_types[i].checked = true;
                } else {
                  profileData.int_types[i].checked = false;
                }
              }
            }
            assignTypesSectionLogic();
            $(typesSection).removeClass("in-progress");
            skillsSectionLogic();
          }
        });
        break;
    }
  };

  // clone reusable parts of markup
  function cloneClones() {
    avatarFormPartClone = $(avatarFormPart).clone(true);
    avatarImgClone = $(avatarCont).clone(true);
    userNameFormClone = $(userNameFormPart).clone(true);
    tolkFormClone = $(tolkFormPart).clone(true);
    complHoursBtnsClone = $(complHoursBtnsCont).clone(true);
    aboutFormClone = $(aboutFormPart).clone(true);
    personInfoFormClone = $(personInfoFormPart).clone(true);
    checkboxItemClone = $(checkboxesListItem).clone(true);
    areasFormClone = $(areasFormPart).clone(true);
    methodsFormClone = $(methodsFormPart).clone(true);
    typesFormClone = $(typesFormPart).clone(true);
    eduFormClone = $(eduFormPart).clone(true);
    eduRenderContClone = $(eduMainCont).clone(true);
    coursesFormClone = $(coursesFormPart).clone(true);
    coursesInputClone = $(postOneCourse).clone(true);
    skillsMainClone = $(skillMainCont).clone(true);
    skillsFormClone = $(skillFormMainCont).clone(true);
    skillsCertifClone = $(skillOneCertifCont).clone(true);
    oneJobRowClone = $(inviteJobCont).clone(true);
    personInfoMainContClone = $(personInfoMainCont).clone(true);

    $(avatarFormPart).remove();
    $(avatarCont).remove();
    $(userNameFormPart).remove();
    $(tolkFormPart).remove();
    $(complHoursBtnsCont).remove();
    $(aboutFormPart).remove();
    $(personInfoFormPart).remove();
    $(checkboxesListItem).remove();
    $(areasFormPart).remove();
    $(methodsFormPart).remove();
    $(typesFormPart).remove();
    $(eduFormPart).remove();
    $(eduMainCont).remove();
    $(coursesFormPart).remove();
    $(postOneCourse).remove();
    $(skillMainCont).remove();
    $(skillFormMainCont).remove();
    $(skillOneCertifCont).remove();
    $(inviteJobCont).remove();
    $(personInfoMainCont).remove();

    avatarFormPartClone.removeClass(exampleClass);
    avatarImgClone.removeClass(exampleClass);
    userNameFormClone.removeClass(exampleClass);
    tolkFormClone.removeClass(exampleClass);
    complHoursBtnsClone.removeClass(exampleClass);
    aboutFormClone.removeClass(exampleClass);
    personInfoFormClone.removeClass(exampleClass);
    checkboxItemClone.removeClass(exampleClass);
    areasFormClone.removeClass(exampleClass);
    methodsFormClone.removeClass(exampleClass);
    typesFormClone.removeClass(exampleClass);
    eduFormClone.removeClass(exampleClass);
    eduRenderContClone.removeClass(exampleClass);
    coursesFormClone.removeClass(exampleClass);
    coursesInputClone.removeClass(exampleClass);
    skillsMainClone.removeClass(exampleClass);
    skillsFormClone.removeClass(exampleClass);
    skillsCertifClone.removeClass(exampleClass);
    oneJobRowClone.removeClass(exampleClass);
    personInfoMainContClone.removeClass(exampleClass)
  };

  // get person id from current url
  function getIDFromURL() {
    var URLstring = window.location.href;
    var isEditPage = URLstring.indexOf("edit") + 1;

    if (!isEditPage) {
      if (URLstring.charAt(URLstring.length - 1) === "/") {
        URLstring = URLstring.slice(0, URLstring.length - 1);
      }

      for (var i = URLstring.length - 1; i >= 0; i -= 1) {
        if (isNaN(URLstring.charAt(i))) {
          break;
        }
      }

      searchedID = URLstring.slice(i+1);
    } else {
      searchedID = "";
    }
  }

  function getProfileData() {
    $.ajax({
      url: '/people/' + queryID,
      type: "GET",
      dataType: 'json',
      contentType: 'application/json',
      success: function(response) {
        profileData = response;

        if( profileData.is_business && currentUserId == queryID ){
          profileUpdatePath = "/people/update_business_profile";
        }

        profileRenderFunction();
      }
    });
  };

  function removeEditFunctional() {
    canEdit = false;
    if (searchedID && searchedID !== currentUserId) {
      $(avatarEditBtn).remove();
      $(userNameEditBtn).remove();
      $(tolkEditBtn).remove();
      $(complHoursEditBtn).remove();
      $(aboutEditBtn).remove();
      $(personInfoEditBtn).remove();
      $(areasEditBtn).remove();
      $(methodsEditBtn).remove();
      $(typesEditBtn).remove();
      $(eduEditnBtn).remove();
      $(coursesEditBtn).remove();
      $(skillEditBtn).remove();
      $(".js-profile-title").remove();
    } else if (searchedID === currentUserId) {
      $(avatarEditBtn).remove();
      $(userNameEditBtn).remove();
      $(tolkEditBtn).remove();
      $(complHoursEditBtn).remove();
      $(aboutEditBtn).remove();
      $(personInfoEditBtn).remove();
      $(areasEditBtn).remove();
      $(methodsEditBtn).remove();
      $(typesEditBtn).remove();
      $(eduEditnBtn).remove();
      $(coursesEditBtn).remove();
      $(skillEditBtn).remove();
    } else {
      canEdit = true;
    }
  }

  function insertInviteJobs() {
    var jobCloneClone;
    if (jobsForInvite) {
      for (var i = 0, lim = jobsForInvite.length; i < lim; i += 1) {
        jobCloneClone = oneJobRowClone.clone(true);

        jobCloneClone.find(inviteJobSubject).text(jobsForInvite[i].subject);
        jobCloneClone.find(inviteJobDate).text(jobsForInvite[i].formated_date);
        jobCloneClone.find(inviteJobTime).text(jobsForInvite[i].time);
        jobCloneClone.find(inviteJobPrice).text(jobsForInvite[i].price);
        jobCloneClone.find(invitePersonBtn).attr("data-job-id", jobsForInvite[i].job_id);
        jobCloneClone.find(invitePersonBtn).attr("data-person-id", jobsForInvite[i].person_id);
        if (jobsForInvite[i].invited) {
          jobCloneClone.find(invitePersonBtn).text(window.__("Invited"));
          jobCloneClone.find(invitePersonBtn).addClass("is-disabled");
          jobCloneClone.find(invitePersonBtn).attr("tabindex", "-1");
        }

        $(inviteModalCont).append(jobCloneClone);
      }
    }
  }

  function getInviteJobs() {
    if (canEdit) {
      $(inviteSection).remove();
      $(pulsarProgress).remove();
      $(profileMainTag).removeClass(hiddenClass);
    } else if (!profileData.is_business && currentUserId !== queryID) {
      $.ajax({
        url: '/private_jobs',
        data: { person_id: queryID },
        type: 'GET',
        success: function(response) {
          jobsForInvite = response.data ? JSON.parse(response.data) : "";
          if (jobsForInvite && jobsForInvite.length) {
            insertInviteJobs();
          } else {
            $(inviteSection).remove();
          }
          if (searchedID && searchedID !== currentUserId) {
            $(editBtnLink).remove();
          } else {
            $(editBtnLink).removeClass(hiddenClass);
          }
          $(pulsarProgress).remove();
          $(profileMainTag).removeClass(hiddenClass);
        },
        error: function(response) {

        }
      });
    } else {
        $(inviteSection).remove();
        $(pulsarProgress).remove();
        $(profileMainTag).removeClass(hiddenClass);
    }
  };

  function profileRenderFunction(outerCall, number, code) {
    var phoneVerificationParams = {
      obj: profileData, 
      containerSelector: mainProfileElement,
      humanID: currentUserId,
      phoneCallback: function() {
        $(".verify-phone-one-step.first-step").addClass("is-hidden");
        $(".verify-phone-one-step.second-step").removeClass("is-hidden");
      },
      codeCalback: function(uNumber, uCode) {
        $(".verify-phone-one-step.second-step").addClass("is-hidden");
        $(".verification-success-cont").removeClass("is-hidden");
        newProfileModule.rerenderProfile(true, uNumber, uCode);
      },
      tryAgainCallback: function() {
        $(".verify-phone-one-step.first-step").removeClass("is-hidden");
        $(".verify-phone-one-step.second-step").addClass("is-hidden");
      }
    };
    if (outerCall) {
      profileData.phone_verified = true;
      profileData.tel.tel_code = code;
      profileData.tel.tel_number = number;
    }
    if (!profileData.is_business) {
      areasOfExpSectionLogic();
      interMethodsSectionLogic();
      assignTypesSectionLogic();
      educationSectionLogic();
      coursesSectionLogic();
      skillsSectionLogic();
      tolkSectionLogic();
      avatarSectionLogic();
      nameSectionLogic();
      complHoursSectionLogic();
      aboutSectionLogic();
      personInfoSectionLogic();
      verifyPhoneModule.init(phoneVerificationParams);
      if (searchedID && searchedID !== currentUserId) {
        $(editBtnLink).remove();
      } else {
        $(editBtnLink).removeClass(hiddenClass);
      }
      getInviteJobs();
    } else {
      avatarSectionLogic();
      nameSectionLogic();
      complHoursSectionLogic();
      aboutSectionLogic();
      personInfoSectionLogic();
      verifyPhoneModule.init(phoneVerificationParams);
      $(mainSkillsInfoCont).remove();
      $(inviteSection).remove();
      $(tolkSection).remove();
      $(complHoursSection).remove();
      $(profileMainTag).addClass("is-business");
      $(pulsarProgress).remove();
      $(profileMainTag).removeClass(hiddenClass);
      if (searchedID && searchedID !== currentUserId) {
        $(editBtnLink).remove();
      } else {
        $(editBtnLink).removeClass(hiddenClass);
      }
    }
  }
  
  function setPhoneVerifiedProperty() {
    profileData.phone_verified = true;
  }

  // main init module function
  function initNewProfile() {
    getIDFromURL();
    currentUserId = $(personIDElem).val();
    queryID = searchedID ? searchedID : currentUserId;
    avatarAngle = 0;

    removeEditFunctional();
    cloneClones();
    getProfileData();
    
    //
    // event handlers
    //
    // invite events
    $(showInvitePopupBtn).on("click", function() {$(inviteModal).addClass("is-active");});
    $(closeInviteModalBtn).on("click", function() {$(inviteModal).removeClass("is-active");});
    $(inviteModalCont).on("click", invitePersonBtn, findInterBlockModule.invitePerson);

    // avatar events
    $(mainProfileElement).on("click", avatarShowFormBtn, avatarShowFormBtn + " *", avatarSectionLogic);
    $(mainProfileElement).on("click", avatarCancelBtn, avatarSectionLogic);
    $(mainProfileElement).on("click", avatarEditBtn, avatarSectionLogic);
    $(mainProfileElement).on("click", avatarSaveBtn, avatarSectionLogic);
    $(mainProfileElement).on("click", avatarRotateBtn, avatarSectionLogic);

    // name events
    $(mainProfileElement).on("click", userNameEditBtn, nameSectionLogic);
    $(mainProfileElement).on("click", userNameSaveBtn, nameSectionLogic);
    $(mainProfileElement).on("click", userNameCancelBtn, nameSectionLogic);

    // tolk events
    $(mainProfileElement).on("click", tolkShowFormPartBtn, tolkSectionLogic);
    $(mainProfileElement).on("click", tolkCancelBtn, tolkSectionLogic);
    $(mainProfileElement).on("click", tolkEditBtn, tolkSectionLogic);
    $(mainProfileElement).on("click", tolkSaveBtn, tolkSectionLogic);

    // compl hours events
    $(mainProfileElement).on("click", complHoursEditBtn, complHoursSectionLogic);
    $(mainProfileElement).on("click", complHoursCancelBtn, complHoursSectionLogic);
    $(mainProfileElement).on("click", complHoursSaveBtn, complHoursSectionLogic);

    // about events
    $(mainProfileElement).on("click", aboutEditBtn, aboutSectionLogic);
    $(mainProfileElement).on("click", aboutCancelBtn, aboutSectionLogic);
    $(mainProfileElement).on("click", aboutSaveBtn, aboutSectionLogic);
    $(mainProfileElement).on("click", aboutShowFormPartBtn, aboutSectionLogic);

    // aperson info events
    $(mainProfileElement).on("click", personInfoEditBtn, personInfoSectionLogic);
    $(mainProfileElement).on("click", personInfoShowFormPart, personInfoSectionLogic);
    $(mainProfileElement).on("click", personInfoSaveBtn, personInfoSectionLogic);
    $(mainProfileElement).on("click", personInfoCancelBtn, personInfoSectionLogic);

    // areas of expertise events
    $(mainProfileElement).on("click", areasEditBtn, areasOfExpSectionLogic);
    $(mainProfileElement).on("click", areasCancelBtn, areasOfExpSectionLogic);
    $(mainProfileElement).on("click", areasSaveBtn, areasOfExpSectionLogic);
    $(mainProfileElement).on("click", areasShowFormPartBtn, areasOfExpSectionLogic);

    // inter methods events
    $(mainProfileElement).on("click", methodsEditBtn, interMethodsSectionLogic);
    $(mainProfileElement).on("click", methodsCancelBtn, interMethodsSectionLogic);
    $(mainProfileElement).on("click", methodsSaveBtn, interMethodsSectionLogic);
    $(mainProfileElement).on("click", methodsShowFormPartBtn, interMethodsSectionLogic);

    // inter types events
    $(mainProfileElement).on("click", typesEditBtn, assignTypesSectionLogic);
    $(mainProfileElement).on("click", typesCancelBtn, assignTypesSectionLogic);
    $(mainProfileElement).on("click", typesSaveBtn, assignTypesSectionLogic);
    $(mainProfileElement).on("click", typesShowFormPartBtn, assignTypesSectionLogic);

    // education events
    $(mainProfileElement).on("click", eduEditnBtn, educationSectionLogic);
    $(mainProfileElement).on("click", eduCancelBtn, educationSectionLogic);
    $(mainProfileElement).on("click", eduSaveBtn, educationSectionLogic);
    $(mainProfileElement).on("click", eduShowFormPartBtn, educationSectionLogic);
    $(mainProfileElement).on("click", eduAddSchoolBtn, educationSectionLogic);
    $(mainProfileElement).on("click", eduDeleteBtn, educationSectionLogic);

    // courses events
    $(mainProfileElement).on("click", coursesShowFormPartBtn, coursesSectionLogic);
    $(mainProfileElement).on("click", coursesCancelBtn, coursesSectionLogic);
    $(mainProfileElement).on("click", coursesEditBtn, coursesSectionLogic);
    $(mainProfileElement).on("click", coursesAddCourseBtn, coursesSectionLogic);
    $(mainProfileElement).on("click", coursesSaveBtn, coursesSectionLogic);

    // skills events
    $(mainProfileElement).on("click", skillEditBtn, skillsSectionLogic);
    $(mainProfileElement).on("click", skillCancelBtn, skillsSectionLogic);
    $(mainProfileElement).on("click", skillAddSkillBtn, skillsSectionLogic);
    $(mainProfileElement).on("click", skillSaveBtn, skillsSectionLogic);
    $(mainProfileElement).on("click", skillDeleteBtn, skillsSectionLogic);
    $(mainProfileElement).on("click", skillExpandDetails, skillsSectionLogic);
    $(mainProfileElement).on("click", skillDeleteCertifBtn, skillsSectionLogic);


    $(mainProfileElement).on("click", skillPopupCross, function() {$(skillPopupCont).removeClass("is-active")});
  }


  // returned object with public methods
  return {
    init: initNewProfile,
    aprovePhone: setPhoneVerifiedProperty,
    rerenderProfile: profileRenderFunction
  };


}());
