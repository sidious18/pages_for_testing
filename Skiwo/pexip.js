var videoCallModule = (function() {

  var makeCallWrapper = ".js-hiding-block";
  var streamWrapper = ".video-call-stream-wrapper";
  var callBtnShared = ".video-call-btn";
  var callVideoBtn = ".video-call-btn.is-video-call";
  var callPhoneBtn = ".video-call-btn.is-call:not(.is-video-call)";
  var cancelCallBtn = ".video-call-stream-btn.is-disconect";
  var muteVideoBtn = ".video-call-stream-btn.is-mute-video";
  var muteMicBtn = ".video-call-stream-btn.is-mute-audio";
  var videoStreamElement = ".video-call-in-stream";
  var name;
  var node;
  var conference;
  var pin;
  var assignment_id;
  var muteVideo = false;
  var muteAudio = false;

  function pullStartCallInfo() {
    name = $(callVideoBtn).attr("data-call-name");
    node = $(callVideoBtn).attr("data-call-node");
    assignment_id = $(callVideoBtn).attr("data-assignment-id");
    conference = $(callVideoBtn).attr("data-call-conference");
    pin = $(callVideoBtn).attr("data-call-pin");
  }

  function initCallPage() {
    var pexRtc = new PexRTC();
    pullStartCallInfo();
        
    pexRtc.onSetup = function() {
      pin ? pexRtc.connect(pin) : pexRtc.connect();
      if (muteVideo) {
        pexRtc.muteVideo(true);
      }
    }

    pexRtc.onConnect = function(remoteStream) {
      $(videoStreamElement).attr("src", remoteStream);
    }

    $(muteVideoBtn).on("click", function() {
      if (muteVideo) {
        muteVideo = false;
      } else {
        muteVideo = true;
      }
      pexRtc.muteVideo(muteVideo);
      $(this).toggleClass("is-crossed");
    });

    $(muteMicBtn).on("click", function() {
      if (muteVideo) {
        muteAudio = false;
      } else {
        muteAudio = true;
      }
      pexRtc.muteAudio(muteAudio);
      $(this).toggleClass("is-crossed");
    });

    $(callVideoBtn).on("click", function() {
      sendSlackNotification();
      $(makeCallWrapper).addClass("is-hidden");
      $(streamWrapper).removeClass("is-hidden");
      $(muteVideoBtn).removeClass("is-crossed");
      $(muteMicBtn).removeClass("is-crossed");
      pexRtc.makeCall(node, conference, name);
    });

    $(callPhoneBtn).on("click", function() {
      sendSlackNotification();
      $(makeCallWrapper).addClass("is-hidden");
      $(streamWrapper).removeClass("is-hidden");
      $(muteVideoBtn).addClass("is-crossed");
      $(muteMicBtn).removeClass("is-crossed");
      pexRtc.makeCall(node, conference, name);
      muteVideo = true;
    });

    $(cancelCallBtn).on("click", function() {
      $(streamWrapper).addClass("is-hidden");
      $(makeCallWrapper).removeClass("is-hidden");
      pexRtc.disconnect();
      $(videoStreamElement).attr("src", "");
    });

    function sendSlackNotification() {
      $.post('/notifications/join_room', {
        job_id: assignment_id
      }).error(function(response){
        var errors = $.parseJSON(response.responseText);
        showErrorsModule.showMessage(errors, "main-error");
      });
    }
  };

  return {
    init: initCallPage
  };

}());
