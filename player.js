var frame = document.querySelector('#frame')
var canvas = document.querySelector('#canvas')
var timer, images
var delay = 3000 / 49
var currentFrame = 0

function play() {
	if (images[currentFrame].readyState != 2) {
		return
	}
    frame.src = images[currentFrame].result
    currentFrame = (currentFrame + 1) % images.length
}

function toArray(array) {
	var result = []
	for (var i = 0; i < array.length; i++) {
		result.push(array[i])
	}
	return result
}

function resetTimer(delay) {
    clearInterval(timer)
    timer = setInterval(play, delay)
}

document.querySelector('input[type="range"]').onchange = function (event) {
    var value = event.target.value
    document.querySelector('#delay-value').textContent = value
    resetTimer(value)
}

document.querySelector('input[type="file"]').onchange = function(event) {
	if (!event.target.files || event.target.files.length == 0) {
		return
	}
    images = toArray(event.target.files).filter(function(f) {
        return f.type.match("image/*");
    }).sort(function(a, b) {
        return a.name < b.name ? -1 : 1;
    }).map(function(f) {
        var reader = new FileReader()
        reader.readAsDataURL(f)
        return reader
    });
    clearInterval(timer)
    timer = setInterval(play, delay)
}