var event_type = 'click';
var _device = false;
var audio_record = false;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    event_type = 'touchend';
    _device = true;
}
var _FileApiService = new FileApiService();
var fileUrl = baseFileApiUrl + '/info/' + userId + '/';
var sounds_data_fileUrl = baseFileApiUrl + "/file/" + userId + "/sounds_data.json";
var con_data_fileUrl = baseFileApiUrl + "/file/" + userId + "/con_data.json";
var ex_data_fileUrl = baseFileApiUrl + "/file/" + userId + "/ex_data.json";

var inapp = false;
var deviceIdentity;
//alert(window.parent.deviceflag);
//alert(window.localStorage.getItem('deviceflag'));
//alert(window.localStorage.deviceflag);

if (getMobileOperatingSystem() == "iOS") {
    if (localStorage.getItem("isDevice") == "true") {
        $.getScript("/external/scripts/ispeaker/cordova.js", function (data, textStatus, jqxhr) {
            //alert('cordova.js loaded');
        });
        $.getScript("/external/scripts/ispeaker/howler.min.js", function (data, textStatus, jqxhr) {
            //alert('cordova.js android loaded');
        });
    }
} else if (getMobileOperatingSystem() == "Android") {
    //alert(window.parent.vari);
    
    if (localStorage.getItem("isDevice") == "true") {
        $.getScript("/external/scripts/ispeaker/cordova_android.js", function (data, textStatus, jqxhr) {
            //alert('cordova.js android loaded');
        });
        //$.getScript("/external/scripts/ispeaker/AudioPlayer.js", function (data, textStatus, jqxhr) {
        //    //alert('cordova.js android loaded');
        //});
        
    }
    
}

function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) {
        return 'iOS';

    }
    else if (userAgent.match(/Android/i)) {

        return 'Android';
    }
    else {
        return 'unknown';
    }
}
function scroll_top() {
    var scroll_pos = $('.main_wrapper').position();
    $(window).scrollTop(scroll_pos.top);
}

$(document).ready(function() {

    document.addEventListener('deviceready', function() {
        inapp = true;
        deviceIdentity = getMobileOperatingSystem();
        //alert('InApp');

    }, false);

    setTimeout(function() {
        scroll_top();
    }, 1000);


    $('.responsive_entry_center_wrap,#main_column,.main-container').css('margin', '0');
    $('.responsive_entry_center_wrap,#main_column,.main-container').css('padding', '0');
    $('.middle_wrap').parent().css('margin', '0');
    $('.middle_wrap').parent().css('padding', '0');


    $('.main_wrapper').parent().css('padding', '0');// to remove padding
    set_max_height();
    $(window).resize(function() {
        set_max_height();

        if ($(window).width() <= 768) {
            $("._row").css('display', 'none');
            setTimeout(function() {
                $("._row").css('display', 'table');
            }, 200);
        }
    });
    $('.models_page_down_arrow').click(function() {
        var dropd = $('.down_arrow_wrapper');
        if (dropd.is(':visible')) {
            $('.down_arrow_wrapper').hide();
        } else {
            $('.down_arrow_wrapper').show();
        }
    });
});
function set_max_height() {
    var window_height = parseInt(($(window).height()));
    if (window_height <= (678)) {
        window_height = (678);
    } else {

    }
    $('.scroll_bar, .left_part, .right_part').css('min-height', (window_height - 50) + 'px').css('max-height', (window_height - 50) + 'px');
    $('.main_wrapper').css('min-height', window_height + 'px');
}

function __log(e, data) {
    //log.innerHTML += "\n" + e + " " + (data || '');
    console.log("\n" + e + " " + (data || ''));
}

var audio_context;
var recorder;
var localStream; // line added by MITR

function startUserMedia(stream) {
    localStream = stream; // line added by MITR
    var input = audio_context.createMediaStreamSource(stream);
    __log('Media stream created.' );
	__log("input sample rate " +input.context.sampleRate);

    //input.connect(audio_context.destination);
    __log('Input connected to audio context destination.');

    recorder = new Recorder(input);
    __log('Recorder initialised.');
    audio_record = true;
    console.log(audio_record + "--in");
}

function startRecording(button) {
    recorder && recorder.record();
    //button.disabled = true;
    //button.nextElementSibling.disabled = false;
    __log('Recording...');
}

function stopRecording(button) {
    recorder && recorder.stop();
    //button.disabled = true;
    //button.previousElementSibling.disabled = false;
    __log('Stopped recording.');

    // create WAV download link using audio data blob
    createDownloadLink();
    recorder.clear();
}

function createDownloadLink() {

    recorder && recorder.exportWAV(function(blob) {
        console.log(blob);
        var url = URL.createObjectURL(blob);
        var li = document.createElement('li');
        var au = document.createElement('audio');
        var hf = document.createElement('a');

        au.controls = true;
        au.src = url;
        hf.href = url;
        hf.download = new Date().toISOString() + '.wav';
        hf.innerHTML = hf.download;
        li.appendChild(au);
        li.appendChild(hf);
        recordingslist.appendChild(li);
    });
}

function init_recorder() {
    detect_browser = detect_browser.toLowerCase();
    if (detect_browser.indexOf("firefox") != (-1)) {
        // firefox recording
        init_ff_recorder();
        firefox = true;
    } else {
        try {
            // webkit shim
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            navigator.getUserMedia = (navigator.getUserMedia ||
                    navigator.webkitGetUserMedia ||
                    navigator.mozGetUserMedia ||
                    navigator.msGetUserMedia);
            window.URL = window.URL || window.webkitURL;

            audio_context = new AudioContext;
            __log('Audio context set up.');
            __log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
        } catch (e) {
            console.log('No web audio support in this browser!');
            audio_record = false;
        }

        navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
            __log('No live audio input: ' + e);
            audio_record = false;
        });
    }

}
function init_ff_recorder() {
    captureUserMedia(function(stream) {
        audio_record = true;
        window.audioVideoRecorder = window.RecordRTC(stream, {
            type: 'audio' // don't forget this; otherwise you'll get video/webm instead of audio/ogg
        });
    });
}
function captureUserMedia(callback) {
    navigator.getUserMedia = navigator.mozGetUserMedia || navigator.webkitGetUserMedia;
    navigator.getUserMedia({
        audio: true,
        video: false
    }, function(stream) {
        callback(stream);
    }, function(error) {
        console.log('No web audio support in this browser!');
        audio_record = false;
    });
}
window.onload = function init() {
    init_recorder();
}; //online
