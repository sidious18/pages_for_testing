var findInterBlockModule = (function() {

  //
  // selectors that receive or are involved to some functional
  //
  var findInterBlockCont = ".inter-list-main-cont";
  var personsCont = ".inter-list-persons-cont";
  var onePersonCont = ".inter-list-one-person";
  var inviteBtn = ".js-invite-to-job";
  var noInterCont = ".inter-list-no-inters-cont";

  // selectors for binding events
  var btnToRight = ".inter-list-arrow-btn.right";
  var btnToLeft = ".inter-list-arrow-btn.left";

  // selectors for inserting person data
  var avatarCont = ".inter-list-one-person-avatar";
  var nameCont = ".inter-list-one-person-name-cont";
  var firstNameCont = ".js-person-first-name";
  var lastNameCont = ".js-person-last-name";
  var priceCont = ".inter-list-one-person-price";

  // other
  var onePersonContClone;
  var personsAmount;
  var currentPosition = 0;
  var jobInfo;
  var interArray;

  function cloneAndRemovePersonCont() {
    onePersonContClone = $(onePersonCont).clone();
    $(onePersonCont).remove();
  }

  function setInitialPersonsAmount() {
    var clientWidth = $(window).width();

    if (clientWidth > 900) {
      personsAmount = 4;
    } else if (clientWidth <= 900 && clientWidth >= 769) {
      personsAmount = 3;
    } else if (clientWidth <= 769 && clientWidth >= 748) {
      personsAmount = 4;
    } else if (clientWidth <= 747 && clientWidth >= 588) {
      personsAmount = 3;
    } else if (clientWidth <= 587 && clientWidth >= 421) {
      personsAmount = 2;
    } else if (clientWidth <= 420) {
      personsAmount = 1;
    }
  }

  function renderPersonsAfterResize() {
    var clientWidth = $(window).width();
    setInitialPersonsAmount();
    renderPersonsFirstTime();
  }

  function renderPersonsFirstTime() {
    $(personsCont).html("");
    $(btnToLeft).addClass("is-hidden");
    for (var i = 0; i < personsAmount; i += 1) {
      if (interArray && interArray[i]) {
        appendNextPerson(interArray[i]);
      }
      if (interArray && (!interArray[i] || !interArray[i + 1])) {
        $(btnToRight).addClass("is-hidden");
      } else {
        $(btnToRight).removeClass("is-hidden");
      }
    }
    currentPosition = personsAmount;
  }

  function appendNextPerson(obj) {
    var clone = onePersonContClone.clone();
    var personAvatar = obj.avatar || "";
    var personFirstName = obj.name.split(" ")[0];
    var personLastName = obj.name.split(" ")[1];
    var personsPrice = obj.price || "";
    var personsLinkTo = obj.person_url;

    if (personAvatar) {
      clone.find(avatarCont).attr("style", "background-image: url(" + personAvatar + ");");
    }
    clone.find(avatarCont).attr("href", personsLinkTo);
    clone.find(nameCont).attr("href", personsLinkTo);
    clone.find(firstNameCont).text(personFirstName);
    clone.find(lastNameCont).text(personLastName);
    clone.find(priceCont).text(personsPrice);
    // clone.attr("href", "/people/" + obj.id);
    clone.find(inviteBtn).attr("data-person-id", obj.id);
    if (obj.invited) {
      clone.find(inviteBtn).addClass('is-disabled');
      clone.find(inviteBtn).attr("tabindex", "-1");
      clone.find(inviteBtn).text(window.__("Invited"));
    }
    $(personsCont).append(clone);
  }

  function decrementCurrentPosition() {
    if ((currentPosition - personsAmount - (currentPosition%personsAmount) < 0) || ((currentPosition - personsAmount * 2) < 0)) {
      currentPosition = 0;
      $(btnToLeft).addClass("is-hidden");
    } else if (currentPosition%personsAmount > 0){
      currentPosition = currentPosition - personsAmount - (currentPosition%personsAmount);
    } else {
      currentPosition = currentPosition - personsAmount * 2;
    }
  }

  function setJobInfo(obj) {
    var sex = obj.sex;
    var qualification = obj.qualification;
    var langFrom = obj.lang_from;
    var langTo = obj.lang_to;
    var startTime = obj.start_time;
    var finishTime = obj.finish_time;
    var duration = obj.duration;
    var job_id = obj.job_id;

    jobInfo = {
      search_params: {
        sex: sex,
        qualification_id: qualification,
        lang_to: langTo,
        lang_from: langFrom,
        start_time: startTime,
        finish_time: finishTime,
        duration: duration,
        job_id: job_id
      }
    };
  }

  function getPersonsList() {
    $.ajax({
      url: '/search/interpreters',
      type: "GET",
      data: jobInfo,
      dataType: 'json',
      contentType: 'application/json',
      success: function(response) {
        interArray = response;
        if (interArray.length) {
          renderPersonsFirstTime();
          $(noInterCont).remove();
        } else {
          $(personsCont).remove();
          $(btnToRight).remove();
          $(btnToLeft).remove();
          $(noInterCont).removeClass("is-example");
        }
      },
      error: function(response) {
        var main_error = response.responseJSON.message;
        if (main_error) {
          showErrorsModule.showMessage([main_error], "main-error");
        }
      }
    });
  }

  function renderPersons(beforeActionFunc) {
    return function() {
      var btnAction = beforeActionFunc;
      $(btnToRight).removeClass("is-hidden");
      $(btnToLeft).removeClass("is-hidden");
      if (btnAction) {
        btnAction();
      }

      if (interArray[currentPosition]) {
        $(personsCont).html("");
      }

      for (var i = 0; i < personsAmount; i += 1) {
        if (interArray[currentPosition]) {
          appendNextPerson(interArray[currentPosition]);
          currentPosition += 1;
        }
        if (interArray && (!interArray[currentPosition] || !interArray[currentPosition + 1])) {
          $(btnToRight).addClass("is-hidden");
        } else if (interArray && !interArray[currentPosition - personsAmount]) {
          $(btnToLeft).addClass("is-hidden");
        }
      }
    }
  }

  function invitePerson(e) {
    var job_id = $(this).attr("data-job-id") || jobInfo.search_params.job_id;
    var person_id = $(this).attr("data-person-id") || $(this).data('personId');
    var self = $(this);

    if (!self.hasClass("is-disabled")) {
      $.post('/jobs/' + job_id + '/invite', {
        person_id: person_id
      }).success(function(response){
        var invitedPersonId;

        if (!$(this).attr("data-job-id")) {
          showErrorsModule.showMessage(response.flash.notice, "main-success");
          invitedPersonId = person_id;
          if (interArray) {
            for (var i = 0, lim = interArray.length; i < lim; i += 1) {
              if (interArray[i].id === +invitedPersonId) {
                interArray[i].invited = true;
                break;
              }
            }
          }
        };
        self.text(window.__("Invited"));
        self.addClass("is-disabled");
        self.attr("tabindex", "-1");
        if (response.event){
          websocketsInteractionModule.publish_desktop_notification(response.event);
        }
      }).error(function(response) {
        var permission_errors = response.responseJSON.permission_errors;
        var common_errors = response.responseJSON.errors;
        var main_error = response.responseJSON.message;
        $(".container-for-modal.invite-popup is-active").removeClass("is-active");
        if (permission_errors && permission_errors.length > 0) {
          showErrorsModule.showMessage(permission_errors, "permission-error");
        } else if (common_errors && common_errors.length > 0){
          showErrorsModule.showMessage(common_errors, "main-error");
        } else if (main_error){
            showErrorsModule.showMessage([main_error], "main-error");
        }
      });
    };
  }

  function removeInterpreter(id) {
    if (interArray && interArray.length) {
      for (var i = 0, lim = interArray.length; i < lim; i += 1) {
        if (interArray[i].id === +id) {
          interArray.splice(i, 1);
          renderPersonsFirstTime();
          break;
        }
      }
    }
  }

  function initFindInterBlockModule() {
    cloneAndRemovePersonCont();
    setInitialPersonsAmount();
    getPersonsList();
    $(window).on("resize", renderPersonsAfterResize);
    $(btnToRight).on("click", renderPersons());
    $(btnToLeft).on("click", renderPersons(decrementCurrentPosition));
    $(findInterBlockCont).on("click", inviteBtn, invitePerson);
  }

  return {
    init: initFindInterBlockModule,
    getFaIList: getPersonsList,
    setJobData: setJobInfo,
    invitePerson: invitePerson,
    removeInterFromFaIBlock: removeInterpreter,
    reRenderFaIBlock: renderPersonsFirstTime
  };

}());
