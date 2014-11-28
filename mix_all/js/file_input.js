function handleFiles(files) {
    var preview = document.getElementById("preview");
    preview.innerHTML = '';

    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var imageType = /image.*/;

        if (!file.type.match(imageType)) {
            continue;
        }

        var metadata = document.createTextNode("Name: " + file.name + " Size: " + file.size + "bytes " + " Type: " + file.type);
        var img = document.createElement("img");
        img.classList.add("obj");
        img.file = file;
        preview.appendChild(document.createElement("br"));
        preview.appendChild(metadata);
        preview.appendChild(document.createElement("br"));
        preview.appendChild(img);
        preview.appendChild(document.createElement("br"));

        var reader = new FileReader();
        reader.onload = (function (aImg) {
            return function (e) {
                aImg.src = e.target.result;
            };
        })(img);
        reader.readAsDataURL(file);
    }
}
