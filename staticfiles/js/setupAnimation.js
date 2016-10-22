var elem = document.getElementById('canvas');
var params = { width: "100%", height: "100%" };
var two = new Two(params).appendTo(elem);
var data = {}

function create_oval(x1, y1, x2, y2, options) {
    if (options === undefined) options = {};
    var r = (x1 - x2) / 2;
    var cx = (x1 + x2) / 2;
    var cy = (y1 + y2) / 2;
    var obj = two.makeCircle(cx, cy, r);
    if (options.fill !== undefined) obj.fill = options.fill;
    if (options.outlineColor !== undefined) obj.stroke = options.outlineColor;
    if (options.outline !== undefined) obj.linewidth = options.outline;
    if (options.outline !== undefined && options.outline === 0) obj.noStroke();
}

function create_rect(x1, y1, x2, y2, options) {
    if (options === undefined) options = {};
    var obj = two.makeRectangle(x1, y1, x2 - x1, y2 - y1);
    if (options.fill !== undefined) obj.fill = options.fill;
    if (options.outlineColor !== undefined) obj.stroke = options.outlineColor;
    if (options.outline !== undefined) obj.linewidth = options.outline;
    if (options.outline !== undefined && options.outline === 0) obj.noStroke();
}

function init(data) {}
function keyPressed(data, event) {}
function mousePressed(data, event) {}
function timerFired(data, frameCount) {}
function redrawAll(data) {}