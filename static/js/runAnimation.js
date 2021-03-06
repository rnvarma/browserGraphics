var canvas = $("#canvas")

$("#click-layer").click(function(e) {
    mousePressed(data, event);
    redrawAll(data)
})

$(document).keydown(function(event) {
    keyPressed(data, event);
    redrawAll(data)
})

data.width = canvas.width()
data.height = canvas.height()
data.framesSkip = 20;

init(data)
two.bind('update', function(frameCount) {
    if (frameCount % data.framesSkip == 0) {
        data.width = canvas.width()
        data.height = canvas.height()
        // circle.translation.set(circle.translation._x + 1, circle.translation._y)
        timerFired(data, frameCount)
        two.clear()
        redrawAll(data)
    }
}).play();