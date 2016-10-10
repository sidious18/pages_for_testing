var makeHeaders = (function() {
  var bodyElement = ".dashboard";
  var skiwoHeader = ".js-skiwo-header";
  var mobileHeaderContent = '.js-mobile-header-content';
  var headerBurger = ".js-header-burger";
  var mobileOpenedHeaderClass = "is-opened-header";

  function openMobileHeader() {
    $(bodyElement).toggleClass(mobileOpenedHeaderClass);
  }

  $(".dashboard-page-header-nav").on("click", function(e) {
    if ($(e.target).is(".dashboard-page-header-search-loupe") && $(window).width() > 768) {
      $(e.target).toggleClass("is-active");
      $(".dashboard-page-search-form").toggleClass("is-visible");
      e.preventDefault();
    }
  });

  function initHeader() {
    $(skiwoHeader).on("click", headerBurger, openMobileHeader);
  }

  return {
    init: initHeader
  };

}());
