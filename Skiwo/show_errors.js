var showErrorsModule = (function() {
  function showMessage(message, option) {
    if (option === "main-success") {
      $('.accepting-data-main-message-block').html(message);
      $('.accepting-data-main-message-block').addClass("is-visible");
      $('.accepting-data-main-message-block').addClass("is-success");
      var neededHeignt = parseInt(window.getComputedStyle($('.accepting-data-main-message-block').get()[0]).height);
      $("body").hasClass("is-opened-submenu") ? $("body").attr("style", "padding-top:" + (neededHeignt + 100) + "px;") : $("body").attr("style", "padding-top:" + (neededHeignt + 60) + "px;");
    } else if (option !== "permission-error") {
      var errorText = '';
      var errorCounter = 1;

      for ( error in message ) {
        errorText += '<span>' + String(errorCounter) + ". " + message[error] + '</span>';
        $("[data-for-validation='" + error + "']").addClass("is-with-error-field");
        // $("[data-for-validation='" + error + "']").removeClass("green-select");
        // $("[data-for-validation='" + error + "']").addClass("white-select");
        $("[data-for-validation='" + error + "']").on("focus", function(){
          $(this).removeClass("is-with-error-field");
        } );
        errorCounter += 1;
      };

      switch (option) {
        case "main-error":
          $('.accepting-data-main-message-block').html(errorText);
          $('.accepting-data-main-message-block').addClass("is-visible");
          $('.accepting-data-main-message-block').addClass("is-error");
          var neededHeignt = parseInt(window.getComputedStyle($('.accepting-data-main-message-block').get()[0]).height);
          $("body").hasClass("is-opened-submenu") ? $("body").attr("style", "padding-top:" + (neededHeignt + 100) + "px;") : $("body").attr("style", "padding-top:" + (neededHeignt + 60) + "px;");
          break
        case "modal-error":
          $('.accept-data-error-msg').html(errorText);
          $('.accept-data-error-msg').addClass("with-error");
          break
        case "special-error":
          $('.accepting-data-special-message-block').first().html(errorText);
          $('.accepting-data-special-message-block').first().removeClass("is-visible");
          $('.accepting-data-special-message-block').first().removeClass("is-error");
          $('.accepting-data-special-message-block').first().removeClass("is-success");
          $('.accepting-data-special-message-block').first().addClass("is-visible");
          $('.accepting-data-special-message-block').first().addClass("is-error");
          break
        case "special-success":
          $('.accepting-data-special-message-block').first().html(message);
          $('.accepting-data-special-message-block').first().removeClass("is-visible");
          $('.accepting-data-special-message-block').first().removeClass("is-error");
          $('.accepting-data-special-message-block').first().removeClass("is-success");
          $('.accepting-data-special-message-block').first().addClass("is-visible");
          $('.accepting-data-special-message-block').first().addClass("is-success");
          break
      }
    } else if (option === "permission-error") {
      var popupContElement = $(".container-for-modal.permission-error").find(".modal-content-block");
      var closeCrossElement = $("<button></button>");
      var titleElement = $("<h3></h3>");
      var textElement = $("<p></p>");
      var textareaElement = $("<textarea></textarea>");
      var linkElement = $("<a></a>");
      var firstErrorData = message[0];

      closeCrossElement.addClass("accept-data-close-cross");
      closeCrossElement.addClass("js-close-global-modal");
      popupContElement.append(closeCrossElement);

      titleElement.addClass('global-modal-msg-heading');
      titleElement.html(firstErrorData.title);
      popupContElement.append(titleElement);

      textElement.addClass('global-modal-msg-text');
      textElement.html(firstErrorData.message);
      popupContElement.append(textElement);

      if (firstErrorData.text_area) {
        textareaElement.addClass("skiwo-textarea");
        textareaElement.addClass("global-modal-msg-textfield");
        textareaElement.addClass("js-contact-form-text");
        textareaElement.attr("placeholder", firstErrorData.placeholder);
        popupContElement.append(textareaElement)
      }

      if (firstErrorData.link) {
        if (firstErrorData.text_area) {
          linkElement.on("click", function(e) {
            e.preventDefault();
            var value = textareaElement.val();
            $.post(firstErrorData.link, { text: value}).done(function() {
              $(".container-for-modal.permission-error").removeClass("is-active");
            });
          });
        }
        linkElement.addClass("skiwo-btn");
        linkElement.addClass("skiwo-btn--default");
        linkElement.addClass("global-modal-msg-btn");
        linkElement.attr("href", firstErrorData.link);
        linkElement.html(firstErrorData.link_text);
        popupContElement.append(linkElement);
      }

      if (firstErrorData.contact_form_url) {
        linkElement.addClass("skiwo-btn");
        linkElement.addClass("skiwo-btn--default");
        linkElement.addClass("global-modal-msg-btn");
        linkElement.addClass("js-send-contact-form-to-admin");
        linkElement.data("url", firstErrorData.contact_form_url);
        linkElement.html(firstErrorData.link_text);
        popupContElement.append(linkElement);
      }

      $(".container-for-modal.permission-error").addClass("is-active");
      $(".js-close-global-modal").on("click", function() {
        popupContElement.empty();
        $(".container-for-modal.permission-error").removeClass("is-active");
      });
    }
  };

  function hideMessage() {
    $(".accepting-data-main-message-block").removeClass("is-visible");
    $(".accepting-data-main-message-block").removeClass("is-success");
    $(".accepting-data-main-message-block").removeClass("is-error");
    $(".accepting-data-special-message-block").removeClass("is-visible");
    $(".accepting-data-special-message-block").removeClass("is-success");
    $(".accepting-data-special-message-block").removeClass("is-error");
    $(".redirect-error").removeClass("is-visible");
    $(".redirect-error").removeClass("is-success");
    $(".redirect-error").removeClass("is-error");
    $('.accept-data-error-msg').removeClass("with-error");
    $(".container-for-modal.permission-error").removeClass("is-active");
    $('.permission-error .accept-data-error-msg').removeClass("with-error");
      $('.permission-error .accept-data-error-msg').removeClass("with-error");
    $("body").attr("style", "");
  }

  function removeErrors() {
    $(".is-with-error-field").removeClass("is-with-error-field");
  };

  return {
    showMessage: showMessage,
    hideMessage: hideMessage,
    removeErrors: removeErrors
  };

}());
