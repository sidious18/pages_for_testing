var wizardPreRoleModule = (function() {
  var mainWizardCont = ".js-wizard-main-cont";
  var personIDInput = ".js-current-person-id";
  var roleBtnInter = ".js-i-am-inter";
  var roleBtnBusiness = ".js-i-am-business";
  var avatarLable = ".js-chose-avatar";
  var avatarInput = ".js-upload-avatar";
  var nameInputFirst = ".js-first-name";
  var sendNameAvatarBtn = ".js-send-name-avatar";
  var personID = "";
  var choseRolePath = "/set_info";

  function roleBtnsHandler(e) {
    var roleName = $(e.target).is(roleBtnInter) || $(e.target).is(roleBtnInter + " *")? "interpreter" : "business";

    $.ajax({
      url: choseRolePath,
      type: "PATCH",
      data: JSON.stringify({person: {id: personID, role: roleName}}),
      dataType: 'json',
      contentType: 'application/json',
      success: function(response) {
        $(mainWizardCont + " *").remove();
        wizardPostRoleModule.init(response, personID);
      },
      error: function(response) {
        console.log(response);
        var main_error = response.responseJSON.message;
        if (main_error) {
          showErrorsModule.showMessage([main_error], "main-error");
        }
      }
    });
  }

  function initPreRoleWizard() {
    personID = $(personIDInput).val();
    $(personIDInput).remove();

    $(mainWizardCont).on("click", roleBtnInter, roleBtnsHandler);
    $(mainWizardCont).on("click", roleBtnBusiness, roleBtnsHandler);
  }

  return {
    init: initPreRoleWizard
  };

}());
