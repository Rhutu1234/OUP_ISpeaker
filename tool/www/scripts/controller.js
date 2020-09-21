
var fs = require('fs');
//var SoxCommand = require('sox-audio');
//var command = SoxCommand();
var dir_array = [];
//var audioconcat = require('audioconcat');
var audio_arr = [];
var a_index = 0;
var count = 0;
var destDir;
var path = process.env.path;
var srcPath;
path += ";" + process.cwd() + "\\locales\\ffmpeg-20170601-bd1179e-win64-static\\bin";
process.env.path = path;
var exec = require('child_process').exec;
var project_xml_data = new Object();
var xml_file_path;
var project_count = 0;
var load_count = 0;
var temp = {};
$('document').ready(function () {
  $('.alert').hide();
  $("#exampleInputFile").click(function () {
    $('.alert').hide();
    $('.alert-info').show();
    xml_file_path = $('#srcPath').val();
    loadFrameworkXml();

  })
});

var britishVideo = [
  {
    'Video name': 'aʊ',
    'Embed code': '<iframe src="https://player.vimeo.com/video/385476306" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'aɪ',
    'Embed code': '<iframe src="https://player.vimeo.com/video/385476261" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'b',
    'Embed code': '<iframe src="https://player.vimeo.com/video/385476356" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'd',
    'Embed code': '<iframe src="https://player.vimeo.com/video/385478707" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'dʒ',
    'Embed code': '<iframe src="https://player.vimeo.com/video/385478904" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'e',
    'Embed code': '<iframe src="https://player.vimeo.com/video/385479032" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'eə',
    'Embed code': '<iframe src="https://player.vimeo.com/video/385479825" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'eɪ',
    'Embed code': '<iframe src="https://player.vimeo.com/video/385479999" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'f',
    'Embed code': '<iframe src="https://player.vimeo.com/video/385480404" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'h',
    'Embed code': '<iframe src="https://player.vimeo.com/video/385494347" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'i',
    'Embed code': '<iframe src="https://player.vimeo.com/video/385501152" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'iː',
    'Embed code': '<iframe src="https://player.vimeo.com/video/385501495" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'j',
    'Embed code': '<iframe src="https://player.vimeo.com/video/385488123" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'k',
    'Embed code': '<iframe src="https://player.vimeo.com/video/385488378" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'l',
    'Embed code': '<iframe src="https://player.vimeo.com/video/385488571" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'm',
    'Embed code': '<iframe src="https://player.vimeo.com/video/385488818" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'n',
    'Embed code': '<iframe src="https://player.vimeo.com/video/385489011" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'p',
    'Embed code': '<iframe src="https://player.vimeo.com/video/385489494" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'r',
    'Embed code': '<iframe src="https://player.vimeo.com/video/385489736" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 's',
    'Embed code': '<iframe src="https://player.vimeo.com/video/385489999" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 't',
    'Embed code': '<iframe src="https://player.vimeo.com/video/385490765" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'tʃ',
    'Embed code': '<iframe src="https://player.vimeo.com/video/385491095" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'u',
    'Embed code': '<iframe src="https://player.vimeo.com/video/385491319" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'uː',
    'Embed code': '<iframe src="https://player.vimeo.com/video/385491789" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'v',
    'Embed code': '<iframe src="https://player.vimeo.com/video/385492191" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'w',
    'Embed code': '<iframe src="https://player.vimeo.com/video/385492597" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'x',
    'Embed code': '<iframe src="https://player.vimeo.com/video/385492780" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'z',
    'Embed code': '<iframe src="https://player.vimeo.com/video/385493085" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'æ',
    'Embed code': '<iframe src="https://player.vimeo.com/video/385476220" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'ð',
    'Embed code': '<iframe src="https://player.vimeo.com/video/385478800" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'ŋ',
    'Embed code': '<iframe src="https://player.vimeo.com/video/385489211" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'ɔɪ',
    'Embed code': '<iframe src="https://player.vimeo.com/video/385478542" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'ɔː',
    'Embed code': '<iframe src="https://player.vimeo.com/video/385479116" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'ə',
    'Embed code': '<iframe src="https://player.vimeo.com/video/385480605" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'əʊ',
    'Embed code': '<iframe src="https://player.vimeo.com/video/385480202" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'ʃ',
    'Embed code': '<iframe src="https://player.vimeo.com/video/385490446" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'ʊ',
    'Embed code': '<iframe src="https://player.vimeo.com/video/385491558" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'ʊə',
    'Embed code': '<iframe src="https://player.vimeo.com/video/385491991" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'ʒ',
    'Embed code': '<iframe src="https://player.vimeo.com/video/385493390" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'ɑː',
    'Embed code': '<iframe src="https://player.vimeo.com/video/385476175" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'ɒ',
    'Embed code': '<iframe src="https://player.vimeo.com/video/385476439" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'ɜː',
    'Embed code': '<iframe src="https://player.vimeo.com/video/385479569" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'ɡ',
    'Embed code': '<iframe src="https://player.vimeo.com/video/385493951" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'ɪ',
    'Embed code': '<iframe src="https://player.vimeo.com/video/385501457" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'ɪə',
    'Embed code': '<iframe src="https://player.vimeo.com/video/385487910" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'ʌ',
    'Embed code': '<iframe src="https://player.vimeo.com/video/385492403" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'θ',
    'Embed code': '<iframe src="https://player.vimeo.com/video/385493664" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  }
];

var americanVideo = [
  {
    'Video name': 'aʊ',
    'Embed code': '<iframe src="https://player.vimeo.com/video/394210408" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'aɪ',
    'Embed code': '<iframe src="https://player.vimeo.com/video/394210374" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'b',
    'Embed code': '<iframe src="https://player.vimeo.com/video/394209459" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'd',
    'Embed code': '<iframe src="https://player.vimeo.com/video/394210102" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'dʒ',
    'Embed code': '<iframe src="https://player.vimeo.com/video/394210263" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'e',
    'Embed code': '<iframe src="https://player.vimeo.com/video/394211174" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'er',
    'Embed code': '<iframe src="https://player.vimeo.com/video/394210771" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'eɪ',
    'Embed code': '<iframe src="https://player.vimeo.com/video/394210737" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'f',
    'Embed code': '<iframe src="https://player.vimeo.com/video/394210858" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'h',
    'Embed code': '<iframe src="https://player.vimeo.com/video/394211092" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'i',
    'Embed code': '<iframe src="https://player.vimeo.com/video/394211140" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'iː',
    'Embed code': '<iframe src="https://player.vimeo.com/video/394213207" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'j',
    'Embed code': '<iframe src="https://player.vimeo.com/video/394213509" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'k',
    'Embed code': '<iframe src="https://player.vimeo.com/video/394213647" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'l',
    'Embed code': '<iframe src="https://player.vimeo.com/video/394213810" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'm',
    'Embed code': '<iframe src="https://player.vimeo.com/video/394213953" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'n',
    'Embed code': '<iframe src="https://player.vimeo.com/video/394213985" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'p',
    'Embed code': '<iframe src="https://player.vimeo.com/video/394214076" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'r',
    'Embed code': '<iframe src="https://player.vimeo.com/video/394224817" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 's',
    'Embed code': '<iframe src="https://player.vimeo.com/video/394224937" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 't',
    'Embed code': '<iframe src="https://player.vimeo.com/video/394223980" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'tʃ',
    'Embed code': '<iframe src="https://player.vimeo.com/video/394224086" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'u',
    'Embed code': '<iframe src="https://player.vimeo.com/video/394224198" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'uː',
    'Embed code': '<iframe src="https://player.vimeo.com/video/394224413" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'v',
    'Embed code': '<iframe src="https://player.vimeo.com/video/394224671" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'w',
    'Embed code': '<iframe src="https://player.vimeo.com/video/394225953" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'x',
    'Embed code': '<iframe src="https://player.vimeo.com/video/394226092" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'z',
    'Embed code': '<iframe src="https://player.vimeo.com/video/394226213" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'æ',
    'Embed code': '<iframe src="https://player.vimeo.com/video/394210335" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'ð',
    'Embed code': '<iframe src="https://player.vimeo.com/video/394210224" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'ŋ',
    'Embed code': '<iframe src="https://player.vimeo.com/video/394214024" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'ɔ:',
    'Embed code': '<iframe src="https://player.vimeo.com/video/394209639" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'ɔɪ',
    'Embed code': '<iframe src="https://player.vimeo.com/video/394209852" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'ə',
    'Embed code': '<iframe src="https://player.vimeo.com/video/394211226" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'əʊ',
    'Embed code': '<iframe src="https://player.vimeo.com/video/394210813" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'ʃ',
    'Embed code': '<iframe src="https://player.vimeo.com/video/394223828" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'ʊ',
    'Embed code': '<iframe src="https://player.vimeo.com/video/394224306" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'ʊr',
    'Embed code': '<iframe src="https://player.vimeo.com/video/394224545" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'ʒ',
    'Embed code': '<iframe src="https://player.vimeo.com/video/394226368" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'ɑː',
    'Embed code': '<iframe src="https://player.vimeo.com/video/394210295" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'ɜː',
    'Embed code': '<iframe src="https://player.vimeo.com/video/394210658" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'ɡ',
    'Embed code': '<iframe src="https://player.vimeo.com/video/394210895" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'ɪ',
    'Embed code': '<iframe src="https://player.vimeo.com/video/394214122" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'ɪr',
    'Embed code': '<iframe src="https://player.vimeo.com/video/394213341" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'ʌ',
    'Embed code': '<iframe src="https://player.vimeo.com/video/394226648" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  },
  {
    'Video name': 'θ',
    'Embed code': '<iframe src="https://player.vimeo.com/video/394226500" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
  }
];

var soundMenu = [
  {
    'British or American': 'British English',
    'Section': 'Consonants',
    'Phoneme': 'p',
    'Word': 'pen'
  },
  {
    'British or American': 'British English',
    'Section': 'Consonants',
    'Phoneme': 'b',
    'Word': 'bad'
  },
  {
    'British or American': 'British English',
    'Section': 'Consonants',
    'Phoneme': 't',
    'Word': 'tea'
  },
  {
    'British or American': 'British English',
    'Section': 'Consonants',
    'Phoneme': 'd',
    'Word': 'did'
  },
  {
    'British or American': 'British English',
    'Section': 'Consonants',
    'Phoneme': 'k',
    'Word': 'cat'
  },
  {
    'British or American': 'British English',
    'Section': 'Consonants',
    'Phoneme': 'ɡ',
    'Word': 'get'
  },
  {
    'British or American': 'British English',
    'Section': 'Consonants',
    'Phoneme': 'm',
    'Word': 'man'
  },
  {
    'British or American': 'British English',
    'Section': 'Consonants',
    'Phoneme': 'n',
    'Word': 'now'
  },
  {
    'British or American': 'British English',
    'Section': 'Consonants',
    'Phoneme': 'ŋ',
    'Word': 'sing'
  },
  {
    'British or American': 'British English',
    'Section': 'Consonants',
    'Phoneme': 'f',
    'Word': 'fall'
  },
  {
    'British or American': 'British English',
    'Section': 'Consonants',
    'Phoneme': 'v',
    'Word': 'van'
  },
  {
    'British or American': 'British English',
    'Section': 'Consonants',
    'Phoneme': 'θ',
    'Word': 'thin'
  },
  {
    'British or American': 'British English',
    'Section': 'Consonants',
    'Phoneme': 'ð',
    'Word': 'this'
  },
  {
    'British or American': 'British English',
    'Section': 'Consonants',
    'Phoneme': 's',
    'Word': 'see'
  },
  {
    'British or American': 'British English',
    'Section': 'Consonants',
    'Phoneme': 'z',
    'Word': 'zoo'
  },
  {
    'British or American': 'British English',
    'Section': 'Consonants',
    'Phoneme': 'ʃ',
    'Word': 'shoe'
  },
  {
    'British or American': 'British English',
    'Section': 'Consonants',
    'Phoneme': 'ʒ',
    'Word': 'vision'
  },
  {
    'British or American': 'British English',
    'Section': 'Consonants',
    'Phoneme': 'tʃ',
    'Word': 'chain'
  },
  {
    'British or American': 'British English',
    'Section': 'Consonants',
    'Phoneme': 'dʒ',
    'Word': 'jam'
  },
  {
    'British or American': 'British English',
    'Section': 'Consonants',
    'Phoneme': 'l',
    'Word': 'leg'
  },
  {
    'British or American': 'British English',
    'Section': 'Consonants',
    'Phoneme': 'r',
    'Word': 'red'
  },
  {
    'British or American': 'British English',
    'Section': 'Consonants',
    'Phoneme': 'h',
    'Word': 'hat'
  },
  {
    'British or American': 'British English',
    'Section': 'Consonants',
    'Phoneme': 'x',
    'Word': 'loch'
  },
  {
    'British or American': 'British English',
    'Section': 'Consonants',
    'Phoneme': 'j',
    'Word': 'yes'
  },
  {
    'British or American': 'British English',
    'Section': 'Consonants',
    'Phoneme': 'w',
    'Word': 'wet'
  },
  {
    'British or American': 'British English',
    'Section': 'Vowels',
    'Phoneme': 'iː',
    'Word': 'see'
  },
  {
    'British or American': 'British English',
    'Section': 'Vowels',
    'Phoneme': 'i',
    'Word': 'happy'
  },
  {
    'British or American': 'British English',
    'Section': 'Vowels',
    'Phoneme': 'ɪ',
    'Word': 'sit'
  },
  {
    'British or American': 'British English',
    'Section': 'Vowels',
    'Phoneme': 'e',
    'Word': 'bed'
  },
  {
    'British or American': 'British English',
    'Section': 'Vowels',
    'Phoneme': 'æ',
    'Word': 'cat'
  },
  {
    'British or American': 'British English',
    'Section': 'Vowels',
    'Phoneme': 'ə',
    'Word': 'about'
  },
  {
    'British or American': 'British English',
    'Section': 'Vowels',
    'Phoneme': 'ɜː',
    'Word': 'fur'
  },
  {
    'British or American': 'British English',
    'Section': 'Vowels',
    'Phoneme': 'ʌ',
    'Word': 'cup'
  },
  {
    'British or American': 'British English',
    'Section': 'Vowels',
    'Phoneme': 'uː',
    'Word': 'too'
  },
  {
    'British or American': 'British English',
    'Section': 'Vowels',
    'Phoneme': 'u',
    'Word': 'actual'
  },
  {
    'British or American': 'British English',
    'Section': 'Vowels',
    'Phoneme': 'ʊ',
    'Word': 'put'
  },
  {
    'British or American': 'British English',
    'Section': 'Vowels',
    'Phoneme': 'ɔː',
    'Word': 'saw'
  },
  {
    'British or American': 'British English',
    'Section': 'Vowels',
    'Phoneme': 'ɒ',
    'Word': 'got'
  },
  {
    'British or American': 'British English',
    'Section': 'Vowels',
    'Phoneme': 'ɑː',
    'Word': 'father'
  },
  {
    'British or American': 'British English',
    'Section': 'Diphthongs',
    'Phoneme': 'eɪ',
    'Word': 'say'
  },
  {
    'British or American': 'British English',
    'Section': 'Diphthongs',
    'Phoneme': 'əʊ',
    'Word': 'go'
  },
  {
    'British or American': 'British English',
    'Section': 'Diphthongs',
    'Phoneme': 'aɪ',
    'Word': 'my'
  },
  {
    'British or American': 'British English',
    'Section': 'Diphthongs',
    'Phoneme': 'aʊ',
    'Word': 'now'
  },
  {
    'British or American': 'British English',
    'Section': 'Diphthongs',
    'Phoneme': 'ɔɪ',
    'Word': 'boy'
  },
  {
    'British or American': 'British English',
    'Section': 'Diphthongs',
    'Phoneme': 'ɪə',
    'Word': 'near'
  },
  {
    'British or American': 'British English',
    'Section': 'Diphthongs',
    'Phoneme': 'eə',
    'Word': 'hair'
  },
  {
    'British or American': 'British English',
    'Section': 'Diphthongs',
    'Phoneme': 'ʊə',
    'Word': 'pure'
  },
  {
    'British or American': 'American English',
    'Section': 'Consonants',
    'Phoneme': 'p',
    'Word': 'pen'
  },
  {
    'British or American': 'American English',
    'Section': 'Consonants',
    'Phoneme': 'b',
    'Word': 'bad'
  },
  {
    'British or American': 'American English',
    'Section': 'Consonants',
    'Phoneme': 't',
    'Word': 'tea'
  },
  {
    'British or American': 'American English',
    'Section': 'Consonants',
    'Phoneme': 'd',
    'Word': 'did'
  },
  {
    'British or American': 'American English',
    'Section': 'Consonants',
    'Phoneme': 'k',
    'Word': 'cat'
  },
  {
    'British or American': 'American English',
    'Section': 'Consonants',
    'Phoneme': 'ɡ',
    'Word': 'get'
  },
  {
    'British or American': 'American English',
    'Section': 'Consonants',
    'Phoneme': 'm',
    'Word': 'man'
  },
  {
    'British or American': 'American English',
    'Section': 'Consonants',
    'Phoneme': 'n',
    'Word': 'now'
  },
  {
    'British or American': 'American English',
    'Section': 'Consonants',
    'Phoneme': 'ŋ',
    'Word': 'sing'
  },
  {
    'British or American': 'American English',
    'Section': 'Consonants',
    'Phoneme': 'f',
    'Word': 'fall'
  },
  {
    'British or American': 'American English',
    'Section': 'Consonants',
    'Phoneme': 'v',
    'Word': 'van'
  },
  {
    'British or American': 'American English',
    'Section': 'Consonants',
    'Phoneme': 'θ',
    'Word': 'thin'
  },
  {
    'British or American': 'American English',
    'Section': 'Consonants',
    'Phoneme': 'ð',
    'Word': 'this'
  },
  {
    'British or American': 'American English',
    'Section': 'Consonants',
    'Phoneme': 's',
    'Word': 'see'
  },
  {
    'British or American': 'American English',
    'Section': 'Consonants',
    'Phoneme': 'z',
    'Word': 'zoo'
  },
  {
    'British or American': 'American English',
    'Section': 'Consonants',
    'Phoneme': 'ʃ',
    'Word': 'shoe'
  },
  {
    'British or American': 'American English',
    'Section': 'Consonants',
    'Phoneme': 'ʒ',
    'Word': 'vision'
  },
  {
    'British or American': 'American English',
    'Section': 'Consonants',
    'Phoneme': 'tʃ',
    'Word': 'chain'
  },
  {
    'British or American': 'American English',
    'Section': 'Consonants',
    'Phoneme': 'dʒ',
    'Word': 'jam'
  },
  {
    'British or American': 'American English',
    'Section': 'Consonants',
    'Phoneme': 'l',
    'Word': 'leg'
  },
  {
    'British or American': 'American English',
    'Section': 'Consonants',
    'Phoneme': 'r',
    'Word': 'red'
  },
  {
    'British or American': 'American English',
    'Section': 'Consonants',
    'Phoneme': 'h',
    'Word': 'hat'
  },
  {
    'British or American': 'American English',
    'Section': 'Consonants',
    'Phoneme': 'x',
    'Word': 'loch'
  },
  {
    'British or American': 'American English',
    'Section': 'Consonants',
    'Phoneme': 'j',
    'Word': 'yes'
  },
  {
    'British or American': 'American English',
    'Section': 'Consonants',
    'Phoneme': 'w',
    'Word': 'wet'
  },
  {
    'British or American': 'American English',
    'Section': 'Vowels',
    'Phoneme': 'iː',
    'Word': 'see'
  },
  {
    'British or American': 'American English',
    'Section': 'Vowels',
    'Phoneme': 'i',
    'Word': 'happy'
  },
  {
    'British or American': 'American English',
    'Section': 'Vowels',
    'Phoneme': 'ɪ',
    'Word': 'sit'
  },
  {
    'British or American': 'American English',
    'Section': 'Vowels',
    'Phoneme': 'e',
    'Word': 'bed'
  },
  {
    'British or American': 'American English',
    'Section': 'Vowels',
    'Phoneme': 'æ',
    'Word': 'cat'
  },
  {
    'British or American': 'American English',
    'Section': 'Vowels',
    'Phoneme': 'ə',
    'Word': 'about'
  },
  {
    'British or American': 'American English',
    'Section': 'Vowels',
    'Phoneme': 'ɜː',
    'Word': 'fur'
  },
  {
    'British or American': 'American English',
    'Section': 'Vowels',
    'Phoneme': 'ʌ',
    'Word': 'cup'
  },
  {
    'British or American': 'American English',
    'Section': 'Vowels',
    'Phoneme': 'uː',
    'Word': 'too'
  },
  {
    'British or American': 'American English',
    'Section': 'Vowels',
    'Phoneme': 'u',
    'Word': 'actual'
  },
  {
    'British or American': 'American English',
    'Section': 'Vowels',
    'Phoneme': 'ʊ',
    'Word': 'put'
  },
  {
    'British or American': 'American English',
    'Section': 'Vowels',
    'Phoneme': 'ɔː',
    'Word': 'saw'
  },
  {
    'British or American': 'American English',
    'Section': 'Vowels',
    'Phoneme': 'ɑː',
    'Word': 'father'
  },
  {
    'British or American': 'American English',
    'Section': 'Diphthongs',
    'Phoneme': 'eɪ',
    'Word': 'say'
  },
  {
    'British or American': 'American English',
    'Section': 'Diphthongs',
    'Phoneme': 'əʊ',
    'Word': 'go'
  },
  {
    'British or American': 'American English',
    'Section': 'Diphthongs',
    'Phoneme': 'aɪ',
    'Word': 'my'
  },
  {
    'British or American': 'American English',
    'Section': 'Diphthongs',
    'Phoneme': 'aʊ',
    'Word': 'now'
  },
  {
    'British or American': 'American English',
    'Section': 'Diphthongs',
    'Phoneme': 'ɔɪ',
    'Word': 'boy'
  },
  {
    'British or American': 'American English',
    'Section': 'Diphthongs',
    'Phoneme': 'ɪr',
    'Word': 'near'
  },
  {
    'British or American': 'American English',
    'Section': 'Diphthongs',
    'Phoneme': 'er',
    'Word': 'hair'
  },
  {
    'British or American': 'American English',
    'Section': 'Diphthongs',
    'Phoneme': 'ʊr',
    'Word': 'pure'
  }
];
var soundsMenu = {
  BrE: {
    consonants: [],
    vowels: [],
    diphthongs: []
  },
  AmE: {
    consonants: [],
    vowels: [],
    diphthongs: []

  }
}
createSoundMenu();
function createSoundMenu() {

  soundMenu.forEach(function (sound) {
    var type = sound['British or American'] === 'British English' ? soundsMenu.BrE : soundsMenu.AmE;
    var soundObj = {
      phoneme: sound.Phoneme,
      word: sound.Word
    }
    if (sound.Section === 'Consonants') {
      type.consonants.push(soundObj);
    } else if (sound.Section === 'Vowels') {
      type.vowels.push(soundObj);
    } else {
      type.diphthongs.push(soundObj);
    }
  });
  var json = JSON.stringify(soundsMenu);

  fs.writeFile('E:/projects/OUP_ISpeaker/ispeaker/src/assets/json/soundsMenu.json', json, 'utf8');

}
function getVideoLink(word, type) {
  var arr;
  if (type === "BrE") {
    arr = britishVideo;
  } else {
    arr = americanVideo;
  }
  var videoLink;
  arr.forEach(function (obj) {
    if (obj['Video name'] === word) {
      videoLink = obj['Embed code'];
      return false;
    }
  });
  if (!videoLink) {
    console.log('cannot find video for ' + word + " in " + type);
  }
  return videoLink;
}

function loadFrameworkXml() {

  $.ajax({// to get project list
    type: "GET",
    url: xml_file_path,
    dataType: "xml",
    success: function (xml) {
      console.log(xml);

    },
    error: function (err) {
      var xml = $.parseXML(err.responseText);

      console.log(project_xml_data);
      loadXml(xml)
    }
  });
}

function loadXml(xml) {
  var sound_data = {
    "sounds": [],
  }
  $(xml).find('phoneme').each(function (phoneme) {
    var word = $(this).attr('word');
    var wordObj = {};
    wordObj.phoneme = word;
    wordObj.name = "/ " + word + " /";
    wordObj.BrE = {
      videoLink: '',
      listen_and_record: {
        rubric: '',
        questions: []
      },
      practice: []
    };
    wordObj.AmE = {
      videoLink: '',
      listen_and_record: {
        rubric: '',
        questions: []
      },
      practice: []
    };
    wordObj.BrE.videoLink = getVideoLink(word, 'BrE');
    wordObj.AmE.videoLink = getVideoLink(word, 'AmE');
    $(this).find('BrE').find('listen_and_record').find('practice').each(function (listen_and_record) {

      wordObj.BrE.listen_and_record.rubric = $(this).find('rubric').html();
      $(this).find('question').each(function (quest) {
        var listRecordObj = {};
        listRecordObj.word = $(this).find('word').text();
        listRecordObj.audio = $(this).find('audio').text();

        wordObj.BrE.listen_and_record.questions.push(listRecordObj);
      })

    });
    $(this).find('AmE').find('listen_and_record').find('practice').each(function (listen_and_record) {

      wordObj.AmE.listen_and_record.rubric = $(this).find('rubric').html();
      $(this).find('question').each(function (quest) {
        var listRecordObj = {};
        listRecordObj.word = $(this).find('word').text();
        listRecordObj.audio = $(this).find('audio').text();

        wordObj.AmE.listen_and_record.questions.push(listRecordObj);
      })

    });
    $(this).find('BrE').find('> practice').each(function (practice) {

      var practiceObj = {}
      practiceObj.set = $(this).attr('set');
      practiceObj.rubric = $(this).find('rubric').html();
      practiceObj.questions = [];
      $(this).find('question').each(function (quest) {
        var quesObj = {};
        quesObj.options = [];
        quesObj.ques = $(this).find('word').text();
        var transcript = $(this).find('transcription').html().trim();
        transcript = transcript.replace(/<show/g, " <span class='highlightTranscript'");
        transcript = transcript.replace(/<\/show/g, " </span");
        quesObj.transcription = transcript;
        $(this).find('audio').each(function () {
          var correct = $(this).attr('correct');
          var audioObj = {};
          if (correct == "y") {
            audioObj.correct = true;
          } else {
            audioObj.correct = false;
          }
          audioObj.audio = $(this).html();
          quesObj.options.push(audioObj);
        })
        practiceObj.questions.push(quesObj);
      })
      wordObj.BrE.practice.push(practiceObj);
    });
    $(this).find('AmE').find('> practice').each(function (practice) {

      var practiceObj = {}
      practiceObj.set = $(this).attr('set');
      practiceObj.rubric = $(this).find('rubric').html();
      practiceObj.questions = [];
      $(this).find('question').each(function (quest) {
        var quesObj = {};
        quesObj.options = [];
        quesObj.ques = $(this).find('word').text();
        var transcript = $(this).find('transcription').html();
        transcript = transcript.replace(/<show/g, " <span class='highlightTranscript'");
        transcript = transcript.replace(/<\/show/g, " </span");
        quesObj.transcription = transcript;
        $(this).find('audio').each(function () {
          var correct = $(this).attr('correct');
          var audioObj = {};
          if (correct == "y") {
            audioObj.correct = true;
          } else {
            audioObj.correct = false;
          }
          audioObj.audio = $(this).html();
          quesObj.options.push(audioObj);
        })
        practiceObj.questions.push(quesObj);
      })
      wordObj.AmE.practice.push(practiceObj);
    });
    sound_data.sounds.push(wordObj);

  });
  console.log(sound_data);
  var json = JSON.stringify(sound_data);

  fs.writeFile('E:/projects/OUP_ISpeaker/ispeaker/src/assets/json/sound_data.json', json, 'utf8');
  $('.alert').hide();
  $('.alert-success').show();
}

