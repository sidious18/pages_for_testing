var flashMessagesHelper = (function() {
  function showFlashMessage() {
      $.ajax({
          url: '/flash_messages',
          type: "get",
          dataType: 'json',
          contentType: 'application/json',
          success: function(response) {
            if (response.messages && response.messages.length) {
              showErrorsModule.showMessage(response.messages, 'main-success');
            }
          }
      });
  };

  return {
    show: showFlashMessage
  };
}());
