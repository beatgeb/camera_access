(function () {
    var liveVideo = document.querySelector("#getusermedia #live-video");
    navigator.getUserMedia = ( navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia);
        error = document.querySelector("#error");

    if (liveVideo && navigator.getUserMedia) {
        navigator.getUserMedia(// constraints
            {
                video: true,
                audio: false
            },
            function (stream) {
                var liveVideo = document.querySelector("#getusermedia #live-video");
                liveVideo.autoplay = true;

                if ((typeof MediaStream !== "undefined" && MediaStream !== null) && stream instanceof MediaStream) {

                    if (liveVideo.mozSrcObject !== undefined) { //FF18a
                        liveVideo.mozSrcObject = stream;
                    } else { //FF16a, 17a
                        liveVideo.src = stream;
                    }

                    return liveVideo.play();

                } else {
                    var vendorURL = window.URL || window.webkitURL;
                    liveVideo.src = vendorURL ? vendorURL.createObjectURL(stream) : stream;
                }

                liveVideo.onerror = function () {
                    stream.stop();
                    streamError();
                };

            },
            function (error) {
                var t = document.createTextNode("An error occurred: " + error + "\n");
                error.appendChild(t);
            }
        );
    }
    else {
        var t = document.createTextNode("getUserMedia not supported\n");
        error.appendChild(t);
    }
})();
