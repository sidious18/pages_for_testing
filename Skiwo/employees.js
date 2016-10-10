var employeesModule = (function() {
  var employeesMainElem = ".js-employees-main-cont";

  // rendering
  var renEmployeeName = ".js-ren-employee-name";
  var renEmployeeEmail = ".js-ren-employee-email";
  var renEmployeePhone = ".js-ren-employee-phone";
  var renEmployeeAdminRight = ".js-ren-admin-right";
  var renEmployeeFinanceRight = ".js-ren-finance-right";
  var renEmployeeBookerRight = ".js-ren-booker-right";
  var renEmployeeAttenderRight = ".js-ren-attender-right";
  var renEmployeeStatus = ".js-ren-employee-status";

  // saving
  var saveEmployeeName = ".js-save-employee-name";
  var saveEmployeeSurname = ".js-save-employee-surname";
  var saveEmployeeEmail = ".js-save-employee-email";
  var saveEmployeeTelCode = ".js-save-employee-tel-code";
  var saveEmployeeTelNumber = ".js-save-employee-tel-number";
  var saveEmployeeAdminRight = ".js-save-employee-admin-right";
  var saveEmployeeFinanceRight = ".js-save-employee-finance-right";
  var saveEmployeeBookerRight = ".js-save-employee-booker-right";
  var saveEmployeeAttenderRight = ".js-save-employee-attender-right";

  // other
  var enterpriseIDElem = ".js-enterprise-id";
  var employeeRow = ".js-employee-example";
  var employeeForm = ".js-employee-form";
  var employeeDeleteBtn = ".js-remove-employee-btn";
  var employeeSaveBtn = ".js-save-employee-btn";
  var employeeAddBtn = ".js-add-employee-btn";
  var successStatusClass = "employees-table__cell--success";
  var waitingStatusClass = "employees-table__cell--waiting";
  var successStatusText = "Accepted";
  var waitingStatusText = "Waiting";
  var exampleClass = "is-example";
  var postEmployeesPath = "/enterprise/invite";
  var enterpriseId;
  var enterprisePath;
  var employeeDataArr;
  var renElemClone;
  var formElemClone;

  //
  // functions
  //
  function insertEmployeeData(elem, obj) {
    // insert text data to given element from given object
    // also attach change event to togglers
    elem.attr("data-employee-id", obj.id);
    elem.find(renEmployeeName).text(obj.name);
    elem.find(renEmployeeEmail).text(obj.email);
    elem.find(renEmployeePhone).text(obj.phone);
    elem.find(renEmployeeAdminRight).get()[0].checked = !!obj.admin;
    elem.find(renEmployeeFinanceRight).get()[0].checked = !!obj.finance;
    elem.find(renEmployeeBookerRight).get()[0].checked = !!obj.booker;
    elem.find(renEmployeeAttenderRight).get()[0].checked = !!obj.attender;

    elem.find(renEmployeeAdminRight).on("change", changeRight);
    elem.find(renEmployeeFinanceRight).on("change", changeRight);
    elem.find(renEmployeeBookerRight).on("change", changeRight);
    elem.find(renEmployeeAttenderRight).on("change", changeRight);

    if (obj.accepted) {
      elem.find(renEmployeeStatus).addClass(successStatusClass);
      elem.find(renEmployeeStatus).text(successStatusText);
      elem.attr("data-is-employee", 'employee');
    } else {
      elem.find(renEmployeeStatus).addClass(waitingStatusClass);
      elem.find(renEmployeeStatus).text(waitingStatusText);
      elem.attr("data-is-employee", 'invite');
    }
    return elem;
  }

  function renderEmployees(arr) {
    // remove all employees rows and add employee form
    // render all employees from given array 
    // insert it before add employee form btn
    var cloneClone;

    $(employeeRow).remove();
    $(employeeForm).remove();

    for (var i = 0, lim = arr.length; i < lim; i += 1) {
      cloneClone = renElemClone.clone(true);

      $(insertEmployeeData(cloneClone, arr[i])).insertBefore($(employeeAddBtn));
    }
  }

  function showEmployeesForm() {
    // simply add employee form before add employee form btn
    var cloneClone = formElemClone.clone(true);

    cloneClone.insertBefore($(employeeAddBtn));
  }

  function pullEmployeeData(enterpriseID) {
    // pull info from employee form
    // insert it into result object and return
    var res = {
      enterprise_invite: {}
    };

    var ent_inv = res.enterprise_invite;

    ent_inv.first_name = $(saveEmployeeName).val();
    ent_inv.last_name = $(saveEmployeeSurname).val();
    ent_inv.email = $(saveEmployeeEmail).val();
    ent_inv.phone_code = $(saveEmployeeTelCode).val() && $(saveEmployeeTelNumber).val() ? $(saveEmployeeTelCode).val() : "";
    ent_inv.phone_number = $(saveEmployeeTelCode).val() && $(saveEmployeeTelNumber).val() ? $(saveEmployeeTelNumber).val() : "";
    ent_inv.admin = $(saveEmployeeAdminRight).get()[0].checked;
    ent_inv.finance = $(saveEmployeeFinanceRight).get()[0].checked;
    ent_inv.attender = $(saveEmployeeAttenderRight).get()[0].checked;
    ent_inv.booker = $(saveEmployeeBookerRight).get()[0].checked;
    ent_inv.enterprise_id = enterpriseID;

    return res;
  };

  function makeNewEmployeeForData(obj) {
    // make new employee object for pushing to main data array (received from server)
    // take info from given object (information that was pulled from employee form)
    var res = {};

    res.name = obj.first_name + obj.last_name;
    res.email = obj.email;
    res.phone = obj.phone_code + obj.phone_number;
    res.admin = !!obj.admin;
    res.finance = !!obj.finance;
    res.attender = !!obj.attender;
    res.booker = !!obj.booker;
    res.accepted = false;

    return res;
  }

  function deleteEmployeeFromData(empID, arr) {
    // delete deleted employee from main employee data
    for (var i = 0, lim = arr.length; i < lim; i += 1) {
      if (+arr[i].id === +empID) {
        arr.splice(i, 1);
        break;
      }
    }
  }

  //employees INDEX
  function getEmployeesData() {
    // get employee main data from server
    // in success case we render the view
    $.ajax({
      url: enterprisePath + "/employees",
      type: "GET",
      dataType: 'json',
      success: function(response) {
        var data = response;
        employeeDataArr = data;
        renderEmployees(employeeDataArr);
      },
      error: function(response) {
        alert("Sorry! Can't load employees list at the moment.");
      }
    });
  }

  //invite CREATE
  function saveNewEmployee(e) {
    // handler for save one employee and add employee form btns
    // if user press add form btn but she has opened employee form we firstly save employee data from form
    // if data was successfuly saved we check which btn was pressed
    // if it was save btn we just push new employee object to main data and rerender the page
    // if it was add form btn we additionaly add employee form after rerendering
    showErrorsModule.hideMessage();
    if ($(employeeForm).length) {
      var entID = enterpriseId;
      var ajaxData = pullEmployeeData(entID);
      var newEmployee = makeNewEmployeeForData(ajaxData.enterprise_invite);

      $(employeeSaveBtn).addClass("in-progress");
      showErrorsModule.removeErrors();
      
      $.ajax({
        url: postEmployeesPath,
        type: "POST",
        data: JSON.stringify(ajaxData),
        dataType: 'json',
        contentType: 'application/json',
        success: function(response) {
          $(employeeSaveBtn).removeClass("in-progress");

          newEmployee.id = response.id;
          employeeDataArr.push(newEmployee);
          renderEmployees(employeeDataArr);

          if ($(e.target).is(employeeAddBtn)) {
            showEmployeesForm();
          }
        },
        error: function(response) {
          $(employeeSaveBtn).removeClass("in-progress");
          var errors = $.parseJSON(response.responseText);
          showErrorsModule.showMessage(errors, 'main-error');
        }
      });
    } else {
      showEmployeesForm();
      tabOrderModule.init();
    }
  }

  //employee UPDATE
  function changeRight(e) {
    // when user trigger toggler changing we send info to server
    // switch/case is needed for proper translations
    // we take employee id, changed role, enterprise id and send it to server
    // this process doesn't affect on view
    if ($(e.target).attr("data-role")) {
      var elem = $(e.target);

      var employeeId = $(elem).parents(employeeRow).attr("data-employee-id");
      var ajaxData = {
        enterprise_id: enterpriseId,
        changed: {
          id:   employeeId,
          employee: $(elem).parents(employeeRow).attr("data-is-employee")
         }
      };

      switch ($(elem).attr("data-role")) {
        case "admin":
          ajaxData.changed.role = "admin";
          break;
        case "finance":
          ajaxData.changed.role = "finance";
          break;
        case "booker":
          ajaxData.changed.role = "booker";
          break;
        case "attender":
          ajaxData.changed.role = "attender";
          break;
      }

      $.ajax({
        url: enterprisePath + "/employees/" + employeeId,
        type: "PATCH",
        data: JSON.stringify(ajaxData),
        dataType: 'json',
        contentType: 'application/json',
        error: function(response) {
          alert("Sorry! Can't update role at the moment.");
        }
      });
    }
  }

  //employee DELETE
  function deleteEmployee(e) {
    // handler for delete employee btn
    // we send delete action to server
    // in success case we delete deleted user from main employee data and rerender the page
    var employeeID = $(e.target).parents(employeeRow).attr("data-employee-id");
    var employeeType = $(e.target).parents(employeeRow).attr("data-is-employee");
    var deletePath = enterprisePath + "/" + employeeType + "s/" + employeeID;
    $.ajax({
      url: deletePath,
      type: "DELETE",
      dataType: 'json',
      contentType: 'application/json',
      success: function(response) {
        deleteEmployeeFromData(employeeID, employeeDataArr);
        renderEmployees(employeeDataArr);
      },
      error: function(response) {
        alert("Something went wrong with deleting");
      }
    });
  }

  function cloneElements() {
    // clone employee row and form for adding new employee
    renElemClone = $(employeeRow).clone(true);
    formElemClone = $(employeeForm).clone(true);

    $(employeeRow).remove();
    $(employeeForm).remove();

    renElemClone.removeClass(exampleClass);
    formElemClone.removeClass(exampleClass);
  }

  function initEmployeesFunction() {
    enterpriseId = $(enterpriseIDElem).val();
    enterprisePath = '/enterprises/' + enterpriseId;
    $(enterpriseIDElem).remove();
    cloneElements();
    getEmployeesData();

    $(employeesMainElem).on("click", employeeAddBtn, saveNewEmployee);
    $(employeesMainElem).on("click", employeeSaveBtn, saveNewEmployee);
    $(employeesMainElem).on("click", employeeDeleteBtn, deleteEmployee);
  }

  return {
    init: initEmployeesFunction
  };

}());
