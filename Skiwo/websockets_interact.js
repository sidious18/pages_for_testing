var websocketsInteractionModule = (function () {
    //TODO: load client path from env

    function chat_publisher(event, job, to_person) {
        var path = "/chat/" + job;
        if (to_person) {
            path += "/" + to_person;
        }
        client.publish(path, {
            event: event
        });
    };

    function chat_subscriber(job, to_person) {
        var path = "/chat/" + job;
        if (to_person) {
            path += "/" + to_person;
        }
        client.subscribe(path, function (data) {
            var AUTH_TOKEN = $('meta[name=csrf-token]').attr('content');
            //TODO: make possible to save new data to module, now it is impossible
            jobDescrInbox.saveNewData(data.event)
        });
    };

    function publish_desktop_notification(event) {
        client.publish("/desktop_notifications/" + event.subscriber, {
            event: event
        });
    };

    function subscribe_desktop_notication(to_person) {
        var path = "/desktop_notifications/" + to_person;
        client.subscribe(path, function (data) {
            var AUTH_TOKEN = $('meta[name=csrf-token]').attr('content');
            desktopNotificationsModule.showNotification(data.event);
        });
    };

    return {
        chat_publisher: chat_publisher,
        chat_subscriber: chat_subscriber,
        publish_desktop_notification: publish_desktop_notification,
        subscribe_desktop_notication: subscribe_desktop_notication
    };
}());
var desktopSubscriberModule = (function(){
    function initDesktopSubscriber(){
        var subscriber = $('.js-desktop-subscriber');
        if (subscriber.length){
            var person_id= subscriber.data('subscriberId');
            websocketsInteractionModule.subscribe_desktop_notication(person_id);
        }
    }
    return {
      init: initDesktopSubscriber
    };
}());
