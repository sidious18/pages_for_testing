var calendarModule = (function() {
  var year, month, businessIndicator;

  function setCurrentDate() {
    var now = new Date();
    year = now.getFullYear();
    month = now.getMonth();
    now = null;
  };

  function fillCalendarCell(elem) {
    var jobsBtn = $("<button></button>");
    var blockBtn = $("<button></button>");
    var unblockBtn = $("<button></button>");
    var dateCont = $("<span></span>");

    dateCont.addClass('calendar-date-number');
    jobsBtn.addClass("calendar-table-btn");
    blockBtn.addClass("calendar-table-btn");
    unblockBtn.addClass("calendar-table-btn");
    jobsBtn.addClass("show-jobs");
    blockBtn.addClass("block-day");
    unblockBtn.addClass("unblock-day");

    blockBtn.html(window.__('Block day'))
    unblockBtn.html(window.__('Make available'))

    elem.append(dateCont);
    elem.append(jobsBtn);

    if (!businessIndicator) {
      elem.append(blockBtn);
      elem.append(unblockBtn);
    } else {
      elem.addClass("is-unblockable");
    }
  }

  function getDays(month, year) {

    function leapYear(year) {
      if (year % 4 == 0) { // basic rule
        return true // is leap year
      }
      return false // is not leap year
    };

    // create array to hold number of days in each month
    var ar = new Array(12)
    ar[0] = 31 // January
    ar[1] = (leapYear(year)) ? 29 : 28 // February
    ar[2] = 31 // March
    ar[3] = 30 // April
    ar[4] = 31 // May
    ar[5] = 30 // June
    ar[6] = 31 // July
    ar[7] = 31 // August
    ar[8] = 30 // September
    ar[9] = 31 // October
    ar[10] = 30 // November
    ar[11] = 31 // December

    // return number of days in the specified month (parameter)
    return ar[month]
  }

  function getMonthName(month) {
    // create array to hold name of each month
    var ar = new Array(12)
    ar[0] = window.__("January")
    ar[1] = window.__("February")
    ar[2] = window.__("March")
    ar[3] = window.__("April")
    ar[4] = window.__("May")
    ar[5] = window.__("June")
    ar[6] = window.__("July")
    ar[7] = window.__("August")
    ar[8] = window.__("September")
    ar[9] = window.__("October")
    ar[10] = window.__("November")
    ar[11] = window.__("December")

    // return name of specified month (parameter)
    return ar[month]
  }

  function setCal(elem, bIndicator) {
    var indicator = true
    var dateInst = new Date(year, month, 1);
    var currentDate = new Date();
    var firstDay = dateInst.getDay() || 7;
    var lastDate = getDays(month, year)
    var digit = 1
    var prevMonthDaysCoint = 1
    var nextMonthDate = 1;
    var prevMonthDate = getDays(month - 1, year) - firstDay + 2;
    var dateInCurrentCell;

    if (month === 0) {
      prevMonthDate = getDays(11, year - 1) - firstDay + 2;
    };

    if (bIndicator) {
      businessIndicator = true;
    };

    elem.find(".calendar-table-row").remove();

    while (indicator) {
      // var currentRow = elem.find(".calendar-table-row").eq(i);
      var currentRow = $("<div></div>");
      currentRow.addClass("calendar-table-row");
      for (var j = 0; j < 7; j += 1) {
        // var currentCell = currentRow.find(".calendar-table-cell").eq(j);
        var currentCell = $("<div></div>");
        currentCell.addClass("calendar-table-cell");
        fillCalendarCell(currentCell);
        var dataAttributeDate;

        (function () {
          var gettedYear = year;
          var gettedMonth = month + 1;
          if (gettedMonth < 10) {
            gettedMonth = "0" + gettedMonth;
          }
          var day = digit;
          if (day < 10) {
            day = "0" + day;
          }

          dataAttributeDate = [gettedYear, gettedMonth, day].join("-");
        }());

        if (digit > lastDate) {
          indicator = false;
          currentCell.addClass("is-next-month-day");
          currentCell.find(".calendar-date-number").html(nextMonthDate);
          nextMonthDate += 1;
          continue
        }

        if (prevMonthDaysCoint < firstDay) {
          currentCell.addClass("is-prev-month-day");
          currentCell.find(".calendar-date-number").html(prevMonthDate);
          prevMonthDate += 1;
          prevMonthDaysCoint += 1;
        } else {
          dateInCurrentCell = new Date(year, month, digit, 23, 59);

          if (dateInCurrentCell < currentDate) {
            currentCell.addClass("is-past-day");
          }

          currentCell.attr("data-formated-date", dataAttributeDate);
          currentCell.find(".calendar-date-number").html(digit);
          digit++
        }
        currentRow.append(currentCell);
      }
      if (currentRow.find(".calendar-table-cell").length) {
        elem.append(currentRow);
      }
    }
  };

  function find_day(elem) {
    return $(elem).attr('data-formated-date');
  }

  return {
    init: setCal,

    setInitialDate: setCurrentDate,

    showNextMonth: function(elem) {
      if (month === 11) {
        month = 0;
        year += 1;
        this.init(elem);
      } else {
        month += 1;
        this.init(elem);
      }
    },

    showPrevMonth: function(elem) {
      if (month === 0) {
        month = 11;
        year -= 1;
        this.init(elem);
      } else {
        month -= 1;
        this.init(elem);
      }
    },

    setYearAndMonthName: function(yearElem, monthElem) {
      yearElem.html(year);
      monthElem.html(getMonthName(month));
    },

    showJobs: function(personId) {
      return function() {
        var id = personId;
        var day = find_day(this);

        if ($(this).is(".with-job")) {
          $(".calendar-table-cell").removeClass("is-selected");
          $(this).addClass("is-selected");
          $.get( '/people/' + id + '/retrieve_day_jobs', { date: day });
        }
      }
    },

    blockDay: function(personId) {
      return function() {
        var id = personId;
        var day = find_day($(this));
        var self = $(this)
        
        if (!$(this).is(".with-job") && !$(this).is(".is-blocked") && !$(this).is(".is-prev-month-day") && !$(this).is(".is-next-month-day") && !$(this).is(".is-past-day")) {
          $.ajax({
            url: '/people/' + id + '/schedule_events',
            type: 'POST',
            data: JSON.stringify({ schedule_event: { day: day, person_id: id }}),
            dataType: 'json',
            contentType: 'application/json',
            success: function(responce) {
              self.addClass("is-blocked");
            },
            error: function(response) {
              var main_error = response.responseJSON.message;
              if (main_error) {
                showErrorsModule.showMessage([main_error], "main-error");
              }
            }
          });
        }
      };
    },

    unblockDay: function(personId) {
      return function() {
        var id = personId;
        var day = find_day($(this));
        var self = $(this);

        if ($(this).is(".is-blocked") && !$(this).is(".is-prev-month-day") && !$(this).is(".is-next-month-day") && !$(this).is(".is-past-day")) {
          $.ajax({
            url: '/people/' + id + '/schedule_events',
            type: 'DELETE',
            data: JSON.stringify({ schedule_event: { day: day, person_id: id }}),
            dataType: 'json',
            contentType: 'application/json',
            success: function(response) {
              self.removeClass("is-blocked");
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
    },

    mobileHandlingLogic: function(personId) {
      return function() {
        var id = personId;
        var day = find_day($(this));
        var parent = $(this).parent();

        if ($(window).width() < 600 && !$(this).parent().hasClass("with-job") && !businessIndicator) {
          if ($(this).parent().hasClass("is-blocked")) {
            $.ajax({
              url: '/people/' + id + '/schedule_events',
              type: 'DELETE',
              data: JSON.stringify({ schedule_event: { day: day, person_id: id }}),
              dataType: 'json',
              contentType: 'application/json',
              success: function(response) {
                parent.removeClass("is-blocked");
              },
              error: function(response) {
                var main_error = response.responseJSON.message;
                if (main_error) {
                  showErrorsModule.showMessage([main_error], "main-error");
                }
              }
            });
          } else {
            $.ajax({
              url: '/people/' + id + '/schedule_events',
              type: 'POST',
              data: JSON.stringify({ schedule_event: { day: day, person_id: id }}),
              dataType: 'json',
              contentType: 'application/json',
              success: function(responce) {
                parent.addClass("is-blocked");
              },
              error: function(response) {
                var main_error = response.responseJSON.message;
                if (main_error) {
                  showErrorsModule.showMessage([main_error], "main-error");
                }
              }
            });
          }
        } else if ($(window).width() < 600 && $(this).parent().hasClass("with-job")) {
          $(".calendar-table-cell").removeClass("is-selected");
          $(this).parent().addClass("is-selected");
          $.get( '/people/' + id + '/retrieve_day_jobs', { date: day });
        }
      }
    },

    showDaysStatus: function(personId) {
      var id = personId;
      var strDate = year + "-" + (month + 1) + "-01";

      $.ajax({
        url: '/people/' + id + '/retrieve_calendar_info',
        type: 'GET',
        data: { date: strDate },
        dataType: 'json',
        contentType: 'application/json',
        success: function(responce) {
          for (var date in responce) {
            var cell = $('[data-formated-date=' + date + "]");
            if (responce[date] == 'busy') {
              cell.addClass("is-blocked");
            } else {
              cell.find('.show-jobs').html(responce[date])
              cell.addClass("with-job");
            }
          };
        }
      });
    }
  };

}()); // end of calendarModule

var calendarPageModule = (function() {
  //
  // selectors that receive or are involved to some functional
  //
  var calendarWrapper = '.calendar-wrapper';
  var mainCalendarCont = ".calendar-main-calendar-cont";
  var yearInHeader = ".calendar-year";
  var monthInHeader = ".calendar-month-name";
  var userId;

  // selectors for binding events
  var calendarCell = ".calendar-table-cell";
  var prevMonthArrow = ".calendar-to-pre-month";
  var nextMonthArrow = ".calendar-to-next-month";
  var prevMonthDay = ".is-prev-month-day";
  var nextMonthDay = ".is-next-month-day";
  var jobsBtn = ".calendar-table-btn.show-jobs";
  var blockDayBtn = ".calendar-table-btn.block-day";
  var unblockDayBtn = ".calendar-table-btn.unblock-day";
  var dateNumber = ".calendar-date-number";
  var indicator;

  //
  // functions
  //
  function toPreviousMonth(elem) {
    var element = elem;

    return function() {
      calendarModule.showPrevMonth(element);
      calendarModule.showDaysStatus(userId);
      calendarModule.setYearAndMonthName($(yearInHeader), $(monthInHeader));
      makeSquaresizedCalendar();
    }
  }

  function toNextMonth(elem) {
    var element = elem;

    return function() {
      calendarModule.showNextMonth(element);
      calendarModule.showDaysStatus(userId);
      calendarModule.setYearAndMonthName($(yearInHeader), $(monthInHeader));
      makeSquaresizedCalendar();
    }
  }

  function makeSquaresizedCalendar() {
    if ($(mainCalendarCont).length) {
      $(mainCalendarCont).css("height", "auto");
      var computedWidth = parseInt(window.getComputedStyle($(mainCalendarCont).get()[0]).width);
      $(mainCalendarCont).css("height", (computedWidth/1.47 - 60) + "px");
    }
  }

  function initCalendarPage(elem) {
    userId = $(calendarWrapper).attr('data-person');
    $(calendarWrapper).removeAttr('data-person');
    if ($("#business-indicator").length) {
      indicator = true;
    }
    
    makeSquaresizedCalendar();
    calendarModule.setInitialDate();
    calendarModule.init(elem, indicator);
    calendarModule.showDaysStatus(userId);
    calendarModule.setYearAndMonthName($(yearInHeader), $(monthInHeader));

    // register handlers
    $(calendarWrapper).on("click", calendarCell, calendarModule.showJobs(userId));
    $(calendarWrapper).on("click", dateNumber, calendarModule.mobileHandlingLogic(userId));
    $(prevMonthArrow).on("click", toPreviousMonth(elem));
    $(calendarWrapper).on("click", prevMonthDay, toPreviousMonth(elem));
    $(nextMonthArrow).on("click", toNextMonth(elem));
    $(calendarWrapper).on("click", nextMonthDay, toNextMonth(elem));
    $(window).on("resize", makeSquaresizedCalendar);
    if (!indicator) {
      $(calendarWrapper).on("click", calendarCell, calendarModule.blockDay(userId));
      $(calendarWrapper).on("click", calendarCell, calendarModule.unblockDay(userId));
    }
  };

  return {
    init: initCalendarPage
  }

}()); // end of calendarPageModule
