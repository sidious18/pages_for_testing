var deviseModule = (function() {
  //
  // ajax callbacks' handlers
  //

  function initModule() {
    $("form#sign_up_user, form#sign_in_user, form#change_password, form#reset_password")
      .on("ajax:success", function(e, data, status, xhr) {
        if (data.success) {
          if (data.message) {
            showErrorsModule.showMessage(data.message, "special-success");
            setTimeout(function () {
              window.location.href = data.location;
            }, 3000);
          } else {
            setTimeout(function () {
              window.location.href = data.location;
            }, 500);
          }
        } else {
          if (data.message) {
            showErrorsModule.showMessage([main_error], "main-error");
          } else if (data.errors) {
            showErrorsModule.showMessage(data.errors, "special-error");
          }
        }
      })
      .on("ajax:error", function(e, data, status, xhr) {
        var errors = $.parseJSON(data.responseText);
        showErrorsModule.showMessage(errors, "special-error");
      });
  };

  return {
    init: initModule
  }
}());
