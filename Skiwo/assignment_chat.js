var jobDescrInbox = (function() {

  //
  // selectors that receive or are involved to some functional
  //

  var mainChatElement = ".chat-page";
    //
  // put job descr info elements
  //
  var creatorNameElement = ".js-put-creator-name-here";
  var jobDateElement = ".js-put-job-date-here";
  var subjectElement = ".js-put-subject-here";
  var langFromElement = ".js-put-lang-from-here";
  var langToElement = ".js-put-lang-to-here";
  var qualificationElement = ".js-put-qualification-here";
  var startDateElement = ".js-put-start-date-here";
  var genderElement = ".js-put-gender-here";
  var startTimeElement = ".js-put-start-time-here";
  var finishTimeElement = ".js-put-finish-time-here";
  var contactPersonElement = ".js-put-contact-person-here";
  var phoneNumberElement = ".js-put-phone-number-here";
  var locationElement = ".js-put-location-here";
  var extraInfoElement = ".js-put-extra-info-here";
  // job types
  var mapInfoElement = '.js-assignment-map';
  var jobTypeContShared = ".assign-chat-job-type-cont";
  var jobTypeContExample = jobTypeContShared + ".is-example";
  var jobTypeContVideo = jobTypeContShared + ".video-type";
  var jobTypeContPhone = jobTypeContShared + ".phone-type";
  var jobTypeContMeeting = jobTypeContShared + ".meeting-type";
  var jobTypeContHubBusiness = jobTypeContShared + ".hub-type-business";
  var jobTypeContHubInter = jobTypeContShared + ".hub-type-interpreter";
  // session details
  var sessionDetailsCont = ".assign-chat-session-details-cont";
  var sessionPhoneBlock = ".js-phone-block";
  var sessionDesktopLinkAddress = ".js-desktop-link-address";
  var sessionSipAddress = ".js-sip-address";
  var sessionSipBooking = ".js-sip-booking";
  var sessionSipPin = ".js-sip-pin";
  var sessionLyncAddress = ".js-lync-address";
  var sessionLyncPin = ".js-lync-pin";
  var sessionPhoneNumber = ".js-session-phone-number";
  var sessionPhoneBooking = ".js-session-phone-booking";
  var sessionPhonePin = ".js-session-phone-pin";

  // attenders section
  var attendersSection = ".js-attenders-section";
  var attendersList = ".js-attenders-list";
  var attendersListItem = ".js-attenders-list-item";
  var attendersListInput = ".js-attenders-list-input";
  var attenderNameElem = ".js-attender-name";
  var attenderAvatarElem = ".js-attender-avatar";
  var chosenAttenderList = ".js-chosen-attenders-list";
  var chosenAttenderItem = ".js-chosen-attender-item";
  var attendersListBtn = ".js-attenders-list-btn";

  var inboxMessagesCounter = ".js-sidebar-messages-count";
  var tabsSwitcherCounter = ".assign-tabs-switcher-counter";

  //
  // events and persons elements
  //
  var chatEventsMainCont = ".chat-messages-main-cont";
  var chatEventsMsgsWrapper = ".chat-messages-wrapper-cont";
  var chatEventsListCont = ".assign-chat-events-list";
  var chatEventsListTitle = ".chat-subject";
  var chatTextfieldElement = ".chat-textfield-form";
  // inter list elements
  var chatInterListElement = ".chat-messages-interpreters-list";
  var chatInterListTitleElement = ".chat-messages-interpreters-list-title";
  var chatInterContElement = ".chat-messages-interpreters-list-one-inter-cont";
  var chatInterContAvatar = ".chat-messages-interpreters-list-one-inter-avatar";
  var chatInterContFirstName = ".chat-messages-interpreters-list-one-inter-first-name-cont";
  var chatInterContLastName = ".chat-messages-interpreters-list-one-inter-last-name-cont";
  var chatInterContLastPrice = ".chat-messages-interpreters-list-one-inter-price";
  var chatInterContLastStatus = ".chat-messages-interpreters-list-one-inter-status";

  //
  // events containers
  //
  // simple msg
  var simpleMsgContElement = ".chat-comment-main-cont";
  var simpleMsgAvatarElement = ".chat-comment-avatar";
  var simpleMsgTextElement = ".chat-comment-text";
  var simpleMsgDateElement = ".chat-comment-date";
  var simpleMsgInput = ".js-application-text";
  // apply event
  var applyEventContElement = ".chat-apply-event-cont";
  var applyEventPersonNameElement = ".js-apply-person-name";
  var applyEventFirstLineTextElement = ".js-msg-first-line-text";
  var applyEventSecondLineTextElement = ".js-msg-second-line-text";
  var applyEventPriceTypeElement = ".js-apply-price-type";
  var applyEventPriceElement = ".js-apply-price";
  var applyEventReasonElement = ".chat-apply-event-reason-msg";
  var applyEventAwardBtn = ".chat-apply-event-award-btn";
  var applyEventDeclineBtn = ".chat-apply-event-decline-btn";
  var applyEventDateElement = ".chat-apply-event-date";
  // award event
  var awardEventContElement = ".chat-award-event-cont";
  var awardEventTextElement = ".chat-award-event-text";
  var awardEventPriceElement = ".chat-award-event-price";
  var awardEventDateElement = ".chat-award-event-date";
  // destroy event
  var destroyEventContElement = ".chat-destroy-event-cont";
  var destroyEventTextElement = ".chat-destroy-event-text";
  var destroyEventReasonElement = ".chat-destroy-event-reason";
  var destroyEventDateElement = ".chat-destroy-event-date";
  // invite event
  var inviteEventContElement = ".chat-invite-event-cont";

  //
  // status menu
  //
  var statusMainContElement = ".assign-chat-info-block-wrapper";
  var statusInfoBlockSharedElement = ".assign-chat-info-block";
  var statusInfoBlockAwarded = ".assign-chat-info-block.is-awarded-job-status";
  var statusInfoBlockEarned = ".assign-chat-info-block.is-past-job-status";
  var statusInfoBlockDestroy = ".assign-chat-info-block.is-destroy-job-status";
  var statusInfoBlockNewBussiness = ".assign-chat-info-block.is-new-job-status";
  var statusInfoBlockDidNotAward = ".assign-chat-info-block.is-did-not-award-status";
  var statusInfoBlockCancelled = ".assign-chat-info-block.is-cancelled-job";
  var statusInfoBlockRepliedBussiness = ".assign-chat-info-block.is-replied-job-status";
  var statusInfoBlockApplyInter = ".assign-chat-info-block.is-apply-standart-job-status";
  var statusInfoBlockAppliedInter = ".assign-chat-info-block.is-applied-job-status";
  var statusInfoBlockApplyCustomInter = ".assign-chat-info-block.is-apply-custom-job-status";
  var statusInfoBlockCall = ".assign-chat-info-block.is-call-status";

  //
  // modal popups
  //
  var mainModalCont = ".container-for-modal.chat-messages";
  var mainModalContentCont = ".chat-modal-msg-main-cont";
  var modalContentBlockShared = ".chat-popup-content";
  var modalContentBlockWithdraw = ".chat-popup-content.when-withdraw-simple";
  var modalContentBlockWithdrawReason = ".chat-popup-content.when-withdraw-with-reason";
  var modalContentBlockApply = ".chat-popup-content.when-apply";
  var modalContentBlockReward = ".chat-popup-content.when-reward";
  var modalContentBlockDecline = ".chat-popup-content.when-decline-simple";
  var modalContentBlockDeclineReason = ".chat-popup-content.when-decline-with-reason";
  var modalContentBlockCancelSimple = ".chat-popup-content.when-cancel-simple";
  var modalContentBlockCancelSevere = ".chat-popup-content.when-cancel-severe";
  var modalContentBlockWithdrawMsg = ".js-withdrawing-msg";
  var cancelJobCont = ".js-cancel-job-cont";
  // popups btns
  var modalCloseCrossBtn = ".js-close-chat-modal";
  var modalWithdrawBtn = ".js-withdraw-job-popup";
  var modalApplyBtn = ".js-apply-job-popup";
  var modalRewardBtn = ".js-reward-job-popup";
  var modalDeclineBtn = ".js-decline-job-popup";
  var modalCancelBtn = ".js-cancel-job-popup";
  var modalAwardCheckbox = ".chat-popup-content-award-checkbox-note";

  //
  //  buttons
  //
  var replyButton = ".js-reply-to-person";
  var applyButton = ".js-apply-job";
  var withdrawButton = ".js-withdraw-job";
  var rewardButton = ".js-reward-job";
  var cancelButton = ".js-cancel-job";
  var contactAdminButton = ".js-send-contact-form-to-admin";
  //
  //other
  //
  var exampleClass = "is-example";
  var chatTextfieldClone;
  var interListClone;
  var interContClone;
  var simpleMsgClone;
  var applyEventClone;
  var awardEventClone;
  var destroyEventClone;
  var inviteEventClone;
  var simpleWithdrawPopupClone;
  var withdrawPopupReasonClone;
  var applyPopupClone;
  var rewardPopupClone;
  var declinePopupClone;
  var declineReasonPopupClone;
  var cancelSimpleClone;
  var cancelSevereClone;

  var awardedStatusClone;
  var earnedStatusClone;
  var destroyStatusClone;
  var newStatusBusinessClone;
  var pastStatusDidNotAwardClone;
  var repliedStatusBusinessClone;
  var applyStatusInterClone;
  var applyCustomStatusInterClone;
  var appliedStatusInterClone;
  var callStatusInterClone;

  var oneAttenderClone;
  var oneChosenAttenderClone;

  // current time statuses
  var currentPersonId;
  var jobId;
  var currentRole;
  var currentActiveDiscussionId;
  var clearPrice;
  var totalPrice;
  var priceFee;
  var textField = true;
  var textFieldRedBtn = true;
  var findInterListCont = ".js-inter-list-container";

  // function for cloning one item for attender
  // TODO: can we move this functionality to separate module???
  function cloneAttenderItem() {
    oneAttenderClone = $(attendersListItem).clone(true);

    $(attendersListItem).remove();

    oneAttenderClone.removeClass("is-example");
  }

  // function for putting attender's data into cloned attender item
  function fillAttenderData(obj, elem) {
    elem.find(attenderNameElem).text([obj.first_name, obj.last_name].join(" "));
    elem.find(attenderAvatarElem).attr("src", obj.avatar);
    elem.find(attendersListInput).attr("data-attender-id", obj.id);
    if (elem.find(attendersListInput).length) {
      elem.find(attendersListInput).get()[0].checked = obj.checked;
    }

    return elem;
  }

  // function for making list with attenders that was chosen for this assignment
  function makeChosenAttendersList(arr) {
    var cloneClone;
    if (arr && arr.length) {
      for (var i = 0, lim = arr.length; i < lim; i += 1) {
        if (arr[i].checked) {
          cloneClone = oneChosenAttenderClone.clone(true);
          $(chosenAttenderList).append(fillAttenderData(arr[i], cloneClone));
        }
      }
      $(chosenAttenderList).removeClass("is-hidden");
    }
  }

  // function for making an attenders list for chosing them
  function makeAttendersList(arr) {
    var cloneClone;
    if (arr && arr.length) {
      for (var i = 0, lim = arr.length; i < lim; i += 1) {
        cloneClone = oneAttenderClone.clone(true);
        $(attendersList).append(fillAttenderData(arr[i], cloneClone));
      }
    }
  }

  // render static information about assignment
  function setJobDescrInfo(data) {
    // TODO: move this global to getChanData success
    currentRole = data.role;

    // insert asignment basic info to rpoper places
    $(creatorNameElement).html(data.creator_name);
    $(jobDateElement).html(data.job_date);
    $(subjectElement).text(data.subject);
    $(langFromElement).html(data.lang_from);
    $(langToElement).html(data.lang_to);
    $(qualificationElement).html(data.qualification);
    $(startDateElement).html(data.formated_date);
    $(genderElement).html(data.gender);
    $(startTimeElement).html(data.start_time);
    $(finishTimeElement).html(data.finish_time);

    // make appropriate job type block visible
    // remove all unappropriate job type blocks
    switch (data.job_type) {
      case 0: // video assignment
        $(jobTypeContVideo).removeClass(exampleClass);
        $(jobTypeContExample).remove();
        break
      case 1: // phone assignment
        $(jobTypeContPhone).removeClass(exampleClass);
        $(jobTypeContExample).remove();
        break
      case 2: // in person assignment
        // if job type is in person assignment we fill in location details and create map
        $(jobTypeContMeeting).removeClass(exampleClass);
        $(jobTypeContExample).remove();
        $(contactPersonElement).text(data.contact_person);
        $(phoneNumberElement).text(data.phone_number);
        $(locationElement).text(data.location);
        $(extraInfoElement).text(data.extra_info);
        showMapSnippet(data.location, data.lat, data.long);
        break
      case 3: // hub assignment
        // if job has hub type we check user role
        // if current user is interpreter we show info like on in person assignment (address, map etc)
        if (currentRole === 1) {
          $(jobTypeContHubInter).removeClass(exampleClass);
          $(jobTypeContExample).remove();
          $(contactPersonElement).text(data.contact_person);
          $(phoneNumberElement).text(data.phone_number);
          $(locationElement).text(data.location);
          $(extraInfoElement).text(data.extra_info);
          showMapSnippet(data.location, data.lat, data.long);
        } else {
          // if current user is business we show only hub tyle text (without address and map)
          $(jobTypeContHubBusiness).removeClass(exampleClass);
          $(jobTypeContExample).remove();
        }
        
        break
    };


    // check presence of call details for this assignment (appear only after reward before the call)
    if (data.call_details) {
      // if current user is interpreter and job type is hub type we don't show him call details
      if (currentRole === 1 && data.job_type === 3) {
        $(sessionDetailsCont).remove();
      } else {
        // if current user is interpreter we show phone details
        if (data.job_type === 1) {
          $(sessionPhoneNumber).text(data.call_details.phone_number);
          $(sessionPhoneBooking).text(data.call_details.phone_booking);
          $(sessionPhonePin).text(data.call_details.phone_pin);
        } else {
          // if user is business we remove block with phone details
          $(sessionPhoneBlock).remove();
        }
        // then we fill in call details blocks with appropriate info
        $(sessionDesktopLinkAddress).text(data.call_details.hostname);
        $(sessionDesktopLinkAddress).attr("href", data.call_details.link_to_desktop);
        $(sessionSipAddress).text(data.call_details.sip_address);
        $(sessionSipBooking).text(data.call_details.sip_booking);
        $(sessionSipPin).text(data.call_details.sip_pin);
        $(sessionLyncAddress).text(data.call_details.lync_address);
        $(sessionLyncPin).text(data.call_details.lync_pin);
        $(sessionDetailsCont).removeClass(exampleClass);
      }
    } else {
      // if server hasn't provided us with call info we remove call info block
      $(sessionDetailsCont).remove();
    }

    if ((data.attenders && data.attenders.length > 0) && (data.permission && data.permission.can_manage_job)) {
      $(chosenAttenderList + " *").remove();
      makeChosenAttendersList(data.attenders);
      $(attendersSection).removeClass("is-hidden");
    } else {
      $(attendersSection).remove();
    }
    if (data.permission && !data.permission.can_init_event) {
      $(".js-cancel-job-popup").remove();
    }
    $(".js-assign-descr-cont").removeClass("is-hidden");
  }; // end of rendering static info function (setJobDescrInfo)

  // function for pulling data from attenders list for AJAX call
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

  // function for mutating attenders list in existing main chat data
  function changeCheckedAttenders(arr) {
    var dataAttenders = chatData.attenders;
    for (var i = 0, lim = dataAttenders.length; i < lim; i += 1) {
      if (arr.indexOf(String(dataAttenders[i].id)) > -1) {
        dataAttenders[i].checked = true;
      } else {
        dataAttenders[i].checked = false;
      }
    }
  }

  // function for handle click on attenders btn (change attenders/save new choice)
  function attendersBtnHandler(e) {
    if ($(attendersList).hasClass("is-hidden")) {
      $(chosenAttenderList + " *").remove();
      $(attendersList + " *").remove();
      $(chosenAttenderList).addClass("is-hidden")
      makeAttendersList(chatData.attenders);
      $(attendersList).removeClass("is-hidden");
      $(e.target).text(window.__("Save changes"));
    } else if ($(chosenAttenderList).hasClass("is-hidden")) {
      var checkedAttenders = {
          attenders_array: makeAttendersAjax()
      };
      $(attendersList).addClass("in-progress");
      $.post({
        url: '/jobs/' + jobId + '/save_attenders',
        data: JSON.stringify({job: {
          id: jobId,
          attenders_array: checkedAttenders.attenders_array
        }}),
        dataType: 'json',
        contentType: 'application/json',
        success: function (response) {
          $(attendersList).removeClass("in-progress");
          $(attendersList).addClass("is-hidden");
          changeCheckedAttenders(checkedAttenders.attenders_array);
          setJobDescrInfo(chatData);
          $(e.target).text(window.__("See assignment attender(s)"));
          $(chosenAttenderList).removeClass("is-hidden");
        },
        error: function (response) {
          $(attendersList).removeClass("in-progress");
          $(attendersList).addClass("is-hidden");
          var main_error = response.responseJSON.message;
          if (main_error) {
              showErrorsModule.showMessage([main_error], "main-error");
          }
        }
      });
    }
  }

  // function for creating interactive google map for in person or hub assignment
  function showMapSnippet(location, lat, long) {
      var mapOptions = {
          zoom: 8,
          center: {lat: lat, lng: long}
      };
      var map = new google.maps.Map($(mapInfoElement)[0], mapOptions);


      var marker = new google.maps.Marker({
          position: {lat: lat, lng: long},
          map: map
      });

      var infowindow = new google.maps.InfoWindow({
          content: '<p>' + location + '</p>'
      });

      google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map, marker);
      });
  };


  // function for making proper chat textfield
  function makeProperTextfield() {
    // if current person is business and he can't send msgs we return empty block instead full textfield
    // TODO: is this behavior is proper???
    if (currentRole === 0 && (chatData.status === "cancelled" || chatData.status === "did_not_award" || chatData.status === "past_job")) {
      return document.createElement("div");
    }

    // we clone cloned textfield
    var cloneClone = chatTextfieldClone.clone(true);

    // create red btn for decline or withdraw actions
    var redBtn = $("<button></button>");

    redBtn.addClass("skiwo-btn");
    redBtn.addClass("skiwo-btn--red");
    redBtn.addClass("chat-textfield-decline-person-btn");

    // add proper class to btn for proper event handling (for business or interpreter)
    if (currentRole === 0) {
      redBtn.addClass("js-decline-job-popup");
    } else {
      redBtn.addClass("js-withdraw-job-popup");
    }

    // add proper tex to red btn (for business or interpreter)
    if (currentRole === 1) {
      redBtn.html(window.__("Withdraw my application"));
    } else {
      redBtn.html(window.__("Reject this interpreter"));
    };

    // if current user is interpreter, hasn't applied yet, were declined themeself or by other side, have less then 24 hours before job
    // we don't show him the red btn (set textFieldRedBtn to false)
    if (currentRole === 1 && (chatData.status === "can_apply" || chatData.status === "declined_by_business" || chatData.status === "cancel_you" || !chatData.upto_24_hours)) {
      textFieldRedBtn = false;
    } else if (currentRole === 0) {
      // if current user is business we look for an array with events for current discussion user (filter all users and find appropriate)
      var neededPersonArray = chatData.chat_section.filter(function(obj) {
        return Number(obj.inter_id) === Number(currentActiveDiscussionId);
      });

      // if appropriate person was found
      // TODO: the person can be lost????
      if (neededPersonArray.length) {
        // we sort his events from the latest to the earliest
        neededPersonArray[0].events.sort(function(a, b) {
            var first = new Date(a.sys_date);
            var second = new Date(b.sys_date);
            if (first.getTime() > second.getTime()) {
                return -1;
            } else if (first.getTime() < second.getTime()) {
                return 1;
            } else {
                return 0;
            }
        });
        var applyOrReward;

        // TODO: maybe we make too mush work for small red btn state???
        // then we check should we add red btn to textfiled or not
        for (var i = 0, lim = neededPersonArray[0].events.length; i < lim; i += 1) {
          var event_type = neededPersonArray[0].events[i].type;
          // if destroy event (decline or reject) was later then positive (apply or reward)
          // we don't show red btn to user (because he has already decline the offer and can't do it again)
          if (event_type === "decline_offer" || event_type === "reject_interpreter") {
            break;
          } else if (event_type === "apply" || event_type === "reward") {
            // if positive event was latter then destroy
            // we show that positive event was later then destroy
            applyOrReward = true;
          }
        }

        // then we check last needed event status (positive or destroy) and time that we have before job (more then 24 hours or less)
        // if all conditions is true
        var status = applyOrReward && chatData.upto_24_hours;

        // we show red btn to business
        if (status) {
          textFieldRedBtn = true;
        } else {
          // if negative event was later then positive or we have less then 24 hours before work
          // we don't show red btn to business user
          textFieldRedBtn = false;
        }
      } else {
        // if person for current discussion wasn't found
        // we don't show red btn to business user
        textFieldRedBtn = false;
      }
    } else {
      // if user is interpreter, positive event (apply or reward) was leter then destroy (decline or reject) and user have more then 24 hours before work
      // we show him red btn
      textFieldRedBtn = true;
    }


    // TODO: just append red btn if TRUE. we don't have tooltip
    if (textFieldRedBtn) {
      cloneClone.find(".chat-textfield-btns-cont").append(redBtn);
      if (currentRole === 1) {
        cloneClone.find(".chat-textfield-btns-cont").addClass("with-tooltip");
      } else {
        cloneClone.find(".chat-textfield-btns-cont").removeClass("with-tooltip");
      }
    } else {
      cloneClone.find(".chat-textfield-btns-cont").removeClass("with-tooltip");
    }

    return cloneClone;
  }; // end of making proper chat textfield btn

  // function show popup according to user action
  function showProperPopup(e) {
    var cloneClone;

    // prevent to add sharp to URL after clicking on Cancel job btn (because it's link)
    // TODO: make it button not link
    if ($(e.target).is(modalCancelBtn)) {
      e.preventDefault();
    }

    // if user clicks on wihraw btn
    if ($(e.target).is(modalWithdrawBtn)) {
      // if job status is applied we show popup without reason
      if (chatData.status === "applied") {
        cloneClone = simpleWithdrawPopupClone.clone(true);
        $(mainModalCont).addClass("is-active");
        $(mainModalContentCont).append(cloneClone);
      } else if (chatData.status === "rewarded") {
        // if job status is rewarded we show popup with reason
        cloneClone = withdrawPopupReasonClone.clone(true);
        $(mainModalCont).addClass("is-active");
        $(mainModalContentCont).append(cloneClone);
      };
    // if user clicks on apply btn
    } else if ($(e.target).is(modalApplyBtn)) {
      // we take hardcoded person's standart price and cut of currency and text
      // TODO: how can we make this value not hardcoded?
      var price = parseInt($(".js-person-standart-price").val());

      cloneClone = applyPopupClone.clone(true);
      // if user clicks on custom apply
      if ($(e.target).hasClass("is-custom-apply")) {
        // we insert provided reason to appropriate element in popup
        cloneClone.find(".js-custom-apply-reason").html($(".js-custom-reason").val());
        // and take provided price from input
        price = parseInt($(".js-custom-price-input").val());
      }
      // then we insert interpreter's price into element in popup and add currency
      // TODO: how can we make currency and fee not hardcoded?
      cloneClone.find(".js-applied-price").html(price + " NOK");
      if (chatData.commissions) {
        // add skiwo fee text
        cloneClone.find(".js-apply-fee-text").html("+" + (parseFloat(chatData.commissions.fee) * 100) + "%");
        // show skiwo fee value that received from backend
        cloneClone.find(".js-apply-fee").html(parseFloat(price * parseFloat(chatData.commissions.fee)).toFixed(2) + " NOK");
        // add skiwo VAT text
        cloneClone.find(".js-apply-vat-text").html("+" + (parseFloat(chatData.commissions.vat ? chatData.commissions.vat : 0) * 100) + "%");
        // show skiwo VAT value that received from backend
        cloneClone.find(".js-apply-vat").html(parseFloat((parseFloat(price * parseFloat(chatData.commissions.fee)).toFixed(2)) * parseFloat(chatData.commissions.vat ? chatData.commissions.vat : 0)).toFixed(2) + " NOK");
      }
      var fee = Number(parseFloat(price * parseFloat(chatData.commissions.fee)).toFixed(2));
      var vat = Number(parseFloat((parseFloat(price * parseFloat(chatData.commissions.fee)).toFixed(2)) * parseFloat(chatData.commissions.vat ? chatData.commissions.vat : 0)).toFixed(2));
      // and insert total price to popup
      cloneClone.find(".js-total-apply-price").html((price + fee + vat) + " NOK");
      // then we show popup with apply block
      $(mainModalCont).addClass("is-active");
      $(mainModalContentCont).append(cloneClone);
      $(mainModalContentCont).addClass("is-apply");
    // if user clicks on reward btn
    } else if ($(e.target).is(modalRewardBtn)) {
      // we pull clear and total price from clicked btn
      var clearPrice = $(e.target).attr("data-clear-price");
      var name = $(e.target).attr("data-person-name");
      var price = parseInt(clearPrice);

      cloneClone = rewardPopupClone.clone(true);
      // then we fill in this popup with prices
      cloneClone.find(".js-applied-price").html(clearPrice);
      if (chatData.commissions) {
        // add skiwo fee text
        cloneClone.find(".js-apply-fee-text").html("+" + (parseFloat(chatData.commissions.fee) * 100) + "%");
        // show skiwo fee value that received from backend
        cloneClone.find(".js-apply-fee").html(parseFloat(price * parseFloat(chatData.commissions.fee)).toFixed(2) + " NOK");
        // add skiwo VAT text
        cloneClone.find(".js-apply-vat-text").html("+" + (parseFloat(chatData.commissions.vat ? chatData.commissions.vat : 0) * 100) + "%");
        // show skiwo VAT value that received from backend
        cloneClone.find(".js-apply-vat").html(parseFloat((parseFloat(price * parseFloat(chatData.commissions.fee)).toFixed(2)) * parseFloat(chatData.commissions.vat ? chatData.commissions.vat : 0)).toFixed(2) + " NOK");
      }
      var fee = Number(parseFloat(price * parseFloat(chatData.commissions.fee)).toFixed(2));
      var vat = Number(parseFloat((parseFloat(price * parseFloat(chatData.commissions.fee)).toFixed(2)) * parseFloat(chatData.commissions.vat ? chatData.commissions.vat : 0)).toFixed(2));
      cloneClone.find(".js-total-apply-price").html((price + fee + vat) + " NOK");
      cloneClone.find(".js-inter-name").html(name);
      // and show popup
      $(mainModalCont).addClass("is-active");
      $(mainModalContentCont).append(cloneClone);
      $(mainModalContentCont).addClass("is-apply");
    // if user clicks on decline btn
    } else if ($(e.target).is(modalDeclineBtn)) {
      // we receive array of person that business in talking now
      var currentPersonArray = chatData.chat_section.filter(function(obj) {
        return Number(currentActiveDiscussionId) === Number(obj.inter_id);
      });
      // then we get his name
      var currentPersonName = currentPersonArray[0].inter_first_name;
      // and try to get awarded person array
      var awardedPersonArray = chatData.chat_section.filter(function(obj) {
        return obj.last_method_status === "Awarded";
      });

      // if we have awarded person
      if (awardedPersonArray.length) {
        // we get his id
        var awardedPersonId = awardedPersonArray[0].inter_id;
        // if this id matches with current discussion id
        if (Number(currentActiveDiscussionId) === Number(awardedPersonId)) {
          // we create popup with declining reason and show it
          cloneClone = declineReasonPopupClone.clone(true);
          $(mainModalCont).addClass("is-active");
          $(mainModalContentCont).append(cloneClone);
        }
      // if we don't have awarded person
      } else {
        // we create usual decline popup and show it
        cloneClone = declinePopupClone.clone(true);
        cloneClone.find(".js-decline-person-name").html(currentPersonName);
        $(mainModalCont).addClass("is-active");
        $(mainModalContentCont).append(cloneClone);
      }
    // if we click cancel job btn
    } else if ($(e.target).is(modalCancelBtn)) {
      // we try to check which status was before canceling
      var jobStatus = 0;
      var awardedName;

      // if we'he already rewarded someone
      if (chatData.status === "rewarded") {
        // we set job status variable to 2 and look for awarded person
        jobStatus = 2;
        for (var i = 0, lim = chatData.chat_section.length; i < lim; i += 1) {
          if (chatData.chat_section[i].last_method_status === "Awarded") {
            awardedName = chatData.chat_section[i].inter_first_name;
            break
          }
        }
      // if we have some applies or simple msgs
      } else if (chatData.status === "replied") {
        // we look for applies
        for (var i = 0, lim = chatData.chat_section.length; i < lim; i += 1) {
          if (chatData.chat_section[i].last_method_status === "Applied") {
            // if we find minimum one we set job status variable to 1
            jobStatus = 1;
            break
          }
        }
      // if we don't have applies or awards we set 0 to job status variable
      } else {
        jobStatus = 0;
      }
      // then we make action according to job satus variable
      switch (jobStatus) {
        // if we don't have applies or awards we just cancel assignment and no one cares
        case 0:
          cancelAssignment();
          break;
        // if we have applies we show cancel popup
        case 1:
          cloneClone = cancelSimpleClone.clone(true);
          $(mainModalCont).addClass("is-active");
          $(mainModalContentCont).append(cloneClone);
          break;
        // if we have award we show popup that sayed that an interpreter will be sad after it
        case 2:
          cloneClone = cancelSevereClone.clone(true);
          cloneClone.find(".js-cancel-person-name").html(awardedName);
          $(mainModalCont).addClass("is-active");
          $(mainModalContentCont).append(cloneClone);
          break;
      }
    }
  }; //end of create popups function


  // function for closing modal popups
  function closeChatModal() {
    $(modalContentBlockShared).remove();
    $(mainModalCont).removeClass("is-active");
    $(mainModalContentCont).removeClass("is-apply");
  }

  function cloneExampleBlocks() {
    chatTextfieldClone = $(chatTextfieldElement).clone(true);
    interListClone = $(chatInterListElement).clone(true);
    interContClone = $(chatInterContElement).clone(true);
    simpleMsgClone = $(simpleMsgContElement).clone(true);
    applyEventClone = $(applyEventContElement).clone(true);
    awardEventClone = $(awardEventContElement).clone(true);
    destroyEventClone = $(destroyEventContElement).clone(true);
    awardedStatusClone = $(statusInfoBlockAwarded).clone(true);
    earnedStatusClone = $(statusInfoBlockEarned).clone(true);
    destroyStatusClone = $(statusInfoBlockDestroy).clone(true);
    newStatusBusinessClone = $(statusInfoBlockNewBussiness).clone(true);
    pastStatusDidNotAwardClone = $(statusInfoBlockDidNotAward).clone(true);
    newStatusCancelledClone = $(statusInfoBlockCancelled).clone(true);
    repliedStatusBusinessClone = $(statusInfoBlockRepliedBussiness).clone(true);
    applyStatusInterClone = $(statusInfoBlockApplyInter).clone(true);
    applyCustomStatusInterClone = $(statusInfoBlockApplyCustomInter).clone(true);
    appliedStatusInterClone = $(statusInfoBlockAppliedInter).clone(true);
    simpleWithdrawPopupClone = $(modalContentBlockWithdraw).clone(true);
    withdrawPopupReasonClone = $(modalContentBlockWithdrawReason).clone(true);
    applyPopupClone = $(modalContentBlockApply).clone(true);
    rewardPopupClone = $(modalContentBlockReward).clone(true);
    declinePopupClone = $(modalContentBlockDecline).clone(true);
    declineReasonPopupClone = $(modalContentBlockDeclineReason).clone(true);
    cancelSimpleClone = $(modalContentBlockCancelSimple).clone(true);
    cancelSevereClone = $(modalContentBlockCancelSevere).clone(true);
    callStatusInterClone = $(statusInfoBlockCall).clone(true);
    inviteEventClone = $(inviteEventContElement).clone(true);
    oneAttenderClone = $(attendersListItem).clone(true);
    oneChosenAttenderClone = $(chosenAttenderItem).clone(true);

    $(chatTextfieldElement).remove();
    $(chatInterListElement).remove();
    $(chatInterContElement).remove();
    $(simpleMsgContElement).remove();
    $(applyEventContElement).remove();
    $(awardEventContElement).remove();
    $(destroyEventContElement).remove();
    $(statusInfoBlockAwarded).remove();
    $(statusInfoBlockDestroy).remove();
    $(statusInfoBlockNewBussiness).remove();
    $(statusInfoBlockDidNotAward).remove();
    $(statusInfoBlockCancelled).remove();
    $(statusInfoBlockRepliedBussiness).remove();
    $(statusInfoBlockApplyInter).remove();
    $(statusInfoBlockAppliedInter).remove();
    $(statusInfoBlockApplyCustomInter).remove();
    $(modalContentBlockWithdraw).remove();
    $(modalContentBlockWithdrawReason).remove();
    $(modalContentBlockApply).remove();
    $(modalContentBlockReward).remove();
    $(modalContentBlockDecline).remove();
    $(modalContentBlockDeclineReason).remove();
    $(modalContentBlockCancelSimple).remove();
    $(modalContentBlockCancelSevere).remove();
    $(statusInfoBlockEarned).remove();
    $(statusInfoBlockCall).remove();
    $(inviteEventContElement).remove();
    $(attendersListItem).remove();
    $(chosenAttenderItem).remove();

    chatTextfieldClone.removeClass(exampleClass);
    interListClone.removeClass(exampleClass);
    interContClone.removeClass(exampleClass);
    simpleMsgClone.removeClass(exampleClass);
    applyEventClone.removeClass(exampleClass);
    awardEventClone.removeClass(exampleClass);
    destroyEventClone.removeClass(exampleClass);
    awardedStatusClone.removeClass(exampleClass);
    destroyStatusClone.removeClass(exampleClass);
    newStatusBusinessClone.removeClass(exampleClass);
    pastStatusDidNotAwardClone.removeClass(exampleClass);
    newStatusCancelledClone.removeClass(exampleClass);
    repliedStatusBusinessClone.removeClass(exampleClass);
    applyStatusInterClone.removeClass(exampleClass);
    applyCustomStatusInterClone.removeClass(exampleClass);
    appliedStatusInterClone.removeClass(exampleClass);
    simpleWithdrawPopupClone.removeClass(exampleClass);
    withdrawPopupReasonClone.removeClass(exampleClass);
    applyPopupClone.removeClass(exampleClass);
    rewardPopupClone.removeClass(exampleClass);
    declinePopupClone.removeClass(exampleClass);
    declineReasonPopupClone.removeClass(exampleClass);
    cancelSimpleClone.removeClass(exampleClass);
    cancelSevereClone.removeClass(exampleClass);
    earnedStatusClone.removeClass(exampleClass);
    callStatusInterClone.removeClass(exampleClass);
    inviteEventClone.removeClass(exampleClass);
    oneAttenderClone.removeClass(exampleClass);
    oneChosenAttenderClone.removeClass(exampleClass);
  }


  // function for make simple msg event
  function makeSimpleMsgElement(obj) {
    var simpleMsgCloneClone = simpleMsgClone.clone(true);
    var simpleMsgAvatar = simpleMsgCloneClone.find(simpleMsgAvatarElement);
    var simpleMsgText = simpleMsgCloneClone.find(simpleMsgTextElement);
    var simpleMsgDate = simpleMsgCloneClone.find(simpleMsgDateElement);

    // if this event was sent by current person we add appropriate class for it
    if (Number(obj.initiator_id) === Number(currentPersonId)) {
      simpleMsgCloneClone.addClass("to-right");
    }

    // then we fill in simple msg block with appropriate information
    obj.person_avatar ? simpleMsgAvatar.attr("style", "background-image: url(" + obj.person_avatar + ")") : simpleMsgAvatar.attr("style", "");
    simpleMsgText.html(obj.text);
    simpleMsgDate.html(obj.formated_date);

    // and return it for inserting to events block
    return simpleMsgCloneClone;
  } // end of crating simple msg event function

  // function for making invite event
  function makeInviteElement(obj) {
    var inviteCloneClone = inviteEventClone.clone(true);

    // if current person is interpreter we fill in block with appropriate text
    if (currentRole === 1) {
      inviteCloneClone.find(".js-first-invite-line").html(window.__("You were invited to this job by ") + obj.business_name);
      inviteCloneClone.find(".js-second-invite-line").text(window.__("Please apply for it."));
    // if current person is business we fill in block with appropriate text
    } else {
      inviteCloneClone.find(".js-first-invite-line").html(window.__("You have invited <a class='skiwo-link'></a> to this job."));
      inviteCloneClone.find(".js-first-invite-line").find("a").text(obj.interpreter_name);
      inviteCloneClone.find(".js-first-invite-line").find("a").attr("href", obj.interpreter_link);
      inviteCloneClone.find(".js-second-invite-line").text(window.__("Please send them a message, and explain why you think this assignment is right for them."));
    }

    inviteCloneClone.find(".chat-invite-event-date").text(obj.formated_date);

    // then we return invite block for inserting into events container
    return inviteCloneClone;
  } // end of creating invite event function

  // function for creating apply event
  function makeApplyElement(obj) {
    var cloneClone = applyEventClone.clone(true);
    var firstLineText = cloneClone.find(applyEventFirstLineTextElement);
    var personName;
    var secondLineText;
    var priceType;
    var price;
    var reason = cloneClone.find(applyEventReasonElement);
    var awardBtn = cloneClone.find(applyEventAwardBtn);
    var declineBtn = cloneClone.find(applyEventDeclineBtn);
    var date = cloneClone.find(applyEventDateElement);

    // if current user in interpreter
    if (currentRole === 1) {
      // we remove award and reject btn
      awardBtn.remove();
      declineBtn.remove();
      // also change a style a bit
      cloneClone.addClass("is-bigger-text");

      // create text with tags without link and fill in it with appropriate data
      // TODO: if we don't have a link why we should use <a> tag?
      firstLineText.html(window.__("<a class='js-apply-person-name'></a> have applied for this assignment with a <span class='js-msg-second-line-text'><b class='js-apply-price-type'></b> price of <b class='js-apply-price'></b></span>"));
      personName = firstLineText.find(applyEventPersonNameElement);
      secondLineText = firstLineText.find(applyEventSecondLineTextElement);
      priceType = firstLineText.find(applyEventPriceTypeElement);
      price = firstLineText.find(applyEventPriceElement);
      personName.html(window.__("You"));
      if (obj.custom) {
        priceType.html(window.__("custom "));
        reason.html(window.__("<strong>Reason given: </strong>") + obj.reason);
      } else {
        priceType.html(window.__("standard "));
        reason.remove();
      }
      price.html(obj.price);
      date.html(obj.formated_date);
    // if current user is business
    } else {
      // we add appropriate data attributes to award btn
      awardBtn.attr("data-clear-price", obj.clear_price);
      awardBtn.attr("data-person-name", obj.name);
      awardBtn.attr("data-person-link", obj.link);

      // and fill in event block with appropriate data
      firstLineText.html(window.__("<a class='skiwo-link js-apply-person-name'></a> has applied for this assignment with a <span class='js-msg-second-line-text'><b class='js-apply-price-type'></b> price of <b class='js-apply-price'></b></span>"));
      personName = firstLineText.find(applyEventPersonNameElement);
      secondLineText = firstLineText.find(applyEventSecondLineTextElement);
      priceType = firstLineText.find(applyEventPriceTypeElement);
      price = firstLineText.find(applyEventPriceElement);
      personName.html(obj.name);
      personName.attr("href", obj.link);
      if (obj.custom) {
        priceType.html(window.__("custom "));
        reason.html(window.__("<strong>Reason given: </strong>") + obj.reason);
      } else {
        priceType.html(window.__("standard "));
        reason.remove();
      }
      // we delete reject btn if it less than 24 hours before the job
      if (!chatData.upto_24_hours) {
        declineBtn.remove();
      }
      // if current user relates to Enterprise and current user can't init events
      if (chatData.permission && !chatData.permission.can_init_event) {
        declineBtn.remove();
        awardBtn.remove();
      }
      price.html(obj.business_price);
      date.html(obj.formated_date);
    }

    // if this event is expired we remove award and reject btns
    if (obj.past) {
      // cloneClone.addClass("is-past-event");
      awardBtn.remove();
      declineBtn.remove();
    }

    return cloneClone;
  } // end of create apply event block function

  // function for making award event
  function makeAwardElement(obj) {
    var cloneClone = awardEventClone.clone(true);
    var text = cloneClone.find(awardEventTextElement);
    var price = cloneClone.find(awardEventPriceElement);
    var date = cloneClone.find(awardEventDateElement);

    // if current person is interpreter
    if (currentRole === 1) {
      // we again insert proper text to it
      text.html(window.__("You have been awarded the assignment at the price of:"));
      price.html(obj.price);
      date.html(obj.formated_date);
    // if current person is business
    } else {
      // we create text block with link in it for interpreter's name
      if (Number(obj.initiator_id) === Number(currentPersonId)) {
        text.html(window.__("You have awarded <a class='skiwo-link skiwo-link--green-bg' href=''></a> the assignment at the price of:"));
      } else {
        text.html(window.__(obj.initiator_name + " has awarded <a class='skiwo-link skiwo-link--green-bg' href=''></a> the assignment at the price of:"));
      }
      text.find("a").html(obj.name);
      text.find("a").attr("href", obj.link);
      price.html(obj.business_price);
      date.html(obj.formated_date);
    }


    // TODO: remove this line!!!
    if (obj.past) {
      // cloneClone.addClass("is-past-event");
    }

    return cloneClone;
  } // end of creating award event function


  //
  // TODO: Deal with this function!!! It's not obvious. I can't even comment it
  //
  // function for making decline (negative) event
  function makeDestroyElement(obj) {
    var cloneClone = destroyEventClone.clone(true);
    var text = cloneClone.find(destroyEventTextElement);
    var reason = cloneClone.find(destroyEventReasonElement);
    var date = cloneClone.find(destroyEventDateElement);


    if (Number(obj.person_id) === Number(currentPersonId)) {

      if (obj.initiator_id === obj.person_id) {
        if (currentRole === 1) {
          text.html(window.__("You have cancelled this assignment"));
        } else {
          var additionalTextEl = $("<p></p>");
          additionalTextEl.addClass('chat-destroy-event-text');
          additionalTextEl.html(window.__("You can always reapply for this assignments above"));
          text.html(window.__("<b>You</b> have <b>withdrawn</b> your application from this assignment"));
          additionalTextEl.insertAfter(reason);
        }
      } else {
        if (currentRole === 1) {
          text.html(obj.initiator_name + window.__(" has cancelled this assignment"));
          text.find("a").html(obj.initiator_name);
        } else {
          text.html(window.__("<a href=''></a> has withdrawn their application from this assignment"));
          text.find("a").html(obj.initiator_name);
          text.find("a").attr("href", obj.initiator_link);
        }
      }
    } else {
      if (obj.initiator_id === obj.person_id) {
        if (currentRole === 1) {
          text.html(window.__("<a href=''></a> has cancelled this assignment"));
          text.find("a").html(obj.initiator_name);
          text.find("a").attr("href", obj.initiator_link);
        } else {
          text.html(window.__("<a href=''></a> has withdrawn their application from this assignment"));
          text.find("a").html(obj.initiator_name);
          text.find("a").attr("href", obj.initiator_link);
        }

      } else {
        if (obj.reason) {
          text.html(window.__("You have cancelled this assignment"));
        } else if (Number(obj.initiator_id) === Number(currentPersonId)) {
          text.html(window.__("You have rejected this applicants offer."))
        } else {
          text.html(obj.initiator_name + window.__(" has rejected this applicants offer."))
        }
      }
    }

    if (obj.reason) {
      reason.html(obj.reason);
    }

    date.html(obj.formated_date);

    if (obj.past) {
      // cloneClone.addClass("is-past-event");
    }

    return cloneClone;
  } // end of creating decline event function

  // function create component for chat events
  function formEventsContainer() {
    var eventsWrapper = $("<div></div>");
    var eventsListCont = $("<div></div>");

    eventsWrapper.addClass(chatEventsMsgsWrapper.slice(1));
    eventsListCont.addClass(chatEventsListCont.slice(1));
    eventsWrapper.append(eventsListCont);

    return eventsWrapper;
  } // end of creating chat container component function


  // function for detecting event tyle and calling proper function for it handling
  function detectEventType(obj) {
    var result;

    if (obj.type === "simple_message") {
      result = makeSimpleMsgElement(obj);
    } else if (obj.type === "apply") {
      result = makeApplyElement(obj);
    } else if (obj.type === "reward") {
      result = makeAwardElement(obj);
    } else if (obj.type === "decline_offer") {
      result = makeDestroyElement(obj);
    } else if (obj.type === "reject_interpreter") {
      result = makeDestroyElement(obj);
    } else if (obj.type === "invite") {
      result = makeInviteElement(obj);
    }

    return result;
  } // end of detecting event type function

  // function for filling chat container component with events
  function insertEventsIntoElement(elem, obj) {
    // first of all we remove all elements from component
    elem.empty();

    // if current user is interpreter
    if (currentRole === 1) {
      // TODO: Remove this line!!!
      var eventsListTitle = $("<h2></h2>");
      var resultBlock;

      // we looping through all events in chat data and insert it into chat component
      for (var i = 0, lim = obj.events.length; i < lim; i += 1) {
        elem.append(detectEventType(obj.events[i]));
      }

      return elem;
    // if current user is business
    } else {
      // we create conversation title element and add proper classes to it
      var eventsListTitle = $("<h2></h2>");

      eventsListTitle.addClass(chatEventsListTitle.slice(1));
      eventsListTitle.html(window.__("Conversation with") + " <u><a class='skiwo-link' href='" + obj.inter_link + "'>"+ obj.inter_first_name + " " + obj.inter_last_name + "</a></u>");
      elem.append(eventsListTitle);

      // then we sort all events from the earliest the latest
        obj.events.sort(function(a, b) {
            var first = new Date(a.sys_date);
            var second = new Date(b.sys_date);
            if (first.getTime() < second.getTime()) {
                return -1;
            } else if (first.getTime() > second.getTime()) {
                return 1;
            } else {
                return 0;
            }
        });

      // and fill in events container with events
      for (var i = 0, lim = obj.events.length; i < lim; i += 1) {
        elem.append(detectEventType(obj.events[i]));
      }

      return elem;
    }
  } // end of filling in chat container function

  // function for recognising last event's type
  function detectLastMsgType(obj) {
    var result;

    // sort events from the latest to the earliest
    // TODO: maybe you shouldn't sort arrays so often? make decreasing loop below instead
    obj.events.sort(function(a, b) {
      var first = new Date(a.sys_date);
      var second = new Date(b.sys_date);

      if (first.getTime() > second.getTime()) {
        return -1;
      } else if (first.getTime() < second.getTime()) {
        return 1;
      } else {
        return 0;
      }
    });

    // TODO: can we make non-text statuses
    // loop through all event for detecting the latest status
    for (var i = 0, lim = obj.events.length; i < lim; i += 1) {
      // if last event is reward we return Awarded status
      if (obj.events[i].type === "reward") {
        return window.__("Awarded");
      // if last event has decline offer or reject interpreter status
      } else if (obj.events[i].type === "decline_offer" || obj.events[i].type === "reject_interpreter") {
        // we check the presents of reason
        // if it's here we return Cancelled status
        if (obj.events[i].reason) {
          return window.__("Cancelled");
        // otherwise we return Declined status
        // TODO: what statuses exactly matches Declined result???
        } else {
          return window.__("Declined");
        }
      // if last event is apply
      } else if (obj.events[i].type === "apply") {
        // we return Applied status
        return window.__("Applied");
      }
    }

    // if last event has simple msg status we return Inquiry
    return window.__("Inquiry");
  } // end of detecting last msg type function

  // function for inserting interpreters to business dialog's list
  function insertInterpretersIntoList(elem) {
    // we sort interpreters in array fron the latest to the earliest last msg date
    // TODO: can we avoid and delete last_msg_sys_date data from main JSON???
    chatData.chat_section.sort(function(a, b) {
      var first = new Date(a.last_msg_sys_date);
      var second = new Date(b.last_msg_sys_date);
      if (first.getTime() > second.getTime()) {
        return -1;
      } else if (first.getTime() < second.getTime()) {
        return 1;
      } else {
        return 0;
      }
    });

    // then we remove all interpreters from list
    elem.empty();

    // if we have at least one conversation we add title to the list
    // TODO: Do we realy need this condition???
    if (chatData.chat_section.length) {
      var interListTitle = $("<h3></h3>");
      interListTitle.addClass(chatInterListTitleElement.slice(1));
      interListTitle.html(window.__("Interested Interpreters"));
      elem.append(interListTitle);
    }

    // looping through all interpreters and fill in each block with proper info
    for (var i = 0, lim = chatData.chat_section.length; i < lim; i += 1) {
      var cloneClone = interContClone.clone(true);
      chatData.chat_section[i].inter_avatar ? cloneClone.find(chatInterContAvatar).attr("style", "background-image: url(" + chatData.chat_section[i].inter_avatar + ")") : cloneClone.find(chatInterContAvatar).attr("style", "");
      cloneClone.find(chatInterContFirstName).html(chatData.chat_section[i].inter_first_name);
      cloneClone.find(chatInterContLastName).html(chatData.chat_section[i].inter_last_name);
      cloneClone.find(chatInterContLastPrice).html(chatData.chat_section[i].inter_applied_price);
      chatData.chat_section[i].last_method_status = detectLastMsgType(chatData.chat_section[i]);
      cloneClone.find(chatInterContLastStatus).html(chatData.chat_section[i].last_method_status);
      cloneClone.attr("data-inter-id", chatData.chat_section[i].inter_id);
      // if current discussion is whith this person
      // we add is active class to it
      if (Number(currentActiveDiscussionId) === Number(chatData.chat_section[i].inter_id)) {
        cloneClone.addClass("is-active");
      }

      // we look on last msg type and add appropriate class to whole block for proper text color
      switch (chatData.chat_section[i].last_method_status) {
        case window.__("Applied"):
          cloneClone.addClass("is-green");
          break;
        case window.__("Awarded"):
          cloneClone.addClass("is-green");
          break;
        case window.__("Inquiry"):
          cloneClone.addClass("is-yellow");
          break;
        case window.__("Declined"):
          cloneClone.addClass("is-red");
          break;
      }

      elem.append(cloneClone);
    }

    return elem;
  } // end of inserting interpreters into chat dialogs list for business function

  // function customDateParser(date){
  //   var transDate = date.split(/[- :]/);
  //   transDate[4] = transDate[3].substr(transDate[3].length - 2);
  //   transDate[3] = transDate[2].substr(transDate[2].length - 2);
  //   transDate[2] = transDate[2].substring(0,2);
  //   var resultDate = new Date(transDate[0], transDate[1] - 1, transDate[2], transDate[3], transDate[4]);
  //   return resultDate;
  // }


  // rendering assignment events data first time
  function renderEventsFirstTime() {
    // firstly we clone containers for inserting data into it
    var eventsContainer = formEventsContainer();
    var eventsList = eventsContainer.find(chatEventsListCont);
    var eventsTitle = eventsContainer.find(chatEventsListTitle);
    var interListCloneClone = interListClone.clone(true);
    var textfieldCloneClone = chatTextfieldClone.clone(true);

    // if current user is interpreter
    if (currentRole === 1) {

      // we check if events is present
      if (chatData.chat_section.events.length) {
        // and sort them properly (from the oldest to the latest)
        chatData.chat_section.events.sort(function(a, b) {

          var first = new Date(a.sys_date);
          var second = new Date(b.sys_date);
          if (first.getTime() < second.getTime()) {
            return -1;
          } else if (first.getTime() > second.getTime()) {
            return 1;
          } else {
            return 0;
          }
        });
        // then we insert events into chat container
        eventsList = insertEventsIntoElement(eventsList, chatData.chat_section);
      }

      // then we set current discussion as business id (because interpreter can chat with only one person)
      currentActiveDiscussionId = chatData.chat_section.business_id;

      // then we check if this user can send messages
      // TODO: can we avoid this global variable?
      if (textField) {
        // and create textfield if yes
        eventsList.append(makeProperTextfield());
      }

      // and eventually insert events block into approprate container
      $(chatEventsMainCont).append(eventsContainer);
      // then we refresh status block
      refreshStatusBloock();

    // if current user is business
    } else if (currentRole === 0) {
      // if we have chat section in main chat data
      if (chatData.chat_section && chatData.chat_section.sort) {
        // we again sort msgs from the oldest to the latest
        chatData.chat_section.sort(function(a, b) {
          var first = new Date(a.last_msg_sys_date);
          var second = new Date(b.last_msg_sys_date);
          if (first.getTime() < second.getTime()) {
            return -1;
          } else if (first.getTime() > second.getTime()) {
            return 1;
          } else {
            return 0;
          }
        });

        // if we have discussions
        if (chatData.chat_section.length) {
          // we assign the latest person id to current discussion
          currentActiveDiscussionId = chatData.chat_section[0].inter_id;
          // and if the latest person have events
          // TODO: how we can have the person info and don't have event???
          if (chatData.chat_section[0].events.length) {
            // we insert events into chat block
            eventsList = insertEventsIntoElement(eventsList, chatData.chat_section[0]);
            // and create textfield for person who can init events
            if ((chatData.permission && chatData.permission.can_init_event) || !chatData.permission) {
              eventsList.append(makeProperTextfield());
            }
          }

          // then we insert events block and interpreters list into chat container
          // TODO: how can we deal with window width with CSS only? Maybe we can use float for desctop and flex oreder for mobiles???
          if ($(window).width() > 600) {
            $(chatEventsMainCont).append(eventsContainer);
            $(chatEventsMainCont).append(insertInterpretersIntoList(interListCloneClone));
          } else {
            $(chatEventsMainCont).append(insertInterpretersIntoList(interListCloneClone));
            $(eventsContainer).insertAfter("[data-inter-id='" + chatData.chat_section[0].inter_id + "']");
          }
        }

        // at the end we make proper status block according to job status
        refreshStatusBloock();
      }
    }
  }; // end of rendering assignment events first time


  // function for refreshing events list after websocket response
  function refreshEventsList(eventPersonId) {
    // clone textfield
    var textfieldCloneClone = chatTextfieldClone.clone(true);

    // if we receive person id (only for business user)
    if (eventPersonId) {
      // we get array of this person
      var filteredArray = chatData.chat_section.filter(function(obj) {
        return obj.inter_id === eventPersonId;
      });
      var obj = filteredArray[0];
      // and set current discussion id with received id
      currentActiveDiscussionId = eventPersonId;

      // then we make events block according to window width
      if ($(window).width() > 600) {
        // TODO: why ve filter the same array twice?
        var filteredArray = chatData.chat_section.filter(function(obj) {
          return obj.inter_id === eventPersonId;
        });

        insertEventsIntoElement($(chatEventsListCont), obj);
        if ((chatData.permission && chatData.permission.can_init_event) || !chatData.permission) {
          $(chatEventsListCont).append(makeProperTextfield());
        }
      } else {
        $(chatEventsMsgsWrapper).remove();

        var eventsContainer = formEventsContainer();
        var eventsList = eventsContainer.find(chatEventsListCont);
        var eventsTitle = eventsContainer.find(chatEventsListTitle);
        var textfieldCloneClone = chatTextfieldClone.clone(true);

        if (filteredArray[0].events.length) {
          eventsList = insertEventsIntoElement(eventsList, obj);
        }
        if ((chatData.permission && chatData.permission.can_init_event) || !chatData.permission) {
          eventsList.append(makeProperTextfield());
        }
        $(eventsContainer).insertAfter("[data-inter-id='" + obj.inter_id + "']")
      }
    // if we don't receive person id
    } else {
      // we rerender chat section by standart algorythm
      // TODO: can we merge this whole function with renderEventsFirst time? they make the same actions!
      var eventsList = $(chatEventsListCont);
      insertEventsIntoElement($(chatEventsListCont), chatData.chat_section);
      if (textField && ((chatData.permission && chatData.permission.can_init_event) || !chatData.permission)) {
        eventsList.append(makeProperTextfield());
      }
      if (currentRole === 0) {
        insertInterpretersIntoList($(chatInterListElement));
      }
    }
  } // end of chat container rerender function

  // handler for switch between different interpreters conversations
  function handleClickOnSeparatePersonChat() {
    var eventPersonId = Number($(this).attr("data-inter-id"));

    if (eventPersonId === currentActiveDiscussionId) {
      return;
    }
    $(chatInterContElement).removeClass("is-active");
    $(this).addClass("is-active");
    refreshEventsList(eventPersonId);
  } // end of click on separate person in interpreters list handler function

  // function for refreshing status block
  // TODO: is too complicated and big. Make it smaller and simplier
  function refreshStatusBloock(obj) {
    // get job status
    var lastStatus = chatData.status;
    var cloneClone;

    // if this function is called from apply block switcher handler it receives obj as param with switch property
    if (obj && obj.switch) {
      // if this property is "custom"
      if (obj.switch === "custom") {
        // we change standart price status block and set custom apply block
        $(statusMainContElement).empty();
        cloneClone = applyCustomStatusInterClone.clone(true);
        $(statusMainContElement).append(cloneClone);
      } else {
        // and otherwise if switch === "standart"
        $(statusMainContElement).empty();
        cloneClone = applyStatusInterClone.clone(true);
        $(statusMainContElement).append(cloneClone);
      }
        // then we finish this function call and return
        return;
    }

    // for inserting new status container we remove old blocks from it
    $(statusMainContElement).empty();

    // if current user is interpreter
    if (currentRole === 1) {
      // we take job status value and loop through all possible variants
      switch (lastStatus) {

        // if interpreter can apply for this job
        case "can_apply":
          // we remove class for red background
          // TODO: why we can't remove it in any case??? we remove old status block and can zero out background too
          $(statusMainContElement).removeClass("is-destroy");
          // TODO: I can't find the case when this condition evaluates to True. How can we have custom apply block if we remove all old blocks from status container???
          if ($(statusMainContElement).find(statusInfoBlockApplyCustomInter).length) {
            break;
          }
          // and then insert apply status block content to status container
          cloneClone = applyStatusInterClone.clone(true);
          $(statusMainContElement).append(cloneClone);
          break;

        // if interpreter has already applied for this job
        case "applied":
        // we again remove red background from status container
          $(statusMainContElement).removeClass("is-destroy");
          // price key for apply
          // and make clone of applied information (price etc)
          // TODO: In some cases we don't see price in status block after apply
          cloneClone = appliedStatusInterClone.clone(true);
            // if we have obj as param and have price as property
            if (obj && obj.clear_price) {
                // we insert this price into applied status block
                // TODO: it doesn't work in some cases.
                cloneClone.find(".js-applied-status-price").html(obj.clear_price);
            // if we don'n have obj as param and don't have price in it
            } else {
                // we sort all events from the latest to the oldest
                chatData.chat_section.events.sort(function(a, b) {
                  var first = new Date(a.sys_date);
                  var second = new Date(b.sys_date);
                  if (first.getTime() > second.getTime()) {
                    return -1;
                  } else if (first.getTime() < second.getTime()) {
                    return 1;
                  } else {
                    return 0;
                  }
                });
                // and get price directly from FIRST event
                // TODO: maybe we can't get price for status block because first event after sorting (chatData.chat_section.events[0])
                // isn't apply event (can be simple msg) and doesn't have price info
                cloneClone.find(".js-applied-status-price").html(chatData.chat_section.events[0].clear_price);
            }

          // eventually we insert apply info into status block
          $(statusMainContElement).append(cloneClone);
          break;

        // if interpreter was awarded by business
        case "rewarded":
          // we create current moment date
          var currentDate = Date.now();
          // and create job's start time date
          var callDate = new Date(chatData.sys_time);

          // then we again remove red background from status container
          $(statusMainContElement).removeClass("is-destroy");
          // clone awarded block
          cloneClone = awardedStatusClone.clone(true);
          // and insert appropriate text into it
          cloneClone.find(".js-award-name").html(cloneClone.find(".js-award-name").html() + window.__("You"));

          // then we want to know how many time we have before the job's start
          if (currentDate >= (callDate.getTime() - 600000)) {
            // if we have anough time we rewrite variable for clone with new clone
            // TODO: can we avoid rewriting???
            cloneClone = callStatusInterClone.clone(true);
            // if we have some time before the job
            if (parseInt((callDate - currentDate.getTime()) / 60000) > 0) {
              // we calculate how meny time left
              cloneClone.find(".assign-chat-info-block-call-text").html(window.__("You have a video call in <u> min</u>"));
              cloneClone.find(".assign-chat-info-block-call-text").find("u").html(parseInt((callDate - currentDate.getTime()) / 60000) + cloneClone.find(".assign-chat-info-block-call-text").find("u").html());
            // if we don't have time before job
            } else {
              // we say that the job starts now
              cloneClone.find(".assign-chat-info-block-call-text").html(window.__("You have a video call <u>now</u>"));
            }
            // add blue bg to status container
            $(statusMainContElement).addClass("is-call");
          }

          // TODO: this changes is needed if we receive award event and don't have anough time before the job
          // so we should immediately show call status block after award event happened
          // TODO: can we move calculations of left time from status block rendering function to saveNewData?
          // we can set job status to start_soon and avoid rewriting wariables and superfluous calculations

          // and insert appropriate block to status container
          $(statusMainContElement).append(cloneClone);
          break;
        // if the job should start soon
        case "start_soon":
          // we check if the job type not hub (hub assignment for interpreter is like in person assignment)
          // TODO: now we show call block even when job tyle is in person and so on. We should fix it
          if (chatData.job_type != 3) {
            // we create current date and job's start date
            var currentDate = new Date();
            var callDate = new Date(chatData.sys_time);

            // again remove red background
            $(statusMainContElement).removeClass("is-destroy");
            // clone call block
            cloneClone = callStatusInterClone.clone(true);
            // and check if we have anough time before the call
            if (parseInt((callDate.getTime() - currentDate) / 60000) > 0) {
              // we show how many time left
              cloneClone.find(".assign-chat-info-block-call-text").html(window.__("You have a video call in <u> min</u>"));
              cloneClone.find(".assign-chat-info-block-call-text").find("u").html(parseInt((callDate.getTime() - currentDate) / 60000) + cloneClone.find(".assign-chat-info-block-call-text").find("u").html());
            // if we haven't time before the call
            } else {
              // we say that call should start now
              cloneClone.find(".assign-chat-info-block-call-text").html(window.__("You have a video call <u>now</u>"));
            }
            // then we add blue background
            $(statusMainContElement).addClass("is-call");
            // and insert call block into status container
            $(statusMainContElement).append(cloneClone);
          // if job's type is hub
          } else {
            // we show him awarded status block
            $(statusMainContElement).removeClass("is-destroy");
            cloneClone = awardedStatusClone.clone(true);
            cloneClone.find(".js-award-name").html(cloneClone.find(".js-award-name").html() + window.__("You"));
            $(statusMainContElement).append(cloneClone);
          }
          break;
        // if interpreter has canceled this job (after award)
        case "cancel_you":
          // we make disabled the ability to send msgs to business
          textField = false;
          $(chatTextfieldElement).remove();
          // and insert to status container destroy block with appropriate text
          cloneClone = destroyStatusClone.clone(true);
          cloneClone.find(".js-remove-for-inter").remove();
          cloneClone.find(".js-destroy-text").html(window.__("You have cancelled the assignment"));
          $(statusMainContElement).append(cloneClone);
          $(statusMainContElement).addClass("is-destroy");
          break;
        // if job was canceled (business delete the job at all)
        case "cancelled":
          // we make disabled the ability to send msgs to business
          textField = false;
          $(chatTextfieldElement).remove();
          // and insert to status container destroy block with appropriate text
          cloneClone = destroyStatusClone.clone(true);
          cloneClone.find(".js-remove-for-inter").remove();
          cloneClone.find(".js-destroy-text").html(window.__("This assignment has been cancelled"));
          $(statusMainContElement).append(cloneClone);
          $(statusMainContElement).addClass("is-destroy");
          break;
        // if business has awarded someone else or decline you directly (by redBtn in textfield block)
        case "declined_by_business":
          // we make disabled the ability to send msgs to business
          textField = false;
          $(chatTextfieldElement).remove();
          // name key for declined_by_business
          // and insert to status container destroy block with appropriate text
          cloneClone = destroyStatusClone.clone(true);
          cloneClone.find(".js-remove-for-inter").remove();
          cloneClone.find(".js-destroy-text").html(window.__("We are sorry to inform you but <span></span> has decided to hire someone else for this assignment"));
          cloneClone.find(".js-destroy-text").find("span").html(obj ? obj.name : chatData.creator_name.split(" ")[0])
          $(statusMainContElement).append(cloneClone);
          $(statusMainContElement).addClass("is-destroy");
          break;
        // if business hasn't made any award
        case "no_awards":
          // we make disabled the ability to send msgs to business
          textField = false;
          $(chatTextfieldElement).remove();
          // name key for declined_by_business
          // and insert to status container destroy block with appropriate text
          cloneClone = destroyStatusClone.clone(true);
          cloneClone.find(".js-remove-for-inter").remove();
          cloneClone.find(".js-destroy-text").html(window.__("We are sorry to inform you but <span></span> did not select anyone for this assignment"));
          cloneClone.find(".js-destroy-text").find("span").html(obj ? obj.name : chatData.creator_name.split(" ")[0])
          $(statusMainContElement).append(cloneClone);
          $(statusMainContElement).addClass("is-destroy");
          break;
        // if the job has already passed
        case "past_job":
          var lastPrice;

          // we sort events from the latest to the oldest
          chatData.chat_section.events.sort(function(a, b) {
            var first = new Date(a.last_msg_sys_date);
            var second = new Date(b.last_msg_sys_date);
            if (first.getTime() > second.getTime()) {
              return -1;
            } else if (first.getTime() < second.getTime()) {
              return 1;
            } else {
              return 0;
            }
          });

          // and look for the last applied price
          for (var i = 0, lim = chatData.chat_section.events.length; i < lim; i += 1) {
            if (chatData.chat_section.events[i].type === "apply") {
              lastPrice = chatData.chat_section.events[i].clear_price;
              break;
            }
          }

          // then we again remove red background from status container
          $(statusMainContElement).removeClass("is-destroy");
          // disable ability to send messages to business
          textField = false;
          $(chatTextfieldElement).remove();
          // and insert into status container the block with earned money value (that we've received from last apply event)
          cloneClone = earnedStatusClone.clone(true);
          cloneClone.find(".js-earned-price").html(lastPrice);
          $(statusMainContElement).append(cloneClone);
      } // end of creating interpreter's statuses switch/case block

    // if current user is business
    } else {
      switch (lastStatus) {
        // if we don't have any applies or even simple messages
        case "new":
          // we again remove red background
          $(statusMainContElement).removeClass("is-destroy");
          // and create clone of new job status block
          cloneClone = newStatusBusinessClone.clone(true);
          // if we have an interpreters list for this job (the job is private)
          if (chatData.fib_data) {
            // we change default text in this block
            cloneClone.find(".js-changable-text-first").text(window.__("We have collected a list of interpreters that match your requirements."));
            cloneClone.find(".js-changable-text-second").text(window.__("We recommend that you invite as many of them as you can!"));
          }
          // and insert new job status into status container
          $(statusMainContElement).append(cloneClone);
          break;
        // if business has canceled the whole job
        case "cancelled":
          // we make disabled the ability to send msgs to interpreter
          textField = false;
          $(chatTextfieldElement).remove();
          $(statusMainContElement).removeClass("is-destroy");
          // and clone special cancel job status block with further inserting it into status container
          cloneClone = newStatusCancelledClone.clone(true);
          $(statusMainContElement).append(cloneClone);
          $(statusMainContElement).addClass("is-destroy");
          break;
        // if business hasn't award anyone
        case "did_not_award":
          // we make disabled the ability to send msgs to interpreter
          textField = false;
          $(chatTextfieldElement).remove();
          $(statusMainContElement).removeClass("is-destroy");
          // and clone special did not award job status block with further inserting it into status container
          cloneClone = pastStatusDidNotAwardClone.clone(true);
          $(statusMainContElement).append(cloneClone);
          $(statusMainContElement).addClass("is-destroy");
          break;
        // if business has canceled an interpreter forever
        case "cancel_you":
          // we make disabled the ability to send msgs to interpreter
          textField = false;
          $(chatTextfieldElement).remove();
          // and clone destroy status block
          cloneClone = destroyStatusClone.clone(true);
          cloneClone.find(".js-destroy-text").html(window.__("You have cancelled the assignment"));
          $(statusMainContElement).append(cloneClone);
          $(statusMainContElement).addClass("is-destroy");
          break;
        // if an interpreter has delined the assignment forever
        case "declined_by_interpreter":
          // we clone destroy status block
          cloneClone = destroyStatusClone.clone(true);

          // and look for appropriate interpreter who was awarded and decline this award
          var neededInterArray = chatData.chat_section.filter(function(obj) {
            var resObj = {};
            // firstly we loop through all events of one interpreter and try to find date of last award and date of laast delcine event
            obj.events.forEach(function(obj) {
              if ((obj.type === "decline_offer" && !resObj.decline) || (obj.type === "reject_interpreter" && !resObj.decline)) {
                resObj.decline = obj.sys_date;
              } else if (obj.type === "reward") {
                resObj.reward = obj.sys_date;
              }
            });

            // then if both of events are happened
            if (resObj.decline && resObj.reward) {
              // we create dates of award and destroy events
              var declineDate = new Date(resObj.decline);
              var rewarddate = new Date(resObj.reward);

              // then we check whether decline event happened later then award
              return declineDate.getTime() > rewarddate.getTime();
            }
          });
          // after all actions we intert interpreter's name into destroy status block and add proper text into it
          cloneClone.find(".js-destroy-text").html(neededInterArray[0].inter_first_name + window.__(" has withdrawn their application from this assignment"));
          $(statusMainContElement).append(cloneClone);
          $(statusMainContElement).addClass("is-destroy");
          break;
        // if business has rewarded someone for the assignment
        case "rewarded":
          $(statusMainContElement).removeClass("is-destroy");
          var maxDate = 0;
          var neededPersonName;

          // we clone award status block
          cloneClone = awardedStatusClone.clone(true);

          // and try to find person with the latest award event
          // TODO: maube we need to reassign "maxdate" after every iteration???
          for (var i = 0, lim = chatData.chat_section.length; i < lim; i += 1) {
            for (var j = 0, max = chatData.chat_section[i].events.length; j < max; j += 1) {
              if (chatData.chat_section[i].events[j].type === "reward") {
                var currentIterationDate = new Date(chatData.chat_section[i].events[j].sys_date);
                if (currentIterationDate.getTime() > maxDate) {
                  neededPersonName = chatData.chat_section[i].inter_first_name;
                }
              }
            }
          }
          // then insert appropriate name into award status block
          cloneClone.find(".js-award-name").html(cloneClone.find(".js-award-name").html() + neededPersonName);
          $(statusMainContElement).append(cloneClone);
          break;
        // if this job has already ended
        case "past_job":
          // we make the same procees as for "rewarded" status
          $(statusMainContElement).removeClass("is-destroy");
          var maxDate = 0;
          var neededPersonName;

          cloneClone = awardedStatusClone.clone(true);
          for (var i = 0, lim = chatData.chat_section.length; i < lim; i += 1) {
            for (var j = 0, max = chatData.chat_section[i].events.length; j < max; j += 1) {
              if (chatData.chat_section[i].events[j].type === "reward") {
                var currentIterationDate = new Date(chatData.chat_section[i].events[j].sys_date);
                if (currentIterationDate.getTime() > maxDate) {
                  neededPersonName = chatData.chat_section[i].inter_first_name;
                }
              }
            }
          }
          cloneClone.find(".js-award-name").html(cloneClone.find(".js-award-name").html() + neededPersonName);
          $(statusMainContElement).append(cloneClone);
          break;
        // if any interpreter has reacted to the assignment (applied, write a message etc)
        case "replied":
          // we set all counters to thero state
          var totalCount = 0;
          var appliedCount = 0;
          var inquiryCount = 0;
          var declinedCount = 0;

          cloneClone = repliedStatusBusinessClone.clone(true);
          $(statusMainContElement).removeClass("is-destroy");

          // and loop through all reacted interpreters
          for (var i = 0, lim = chatData.chat_section.length; i < lim; i += 1) {
            // firstly we sort events of each interperpreter from the latest to the oldest
            chatData.chat_section[i].events.sort(function(a, b) {
              var first = new Date(a.last_msg_sys_date);
              var second = new Date(b.last_msg_sys_date);
              if (first.getTime() > second.getTime()) {
                return -1;
              } else if (first.getTime() < second.getTime()) {
                return 1;
              } else {
                return 0;
              }
            });

            // then we increment proper counter according to the last method status of interpreter
            if (chatData.chat_section[i].events[0].type !== "awarded") {
              totalCount += 1;
              if (chatData.chat_section[i].last_method_status === "Applied") {
                appliedCount += 1;
              } else if (chatData.chat_section[i].last_method_status === "Inquiry") {
                inquiryCount += 1;
              } else if  (chatData.chat_section[i].last_method_status === "Declined") {
                declinedCount += 1;
              }
            }
          };

          // after all we insert counters to appropriate blocks in replied status block
          cloneClone.find(".js-reply-count").html(totalCount);
          if (appliedCount) {
            cloneClone.find(".js-detailed-count-cont").html(cloneClone.find(".js-detailed-count-cont").html() + "<span>" + appliedCount + window.__(" Applied") + "</span>");
          };
          if (inquiryCount) {
            cloneClone.find(".js-detailed-count-cont").html(cloneClone.find(".js-detailed-count-cont").html() + "<span>" + inquiryCount + window.__(" Inquiry") + "</span>");
          };
          if (declinedCount) {
            cloneClone.find(".js-detailed-count-cont").html(cloneClone.find(".js-detailed-count-cont").html() + "<span>" + declinedCount + window.__(" Declined") + "</span>");
          };

          $(statusMainContElement).append(cloneClone);
          break;
        // if the assignment should start soon
        case "start_soon":
          // we fill in call status block with appropriate amount of minutes before the call
          // TODO: now we have one call status block for all assignments type. we have to create different call status blocks for all types of assignments
          if (chatData.permission && chatData.permission.can_attend) {
            var currentDate = new Date();
            var callDate = new Date(chatData.sys_time);

            $(statusMainContElement).removeClass("is-destroy");
            cloneClone = callStatusInterClone.clone(true);
            if (parseInt((callDate.getTime() - currentDate) / 60000) > 0) {
              cloneClone.find(".assign-chat-info-block-call-text").html(window.__("You have a video call in <u> min</u>"));
              cloneClone.find(".assign-chat-info-block-call-text").find("u").html(parseInt((callDate.getTime() - currentDate) / 60000) + cloneClone.find(".assign-chat-info-block-call-text").find("u").html());
            } else {
              cloneClone.find(".assign-chat-info-block-call-text").html(window.__("You have a video call <u>now</u>"));
            }
            $(statusMainContElement).addClass("is-call");
            $(statusMainContElement).append(cloneClone);
          } else {
            $(statusMainContElement).removeClass("is-destroy");
            var maxDate = 0;
            var neededPersonName;

            // we clone award status block
            cloneClone = awardedStatusClone.clone(true);

            // and try to find person with the latest award event
            // TODO: maube we need to reassign "maxdate" after every iteration???
            for (var i = 0, lim = chatData.chat_section.length; i < lim; i += 1) {
              for (var j = 0, max = chatData.chat_section[i].events.length; j < max; j += 1) {
                if (chatData.chat_section[i].events[j].type === "reward") {
                  var currentIterationDate = new Date(chatData.chat_section[i].events[j].sys_date);
                  if (currentIterationDate.getTime() > maxDate) {
                    neededPersonName = chatData.chat_section[i].inter_first_name;
                  }
                }
              }
            }
            // then insert appropriate name into award status block
            cloneClone.find(".js-award-name").html(cloneClone.find(".js-award-name").html() + neededPersonName);
            $(statusMainContElement).append(cloneClone);
          }
          break;

      }
    }
  } // end of function for creating status blocks


  // function that reacts on new events, inserts it into main data and mutate it
  // this function receives new object as param and make all work according to it
  function saveNewData(obj) {
    // if current user is interpreter
    if (currentRole === 1) {
      // if the new event is apply, decline, reject or reward
      if(obj.type === "apply" || obj.type === "decline_offer" || obj.type === "reject_interpreter" || obj.type === "reward") {
          // we set "past" property to True to al older events
          // TODO: Do we still use this property???
          chatData.chat_section.events.map(function(obj) {
              obj.past = true;
          })
      }
      // then we simply push new event to all events
      chatData.chat_section.events.push(obj);

      // after it we start to mutate main data according to new event
      // if the new event is reward
      if (obj.type === "reward") {
        // we set "rewarded" status to main data and update status container
        chatData.status = "rewarded";
        refreshStatusBloock();
      // new event type is decline
      } else if (obj.type === "decline_offer") {
        // we chech the presents of reason in new event
        // TODO: maybe we should change the logic of this checking??? presents of reason in event isn't reliable at all.
        if (obj.reason) {
          // if the reason is present we check whether initiator of this event is the current user or not
          if (Number(obj.initiator_id) === Number(currentPersonId)) {
            // if current user we know that current user has decline this assignment
            chatData.status = "cancel_you";
            refreshStatusBloock();
          } else {
            // otherwise the assignment was declined by other side (business)
            chatData.status = "declined_by_business";
            refreshStatusBloock({name: obj.initiator_name});
          }
        // if we don't have the reason of declining we let interpreter to apply again
        // TODO: this whole "decline_offer" functional can be better and clearer
        } else {
          chatData.status = "can_apply";
          refreshStatusBloock();
        }
      // if new event has "reject_interpreter" type
      } else if (obj.type === 'reject_interpreter') {
        // we know that the interpreter's application was declined by other side (business)
        chatData.status = "declined_by_business";
        refreshStatusBloock({name: obj.initiator_name});
      // if new event is apply
      } else if (obj.type === "apply") {
        // we make appropriate mutation for main data and refresh status block
        chatData.status = "applied";
        refreshStatusBloock({clear_price: obj.clear_price});
      }

      // then we sort main data with new event inside it from the oldest event to the latest
      chatData.chat_section.events.sort(function(a, b) {
        var first = new Date(a.sys_date);
        var second = new Date(b.sys_date);
        if (first.getTime() < second.getTime()) {
          return -1;
        } else if (first.getTime() > second.getTime()) {
          return 1;
        } else {
          return 0;
        }
      });

      // and rerender all chat container
      refreshEventsList();

    // if current user is business
    } else if (currentRole === 0) {
      // we loop through all interpreters in main data
      for (var i = 0, lim = chatData.chat_section.length; i < lim; i += 1) {

        // if current iteration person id mathes with person id of new event
        if (chatData.chat_section[i].inter_id === obj.person_id) {
          // we set last msg system date of current iteration user to system date of new event
          chatData.chat_section[i].last_msg_sys_date = obj.sys_date;
          // chatData.chat_section[i].last_msg_status
          // if new event is apply, decline or reward
          if(obj.type === "apply" || obj.type === "decline_offer" || obj.type === "reject_interpreter" || obj.type === "reward") {
              // we set past property to True for all older significant events
              // TODO: Do we still use this property?
              chatData.chat_section[i].events.map(function(obj) {
                  obj.past = true;
              })
          };

          // if the new event is apply we pull applied price from it and reassign last applied price of current iteration interpreter
          if (obj.type === "apply") {
            chatData.chat_section[i].inter_applied_price = obj.total_price;
          }
          // then we push new event to main data
          chatData.chat_section[i].events.push(obj);
          // sort events from the oldest to the latest
          chatData.chat_section[i].events.sort(function(a, b) {
            var first = new Date(a.last_msg_sys_date);
            var second = new Date(b.last_msg_sys_date);

            if (first.getTime() < second.getTime()) {
              return -1;
            } else if (first.getTime() > second.getTime()) {
              return 1;
            } else {
              return 0;
            }
          });
          // and refresh chat container if this event was from interpreter that business is talking to now
          if (obj.person_id === currentActiveDiscussionId) {
            refreshEventsList(currentActiveDiscussionId);
          };
          // we exit from loop because we have done all work with new event
          break;
        }
      }

      // if viewport is wider than 600px
      if ($(window).width() > 600) {
        // we need just to refresh interpreters list
        insertInterpretersIntoList($(chatInterListElement));
      // if viewport is narrower than 600px
      } else {
        // we rerender interpreters list and refresh chat container
        // TODO: why we rerender the chat container twice if viewport is narrower than 600px
        insertInterpretersIntoList($(chatInterListElement));
        refreshEventsList(currentActiveDiscussionId);
      }

      // if new event is award
      if (obj.type === "reward") {
        // we make rewarder status of the assignment and refresh status container
        chatData.status = "rewarded";
        refreshStatusBloock();
      // if the new event is decline or reject
      } else if (obj.type === "decline_offer" || obj.type === "reject_interpreter") {
        // we check whether this event was initiated by current user or not
        if (Number(obj.initiator_id) === Number(currentPersonId)) {
          // if yes we check the previous assignment status
          // if it was "rewarded" we make hard action and mutate assignment status to canceled by current user (business)
          if (chatData.status === "rewarded") {
            chatData.status = "cancel_you";
          // in any other case we make softer action
          } else {
            // and make the whole assignment status "replied"
            chatData.status = "replied";
            // if it's private assignment and we have the list of appropriate interpreters
            if (chatData.fib_data) {
              // we refresh this list with new data
              findInterBlockModule.getFaIList();
            }
          }
          // at the end we rerender status container
          refreshStatusBloock();
        // if the new event was made not by current user
        } else {
          // if previous assignment status was "rewarded"
          if (chatData.status === "rewarded") {
            // we now that the new event is decline fron interprete's side
            chatData.status = "declined_by_interpreter";
          // if we had not "rewarded" status of the assignment
          } else {
            // we make "replied" of the assignment
            chatData.status = "replied";
            // and refresh appropriate interpreters block if this it the private assignment
            if (chatData.fib_data) {
              findInterBlockModule.getFaIList();
            }
          }
          // we refresh status container at the end of all mutations
          refreshStatusBloock();
        }
      // if new event is apply
      } else if (obj.type === "apply") {
        // we set replied status to assignment, rerender status container
        chatData.status = "replied";
        refreshStatusBloock();
        // remove interpreters from appropriate interpreters list
        findInterBlockModule.removeInterFromFaIBlock(obj.person_id);
        // and rerender it
        findInterBlockModule.reRenderFaIBlock();
      }
    }
  }; // end of function for updating and mutating main data

  // function for getting main assignment data
  function getChatList() {
    // firstly we make ajax call to the server
    $.get('/jobs/' + jobId + '/chat_info')
      // if it returns assignment data to us
      .success(function(response){
        // we assign the global variable of main information
        chatData = JSON.parse(response.data);
        // console.log(chatData);
        // create list with appropriate interpreters if this assignment is private
        findInterpreterBlockSet(chatData);
        // fill in main info about this assignment
        setJobDescrInfo(chatData);
        // create and fill in chat container
        renderEventsFirstTime();
        // and set value of unread discussions for the Active discussion tab ot the top of the page
        setActiveDiscussionsCounter();
      })
      // if the server show us an error
      .error(function(response){
        var main_error = response.responseJSON.message;
        // we show it to the user
        if (main_error) {
          showErrorsModule.showMessage([main_error], "main-error");
        }
      });
  } // end of getting assignment main data function

  //function for creating list with appropriate interpreters
  function findInterpreterBlockSet(chatData) {
    // if main assignment data has property for find an interpreter block
    // and current user is enterprise and can init events OR current user isn't enterprise 
    if (chatData.fib_data && ((chatData.permission && chatData.permission.can_init_event) || !chatData.permission)) {
      // we pull all needed info from main data and init find an interpreter block module
      var jobDataObj = {};
      jobDataObj.sex = chatData.fib_data.gender;
      jobDataObj.qualification = chatData.fib_data.qualification;
      jobDataObj.lang_from = chatData.fib_data.lang_from;
      jobDataObj.lang_to = chatData.fib_data.lang_to;
      jobDataObj.start_time = chatData.fib_data.start_time;
      jobDataObj.finish_time = chatData.fib_data.finish_time;
      jobDataObj.duration = chatData.fib_data.duration;
      jobDataObj.job_id = chatData.fib_data.job_id;
      findInterBlockModule.setJobData(jobDataObj);
      findInterBlockModule.init();
      $(findInterListCont).removeClass("is-example");
    // if we don't have property for find an interpreter block in main data
    } else {
      // we simply remove this block from markup
      $(findInterListCont).remove();
    }
  } // end of function for find interpreter block logic

  // function for setting active discussion counter for Active discussion tab
  function setActiveDiscussionsCounter() {
    // firstly we check if info about counter is present in main data and it's greater than 1
    // if this conditions is true we decrement active discussion counter by 1
    // in other case we assign 0 or undefined to counter variable
    var counter = (chatData.msgs_count && (chatData.active_discussions > 1)) ? chatData.active_discussions - 1 : chatData.active_discussions;
    // if counter is present
    if (counter) {
      // we insert it to active discussion couner in view
      $(tabsSwitcherCounter).addClass("is-visible");
      $(tabsSwitcherCounter).html(counter);
      $(inboxMessagesCounter).html(counter);
    } else if (counter === 0) {
      // otherwise we remove discussions counter from view
      $(inboxMessagesCounter).addClass("is-hidden");
      $(tabsSwitcherCounter).html('');
    };
  }; // end of function for setting active discussion

  // function handler for sending simple message event
  function replyAssignment(e) {
    // firstly we get current person id
    var personId = currentActiveDiscussionId,
    // then we pull text from chat texarea
    messageText = $(chatEventsMainCont).find(simpleMsgInput).val();
    // and get "send message" btn
    var currentButton = e.target;
    // then we check whether user entered a text or not
    if (messageText.trim()) {
      // if yes we add progress class to pressed btn
      $(currentButton).addClass("in-progress");
      // and send AJAX request to the server
      $.post('/jobs/' + jobId + '/reply', {
        message: {
          text: messageText,
          person_id: personId
        }
      // if server has successfully receive simple msg text
      }).success(function(response) {
        // we get desctop notification text from response
        var desktopNotification = response.notice;
        // get new event for updating view and mutating main data
        var chatEvent = response.event;
        // get subscriber of this assignment chat
        var chat_subscriber = response.chat_subscriber;
        // and get job from response
        // TODO: What is this job???
        var job = response.job;
        // then we show desctop notification for subscribed user
        websocketsInteractionModule.publish_desktop_notification(desktopNotification);
        // and send him happened event
        websocketsInteractionModule.chat_publisher(chatEvent, job, chat_subscriber);
        // then we mutate our main data
        saveNewData(chatEvent);
        // and remove progress state from send msg btn
        $(currentButton).removeClass("in-progress");

      // if we get some error as a response
      }).error(function(response) {
        // we properly show this error to user
        var main_error = response.responseJSON.message;
        if (main_error) {
          showErrorsModule.showMessage([main_error], "main-error");
        }
        $(currentButton).removeClass("in-progress");
      });

    // if user clicked send msg btn without text in textarea
    } else {
      // we simply make textarea empty
      $(chatEventsMainCont).find(simpleMsgInput).val("");
    };
  };  // end of function for sending simple message


  // function handler for applying for the assignment
  function applyAssignment(e) {
    var params = {};
    // if user checked Terms and conditions checkbox in apply modal window
    if ($(modalAwardCheckbox).hasClass("is-checked")) {
      // we check whether if this apply is with custom price or not
      // TODO: can we call this condition reliable???
      if ($(".js-custom-price-input").length) {
        // if yes we pull applyed price from custom apply input
        params = {
          price: $(".js-custom-price-input").val(),
          // and pull the reason of custom apply
          reason: $(".js-custom-reason").val().trim()
        }
      }
      // if user set negative or non-digit price for custom apply
      if ((params.price) && (isNaN(Number(params.price)) || (Number(params.price) < 0))) {
        // we close apply modal and show the error to the user
        closeChatModal();
        showErrorsModule.showMessage([window.__('You can not apply with a negative price')], 'main-error');

      // if user hasn't given a reason of custom apply
      } else if ( (params.reason) && (params.reason == "" || params.reason == "undefined")) {
        // we close apply modal and show the error to the user
        closeChatModal();
        showErrorsModule.showMessage([window.__('Please provide a reason for applying with a custom price.')], 'main-error');

      // if user make simple apply (all info about price is already on the server) or custom apply with proper data
      } else {
        // we add progress class to apply btn
        $(this).addClass("in-progress");
        // and send the data to the server by AJAX call
        $.post('/jobs/' + jobId + '/apply', params).success(function (response) {
          // if server properly handle our information
          // we get desctop notification info from response
          var desktopNotification = response.notice;
          // get event for mutating our data and sending it to the server
          var chatEvent = response.event;
          // receive id of our subscriber
          var chat_subscriber = response.chat_subscriber;
          // and get info about current assignment (job)
          var job = response.job;
          // then we remove progress class from apply btn
          $(this).removeClass("in-progress");
          // send desctop notification by WebSockets
          websocketsInteractionModule.publish_desktop_notification(desktopNotification);
          // and send new event bo subscriber
          websocketsInteractionModule.chat_publisher(chatEvent, job, chat_subscriber);
          // close apply modal window
          closeChatModal();
          // and mutate our local main data
          saveNewData(chatEvent);
          numericPrice = isNaN(Number(params.price))?0.00:params.price;
          conversionTracking.trackNewApplication( numericPrice, "NOK" );

        // if server has handled our data with error
        }).error(function (response) {
          // we show the error msg to the user
          var permission_errors = response.responseJSON.permission_errors;
          var main_error = response.responseJSON.message;
          closeChatModal();
          if (permission_errors && permission_errors.length > 0) {
            showErrorsModule.showMessage(permission_errors, "permission-error");
          } else if (main_error){
            showErrorsModule.showMessage([main_error], "main-error");
          }
          $(this).removeClass("in-progress");
        });
      }

    // if user hasn't check Terms and conditions checkbox
    } else {
      // we show him an error
      $(".accept-data-error-msg").attr("style", "max-width: 400px; margin: 0 auto;");
      showErrorsModule.showMessage([window.__("Please accept Skiwo's terms and conditions before applying to this assignment.")], "modal-error");
      setTimeout(function() {
        showErrorsModule.hideMessage();
        $(".accept-data-error-msg").attr("style", "");
      }, 5000);
    }
  }; // end of apply handler function


  // function handler for withdraw action
  function withdrawAssignment(e) {
    // look for interpreter's id whose application or reward we are withdrowing
    // if current user is business we take current discussion id
    // otherwise we take current person id (because current person is interpreter)
    var inter_id = currentRole === 0 ? currentActiveDiscussionId : currentPersonId, //who you need to withdraw
    reason = "";

    // if we have modal withdraw window
    // TODO: can we make reliable checking???
    if ($(modalContentBlockWithdrawMsg).length) {
      // we get the reason text from appropriate input
      reason = $(modalContentBlockWithdrawMsg).val();
      // and if this input has a text
      if (reason.length) {
        // we send proper data to the server by AJAX call
        $.post('/jobs/' + jobId + '/withdraw', {
          interpreter_id: inter_id,
          reason: reason
        // if server successfully handle received data
        }).success(function(response){
          // we get all needed data prom response, make desctop notification, send new event by websockets, close modal and mutate local data
          var desktopNotification = response.notice;
          var chatEvent = response.event;
          var chat_subscriber = response.chat_subscriber;
          var job = response.job;
          websocketsInteractionModule.publish_desktop_notification(desktopNotification);
          websocketsInteractionModule.chat_publisher(chatEvent, job, chat_subscriber);
          closeChatModal();
          saveNewData(chatEvent);
        // if server handle our data with error
        }).error(function(response){
          // we show it to the user
          var main_error = response.responseJSON.message;
          if (main_error) {
            showErrorsModule.showMessage([main_error], "main-error");
          }
          closeChatModal();
        });

      // if user hasn't provide us a rason
      } else {
        // we show him an error
        showErrorsModule.showMessage([window.__("You should explain why you are declining this assignment")], "modal-error");
      }

    // if we don't have withdrow modal
    } else {
      // we do all the actions that make with withdraw modal
      // TODO: why we make the long action twice???
      // declined - interpreter can not reapply (decline interpreter) reject_interpreter
      // rejected - interpreter can reapply (decline offer) decline_offer
      $.post('/jobs/' + jobId + '/withdraw', {
        interpreter_id: inter_id,
        reason: reason,
        option: $(e.target).attr("data-destroy-option")
      }).success(function(response){
        var desktopNotification = response.notice;
        var chatEvent = response.event;
        var chat_subscriber = response.chat_subscriber;
        var job = response.job;
        websocketsInteractionModule.publish_desktop_notification(desktopNotification);
        websocketsInteractionModule.chat_publisher(chatEvent, job, chat_subscriber);
        closeChatModal();
        saveNewData(chatEvent);
      }).error(function(response){
        var main_error = response.responseJSON.message;
        if (main_error) {
          showErrorsModule.showMessage([main_error], "main-error");
        }
        closeChatModal();
      });
    }
  }; // end of withdraw handler function

  // reward action handler
  function rewardAssignment(e) {
    // look for interpreter's id whose application we are rewarding
    // if current user is business we take current discussion id
    // otherwise we take current person id (because current person is interpreter)
    // TODO: can interpreter make reward action at all????
    var inter_id = currentRole === 0 ? currentActiveDiscussionId : currentPersonId;

    // if user has checked Terms and condition checkbox
    if ($(modalAwardCheckbox).hasClass("is-checked")) {
      $(this).addClass("in-progress");

      // we send reward data to the server by AJAX call
      $.post('/jobs/' + jobId + '/reward', {
        interpreter_id: inter_id,

      // if server successfully hadle received data
      }).success(function(response){
        // we get all needed data from response, make desktop notification and send new event by websockets
        var desktopNotification = response.notice;
        var chatEvent = response.event;
        var chat_subscriber = response.chat_subscriber;
        var job = response.job;
        websocketsInteractionModule.publish_desktop_notification(desktopNotification);
        websocketsInteractionModule.chat_publisher(chatEvent, job, chat_subscriber);
        // then we notify people who was declined
        response.mass_events.map(function(event) {
          websocketsInteractionModule.chat_publisher(event, response.job, event.person_id);
          // TODO: do we need this call after every websocket send???
          saveNewData(event);
        });
        closeChatModal();
        saveNewData(chatEvent);
        //REPLACE THIS WITH THE INTERPRETER PRICE
        numericPrice = isNaN(Number(response.event.price.split(" ")[0]))?0.00:response.event.price.split(" ")[0];
        conversionTracking.trackAssignmentAwarded( numericPrice, "NOK" );

      // if server handle our data with error
      }).error(function(response){
        // we show error to the user
        var permission_errors = response.responseJSON.permission_errors;
        var main_error = response.responseJSON.message;
          closeChatModal();
          if (permission_errors && permission_errors.length > 0) {
            showErrorsModule.showMessage(permission_errors, "permission-error");
        } else if (main_error){
          $(".accept-data-error-msg").attr("style", "max-width: 400px; margin: 0 auto;");
          showErrorsModule.showMessage([main_error], "modal-error");
          setTimeout(function() {
            showErrorsModule.hideMessage();
            $(".accept-data-error-msg").attr("style", "");
          }, 5000);
        }
        $(this).removeClass("in-progress");
      });

    // if user hasn't check Term and Conditions checkbox
    } else {
      // we show him an error
      $(".accept-data-error-msg").attr("style", "max-width: 400px; margin: 0 auto;");
      showErrorsModule.showMessage([window.__("Please accept Skiwo's terms and conditions before awarding this assignment.")], "modal-error");
      setTimeout(function() {
        showErrorsModule.hideMessage();
        $(".accept-data-error-msg").attr("style", "");
      }, 5000);
    }
      $(this).removeClass("in-progress");

  } // end of reward handler function

  // handler for cancelling the assignment
  function cancelAssignment(e){
    // we make a post request to server by AJAX
    $.post('/jobs/' + jobId + '/cancel', {

    // if server successfully hadle received data
    }).success(function(response){
      // we show main sucess message to the user
      showErrorsModule.showMessage(response.message, "main-success");
      // remove find interpreter block
      $(findInterListCont).remove();
      // notify people who was declined (all interpreters was declined)
      response.events.map(function(event) {
        websocketsInteractionModule.chat_publisher(event, response.job, event.person_id);
        // TODO: do we need this call after every websocket send???
        saveNewData(event);
      });
      //close modal
      // TODO: which modal we close if we haven't opened any???
      closeChatModal();
      // hide job cancelation btns cont
      $(cancelJobCont).addClass("is-hidden");

    // if server handle our data with error
    }).error(function(response){
    // we show error to the user
      var main_error = response.responseJSON.message;
      if (main_error) {
        showErrorsModule.showMessage([main_error], "main-error");
      }
    });
  } // end of cancel an assignment handler

  // function for initialisation chat
  function initChat() {
    // firstly we get current person id
    currentPersonId = $(".js-current-person-id").val();
    // then we get current assignment id
    jobId = $(".js-job-id").val();
    // clone reusable blocks
    cloneExampleBlocks();
    // and send AJAX for getting main assignment data
    getChatList();

    // attach handlers to different btns
    $(mainChatElement).on("click", replyButton, replyAssignment);
    $(mainChatElement).on("click", applyButton, applyAssignment);
    $(mainChatElement).on("click", withdrawButton, withdrawAssignment);
    $(mainChatElement).on("click", rewardButton, rewardAssignment);
    $(mainChatElement).on("click", cancelButton, cancelAssignment);
    $(mainChatElement).on("click", attendersListBtn, attendersBtnHandler);
    $(mainChatElement).on("click", ".assign-chat-info-block-custom-btn", function(e) {
      if ($(e.target).hasClass("info-tooltip-cont")) {
        return false;
      }
      if ($(this).hasClass("is-custom-apply")) {
        refreshStatusBloock({switch: "standart"});
      } else {
        refreshStatusBloock({switch: "custom"});
      }
     });
    $(mainChatElement).on("click", showProperPopup);
    $(mainChatElement).on("click", modalCloseCrossBtn, closeChatModal);
    $(mainChatElement).on("click", chatInterContElement, handleClickOnSeparatePersonChat);
    $(mainChatElement).on("click", modalAwardCheckbox, function() {
      $(this).toggleClass("is-checked");
    });
    $(".container-for-modal").on("click", contactAdminButton, contactAdmin);

    // make current person like subscriber
    var chatSubscriber = (function() {
      var subscriber = $('.js-websocket-subscriber');
      if (subscriber.length){
        var job_id = subscriber.data('jobId');
        var person_id = subscriber.data('subscriberId');
        websocketsInteractionModule.chat_subscriber(job_id, person_id);
      }
    }());
  }

  // function for contact an admin
  // TODO: deal with this functionality
  // it seems like you can contact an admin after permission error or other modals
  function contactAdmin() {
    var contact_form_url = $(this).data('url'),
      text = $('.js-contact-form-text').val();
    $.post(contact_form_url, {
      text: text
    })
    .success(function(){
      $(".container-for-modal.permission-error").removeClass("is-active");
    })
    .error(function(response) {
      var main_error = response.responseJSON.message;
      if (main_error) {
        showErrorsModule.showMessage([main_error], "main-error");
      }
    });
  }

  // return initialisation function and function for saving new data from websockets module
  return {
    init: initChat,
    saveNewData: saveNewData
  };

}());
