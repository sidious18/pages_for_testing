var foundedInterpreters = (function() {
  var mainInterpretersBlock = ".founded-interpreters-container";
  var pageCounter;
  var isEventAttached = false;

  function getInterpretersAjax() {

    if ($(mainInterpretersBlock).length) {
      $.get(
        '/interpreters', 
        {page: pageCounter})
      .fail(function(response) {
        var main_error = response.responseJSON.message;
        if (main_error) {
          showErrorsModule.showMessage([main_error], "main-error");
        }
      })
      .then(function(data) { 
        pageCounter += 1;
        $(mainInterpretersBlock).html($(mainInterpretersBlock).html() + data);
      });

    };
    
  };

  function bottomScrollAjax() {

    if (!isEventAttached) {
      isEventAttached = true;

      $(window).scroll(function() {
         if(parseInt($(window).scrollTop()) + $(window).height() == $(document).height()) {
            getInterpretersAjax();
         }
      });

    };

  };

  function initFoudedInterpretersModule() {
    pageCounter = 2;

    bottomScrollAjax();
  };

  return {
    init: initFoudedInterpretersModule
  }
}());
