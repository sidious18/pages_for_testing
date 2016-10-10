// sidebar functional
var makeSidebar = function() {

  $(".dashboard-sidebar-list-link").on("click", function(e) {
    $(".dashboard-sidebar-list-link").removeClass("is-active");
    $(this).addClass("is-active");
  });

  $(".sidebar-moving-section-item").each(function(ind) {
    $(this).on("mouseenter", function() {
      $(this).find("a").addClass("is-hovered");
      $(".sidebar-fixed-section-item").eq(ind).find("a").addClass("is-hovered");
    });
    $(this).on("mouseleave", function() {
      $(this).find("a").removeClass("is-hovered");
      $(".sidebar-fixed-section-item").eq(ind).find("a").removeClass("is-hovered");
    });
    $(this).on("mousedown", function() {
      $(this).find("a").addClass("is-pressed");
      $(".sidebar-fixed-section-item").eq(ind).find("a").addClass("is-pressed");
    });
    $(this).on("mouseup", function() {
      $(this).find("a").removeClass("is-pressed");
      $(".sidebar-fixed-section-item").eq(ind).find("a").removeClass("is-pressed");
    });
    $(this).find("a").on("focus", function() {
      $(this).addClass("is-focused");
      $(".sidebar-fixed-section-item").eq(ind).find("a").addClass("is-focused");
    });
    $(this).find("a").on("blur", function() {
      $(this).removeClass("is-focused");
      $(".sidebar-fixed-section-item").eq(ind).find("a").removeClass("is-focused");
    });
  });

  $(".sidebar-fixed-section-item").each(function(ind) {
    $(this).on("mouseenter", function() {
      $(this).find("a").addClass("is-hovered");
      $(".sidebar-moving-section-item").eq(ind).find("a").addClass("is-hovered");
    });
    $(this).on("mouseleave", function() {
      $(this).find("a").removeClass("is-hovered");
      $(".sidebar-moving-section-item").eq(ind).find("a").removeClass("is-hovered");
    });
    $(this).on("mousedown", function() {
      $(this).find("a").addClass("is-pressed");
      $(".sidebar-moving-section-item").eq(ind).find("a").addClass("is-pressed");
    });
    $(this).on("mouseup", function() {
      $(this).find("a").removeClass("is-pressed");
      $(".sidebar-moving-section-item").eq(ind).find("a").removeClass("is-pressed");
    });
    $(this).find("a").on("focus", function() {
      $(this).addClass("is-focused");
      $(".sidebar-moving-section-item").eq(ind).find("a").addClass("is-focused");
    });
    $(this).find("a").on("blur", function() {
      $(this).removeClass("is-focused");
      $(".sidebar-moving-section-item").eq(ind).find("a").removeClass("is-focused");
    });
  });

  $(".js-open-sidebar-header-btn, .close-sidebar-cross").on("click", function(e) {
    e.preventDefault()

    if ($("body").hasClass("is-opened-sidebar")) {
      $("body").removeClass("is-opened-sidebar");
      cookiesModule.deleteCookie("sidebar_status");
      cookiesModule.setCookie("sidebar_status", '0', {
        path: "/"
      });
      $(".sidebar-moving-section-item").each(function(ind) {
        $(this).attr("tabindex", "-1");
      });
      $(".sidebar-fixed-section-item").each(function(ind) {
        $(this).attr("tabindex", "");
      });
    } else {
      $("body").addClass("is-opened-sidebar");
      cookiesModule.deleteCookie("sidebar_status");
      cookiesModule.setCookie("sidebar_status", '1', {
        path: "/"
      });
      $(".sidebar-moving-section-item").each(function(ind) {
        $(this).attr("tabindex", "");
      });
      $(".sidebar-fixed-section-item").each(function(ind) {
        $(this).attr("tabindex", "-1");
      });
    }
  });

  (function() {
    if ($("body").hasClass("is-opened-sidebar")) {
      $(".sidebar-moving-section-item a").each(function(ind) {
        $(this).attr("tabindex", "");
      });
      $(".sidebar-fixed-section-item a").each(function(ind) {
        $(this).attr("tabindex", "-1");
      });
    } else {
      $(".sidebar-moving-section-item a").each(function(ind) {
        $(this).attr("tabindex", "-1");
      });
      $(".sidebar-fixed-section-item a").each(function(ind) {
        $(this).attr("tabindex", "");
      });
    }
  }());
};
