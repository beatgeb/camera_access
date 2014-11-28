(function () {
    var liveVideo = document.querySelector("#getusermedia #live-video");
    navigator.getUserMedia = ( navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia);
        error = document.querySelector("#error");

    alert(navigator.getUserMedia);

    if (liveVideo && navigator.getUserMedia) {
        navigator.getUserMedia(// constraints
            {
                video: true,
                audio: true
            },
            function (media) {
                alert(media);
                liveVideo.src = window.webkitURL.createObjectURL(media);
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
