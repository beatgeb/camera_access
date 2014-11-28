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
            function (localMediaStream) {
                var video = document.querySelector('#getusermedia_mdn video');
                video.src = window.URL.createObjectURL(localMediaStream);
                video.play();
                // Do something with the video here, e.g. video.play()
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