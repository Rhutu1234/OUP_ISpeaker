## Aggregates all javascripts snippets
#set( $layout = "/layouts/null.xml" )
#skSetContentType("application/x-javascript")
#parse("/common/macro.vm")

## JQuery include
#include("/common/scripts/jquery.autocomplete.js",
        "/common/scripts/jquery.scrollto.min.js",
        "/common/scripts/jquery.highlight.min.js",
        "/common/scripts/jquery.cookie.min.js",
        "/common/scripts/survey.js")
#parse("/common/scripts/oldoapi.js")
#parse("/common/scripts/translations.js")
#parse("/common/scripts/urls.js")
#parse("/common/scripts/variables.js")
#if($isCmpEnabled != true)
    #include("/common/scripts/cookielaw.js")
#end
#include("/common/scripts/sound.js",
        "/common/scripts/jquery.customSelector.js",
        "/common/scripts/jquery-ui.min.js",
        "/common/scripts/header.js")
var browser = {firefox:false};
var dictSel = $("#dictionary-selector");
var doc = document;
var oSearch = doc.getElementById('q');
var jqLetters = $("#keyboard_letters"); 
var letters = doc.getElementById("keyboard_letters");

var dictSelectorMap = new Object();
dictSelectorMap["/definition/english/"] = "english";
dictSelectorMap["/definition/american_english/"] = "american_english";
dictSelectorMap["/definition/academic/"] = "academic";
dictSelectorMap["/definition/collocations/"] = "collocations";
dictSelectorMap["/translate/schulwoerterbuch/"] = "schulwoerterbuch_English-German";
dictSelectorMap["/grammar/practical-english-usage/"] = "practical-english-usage";

function goToTop(){
    $('.go-to-top').click(function () {
        $('html,body').animate({scrollTop: 0}, 500);
    });
}

function initInputVal() {
    var form = doc.getElementById('search-form');
    var val = doc.getElementById('dictionary-selector').value;
    if (oSearch && val && form) {
        var desc = dictCodesArr[val].description;
        oSearch.placeholder = changeText(desc, oSearch);

        //IE9
        if (!window.atob && doc.addEventListener) {
            var oSearchVal = oSearch.value;
            if(oSearchVal=="" || (oSearchVal.indexOf("Search") > -1 && oSearch.style.color=="#757575")) {
                oSearch.style.color="#757575";
                oSearch.value = desc;
            }
            oSearch.addEventListener("keydown", function(){
                if (oSearch.style.color != "black") {
                    oSearch.value="";
                    oSearch.style.color = "black";
                }
            }, false);
        }
        form.addEventListener("submit", function(){
            checkSearch(oSearch.value);
        }, false);
    }
}

//for keyboards
function createLetCopy(letters) {
    var lettersA = letters.children;

    for (k=0; k<lettersA.length; k++) {
        lettersA[k].addEventListener("click", function() {
            //keep the cursor position
            var letter = this.textContent;
            if (letter!="") { //do not consider the arrow as a letter
                var selStart = oSearch.value.substring(0, oSearch.selectionStart);
                oSearch.value= selStart + letter + oSearch.value.substring(oSearch.selectionEnd, oSearch.value.length);
                oSearch.focus();
                oSearch.setSelectionRange(selStart.length+1, selStart.length+1);
                $(oSearch).change();
            }
        }, false);
    }
}

function slideKeyboardDown() {
    jqLetters.effect('slide', { direction: 'down', mode: 'hide' }, 200);
    letters.textContent="";
}

function createLetLinks(keyboardData) {
    letters.textContent="";
    for (var i = 0; i < keyboardData.length; i++) {
        letters.innerHTML += "<a>" + keyboardData[i] + "</a> ";
    }
    letters.innerHTML +="<a id='arrowKeyboard' class='oup_icons'></a> <a id='arrowClose' class='oup_icons'></a>";

    $("#arrowClose").click(function() {
        slideKeyboardDown();
    });
    createLetCopy(letters);
}

function LowerKeyboard() {
    var keyboardDataLower = ["à", "á", "â", "ä", "ã", "ç", "è", "é", "ê", "ë", "ì", "í", "î", "ï", "ñ", "ò", "ó", "ô", "ö", "õ", "ù", "ú", "û", "ü", "æ", "œ", "ß"];
    var keyboardDataUpper = ["À", "Á", "Â", "Ä", "Ã", "Ç", "È", "É", "Ê", "Ë" ,"Ì", "Í", "Î", "Ï", "Ñ", "Ò", "Ó", "Ô", "Ö", "Õ", "Ù", "Ú", "Û", "Ü", "Æ", "Œ", "SS"];

    createLetLinks(keyboardDataLower);
    doc.getElementById("arrowKeyboard").addEventListener("click", function() {
            createLetLinks(keyboardDataUpper);
            doc.getElementById("arrowKeyboard").addEventListener("click", function() {
            LowerKeyboard();
        }, false);
    }, false);
}

