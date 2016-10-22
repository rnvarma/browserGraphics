var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/javascript");



function runCode(editor) {
    var code = editor.getValue();
    if ($("#animation")) $("#animation").remove();
    code = '<script type="text/javascript" id="animation" \>' + code + ' init(data);</script\>'
    $("body").append(code);
}

runCode(editor)