var detect_browser = '';
var firefox = false;
var ua = navigator.userAgent.toLowerCase();
var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");


navigator.sayswho = (function() {

    var ua = navigator.userAgent, tem,
            M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

    if (/trident/i.test(M[1])) {

        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];

        return 'IE ' + (tem[1] || '');

    }

    if (M[1] === 'Chrome') {

        tem = ua.match(/\bOPR\/(\d+)/)

        if (tem != null)
            return 'Opera ' + tem[1];

    }

    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];

    if ((tem = ua.match(/version\/(\d+)/i)) != null)
        M.splice(1, 1, tem[1]);

    return M.join(' ');

})();

detect_browser = navigator.sayswho;
detect_browser = detect_browser.toLowerCase();
if (detect_browser.indexOf("firefox") != (-1)) {
    firefox = true;
}


$(document).ready(function() {



    if (_device) {
        if (localStorage.getItem("isDevice") == "true") {
        
        } else {
            if (isAndroid && firefox) {
                show_browser_pop("", false);
            } else {
                audio_record = false;
                show_browser_pop("", true);
            }
        }

    
        
    } else {
        if (detect_browser != "") {

            detect_browser = detect_browser.toLowerCase();

            if (detect_browser.indexOf("chrome") != (-1)) {

                show_browser_pop("", false);

            } else {
                if (firefox) {
                    show_browser_pop("", false);
                } else {
                    audio_record = false;

                    show_browser_pop("", true);
                }
            }

        }
    }




});



function show_browser_pop(_arg, _arg2) {
    $.reject({reject: {all: _arg2, chrome: 37, firefox: 34},
        display: ["chrome", "msie", "firefox", "safari"],
        imagePath: "/external/images/iwriter/mitr/older/",
        header: "Please note that the iSpeaker record and playback functionality is not available in Internet Explorer&reg;, Safari&reg;, and older versions of Firefox&reg;.",
        paragraph1: "Please use the latest version of Chrome&#8482; or Firefox&reg; for desktop to access the record and playback features in the iSpeaker. Click on the icon below to go to the download page.", paragraph2: "If you are using an iOS or Android mobile device, please download the free <strong>OLD Website Launcher</strong> app, available in the App Store or Google Play store by the end of March 2015. You can also use <strong>Firefox Browser for Android</strong> (also available in Google Play store).<br/>For all other features of the iSpeaker we recommend that you use the latest version of any of these browsers:", close: true, closeMessage: "By closing this window you accept that some features of this application may not work.",
        closeLink: "Close this window", closeURL: "#",
        closeESC: true,
        closeCookie: true,
        cookieSettings: {path: "/", expires: 0},
    })
}