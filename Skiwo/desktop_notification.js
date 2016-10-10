var desktopNotificationsModule = (function () {

    function showNotification(event) {
        if (!Notify.needsPermission) {
            doNotification(event);
        } else if (Notify.isSupported()) {
            Notify.requestPermission(onPermissionGranted, onPermissionDenied(event));
        }
    };

    function doNotification(event) {
        var myNotification = new Notify('Assigment notification', {
            body: event.title,
            tag: 'My unique id',
            notifyShow: onShowNotification,
            notifyClose: onCloseNotification,
            notifyClick: onClickNotification(event.link),
            notifyError: onErrorNotification,
            timeout: 4
        });

        myNotification.show();
    };

    function onShowNotification() {
    };

    function onCloseNotification() {
    };

    function onClickNotification(link) {
        var target = link;
        return function(){
            window.location.href = target;
        }
    };

    function onErrorNotification() {
        console.error('Error showing notification. You may need to request permission.');
    };

    function onPermissionGranted() {
        doNotification();
    };

    // send an email, instead notification when deny notice
    function onPermissionDenied (event) {
        console.warn('Permission has been denied by the user');
        var target = event;
        return function(){
            $.ajax({
                url: '/notify_by_email/',
                type: 'POST',
                data: {event: target},
                success: function(response) {
                    // showErrorsModule.showMessage(response.notice, "main-success");
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

    function initialGrantedNotification() {
      var event = {
          title: window.__("Welcome to Skiwo!"),
          link: '/'
      };
      doNotification(event);
    };

    function initialDeniedNotification() {
    };

    function requestPermission() {
      if (Notify.needsPermission) {
        if (Notify.isSupported()) {
          Notify.requestPermission(initialGrantedNotification, initialDeniedNotification);
        }
      }
    };

    return {
        showNotification: showNotification,
        requestPermission: requestPermission
    };
}());
