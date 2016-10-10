var datetimeModefier = function() {
  $("input.hasDatepicker").on("focus", function() {
    $("body").css("overflow", "hidden");
  });

  $("input.hasDatepicker").on("blur", function() {
    $("body").css("overflow", "auto");
  });

  $("input.hasDatepicker").on("paste", function() {
    return false;
  });
}
