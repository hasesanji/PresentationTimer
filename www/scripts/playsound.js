var media1 = null;
var media2 = null;
var mediaTimer = null;
var srcFile1 = "music/chime1.wav";
var srcFile2 = "music/chime2.wav";

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    console.log("ready");
    media1 = new Media (getPath() + srcFile1 , onSuccess, onError);
    media2 = new Media (getPath() + srcFile2 , onSuccess, onError);
}

function RingBell(argMediaKind){
    mediaKind = argMediaKind;
    switch(argMediaKind)  
    {
    case 1:
        playSound(media1);
        break;
    case 2:
        playSound(media2);
        break;
    }
};

function getPath() {
    var str = location.pathname;
    var i = str.lastIndexOf('/');
    return str.substring(0,i+1);
}

function playSound(media){
    // play the media file one time.
    media.play({numberOfLoops: 0});
    // start the timer
    if (mediaTimer == null) {
        mediaTimer = setInterval(function() {
            // Return a current playback position
            media.getCurrentPosition(
                //A Callback function if it's success
                function(position) {
                    if (position > -1) {
                        //If the playback stops at "-0.001" position, set the timer to 0.
                        if(position == -0.001){
                            position = 0;
                        }
                    }
                },
                //A callback function in case of failure
                function(error) {
                    console.log("Error getting pos=" + error);
                }
            );
        }, 1000);
    }
}

function pauseSound(media){
    if (media) {
        media.pause();
    }
}

function stopSound(media){
    if (media) {
        media.stop();
    }
}

function onSuccess(){
    console.log("Successfully initialize a media file.");
}

function onError(error){
    console.log("Failed to initialize a media file. [ Error code: " + error.code + ", Error message: " + error.message + "]");
}

