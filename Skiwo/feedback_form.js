var feedbackModule = (function() {
  var feedbackModalElement = ".container-for-modal.feedback-form";
  var feedbackMainCont = ".feedback-modal-main-cont";
  var mainContNegativeClass = "is-negative";
  var closeModalCross = ".accept-data-close-cross";
  var okButton = ".js-all-ok-btn";
  var notOKBtn = ".js-negative-btn";
  var negativeTextfield = ".js-negative-text";
  var sendNegative = ".js-send-negative-btn";


  function removeFeedbackForm() {
    $(feedbackModalElement).remove();
  }

  function showNegativeTextfield() {
    $(this).removeClass("white");
    $(this).addClass("default");
    $(feedbackMainCont).addClass(mainContNegativeClass);
  }

  function sendFeedback(e) {
    var jobId = $('#job-id').val();
    var contractId = $('#contract-id').val();
    var personId = $('#person-id').val();
    var feedback = {
      person_id: personId,
      job_contract_id: contractId
    };
    
    if ($(e.target).is(okButton)) {
      feedback.ok = true;
      sendAjaxFeedback();
    } else if (($(e.target).is(sendNegative))) {
      if ($(negativeTextfield).val()) {
        feedback.ok = false;
        feedback.comment = $(negativeTextfield).val();
        sendAjaxFeedback();
      } else {
        $(negativeTextfield).addClass("is-with-error");
      }
    }

    // TODO: send ajax from here and call removeFeedbackForm function from success with showErrorsModule.showMessage("la-la-la", "main-success") after it!
    function sendAjaxFeedback() {
      $.ajax({
        url: jobId + '/feedbacks',
        type: 'POST',
        data: JSON.stringify(feedback),
        contentType: 'application/json',
        success: function(responce) {
          removeFeedbackForm();
          showErrorsModule.showMessage(window.__('Thank you!'), "main-success");
        },
        error: function(response) {
          var main_error = response.responseJSON.message;
          if (main_error) {
            showErrorsModule.showMessage([main_error], "main-error");
          }
        }
      });
    }
  }

  function initFeedback() {
    $(feedbackModalElement).on("click", notOKBtn, showNegativeTextfield);
    $(feedbackModalElement).on("click", sendFeedback);
    $(feedbackModalElement).on("click", closeModalCross, removeFeedbackForm);
  }

  return {
    init: initFeedback
  };

}());