function initKeyboard() {
    $("#keyboard_icon").click(function() {
        if(letters.textContent=="") {
            jqLetters.effect('slide', { direction: 'down', mode: 'show' }, 200);
            LowerKeyboard();
        } else 
            slideKeyboardDown();
    });
}
//end keyboards

$(doc).ready(function () {
    if (navigator.userAgent.indexOf("Firefox") > -1)
        browser.firefox=true;

    initLangSelector('#headerVersion');
    initAutocomplete();
    initKeyboard();
    iPadTrigger();
    initDictionarySelector();
    goToTop();

    //fixed the item highlighted in blue after a selection
    $('select option').click(function() {
        $('select').blur();
    })

    // custom selectors
    $("#dictionary-selector").each(function(){
        $(this).customSelector();
    });

    if ( (typeof(contextId) == "undefined" || !contextId) && window.matchMedia("(min-width: 762px)").matches
         && $(doc).scrollTop() == 0 && !("ontouchstart" in doc.documentElement) ) {
        ##// auto-focus of the search field
        ##// 1 - for desktop and higher resolutions
        ##// 2 - when contextId is not defined (eg. an idiom passed as parameter)
        ##// 2 - and the top of the page is visible
        ##// 3 - and for non-touchscreen devices
        $("#q").focus();
    }
    
    var pxShow = $(window).height()/3;//height on which the button will show
    var lastScrollTop =  window.pageYOffset;

    $(doc).scroll(function(){
        var st = window.pageYOffset || document.documentElement.scrollTop;
        if(st >= pxShow && st < lastScrollTop){
            $(".go-to-top").addClass("visible");
        }else{
            $(".go-to-top").removeClass("visible");
        }
        lastScrollTop = st;
    });
    

    // toggle
    $(".toggle").click(function(){
        var child = $(this).parent().next("ul");
        if($(this).hasClass("icon-minus")) {
            $(this).removeClass("icon-minus");
            $(this).addClass("icon-plus");
            child.hide();
        } else {
            $(this).removeClass("icon-plus");
            $(this).addClass("icon-minus");
            child.show();
        };
    });
    $(".toc-toggle").click(function(){
        var element = $(this).parent().parent();
        if(element.hasClass("data-fold")) {
            element.removeClass("data-fold");
            $.cookie("tocUnFold", true, {expires:7, path: '/'});
        } else {
            element.addClass("data-fold");
            $.cookie("tocUnFold", null, {expires:7, path: '/'});
        };
    });
    // expandable menu
    if ($(".expandable").length > 0) {
        var currentUrl = window.location.pathname.split("?")[0];
        $(".expandable a[href='" + currentUrl + "']").last().addClass("selected").parents(".expandable").children("div").children(".toggle.icon-plus").click();
    }
    $(".expandable a").click(function(){
        $(".relatedBlock").find( "a" ).removeClass("selected");
        $(this).addClass("selected");
    });
});

function checkSearch(txtDefault){ 
    // save the selected dictionary in a cookie
    createUserDictionaryCookie();

    // check the validity of the search string
    var searchField = doc.getElementById('q');
    if (isValidSearch(searchField.value, txtDefault)){
        searchField.value = clearStream(searchField.value);
        return true;
    }
    return false;
}

function clearStream (input) {
    return input.replace("/", " ");
}

function isValidSearch(search, txtDefault){
    if (search == txtDefault)
        return false;
    return isValidSearchText(search);
}

function isValidSearchText(search) {
    var stream = search.replace(/[^a-zA-Z0-9]/g, "");
    if (stream.length > 0) {
        return true;
    }
    return false;
}

function changeText(text, searchBox) {
    if (text == '') {
        searchBox.style.color = 'black';
        return '';
    } else {
        searchBox.style.color = '';
        return text;
    }
}

var initial_screen_height = window.innerHeight;

