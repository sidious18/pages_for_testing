var conversionTracking = (function() {
  
  var w;
  
  function trackSignUp( isBusiness ) {
    trackBing( 'account', 'sign_up', 'is_business', isBusiness?1:0 );
    
    fbq('track', 'CompleteRegistration');
    
    if( isBusiness ){
      w.google_conversion_label = "kGYECI7olmoQj5KlpAM";
    } else {
      w.google_conversion_label = "hNCGCNXklmoQj5KlpAM";
    }
    trackGoogle();
  }
  
  function trackPostAnAssignment( url ) {
    trackBing( 'assignment', 'post', 'success', 1 );
    
    w.google_conversion_label = "Wd74CJiJkmoQj5KlpAM";
    trackGoogle(url);
  }
  
  function trackNewApplication( value, currency ) {
    value = value ? value:0.00;
    currency = currency ? currency:"NOK";
    
    trackBing( 'assignment', 'award', 'success', 1, value, currency );
    
    w.google_conversion_label = "YYKmCKeJkmoQj5KlpAM";
    w.google_conversion_value = value;
    w.google_conversion_currency = currency;
    trackGoogle();
  }
  
  function trackAssignmentAwarded( value, currency ) {
    value = value ? value:0.00;
    currency = currency ? currency:"NOK";
    
    trackBing( 'assignment', 'award', 'success', 1, value, currency );
    
    w.google_conversion_label = "WLCDCJTg_WkQj5KlpAM";
    w.google_conversion_value = value;
    w.google_conversion_currency = currency;
    trackGoogle();
  }
  
  function trackBing( category, action, label, value, price, currency ){
    w.uetq = w.uetq || [];
    if( isNaN(Number(price)) ){
      w.uetq.push({ 'ec': category, 'ea': action, 'el': label, 'ev': value })
    } else {
      w.uetq.push({ 'ec': category, 'ea': action, 'el': label, 'ev': value, 'gv': price, 'gc': currency })
    }
  }
  
  function trackGoogle(url){
    var opt = new Object();
    opt.onload_callback = function() {
      if (typeof(url) != 'undefined') {
        window.location = url;
      }
    }
    
    var conv_handler = w['google_trackConversion'];
    if (typeof(conv_handler) == 'function') {
      conv_handler(opt);
    }
  }
  
  function init(){
    w = window;
    w.google_conversion_id = 881412367;
    w.google_remarketing_only = false;
    w.google_conversion_format = "3";
    
    $.getScript("//www.googleadservices.com/pagead/conversion_async.js");
  }
  
  return {
    init: init,
    trackPostAnAssignment: trackPostAnAssignment,
    trackNewApplication: trackNewApplication,
    trackAssignmentAwarded: trackAssignmentAwarded,
    trackSignUp: trackSignUp
  };
}());
