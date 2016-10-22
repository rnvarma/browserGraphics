var canvas = $("#canvas")

$("#click-layer").click(function(e) {
    mousePressed(data, event);
})

$(document).keydown(function(event) {
    keyPressed(data, event);
})

data.width = canvas.width()
data.height = canvas.height()

init(data)
two.bind('update', function(frameCount) {
    data.width = canvas.width()
    data.height = canvas.height()
    // circle.translation.set(circle.translation._x + 1, circle.translation._y)
    timerFired(data, frameCount)
    two.clear()
    redrawAll(data)
}).play();