function initAutocomplete() {
    var dictCode = dictSel.val();
    if (dictCode != undefined) {
        var url = "#skLicensedUrl("/$url_search/")" + dictCode + "/";
        $("#search-form").attr("action", url);
    }

    var minChars = (dictCode == "practical-english-usage") ? 1 : 2;
    $("input#q").autoCompleter(
            {
                url : "#skLicensedUrl('/autocomplete/')" + dictCode + "/",
                minChars : minChars,
                autocompleterClass : "inputSuggestions",
                autocompleterResultClass : "suggestionResult",
                confirmSuggestionCallback : function(row) {
                    var autocompdict = row.attr("data-value");
                    url = "#skLicensedUrl("/$url_search/")" + autocompdict + "/";
//                    console.log("suggestion callback: " +url);
                    $("#search-form").attr("action", url);
                    $('#search-form').submit();
                },
                queryCallback : function(callback) {
                    var dictCode = dictSel.val();
                    var url = "#skLicensedUrl('/autocomplete/')" + dictCode + "/";
                    var criterion = $('input#q').val();
//                    console.log("Query callback: "+ url+", criterion: " + criterion);
                    var params = {
                        q : criterion,
                        contentType : 'application/json; charset=utf-8'
                    };
                    $.getJSON(url, params, function(data) {
//                        console.log("get url: "+url+", params: "+params["q"]);
                        var result = new Array();
                        result["results"] = new Array();
                        if (!(dictCode in result["results"]))
                            result["results"][dictCode] = Array();
                        $.each(data['results'], function(key, val) {
//                            console.log("results dict code: " + dictCode);
                            var dictionary = (val.dictionaries != null) ? val.dictionaries[0] : dictCode;
                            var searchText = val.searchtext;
                            var accessBand = val.accessBand;
                            var row = new Object();
                            row.searchText = searchText;
                            row.accessBand = accessBand;
                            if (!(dictionary in result["results"]))
                                result["results"][dictionary] = Array();
                            result["results"][dictionary].push(row);
                        });
                        if(result["results"][dictCode].length==0)
                            delete result["results"][dictCode];
                        callback(result);
                    });
                },
                createResultRowCallback : function(x, y) {
                    var suggestionCategory = $("<td class='suggestionCategory'></td>");
                    var suggestionDic = $("<div class='suggestionDic'>" + dictCodesArr[x].name + "</div>");
                    var suggestionLocked = $("<div class='suggestionLocked'>"+((!dictCodesArr[x].free)?"<p class='locked'></p>":"&nbsp;")+"</div>");
                    suggestionCategory.append(suggestionDic);
                    suggestionCategory.append(suggestionLocked);

                    var suggestionList = $("<td class='suggestionList'></td>");
                    var suggestionListUl = $("<ul></ul>");
                    for ( var result in y) {
                        if(dictCodesArr[x].url!=null)
                            suggestionListUl.append("<li><a class='suggestionResult' data-value='" + dictCodesArr[x].url + "'>"
                                    + y[result].searchText + "</a></li>");
                    }
                    suggestionList.append(suggestionListUl);

                    var suggestionRow = $("<tr class='suggestionRow'></tr>");
                    suggestionRow.append(suggestionCategory);
                    suggestionRow.append(suggestionList);
                    return suggestionRow;
                },
                footerLink : null,
                footerLinkCallback : null
            });
    $( "#search-form" ).submit(function( event ) {
        if(dictSel.val() == "practical-english-usage"){
            var autocompleteWord = $(".suggestionResult.current").text();
            if(!autocompleteWord){
                var searchword = $(".suggestionResult").first().text();
                if(searchword){
                    $("input#q").val(searchword);
                }
            }
        }
    });
}

function initDictionarySelector() {
    // update the destination page of the form when changing the dictionary
    dictSel.change(function(){
        var dictCode = dictSel.val();
        doc.getElementById("select_div").innerHTML = "<div>"+dictCodesArr[dictCode].name + "</div> <i id='arrow_select' class='oup_icons'></i>";
        if (dictCode != undefined) {
            var url = "#skLicensedUrl("/$url_search/")" + dictCode + "/direct/";
            $("#search-form").attr("action", url);
            $("#search-form").attr("class", "selector_"+dictCode);
        }
        initAutocomplete();
        initInputVal();
        createUserDictionaryCookie();
    });

    // update the dictionary selector with the default user dictionary when loading the page
    var userDictionary = (doc.location.href.indexOf('/grammar/') > 0) ? "practical-english-usage" : $.cookie("dictionary");
    if(dictSelectorMap[window.location.pathname] !== undefined ){
        userDictionary = dictSelectorMap[window.location.pathname];
    }
    if(userDictionary != null)
        dictSel.val(userDictionary);
    dictSel.change();

    if (browser.firefox)
        $(".mainsearch select").css("padding-top", "6px");
}

