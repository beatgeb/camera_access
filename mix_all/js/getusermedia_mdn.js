(function () {

    var error = document.querySelector("#error");
    navigator.getUserMedia = ( navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia);

    if (navigator.getUserMedia) {
        navigator.getUserMedia(
            // constraints
            {
                video: true,
                audio: false
            },

            // successCallback
            function (stream) {
                var video = document.querySelector('#getusermedia_mdn video');
                video.autoplay = true;

                if ((typeof MediaStream !== "undefined" && MediaStream !== null) && stream instanceof MediaStream) {

                    if (video.mozSrcObject !== undefined) { //FF18a
                        video.mozSrcObject = stream;
                    } else { //FF16a, 17a
                        video.src = stream;
                    }

                    return video.play();

                } else {
                    var vendorURL = window.URL || window.webkitURL;
                    video.src = vendorURL ? vendorURL.createObjectURL(stream) : stream;
                }

                video.onerror = function () {
                    stream.stop();
                    streamError();
                };
            },

            // errorCallback
            function (err) {
                var t = document.createTextNode("The following error occured: " + err + "\n");
                error.appendChild(t);
            }
        );
    } else {
        var t = document.createTextNode("getUserMedia not supported\n");
        error.appendChild(t);
    }
})();