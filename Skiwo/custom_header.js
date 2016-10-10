// create job functional
var customHeaderModule = (function() {
    //
    // selectors that receive or are involved to some functional
    //

    var localeLink = ".locale-link";
    var localeForm = '.locale-form';
    var localeCookie= ".cookie-locale-input";
    var skiwoLocalizationInput = '.skiwo-localization-input';
    var englishLink = ".english-link";
    var norwayLink = ".norway-link";

    //
    // functions
    //

    function defineActiveLanguage(){
        var currentLang = $(localeCookie).val();
        if (currentLang == "nb"){
            $(englishLink).css('color', '#fff');
            $(norwayLink).css('color', '#38E4AE');
        }
        else if(currentLang == "en"){
            $(norwayLink).css('color', '#fff');
            $(englishLink).css('color', '#38E4AE');
        }
    }

    function changeLinks(){
        var currentLang = $(localeCookie).val();
        if (currentLang == "nb"){
            for(i=0; i < $(localeLink).length; i++){
                var changedHref = $(localeLink).eq(i).attr('href').replace('/en','');
                $(localeLink).eq(i).attr('href', changedHref);
            }
            var chagnedFormLink = $(localeForm).attr('action').replace('/en','');
            $(localeForm).attr('action', chagnedFormLink);
        }
    }


    function initHeader() {
        $(skiwoLocalizationInput).on('click', function(e){
            e.preventDefault();
            var lang = $(this).attr('data-id');
            document.cookie = "locale=nb;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/; secure";
            $.post( "/application/save_locale", { locale: lang } ).done(function() {
                location.reload();
            });
        });
        changeLinks();
        defineActiveLanguage();
    };

    return {
        init: initHeader
    };

}());
