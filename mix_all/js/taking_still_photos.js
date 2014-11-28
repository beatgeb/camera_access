(function() {

    var streaming = false,
        video        = document.querySelector('#taking_still_photos #video'),
        canvas       = document.querySelector('#taking_still_photos #canvas'),
        photo        = document.querySelector('#taking_still_photos #photo'),
        startbutton  = document.querySelector('#taking_still_photos #startbutton'),
        width = 320,
        height = 0;

    navigator.getMedia = ( navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia);

    navigator.getMedia(
        {
            video: true,
            audio: false
        },
        function(stream) {
            var video = document.querySelector('#taking_still_photos #video');
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
        function(err) {
            console.log("An error occured! " + err);
        }
    );

    video.addEventListener('canplay', function(ev){
        if (!streaming) {
            height = video.videoHeight / (video.videoWidth/width);
            video.setAttribute('width', width);
            video.setAttribute('height', height);
            canvas.setAttribute('width', width);
            canvas.setAttribute('height', height);
            streaming = true;
        }
    }, false);

    function takepicture() {
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(video, 0, 0, width, height);
        var data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
    }

    startbutton.addEventListener('click', function(ev){
        takepicture();
        ev.preventDefault();
    }, false);

})();