function initLangSelector(id) {   
    // language selector
    $(id).change(function(){
        createUserVersionCookie(id);
        var redirUrl = $(id+" option:selected").val();
        doc.location.href=redirUrl;
        return;
    });

    var userVersion = ($.cookie("version") != null ? $.cookie("version").toLowerCase() : null);
    var selectedLangCode = $(id+' option:selected').attr("id"); 

    if (userVersion != null && userVersion != selectedLangCode) {
        var redirUrl = $(id+" option[id='" + userVersion + "']").val();

        doc.location.href = redirUrl;
        return;
    }
}

function createUserDictionaryCookie() {
    var dictCode =  $('#dictionary-selector option:selected').val();
    $.cookie('dictionary', dictCode, {expires:7, path: '/'});
}

function createUserVersionCookie(id){
    var text = $(id+' option:selected').text();
    var version = text.split("(");
    version = version[1].substring(0, version[1].length-1);
    $.cookie('version', version, {expires:7, path: '/'});
    if(version=="UK") $.cookie('dictionary', "english", {expires:7, path: '/'});
    else if(version=="US") $.cookie('dictionary', "american_english", {expires:7, path: '/'});
}

function zoomDisable(){
  $('head meta[name=viewport]').remove();
  $('head').prepend('<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0" />');
}

function zoomEnable(){
  $('head meta[name=viewport]').remove();
  $('head').prepend('<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=1" />');
} 

/*
 * Form validation methods (for EACS pages)
 */

function checkPwd(pwd, pwd_info) {
    var value = pwd.val();
    // at least one upper case alphabet, one lower case alphabet and 6 characters or more
    var regex = "^(?=.*[A-Z])(?=.*[a-z]).{6,}$";
    if(value != null || value != undefined || value != "") {
        var result = value.match(regex);
        if(result == null && value != "") {
            if(!pwd.hasClass("mdl-input-error")) {
                pwd.toggleClass("mdl-input-error");
                pwd_info.toggleClass("show-modal-errors-info");
            }
            if(pwd.parent().hasClass("mdl-input-success")) {
                pwd.parent().toggleClass("mdl-input-success");
            }
        } else {
            if(pwd.hasClass("mdl-input-error")) {
                pwd.toggleClass("mdl-input-error");
                pwd_info.toggleClass("show-modal-errors-info");
            }
            if(value != "") if(!pwd.parent().hasClass("mdl-input-success"))pwd.parent().toggleClass("mdl-input-success");
        }
    }
}

function ensureSamePwd(pwd1, pwd2, pwd_info) {
    var val1 = pwd1.val();
    var val2 = pwd2.val();
    if(val2 != null || val2 != undefined) {
        if(val2 == "") {
            if(pwd2.hasClass("mdl-input-error")) {
                pwd2.toggleClass("mdl-input-error");
                pwd_info.toggleClass("show-modal-errors-info");
            }
            if(pwd2.parent().hasClass("mdl-input-success")) {
                pwd2.parent().toggleClass("mdl-input-success");
            }
        }
        if(val1 != val2 && val2 != "") {
            if(!pwd2.hasClass("mdl-input-error")) {
                pwd2.toggleClass("mdl-input-error");
                pwd_info.toggleClass("show-modal-errors-info");
            }
            if(pwd2.parent().hasClass("mdl-input-success")) {
                pwd2.parent().toggleClass("mdl-input-success");
            }
        }
        else {
            if(pwd2.hasClass("mdl-input-error")) {
                pwd2.toggleClass("mdl-input-error");
                pwd_info.toggleClass("show-modal-errors-info");
            }
            if(val2 != "") if(!pwd2.parent().hasClass("mdl-input-success")) pwd2.parent().toggleClass("mdl-input-success");
        }
    }
}
if(typeof(Storage) !== "undefined") {
    if(window.location.href.indexOf("inapp=true")>-1){
        localStorage.setItem("isDevice","true");
    }
}

function iPadTrigger(){
   if (!navigator.userAgent.match(/(iphone|ipod|ipad|macintosh)/i) || navigator.userAgent.match(/iemobile/i)
           || navigator.userAgent.match(/chrome/i))
       return;

   $("*").click(function(e) {
       return true;
   });
}
