var detectActiveMenuItem = (function() {
 
 function searchForPageName() {
  var pageName = $("#page-name").val();

  if (pageName && pageName.indexOf("_") > 0) {
    return pageName.split("_");
  } else {
    return pageName;
  }
 }

 function searchAppropriateMenuItem(pageName) {
  if (Array.isArray(pageName)) {
    return $("[data-for-page='" + pageName[0] + "'], [data-for-page='" + pageName[1] + "']");
  } else {
    return $("[data-for-page='" + pageName + "']");
  }
 };

 function setActiveItem() {
  var approrpiateElements = searchAppropriateMenuItem(searchForPageName());

  if (approrpiateElements.length > 2) {
    $("body").addClass("is-opened-submenu");
    approrpiateElements.each(function() {
      $(this).addClass("is-active");
    });
  } else {
    approrpiateElements.addClass("is-active");
  }
  if ($(window).width() < 769) {
    $("body").addClass("is-opened-submenu");
  }
 }

 return {
  init: setActiveItem
 }

}());
