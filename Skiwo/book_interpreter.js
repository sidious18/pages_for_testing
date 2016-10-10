// create job functional
var bookInterpreterModule = (function() {
  //
  // selectors that receive or are involved to some functional
  //
  var bookCont = ".book-main-cont";

  // inputs for making JSON (job details)
  var langFromInput = ".js-lang-from";
  var langToInput = ".js-lang-to";
  var genderInput = ".js-gender";
  var qualificationInput = ".js-qualification";
  var jobSubject = ".js-subject";
  var jobType = ".js-job-type";
  var accessibility = 0;
  // inputs for meeting type
  var meetingId = ".js-meeting-id";
  var meetingAddress = ".js-meeting-address";
  var meetingPersonName = ".js-meeting-person-name";
  var meetingPhoneNumber = ".js-meeting-phone-number";
  var meetingEtraInfo = ".js-meeting-extra-info";
  // inputs with data and time
  var dayInput = ".js-job-day";
  var monthInput = ".js-job-month";
  var yearInput = ".js-job-year";
  var startHourInput = ".js-job-start-hour";
  var startMinuteInput = ".js-job-start-minutes";
  var finishHourInput = ".js-job-finish-hour";
  var finishMinuteInput = ".js-job-finish-minutes";


  // selectors for binding events
  var formSubmitBtn = ".js-submit-new-job-data";
  var showGenderSelectCheckbox = ".js-book-gender-checkbox";
  var jobTypeTileShared = ".book-type-section-one-type-tile";
  var accessBtnShared = ".book-job-acces-btn";
  var accessBtnPublic = accessBtnShared + ".public-access";
  var accessBtnPrivate = accessBtnShared + ".private-access";
  var accessBtnChosenClass = "is-chosen";
  var accessPublicText = ".access-text-public";
  var accessPrivateText = ".access-text-private";
  var skiwoCorporateHeaderButton = ".mobile_nav";
  var skiwoMobileMenu = "#mobile_menu";
  var skiwoMobileMenuElement = '.menu-item';

  // attenders section
  var attendersList = ".js-attenders-list";
  var attendersListItem = ".js-attenders-list-item";
  var attendersListInput = ".js-attenders-list-input";
  var attenderNameElem = ".js-attender-name";
  var attenderAvatarElem = ".js-attender-avatar";

  //other
  var checkedGenderCheckboxIndicator = "is-checked-gender-select";
  var genderContForReset = ".book-datetime-gender-col.gender-col";
  var jobTypeTileVideo = ".book-type-section-one-type-tile.video-type-tile";
  var jobTypeTilePhone = ".book-type-section-one-type-tile.phone-type-tile";
  var jobTypeTileMeeting = ".book-type-section-one-type-tile.meeting-type-tile";
  var jobTypeTileHub = ".book-type-section-one-type-tile.hub-type-tile";
  var typeTextShared = ".book-type-section-note-text";
  var typeTextVideo = ".book-type-section-note-text.video-type";
  var typeTextPhone = ".book-type-section-note-text.phone-type";
  var typeTextMeeting = ".book-type-section-note-text.meeting-type";
  var typeTextHub = ".book-type-section-note-text.hub-type";
  var meetingTypeFormCont = ".book-type-section-meeting-details";
  var oneAttenderClone;
  var attenderSection = ".attenders-section";

  //
  // functions
  //

  function cloneAttenderItem() {
    oneAttenderClone = $(attendersListItem).clone(true);

    $(attendersListItem).remove();

    oneAttenderClone.removeClass("is-example");
  }

  function fillAttenderData(obj, elem) {
    elem.find(attenderNameElem).text([obj.first_name, obj.last_name].join(" "));
    elem.find(attenderAvatarElem).attr("src", obj.avatar);
    elem.find(attendersListInput).attr("data-attender-id", obj.id);
    elem.find(attendersListInput).get()[0].checked = obj.checked;

    return elem;
  }

  function makeAttendersList(arr) {
    var cloneClone;
    if (arr && arr.length) {
      for (var i = 0, lim = arr.length; i < lim; i += 1) {
        cloneClone = oneAttenderClone.clone(true);
        $(attendersList).append(fillAttenderData(arr[i], cloneClone));
      }
    }
  }

  function getAttendersList() {
    $(attendersList).addClass("in-progress");
    var jobId = $(bookCont).data('job-id');
    $.ajax({
      url: '/jobs/' + jobId + "/attenders",
      type: "GET",
      dataType: 'json',
      contentType: 'application/json',
      success: function(response) {
        var attendersArray = response.data;
        makeAttendersList(attendersArray);
        $(attendersList).removeClass("in-progress");
      },
      error: function(response) {
        $(attendersList).remove();
      }
    });
  }

  function showGenderSelect() {
    $(bookCont).toggleClass(checkedGenderCheckboxIndicator);
    $(genderInput).val("");
    customSelectsModule.setInitialValues($(genderContForReset));
    if (!$(bookCont).hasClass(checkedGenderCheckboxIndicator)) {
      $(genderInput).val("2");
    }
  }

  function setAccessibilityValue() {
    if (!$(this).hasClass(accessBtnChosenClass)) {
      if ($(this).is(accessBtnPublic)) {
        accessibility = 0;
        $(accessBtnShared).removeClass(accessBtnChosenClass);
        $(this).addClass(accessBtnChosenClass);
        $(accessPublicText).removeClass("is-hidden");
        $(accessPrivateText).addClass("is-hidden");
      } else if ($(this).is(accessBtnPrivate)) {
        accessibility = 1;
        $(accessBtnShared).removeClass(accessBtnChosenClass);
        $(this).addClass(accessBtnChosenClass);
        $(accessPublicText).addClass("is-hidden");
        $(accessPrivateText).removeClass("is-hidden");
      }
    }
  }

  function setInitialJobType() {
    var initialTypeElement = $("[data-job-type='" + $(jobType).val() + "']");

    detectClickedTile(initialTypeElement);
  }

  function changeJobType() {
    $(jobTypeTileShared).each(function() {
      $(this).removeClass("is-chosen-tile");
      $(this).attr("tabindex", "");
    });

    $(typeTextShared).each(function() {
      $(this).addClass("is-hidden");
    });

    $(meetingTypeFormCont).addClass("is-hidden");

    detectClickedTile($(this));

    $(jobType).val($(this).attr("data-job-type"));
  }

  function detectClickedTile(elem) {
    if (elem.is($(jobTypeTileVideo))) {
      $(jobTypeTileVideo).addClass("is-chosen-tile");
      $(jobTypeTileVideo).attr("tabindex", "-1");
      $(typeTextVideo).removeClass("is-hidden");
    } else if (elem.is($(jobTypeTilePhone))) {
      $(jobTypeTilePhone).addClass("is-chosen-tile");
      $(jobTypeTilePhone).attr("tabindex", "-1");
      $(typeTextPhone).removeClass("is-hidden");
    } else if (elem.is($(jobTypeTileMeeting))) {
      $(jobTypeTileMeeting).addClass("is-chosen-tile");
      $(jobTypeTileMeeting).attr("tabindex", "-1");
      $(typeTextMeeting).removeClass("is-hidden");
      $(meetingTypeFormCont).removeClass("is-hidden");
    } else if (elem.is($(jobTypeTileHub))) {
      $(jobTypeTileHub).addClass("is-chosen-tile");
      $(jobTypeTileHub).attr("tabindex", "-1");
      $(typeTextHub).removeClass("is-hidden");
    }
  }

  function moveFocusToNextElement(elem, maxLength, lastElem) {
    var element = elem;
    var max = maxLength;
    var last = lastElem || false;

    return function() {
      $(this).val($(this).val().replace(/\s+/g, '').replace(/[^0-9]/gi, ''));
      var textInInput = $(this).val();

      if (textInInput.length >= max) {
        if (!last) {
          element.focus();
          element.select();
        } else {
          $(this).blur();
        };
      };
    };
  };

  // send data for creating or updating job
  function sendAjaxToJobs(id) {
    var jobId = id || '';
    var method = id ? 'PATCH' : 'POST';
    var job_params = makeAppropriateJSON();

    showErrorsModule.removeErrors();

    $.ajax({
      url: '/jobs/' + jobId,
      type: method,
      data: job_params,
      dataType: 'json',
      contentType: 'application/json',
      success: function(response) {
        if (response.flash) {
          showErrorsModule.showMessage(response.flash.notice, "special-success");
        }
        conversionTracking.trackPostAnAssignment( response.location );
        window.scrollTo(0, 0);
      },
      error: function(response) {
        $(formSubmitBtn).prop("disabled", false);
        var permission_errors = response.responseJSON.permission_errors;
        var special_errors = response.responseJSON.errors;
        var main_error = response.responseJSON.message;
        if (permission_errors && permission_errors.length > 0) {
          showErrorsModule.showMessage(permission_errors, "permission-error");
        } else if (main_error) {
          showErrorsModule.showMessage([main_error], "main-error");
        } else if (special_errors) {
          showErrorsModule.showMessage(special_errors, "special-error");
        }
        window.scrollTo(0, 0);
      }
    });
    // console.log(makeAppropriateJSON());
  };

  var formDatetimeDataModule = (function() {
    function formStartTime() {
        var dayData = $(dayInput).val() || "";
        var monthData = $(monthInput).val() || "";
        var yearData = $(yearInput).val() || "";
        var startHourData = $(startHourInput).val() || "";
        var startMinuteData = $(startMinuteInput).val() || "";
        var finishHourData = $(finishHourInput).val() || "";
        var finishMinuteData = $(finishMinuteInput).val() || "";
      if (dayData && monthData && yearData && startHourData && startMinuteData && finishHourData && finishMinuteData) {
        return yearData + "/" + monthData + "/" + dayData + " " + startHourData + ":" + startMinuteData + ":" + "00";
      } else {
        return "";
      }
    }

    function formFinishTime() {
        var dayData = $(dayInput).val() || "";
        var monthData = $(monthInput).val() || "";
        var yearData = $(yearInput).val() || "";
        var startHourData = $(startHourInput).val() || "";
        var startMinuteData = $(startMinuteInput).val() || "";
        var finishHourData = $(finishHourInput).val() || "";
        var finishMinuteData = $(finishMinuteInput).val() || "";
      if (dayData && monthData && yearData && startHourData && startMinuteData && finishHourData && finishMinuteData) {
        return yearData + "/" + monthData + "/" + dayData + " " + finishHourData + ":" + finishMinuteData + ":" + "00";
      } else {
        return "";
      }
    }

    return {
      getStartTime: formStartTime,
      getFinishTime: formFinishTime
    };

  }());

  function makeAttendersAjax() {
    var res = [];
    var attendersInputs = $(attendersListInput);

    for (var i = 0, lim = attendersInputs.length; i < lim; i += 1) {
      if (attendersInputs.eq(i).get()[0].checked) {
        res.push(attendersInputs.eq(i).attr("data-attender-id"));
      }
    }

    return res;
  }

  // get job data and make proper JSON for server
  function makeAppropriateJSON() {
    var langFrom = $(langFromInput).val();
    var langTo = $(langToInput).val();
    var startTime = formDatetimeDataModule.getStartTime();
    var finishTime = formDatetimeDataModule.getFinishTime();
    var sex = $(genderInput).val();
    var qualification = $(qualificationInput).val();
    var subject = $(jobSubject).val();
    var type = $(jobType).val();
    var address = $(meetingAddress).val();
    var personName = $(meetingPersonName).val();
    var phoneNumber = $(meetingPhoneNumber).val();
    var extraInfo = $(meetingEtraInfo).val();
    var contactId = $(meetingId).val();
    var accessibilityValue = accessibility;
    var resObject;

    resObject = {
      job: {
        lang_from_id: langFrom,
        lang_to_id: langTo,
        start_time: startTime,
        finish_time: finishTime,
        sex: sex,
        qualification_id: qualification,
        subject: subject,
        assignment_type: type,
        accessibility: accessibilityValue
      }
    };

    if ($(attendersList).length) {
      resObject.job.attenders_array = makeAttendersAjax();
    }

    if (type === "2") {
      resObject.job.contact_attributes = {
        id: contactId,
        address: address,
        extra: extraInfo,
        name: personName,
        phone: phoneNumber
      };
    }

    return JSON.stringify(resObject);
  };

  function openMenu(e) {
    if ($(this).hasClass('closed')) {
      $(this).removeClass('closed').addClass('opened');
      $(skiwoMobileMenu).stop().slideDown(500);
    } else {
      $(this).removeClass('opened').addClass('closed');
      $(skiwoMobileMenu).stop().slideUp(500);
    }
    return false;
  }

  function corporateModileItemEvent(e){
    e.stopPropagation();
  }

  function itnitBookInterPage() {
    setInitialJobType();
    if ($(attenderSection).length > 0){
      cloneAttenderItem();
      getAttendersList();
    }
    $(formSubmitBtn).on("click", function() {
      sendAjaxToJobs($(bookCont).data('job-id'));
        $(this).prop("disabled", true);
    });

    $(showGenderSelectCheckbox).on("change", showGenderSelect);

    $(jobTypeTileShared).on("click", changeJobType);

    $(dayInput).on("focus", function(){this.select();});
    $(monthInput).on("focus", function(){this.select();});
    $(yearInput).on("focus", function(){this.select();});
    $(startHourInput).on("focus", function(){this.select();});
    $(startMinuteInput).on("focus", function(){this.select();});
    $(finishHourInput).on("focus", function(){this.select();});
    $(finishMinuteInput).on("focus", function(){this.select();});

    $(dayInput).on("input", moveFocusToNextElement($(monthInput), 2));
    $(monthInput).on("input", moveFocusToNextElement($(yearInput), 2));
    $(yearInput).on("input", moveFocusToNextElement($(startHourInput), 4));
    $(startHourInput).on("input", moveFocusToNextElement($(startMinuteInput), 2));
    $(startMinuteInput).on("input", moveFocusToNextElement($(finishHourInput), 2));
    $(finishHourInput).on("input", moveFocusToNextElement($(finishMinuteInput), 2));
    $(finishMinuteInput).on("input", moveFocusToNextElement("", 2, true));
    $(accessBtnShared).on("click", setAccessibilityValue);
    $(skiwoCorporateHeaderButton).on('click', openMenu);
    $(skiwoMobileMenuElement).on('click', corporateModileItemEvent);

  };

  return {
    init: itnitBookInterPage
  };

}());
