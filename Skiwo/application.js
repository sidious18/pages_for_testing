// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//











var client;
var fayeURL;
function initSite() {
  if (fayeURL) {
    client = new Faye.Client(fayeURL);
  }
  var currentPage = $("#page-name").data("page-full-name");
  detectActiveMenuItem.init();
  checkboxesModule.init();
  deviseModule.init();
  makeSidebar();
  makeHeaders.init();
  customSelectsModule.init();
  feedbackModule.init();

  $(".js-help-btn").on("click", function() {
    $(".container-for-modal.help-info").addClass("is-active");
  });

  $(".js-send-help-contact").on("click", function(e) {
    e.preventDefault();
    var value = $(".js-help-contact-msg").val();
    $.post($(this).attr("href"), {text: value}).done(function() {
      $(".container-for-modal.help-info").removeClass("is-active");
    });
  })

  $(".container-for-modal.help-info").on("click", ".accept-data-close-cross", function() {
    $(".container-for-modal.help-info").removeClass("is-active");
  });

  $("input[type='button'], input[type='submit'], input[type='reset'], input[type='button'], input[type='radio'], input[type='checkbox'], button, a").on("click", function() {
    $(this).blur();
  });

  if ($(".redirect-error").length) {
    setTimeout(function() {
      showErrorsModule.hideMessage();
    }, 5000);
  }

  switch (currentPage) {
    case "company_info":
      companyInfoModule.init();
      break;
    case "employees":
      employeesModule.init();
      break;
    case "upgrade":
      upgradeToEnterpriseModule.init();
      tabOrderModule.init();
      break;
    case "edit_profile":
      newProfileModule.init();
      flashMessagesHelper.show();
      break;
    case "wizard-role":
      conversionTracking.init();
      wizardPreRoleModule.init();
      tabOrderModule.init();
      break;
    case "wizard":
      wizardPostRoleModule.init();
      tabOrderModule.init();
      break;
    case "show_profile":
      newProfileModule.init();
      break;
    case "payment_method":
      paymentMethodModule.init();
      tabOrderModule.init();
      break;
    case "calendar":
      calendarPageModule.init($(".calendar-table-cont"));
      break;
    case "book_inter":
      conversionTracking.init();
      bookInterpreterModule.init();
      tabOrderModule.init();
      flashMessagesHelper.show();
      customHeaderModule.init();
      break;
    case "assignment_chat":
      conversionTracking.init();
      jobDescrInbox.init();
      break;
    case "payout_method":
      payoutMethodModule.init();
      break;
    case "new_payout":
      payoutMethodModule.init();
      break;
    case "assignments":
      assignmentsModule.init();
      break;
    case "transaction_history":
      transactionHistoryModule.init();
      break;
    case "interpreters":
      foundedInterpreters.init();
      break;
    case "video-call":
      videoCallModule.init();
      //break;
    case "make-call-page":
      if( !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
             navigator.mozGetUserMedia || navigator.msGetUserMedia)    ) {
        $(".js-does-not-support-webrtc").remove();
        $(".js-supports-webrtc").removeClass("is-hidden");
      } else {
        $(".js-supports-webrtc").remove();
        $(".js-does-not-support-webrtc").removeClass("is-hidden");
      }
      break;
    case "dashboard":
      $(".dashboard-section").on("click", function() {
        if ($(window).width() < 965) {
          $(this).toggleClass("is-opened");
        };
      });
      break;
    case "network_test":
      networkTestModule.init();
      break;
    case "create_assignment_signup":
      customHeaderModule.init();
      break;
  }

  // window.randomize = function() {
  //   $('.radial-progress').attr('data-progress', 75);
  // }
  // setTimeout(window.randomize, 200);
};

Turbolinks.pagesCached(0);
$.ajaxSetup({cache: false});
Turbolinks.enableProgressBar();

$(document).ready(function() {
  initSite();
  desktopSubscriberModule.init();
  desktopNotificationsModule.requestPermission();
});

$(document).on('page:load', function() {
  initSite();
});

$(document).on('page:fetch', function(){
  $(".header-role-status").parent().addClass("in-progress");
  $(".dashboard-page-burger-btn.mobile").addClass("in-progress");
});

$(document).on('page:restore', function(){
  $(".header-role-status").parent().removeClass("in-progress");
  $(".dashboard-page-burger-btn.mobile").removeClass("in-progress");
  initSite();
});
