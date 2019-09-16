function prova() {
    alert('prova di appo');
}

function __log(e, data) {
    log.innerHTML += "\n" + e + " " + (data || '');
}

var audio_context;
var recorder;

function startUserMedia(stream) {
    var input = audio_context.createMediaStreamSource(stream);
    console.log('Media stream created.');

    // Uncomment if you want the audio to feedback directly
    //input.connect(audio_context.destination);
    //__log('Input connected to audio context destination.');

    recorder = new Recorder(input);
    __log(recorder);
    __log('Recorder initialised.');
}

function startRecording(button) {
    recorder && recorder.record();
    console.log('Recording...');
}

function stopRecording(button) {
    recorder && recorder.stop();
    console.log('Stopped recording.');

    // create WAV download link using audio data blob
    createDownloadLink();
    //recorder.clear();

}
function creaLink(){
  recorder.exportWAV(function(blob){
    var url = URL.createObjectURL(blob);
    return url;
  });

}

function createDownloadLink() {
    recorder.exportWAV(function(blob) {
        var url = URL.createObjectURL(blob);
        //alert(url);
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

function uploadOnBucket(filename, directory) {
    const endpoint = 'https://emomaiolix.appspot.com/emotions/repository';
    var xhr = new XMLHttpRequest();
    if (directory != undefined)
        namedFile = directory + '/' + filename + '.wav';
    else
        namedFile = filename;
    var fd = new FormData();
    recorder.exportWAV(function(blob) {
        //alert(blob);
        fd.append("file", blob, filename);
        fd.append("nome", namedFile);
        xhr.open("POST", endpoint, true);
        xhr.send(fd);
        //alert('finito forse');
    });
    recorder.clear();
}

function getRecorder() {
    return recorder;

}

function enableMic() {
   __log('entrato in enableMic');
    try {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
        window.URL = window.URL || window.webkitURL;
        var constraints = { audio: true, video:false }
        audio_context = new AudioContext();

        console.log('Audio context set up.');
        console.log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
    } catch (error) {
        console.log(e);
    }

}


var recordObjectMaiolix = (function() {
    return {
        recorder: function() {
            (function($) {
                'use strict';
                try {
                    alert('entrato try');
                    window.AudioContext = window.AudioContext || window.webkitAudioContext;
                    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
                    window.URL = window.URL || window.webkitURL;
                    audio_context = new AudioContext();
                    alert(audio_context);
                    __log('Audio context set up.');
                    __log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));

                } catch (error) {
                    alert('No web audio support in this browser!');
                }
                navigator.getUserMedia({ audio: true }, startUserMedia, function(e) {
                    __log('No live audio input: ' + e);
                });
            })
        }
    }
})(recordObjectMaiolix || {});

function attivaMic(){
  try {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
    window.URL = window.URL || window.webkitURL;
    audio_context=new AudioContext;
    console.log('Audio context set up.');
    console.log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
  } catch (error) {
    console.log('No web audio support in this browser!');
  }
  navigator.getUserMedia({ audio: true }, startUserMedia, function(e) {
    console.log('No live audio input: ' + e);
  });
}


var recorderObject = (function() {
    return {
        recorder: function() {
            (function($) {
                'use strict';
                window.onload = function init() {
                    try {
                        // webkit shim
                        window.AudioContext = window.AudioContext || window.webkitAudioContext;
                        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
                        window.URL = window.URL || window.webkitURL;

                        audio_context = new AudioContext;
                        __log('Audio context set up.');
                        __log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
                    } catch (e) {
                        alert('No web audio support in this browser!');
                    }

                    navigator.getUserMedia({ audio: true }, startUserMedia, function(e) {
                        __log('No live audio input: ' + e);
                    });
                };
            })(window.jQuery);
        }
    }
})(recorderObject || {})
