var assignmentsModule = (function() {
  //
  // selectors that receive or are involved to some functional
  //

  //
  // selectors for binding events
  //

  // tabs switchers elements
  var tabsSwitchersMainCont = ".assign-tabs-switchers-cont";
  var tabsSwitcherShared = ".assign-tabs-switcher";
  var tabsSwitcherAllJobs = ".assign-tabs-switcher.to-all-jobs";
  var tabsSwitcherDiscussions = ".assign-tabs-switcher.to-discussions";
  var tabsSwitcherConfirmed = ".assign-tabs-switcher.to-confirmed-jobs";
  var tabsSwitcherCounter = ".assign-tabs-switcher-counter";

  // filters elements
  var filtersCont = ".assign-filters-cont";
  var filterSwitcherShared = ".assign-filters-switcher";
  var filterSwitcherDay = ".assign-filters-switcher.by-day";
  var filterSwitcherWeek = ".assign-filters-switcher.by-week";
  var filterSwitcherMonth = ".assign-filters-switcher.by-month";
  var filterSelectInput = ".js-jobs-filter-input";
  var filterSelectListItem = ".assign-filter-by-select .custom-select-list-item";
  var filterRadioLabels = '[data-radio-name="assign-mobile-filter"]';
  var filterRadioVideo = "#assign-filter-by-video";
  var filterRadioPhone = "#assign-filter-by-phone";
  var filterRadioMeeting = "#assign-filter-by-meeting";
  var filterRadioHub = "#assign-filter-by-hub";
  var filterRadioAll = "#assign-filter-by-all";
  var oneMobileFilterChoiceCont = ".assign-mobile-filter-choice";
  var mobileFilterBtn = ".assign-mobile-filters-btn";

  // other functional elements
  var previousJobsBtn = ".assign-show-all-jobs-btn";
  var onePointExpander = ".assign-one-point-title";



  //
  // classes for creating proper elements
  //
  var mainContentContClass = "assign-content-main-cont";
  var onePointContClass = "assign-one-point-cont";
  var onePointClosedStateClass = "is-closed";
  var jobsTableClass = "assign-job-info-table";



  //
  // example elements
  //
  var titleExampleElement = ".assign-one-point-title.is-example";
  var headerRowExampleElement = ".assign-job-info-row.header-row.is-example";
  var oneJobRowExampleElement = ".assign-job-info-row.job-row.is-example";
  var noAllExample = ".no-assignments-cont.is-all";
  var noDiscussionsExample = ".no-assignments-cont.is-discussions";
  var noConfirmedExample = ".no-assignments-cont.is-confirmed";
  var exampleClass = "is-example";



  //
  // elements for putting data
  //

  // putting data to title
  var titleMainText = ".assign-one-point-title-main-text";
  var titleSmallerText = ".assign-one-point-title-smaller-text";
  var titleCounter = ".assign-one-point-title-counter";

  // putting data to one job
  var jobDateCol = ".assign-job-info-col.date-col";
  var jobTimeCol = ".assign-job-info-col.time-col";
  var jobTypeCol = ".assign-job-info-col.type-col";
  var jobDurationCol = ".assign-job-info-col.duration-col";
  var jobSubjectCol = ".assign-job-info-col.subject-col";
  var jobLangFrom = ".assign-job-info-lang-from";
  var jobLangTo = ".assign-job-info-lang-to";
  var jobStatus = ".assign-job-info-status";
  var jobNewMsgsCount = ".assign-job-info-msgs-count";


  // selectors for binding events
  var onePointExpander = ".assign-one-point-title";
  var mainContentContElement = "assign-content-main-cont";
  var onePointContElement = ".assign-one-point-cont";

  //
  // clone elements
  //
  var titleClone;
  var headerRowClone;
  var oneJobRowClone;
  var noAllClone;
  var noDiscussionsClone;
  var noConfirmedClone;

  //
  // current day values
  //
  var currentDayStart;
  var currentWeekNumber;
  var currentMonthNumber;

  //
  // other elements
  //
  var currentTab = "all"; //current opened tab (this status affects the rendering functions)
  var currentDevision = "week";
  var appendAfter = ".assign-filters-cont"; // append content after this element
  var mainContentContElement = "." + mainContentContClass; // content cont that should be removed before new rendering
  var showAllJobs;
  var showConfirmed;
  var currentFilter;
  var jobsData = [];
  
  // job types classes
  var videoType = "video-type";
  var phoneType = "phone-type";
  var meetingType = "meeting-type";
  var hubType = "hub-type";

  //
  // functions
  //
  function getJobsData(){
      $.ajax({
          url: '/find_assigments',
          type: "get",
          dataType: 'json',
          contentType: 'application/json',
          success: function(response) {
              jobsData = JSON.parse(response.data);
              renderJobs(jobsData);
              setActiveDiscussionsCounter();
          },
          error: function(response) {
            var main_error = response.responseJSON.message;
            if (main_error) {
              showErrorsModule.showMessage([main_error], "main-error");
            }
          }
      });
  };

  function setActiveDiscussionsCounter() {
    var counter = 0;
    var newJobsData = jobsData;

    // if (!showAllJobs) {
    //   newJobsData = jobsData.filter(function(obj) {
    //     var objDate = new Date(obj.system_date);
    //     return currentDayStart.getTime() <= objDate.getTime();
    //   });
    // };

    for (var i = 0, lim = newJobsData.length; i < lim; i += 1) {
      if (newJobsData[i].msgs_count) {
        counter += 1;
      };
    };

    if (counter) {
      $(tabsSwitcherCounter).addClass("is-visible");
      $(tabsSwitcherCounter).html(counter);
    };
  };

  function mobileLayoutBehaviourHandler() {
    if ($(window).width() < 501) {
      if ($(this).parents(onePointContElement).hasClass(onePointClosedStateClass)) {
        $(onePointContElement).addClass(onePointClosedStateClass);
        $(this).parents(onePointContElement).removeClass(onePointClosedStateClass);
      } else {
        $(onePointContElement).addClass(onePointClosedStateClass);
      };
    };
  };

  // clone blocks for using it in future rendering
  function cloneBlocks() {
    titleClone = $(titleExampleElement).clone(true);
    headerRowClone = $(headerRowExampleElement).clone(true);
    oneJobRowClone = $(oneJobRowExampleElement).clone(true);
    noAllClone = $(noAllExample).clone(true);
    noDiscussionsClone = $(noDiscussionsExample).clone(true);
    noConfirmedClone = $(noConfirmedExample).clone(true);

    $(titleExampleElement).remove();
    $(headerRowExampleElement).remove();
    $(oneJobRowExampleElement).remove();
    $(noAllExample).remove();
    $(noDiscussionsExample).remove();
    $(noConfirmedExample).remove();

    titleClone.removeClass(exampleClass);
    headerRowClone.removeClass(exampleClass);
    oneJobRowClone.removeClass(exampleClass);
    noAllClone.removeClass(exampleClass);
    noDiscussionsClone.removeClass(exampleClass);
    noConfirmedClone.removeClass(exampleClass);
  };

  function switchMobileFiltersCont() {
    $(filtersCont).toggleClass("is-closed-mobile-filters");
  };

  function changeFilterBySelect() {
    var csValue = $(this).parent().find(".custom-select-value");

    switch (Number($(this).val())) {
      case 0:
        currentFilter = 0;
        csValue.attr("class", "");
        csValue.addClass("custom-select-value");
        csValue.addClass("is-video");
        safelyChangeMobileFilter();
        break;
      case 1:
        currentFilter = 1;
        csValue.attr("class", "");
        csValue.addClass("custom-select-value");
        csValue.addClass("is-phone");
        safelyChangeMobileFilter();
        break;
      case 2:
        currentFilter = 2;
        csValue.attr("class", "");
        csValue.addClass("custom-select-value");
        csValue.addClass("is-meeting");
        safelyChangeMobileFilter();
        break;
      case 3:
        currentFilter = 3;
        csValue.attr("class", "");
        csValue.addClass("custom-select-value");
        csValue.addClass("is-hub");
        safelyChangeMobileFilter();
        break;
      case 4:
        currentFilter = 4;
        csValue.attr("class", "");
        csValue.addClass("custom-select-value");
        csValue.addClass("is-all");
        safelyChangeMobileFilter();
        break;
    }

    renderJobs(jobsData);
  };

  function changeFilterByRadio() {
    switch (Number($(this).attr("data-filter-type"))) {
      case 0:
        currentFilter = 0;
        safelyChangeDesktopFilter();
        break;
      case 1:
        currentFilter = 1;
        safelyChangeDesktopFilter();
        break;
      case 2:
        currentFilter = 2;
        safelyChangeDesktopFilter();
        break;
      case 3:
        currentFilter = 3;
        safelyChangeDesktopFilter();
        break;
      case 4:
        currentFilter = 4;
        safelyChangeDesktopFilter();
        break;
    };

    renderJobs(jobsData);
  };

  function safelyChangeDesktopFilter() {
    var csValue = $(".assign-filter-by-select").find(".custom-select-value");

    switch (currentFilter) {
      case 0:
        csValue.attr("class", "");
        csValue.addClass("custom-select-value");
        csValue.addClass("is-video");
        csValue.html(window.__("Video"));
        break;
      case 1:
        csValue.attr("class", "");
        csValue.addClass("custom-select-value");
        csValue.addClass("is-phone");
        csValue.html(window.__("Phone"));
        break;
      case 2:
        csValue.attr("class", "");
        csValue.addClass("custom-select-value");
        csValue.addClass("is-meeting");
        csValue.html(window.__("In person"));
        break;
      case 3:
        csValue.attr("class", "");
        csValue.addClass("custom-select-value");
        csValue.addClass("is-hub");
        csValue.html(window.__("Hub"));
        break;
      case 4:
        csValue.attr("class", "");
        csValue.addClass("custom-select-value");
        csValue.addClass("is-all");
        csValue.html(window.__("All"));
        break;
    };
  };

  function safelyChangeMobileFilter() {
    switch (currentFilter) {
      case 0:
        $(filterRadioVideo).get()[0].checked = true;
        $(filterRadioPhone).get()[0].checked = false;
        $(filterRadioMeeting).get()[0].checked = false;
        $(filterRadioHub).get()[0].checked = false;
        $(filterRadioAll).get()[0].checked = false;
        $('[data-radio-name="assign-mobile-filter"]').removeClass("is-checked");
        $("[for='" + $(filterRadioVideo).attr("id") + "']").addClass("is-checked");
        break;
      case 1:
        $(filterRadioVideo).get()[0].checked = false;
        $(filterRadioPhone).get()[0].checked = true;
        $(filterRadioMeeting).get()[0].checked = false;
        $(filterRadioHub).get()[0].checked = false;
        $(filterRadioAll).get()[0].checked = false;
        $('[data-radio-name="assign-mobile-filter"]').removeClass("is-checked");
        $("[for='" + $(filterRadioPhone).attr("id") + "']").addClass("is-checked");
        break;
      case 2:
        $(filterRadioVideo).get()[0].checked = false;
        $(filterRadioPhone).get()[0].checked = false;
        $(filterRadioMeeting).get()[0].checked = true;
        $(filterRadioHub).get()[0].checked = false;
        $(filterRadioAll).get()[0].checked = false;
        $('[data-radio-name="assign-mobile-filter"]').removeClass("is-checked");
        $("[for='" + $(filterRadioMeeting).attr("id") + "']").addClass("is-checked");
        break;
      case 3:
        $(filterRadioVideo).get()[0].checked = false;
        $(filterRadioPhone).get()[0].checked = false;
        $(filterRadioMeeting).get()[0].checked = false;
        $(filterRadioHub).get()[0].checked = true;
        $(filterRadioAll).get()[0].checked = false;
        $('[data-radio-name="assign-mobile-filter"]').removeClass("is-checked");
        $("[for='" + $(filterRadioHub).attr("id") + "']").addClass("is-checked");
        break;
      case 4:
        $(filterRadioVideo).get()[0].checked = false;
        $(filterRadioPhone).get()[0].checked = false;
        $(filterRadioMeeting).get()[0].checked = true;
        $(filterRadioHub).get()[0].checked = false;
        $(filterRadioAll).get()[0].checked = true;
        $('[data-radio-name="assign-mobile-filter"]').removeClass("is-checked");
        $("[for='" + $(filterRadioAll).attr("id") + "']").addClass("is-checked");
        break;
    };
  };

  function handleClickByMobileChoiceCont() {
    $(this).find(filterRadioLabels).trigger("click");
  }

  function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(+d);
    d.setHours(0,0,0);
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setDate(d.getDate() + 4 - (d.getDay()||7));
    // Get first day of year
    var yearStart = new Date(d.getFullYear(),0,1);
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    // Return array of year and week number
    return [d.getFullYear(), weekNo];
  };

  function setCurrentDayValues() {
    var atThisMoment = new Date();
    currentDayStart = new Date(atThisMoment.getFullYear(), atThisMoment.getMonth(), atThisMoment.getDate());
    currentWeekNumber = getWeekNumber(currentDayStart)[1];
    currentMonthNumber = currentDayStart.getMonth();
  };

  function switchTimePeriodIndicator() {
    showAllJobs ? showAllJobs = false : showAllJobs = true;

    renderJobs(jobsData);
    setActiveDiscussionsCounter();

    $(this).toggleClass("is-to-prev");
    $(this).html() === window.__("Expired") ? $(this).html(window.__("Future")) : $(this).html(window.__("Expired"));
  };

  function switchDeviderFilter() {
    $(filterSwitcherShared).removeClass("is-active");
    $(filterSwitcherShared).attr("tabindex", "");

    if ($(this).is($(filterSwitcherDay))) {
      $(this).addClass("is-active");
      $(this).attr("tabindex", "-1");
      currentDevision = "day";
      renderJobs(jobsData);
    } else if ($(this).is($(filterSwitcherWeek))) {
      $(this).addClass("is-active");
      $(this).attr("tabindex", "-1");
      currentDevision = "week";
      renderJobs(jobsData);
    } else if ($(this).is($(filterSwitcherMonth))) {
      $(this).addClass("is-active");
      $(this).attr("tabindex", "-1");
      currentDevision = "month";
      renderJobs(jobsData);
    };
  };

  function switchTabs() {
    $(tabsSwitcherShared).removeClass("is-active");
    $(tabsSwitcherShared).attr("tabindex", "");

    if ($(this).is($(tabsSwitcherAllJobs))) {
      $(this).addClass("is-active");
      $(this).attr("tabindex", "-1");      currentTab = "all";
      showConfirmed = false;
      $(filtersCont).removeClass("is-discussions");
      renderJobs(jobsData);
    } else if ($(this).is($(tabsSwitcherDiscussions))) {
      $(this).addClass("is-active");
      $(this).attr("tabindex", "-1");
      currentTab = "discussions";
      showConfirmed = false;
      $(filtersCont).addClass("is-discussions");
      renderJobs(jobsData);
    } else if ($(this).is($(tabsSwitcherConfirmed))) {
      $(this).addClass("is-active");
      $(this).attr("tabindex", "-1");
      currentTab = "confirm";
      showConfirmed = true;
      $(filtersCont).removeClass("is-discussions");
      renderJobs(jobsData);
    };
  };

  // make and return main content element
  function makeContentCont() {
    var resultElement = $("<div></div>");
    resultElement.addClass(mainContentContClass);

    return resultElement;
  };

  function createDevidedPoints(dataArray, titleObj) {
    var onePointElement = $("<div></div>");
    var titleCloneClone = titleClone.clone(true);
    var array = dataArray;
    onePointElement.addClass(onePointContClass);
    onePointElement.addClass(onePointClosedStateClass);

    titleCloneClone.find(titleMainText).html(titleObj.main_text);
    titleCloneClone.find(titleSmallerText).html(titleObj.smaller_text);
    dataArray.length > 9 ? titleCloneClone.find(titleCounter).html(dataArray.length) : titleCloneClone.find(titleCounter).html("0" + dataArray.length);
    titleCloneClone.on("click",mobileLayoutBehaviourHandler);
    onePointElement.append(titleCloneClone);
    onePointElement.append(createDataTable(array));

    return onePointElement;
  };

  function createDataTable(data) {
    $(".no-assignments-cont").remove();
    
    if (currentTab === "discussions") {
      switch (currentFilter) {
        case 0:
          data = data.filter(function(obj) {
            return obj.type === currentFilter;
          });
          break;
        case 1:
          data = data.filter(function(obj) {
            return obj.type === currentFilter;
          });
          break;
        case 2:
          data = data.filter(function(obj) {
            return obj.type === currentFilter;
          });
          break;
        case 3:
          data = data.filter(function(obj) {
            return obj.type === currentFilter;
          });
          break;
        case 4:
          data = data.filter(function(obj) {
            return true;
          });
          break;
      };
    }

    var oneTableElement = $("<div></div>");
    var headerRowCloneClone = headerRowClone.clone(true);
    var oneJobRowCloneClone = oneJobRowClone.clone(true);

    oneTableElement.addClass(jobsTableClass);
    oneTableElement.append(headerRowCloneClone);

    for (var i = 0, lim = data.length; i < lim; i += 1) {
      var appendedElem = oneJobRowCloneClone.clone(true);
      var tempObj = data[i];

      appendedElem.attr("href", tempObj.link);
      appendedElem.find(jobDateCol).html(tempObj.date);
      appendedElem.find(jobTimeCol).html(tempObj.time);
      appendedElem.find(jobDurationCol).html(tempObj.duration);
      appendedElem.find(jobSubjectCol).text(tempObj.subject);
      appendedElem.find(jobLangFrom).html(tempObj.lang_from);
      appendedElem.find(jobLangTo).html(tempObj.lang_to);
      tempObj.status ? appendedElem.find(jobStatus).html(tempObj.status) : appendedElem.find(jobStatus).html(window.__("No inquiry"));
      if (tempObj.msgs_count && !(tempObj.status.toLowerCase() === 'awarded')) {
          appendedElem.find(jobNewMsgsCount).html(" (" + tempObj.msgs_count + ")");
      } else {
          appendedElem.find(jobNewMsgsCount).html("");
      }

      switch (tempObj.type) {
        case 0:
          appendedElem.addClass(videoType);
          break
        case 1:
          appendedElem.addClass(phoneType);
          break
        case 2:
          appendedElem.addClass(meetingType);
          break
        case 3:
          appendedElem.addClass(hubType);
          break
      };

      if (tempObj.status === window.__("Awarded") || tempObj.status === window.__("Applied")) {
        appendedElem.addClass("is-green-text"); 
      } else if (tempObj.status === window.__("Inquiry")) {
        appendedElem.addClass("is-yellow-text");
      } else if (tempObj.status === window.__("Declined")) {
        appendedElem.addClass("is-default-text");
      }

      if (tempObj.msgs_count && currentTab === "discussions") {
        appendedElem.addClass("is-unread-row");
      }

      oneTableElement.append(appendedElem);
    }

    return oneTableElement;
  };

  function formDateRangeForWeek(date) {
    var monthName = new Array(12);
    monthName[0] = window.__("January");
    monthName[1] = window.__("February");
    monthName[2] = window.__("March");
    monthName[3] = window.__("April");
    monthName[4] = window.__("May");
    monthName[5] = window.__("June");
    monthName[6] = window.__("July");
    monthName[7] = window.__("August");
    monthName[8] = window.__("September");
    monthName[9] = window.__("October");
    monthName[10] = window.__("November");
    monthName[11] = window.__("December");
    // create array to hold number of days in each month
    var daysInMonthArr = new Array(12);
    daysInMonthArr[0] = 31; // January
    daysInMonthArr[1] = leapYear(date.getFullYear()) ? 29 : 28;// February
    daysInMonthArr[2] = 31; // March
    daysInMonthArr[3] = 30; // April
    daysInMonthArr[4] = 31; // May
    daysInMonthArr[5] = 30; // June
    daysInMonthArr[6] = 31; // July
    daysInMonthArr[7] = 31; // August
    daysInMonthArr[8] = 30; // September
    daysInMonthArr[9] = 31; // October
    daysInMonthArr[10] = 30; // November
    daysInMonthArr[11] = 31; // December
    var diff = date.getDate() - date.getDay();
    var finalText = "";
    var daysInCurrentMonth = daysInMonthArr[date.getMonth()];

    function leapYear(year) {
      if (year % 4 == 0) { // basic rule
        return true; // is leap year
      };
      return false; // is not leap year
    };

    if (diff > 0) {
      var startDateOfWeek = date.getDate() - (date.getDay() - 1);

      finalText += monthName[date.getMonth()] + " " + startDateOfWeek + " - ";

      if ((startDateOfWeek + 6) > daysInCurrentMonth) {
        var nextMonthDate = new Date(date.getFullYear(), date.getMonth(), (startDateOfWeek + 6));
        finalText += monthName[nextMonthDate.getMonth()] + " " + nextMonthDate.getDate();
      } else {
        finalText += startDateOfWeek + 6;
      };

      return finalText;
    } else {
      var prevMonthDate = new Date(date.getTime() + (86400000 * diff));
      var secondValueDate = new Date(prevMonthDate.getFullYear(), prevMonthDate.getMonth(), (prevMonthDate.getDate() + 6));

      finalText += monthName[prevMonthDate.getMonth()] + " " + prevMonthDate.getDate() + " - " + monthName[secondValueDate.getMonth()] + " " + secondValueDate.getDate();

      return finalText;
    };
  };

  function formDateRangeForMonth(date) {
    var dayName = new Array(7);
    dayName[0] = window.__("Sunday");
    dayName[1] = window.__("Monday");
    dayName[2] = window.__("Tuesday");
    dayName[3] = window.__("Wednesday");
    dayName[4] = window.__("Thursday");
    dayName[5] = window.__("Friday");
    dayName[6] = window.__("Saturday");
    // create array to hold number of days in each month
    var daysInMonthArr = new Array(12);
    daysInMonthArr[0] = 31; // January
    daysInMonthArr[1] = leapYear(date.getFullYear()) ? 29 : 28;// February
    daysInMonthArr[2] = 31; // March
    daysInMonthArr[3] = 30; // April
    daysInMonthArr[4] = 31; // May
    daysInMonthArr[5] = 30; // June
    daysInMonthArr[6] = 31; // July
    daysInMonthArr[7] = 31; // August
    daysInMonthArr[8] = 30; // September
    daysInMonthArr[9] = 31; // October
    daysInMonthArr[10] = 30; // November
    daysInMonthArr[11] = 31; // December
    var daysInCurrentMonth = daysInMonthArr[date.getMonth()];
    var firstDayDate = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDayDate = new Date(date.getFullYear(), date.getMonth(), daysInCurrentMonth);

    function leapYear(year) {
      if (year % 4 == 0) { // basic rule
        return true; // is leap year
      };
      return false; // is not leap year
    };

    return dayName[firstDayDate.getDay()].slice(0, 3) + " 01 - " + dayName[lastDayDate.getDay()].slice(0, 3) + " " + daysInCurrentMonth;
  }

  function formWeekObject(array) {
    var jobsArray = array;

    if (!showAllJobs) {
      jobsArray = jobsArray.filter(function(obj) {
        var objDate = new Date(obj.system_date);
        return currentDayStart.getTime() <= objDate.getTime();
      });
    };

    if (showConfirmed) {
      jobsArray = jobsArray.filter(function(obj) {
        return obj.status === window.__("Awarded");
      });
    };

    switch (currentFilter) {
      case 0:
        jobsArray = jobsArray.filter(function(obj) {
          return obj.type === currentFilter;
        });
        break;
      case 1:
        jobsArray = jobsArray.filter(function(obj) {
          return obj.type === currentFilter;
        });
        break;
      case 2:
        jobsArray = jobsArray.filter(function(obj) {
          return obj.type === currentFilter;
        });
        break;
      case 3:
        jobsArray = jobsArray.filter(function(obj) {
          return obj.type === currentFilter;
        });
        break;
      case 4:
        jobsArray = jobsArray.filter(function(obj) {
          return true;
        });
        break;
    };
    
    jobsArray.sort(function(a, b) {
      var first = new Date(a.system_date);
      var second = new Date(b.system_date);
      if (first.getTime() > second.getTime()) {
        return 1; 
      } else if (first.getTime() < second.getTime()) {
        return -1;
      } else {
        return 0;
      };
    });

    var result = [];

    function countLastWeekNumber(date) {
      var decLastWeekDate = 31;
      var currentYear = date.getFullYear();
      var neededDate = new Date(currentYear, 11, decLastWeekDate);
      var finalWeekNumber = getWeekNumber(neededDate)[1];

        do {
          if (finalWeekNumber === 1) { 
            decLastWeekDate -= 1;
            neededDate = new Date(currentYear, 11, decLastWeekDate);
            finalWeekNumber = getWeekNumber(neededDate)[1];
          } else {
            return finalWeekNumber;
          };
        } while (finalWeekNumber === 1)

        return finalWeekNumber;
    };

    if (jobsArray.length) {
      var firstJobDate = new Date(jobsArray[0].system_date);
      var fromCurrentWeekCounter = getWeekNumber(firstJobDate)[1];
      var weeksLimit = countLastWeekNumber(firstJobDate);
      var globalCounter = 0;
      var finish = jobsArray.length;
      var infLoopPreventer = 0;

      while (globalCounter < finish) {
        var currentIterationJobsDate = new Date(jobsArray[globalCounter].system_date);
        if (getWeekNumber(currentIterationJobsDate)[1] === fromCurrentWeekCounter) {
          var tempObj = {};
          tempObj.week = fromCurrentWeekCounter;
          tempObj.period = "";
          tempObj.jobs = [];
          while (true) {
            var dateForCurrentJob = new Date(jobsArray[globalCounter].system_date);
            if (!tempObj.period) {
              tempObj.period = formDateRangeForWeek(dateForCurrentJob);
            };
            if (getWeekNumber(dateForCurrentJob)[1] === fromCurrentWeekCounter && globalCounter < finish) {
              tempObj.jobs.push(jobsArray[globalCounter]);
              globalCounter += 1;
              if (globalCounter === finish) {
                break;
              }
            } else {
              break;
            };
          };
          result.push(tempObj);
          fromCurrentWeekCounter += 1;
          infLoopPreventer += 1;
          if (infLoopPreventer > 5000) {
            break;
          };
        } else {
          fromCurrentWeekCounter += 1;
          if (fromCurrentWeekCounter > weeksLimit) {
            weeksLimit = countLastWeekNumber(currentIterationJobsDate);
            fromCurrentWeekCounter = 1;
          };
        };
      };
    };

    return result;
  };

  function formDayObject(array) {
    var dayName = new Array(7);
    dayName[0] = window.__("Sunday");
    dayName[1] = window.__("Monday");
    dayName[2] = window.__("Tuesday");
    dayName[3] = window.__("Wednesday");
    dayName[4] = window.__("Thursday");
    dayName[5] = window.__("Friday");
    dayName[6] = window.__("Saturday");
    var monthName = new Array(12);
    monthName[0] = window.__("January");
    monthName[1] = window.__("February");
    monthName[2] = window.__("March");
    monthName[3] = window.__("April");
    monthName[4] = window.__("May");
    monthName[5] = window.__("June");
    monthName[6] = window.__("July");
    monthName[7] = window.__("August");
    monthName[8] = window.__("September");
    monthName[9] = window.__("October");
    monthName[10] = window.__("November");
    monthName[11] = window.__("December");
    var jobsArray = array;
    
    if (!showAllJobs) {
      jobsArray = jobsArray.filter(function(obj) {
        var objDate = new Date(obj.system_date);
        return currentDayStart.getTime() <= objDate.getTime();
      });
    };

    if (showConfirmed) {
      jobsArray = jobsArray.filter(function(obj) {
        return obj.status === window.__("Awarded");
      });
    };

    switch (currentFilter) {
      case 0:
        jobsArray = jobsArray.filter(function(obj) {
          return obj.type === currentFilter;
        });
        break;
      case 1:
        jobsArray = jobsArray.filter(function(obj) {
          return obj.type === currentFilter;
        });
        break;
      case 2:
        jobsArray = jobsArray.filter(function(obj) {
          return obj.type === currentFilter;
        });
        break;
      case 2:
        jobsArray = jobsArray.filter(function(obj) {
          return obj.type === currentFilter;
        });
        break;
      case 3:
        jobsArray = jobsArray.filter(function(obj) {
          return true;
        });
        break;
    };

    var result = [];
    var globalCounter = 0;
    var finish = jobsArray.length;
    var infLoopPreventer = 0;

    jobsArray.sort(function(a, b) {
      var first = new Date(a.system_date);
      var second = new Date(b.system_date);
      if (first.getTime() > second.getTime()) {
        return 1; 
      } else if (first.getTime() < second.getTime()) {
        return -1;
      } else {
        return 0;
      };
    });

    while (globalCounter < finish) {
      var tempObj = {};
      var currentJobsDate = new Date(jobsArray[globalCounter].system_date);
      tempObj.date = currentJobsDate.getDate() + " " + monthName[currentJobsDate.getMonth()];
      tempObj.dayName = dayName[currentJobsDate.getDay()];
      tempObj.jobs = [];
      while (true) {
        var dateForCurrentJob = new Date(jobsArray[globalCounter].system_date);
        if (currentJobsDate.getDate() === dateForCurrentJob.getDate() &&  currentJobsDate.getMonth() === dateForCurrentJob.getMonth() && globalCounter < finish) {
          tempObj.jobs.push(jobsArray[globalCounter]);
          globalCounter += 1;
          if (globalCounter === finish) {
            break;
          };
        } else {
          break;
        };
      };
      result.push(tempObj);
      infLoopPreventer += 1;
      if (infLoopPreventer > 5000) {
        break;
      };
    };

    return result;
  };

  function formMonthObject(array) {
    var monthName = new Array(12);
    monthName[0] = window.__("January");
    monthName[1] = window.__("February");
    monthName[2] = window.__("March");
    monthName[3] = window.__("April");
    monthName[4] = window.__("May");
    monthName[5] = window.__("June");
    monthName[6] = window.__("July");
    monthName[7] = window.__("August");
    monthName[8] = window.__("September");
    monthName[9] = window.__("October");
    monthName[10] = window.__("November");
    monthName[11] = window.__("December");
    var jobsArray = array;
    
    if (!showAllJobs) {
      jobsArray = jobsArray.filter(function(obj) {
        var objDate = new Date(obj.system_date);
        return currentDayStart.getTime() <= objDate.getTime();
      });
    };

    if (showConfirmed) {
      jobsArray = jobsArray.filter(function(obj) {
        return obj.status === window.__("Awarded");
      });
    };

    switch (currentFilter) {
      case 0:
        jobsArray = jobsArray.filter(function(obj) {
          return obj.type === currentFilter;
        });
        break;
      case 1:
        jobsArray = jobsArray.filter(function(obj) {
          return obj.type === currentFilter;
        });
        break;
      case 2:
        jobsArray = jobsArray.filter(function(obj) {
          return obj.type === currentFilter;
        });
        break;
      case 3:
        jobsArray = jobsArray.filter(function(obj) {
          return obj.type === currentFilter;
        });
        break;
      case 4:
        jobsArray = jobsArray.filter(function(obj) {
          return true;
        });
        break;
    };

    var result = [];
    var globalCounter = 0;
    var finish = jobsArray.length;
    var infLoopPreventer = 0;

    jobsArray.sort(function(a, b) {
      var first = new Date(a.system_date);
      var second = new Date(b.system_date);
      if (first.getTime() > second.getTime()) {
        return 1; 
      } else if (first.getTime() < second.getTime()) {
        return -1;
      } else {
        return 0;
      };
    });

    while (globalCounter < finish) {
      var tempObj = {};
      var currentJobsDate = new Date(jobsArray[globalCounter].system_date);
      tempObj.month = monthName[currentJobsDate.getMonth()];
      tempObj.period = formDateRangeForMonth(currentJobsDate);
      tempObj.jobs = [];
      while (true) {
        var dateForCurrentJob = new Date(jobsArray[globalCounter].system_date);
        if (currentJobsDate.getMonth() === dateForCurrentJob.getMonth() && globalCounter < finish) {
          tempObj.jobs.push(jobsArray[globalCounter]);
          globalCounter += 1;
          if (globalCounter === finish) {
            break;
          };
        } else {
          break;
        };
      };
      result.push(tempObj);
      infLoopPreventer += 1;
      if (infLoopPreventer > 5000) {
        break;
      };
    };

    return result;
  };

  function renderJobs(allData) {
    var startContentBlock = makeContentCont();
    var existingContent = $(mainContentContElement);
    var dataForRender;
    var newAllData = allData.filter(function(obj) {
        return obj.show_in_list;
      });

    if (currentTab === "all") {
      if (newAllData.length) {
        if (currentDevision === "week") {
          var dataForRender = formWeekObject(newAllData);

          for (var i = 0, lim = dataForRender.length; i < lim; i += 1) {
            var tempObj = dataForRender[i];

            startContentBlock.append(createDevidedPoints(tempObj.jobs, {
              main_text: window.__("Week ") + tempObj.week,
              smaller_text: tempObj.period,
            }));
          };

          existingContent.remove();
          if (!startContentBlock.find(".assign-job-info-row.job-row").length) {
            startContentBlock.html("");
            var emptyStateClone = noAllClone;
            $(".no-assignments-cont").remove();
            emptyStateClone.insertAfter(appendAfter);
          }
          startContentBlock.insertAfter(appendAfter);
        } else if (currentDevision === "day") {
          dataForRender = formDayObject(newAllData);

          for (var i = 0, lim = dataForRender.length; i < lim; i += 1) {
            var tempObj = dataForRender[i];

            startContentBlock.append(createDevidedPoints(tempObj.jobs, {
              main_text: tempObj.date,
              smaller_text: tempObj.dayName
            }));
          };

          existingContent.remove();
          if (!startContentBlock.find(".assign-job-info-row.job-row").length) {
            startContentBlock.html("");
            var emptyStateClone = noAllClone;
            $(".no-assignments-cont").remove();
            emptyStateClone.insertAfter(appendAfter);
          }
          startContentBlock.insertAfter(appendAfter);
        } else if (currentDevision === "month") {
          dataForRender = formMonthObject(newAllData);

          for (var i = 0, lim = dataForRender.length; i < lim; i += 1) {
            var tempObj = dataForRender[i];

            startContentBlock.append(createDevidedPoints(tempObj.jobs, {
              main_text: tempObj.month,
              smaller_text: tempObj.period
            }));
          };

          existingContent.remove();
          if (!startContentBlock.find(".assign-job-info-row.job-row").length) {
            startContentBlock.html("");
            var emptyStateClone = noAllClone;
            $(".no-assignments-cont").remove();
            emptyStateClone.insertAfter(appendAfter);
          }
          startContentBlock.insertAfter(appendAfter);
        }
      } else {
        var emptyStateClone = noAllClone;
        $(".no-assignments-cont").remove();
        emptyStateClone.insertAfter(appendAfter);
      }
    } else if (currentTab === "discussions") {
      if (allData.length) {
        dataForRender = allData;
        
        if (!showAllJobs) {
          dataForRender = allData.filter(function(obj) {
            var objDate = new Date(obj.system_date);
            return currentDayStart.getTime() <= objDate.getTime();
          });
        }

        dataForRender = dataForRender.filter(function(obj) {
          return !!obj.last_msg_system_date;
        });

        dataForRender.sort(function(a, b) {
          var first = new Date(a.last_msg_system_date);
          var second = new Date(b.last_msg_system_date);
          
          if (first.getTime() < second.getTime()) {
            return 1; 
          } else if (first.getTime() > second.getTime()) {
            return -1;
          } else {
            return 0;
          }
        });

        startContentBlock.append(createDataTable(dataForRender));
        existingContent.remove();
        if (!startContentBlock.find(".assign-job-info-row.job-row").length) {
          startContentBlock.html("");
          var emptyStateClone = noDiscussionsClone;
          $(".no-assignments-cont").remove();
          noDiscussionsClone.insertAfter(appendAfter);
        }
        startContentBlock.insertAfter(appendAfter);
      } else {
        var emptyStateClone = noDiscussionsClone;
        $(".no-assignments-cont").remove();
        noDiscussionsClone.insertAfter(appendAfter);
      }
    } else if (currentTab === "confirm") {
      if (allData.length) {
        if (currentDevision === "week") {
          var dataForRender = formWeekObject(allData);

          for (var i = 0, lim = dataForRender.length; i < lim; i += 1) {
            var tempObj = dataForRender[i];

            startContentBlock.append(createDevidedPoints(tempObj.jobs, {
              main_text: "Week " + tempObj.week,
              smaller_text: tempObj.period,
            }));
          };

          existingContent.remove();
          if (!startContentBlock.find(".assign-job-info-row.job-row").length) {
            startContentBlock.html("");
            var emptyStateClone = noConfirmedClone;
            $(".no-assignments-cont").remove();
            noConfirmedClone.insertAfter(appendAfter);
          }
          startContentBlock.insertAfter(appendAfter);
        } else if (currentDevision === "day") {
          dataForRender = formDayObject(allData);

          for (var i = 0, lim = dataForRender.length; i < lim; i += 1) {
            var tempObj = dataForRender[i];

            startContentBlock.append(createDevidedPoints(tempObj.jobs, {
              main_text: tempObj.date,
              smaller_text: tempObj.dayName
            }));
          };

          existingContent.remove();
          if (!startContentBlock.find(".assign-job-info-row.job-row").length) {
            startContentBlock.html("");
            var emptyStateClone = noConfirmedClone;
            $(".no-assignments-cont").remove();
            noConfirmedClone.insertAfter(appendAfter);
          }
          startContentBlock.insertAfter(appendAfter);
        } else if (currentDevision === "month") {
          dataForRender = formMonthObject(allData);

          for (var i = 0, lim = dataForRender.length; i < lim; i += 1) {
            var tempObj = dataForRender[i];

            startContentBlock.append(createDevidedPoints(tempObj.jobs, {
              main_text: tempObj.month,
              smaller_text: tempObj.period
            }));
          };

          existingContent.remove();
          if (!startContentBlock.find(".assign-job-info-row.job-row").length) {
            startContentBlock.html("");
            var emptyStateClone = noConfirmedClone;
            $(".no-assignments-cont").remove();
            noConfirmedClone.insertAfter(appendAfter);
          } 
          startContentBlock.insertAfter(appendAfter);
        }
      } else {
        var emptyStateClone = noConfirmedClone;
        $(".no-assignments-cont").remove();
        noConfirmedClone.insertAfter(appendAfter);
      }
    }
  }

  function initAssignmentsPage() {
    showAllJobs = false;
    showConfirmed = false;
    currentFilter = 4;
    $(tabsSwitcherShared).removeClass("is-active");

    if (window.location.hash === "#discussions") {
      currentTab = "discussions";
      $(tabsSwitcherDiscussions).addClass("is-active");
    } else if (window.location.hash === "#confirm") {
      currentTab = "confirm";
      showConfirmed = true;
      $(tabsSwitcherConfirmed).addClass("is-active");
    } else {
      currentTab = "all";
      $(tabsSwitcherAllJobs).addClass("is-active");
    }

    cloneBlocks();
    setCurrentDayValues();
    getJobsData();

    $(filtersCont).on("click", filterSwitcherShared, switchDeviderFilter);
    $(tabsSwitchersMainCont).on("click", tabsSwitcherShared, switchTabs);
    $(previousJobsBtn).on("click", switchTimePeriodIndicator);
    $(mobileFilterBtn).on("click", switchMobileFiltersCont);
    $(filterSelectInput).on("change", changeFilterBySelect);
    $(filterRadioLabels).on("click", changeFilterByRadio);
    $(oneMobileFilterChoiceCont).on("click", handleClickByMobileChoiceCont);
    // $("body").on("click", onePointExpander, mobileLayoutBehaviourHandler);
  };

  return {
    init: initAssignmentsPage
  };

}());
