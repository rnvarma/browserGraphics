var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/javascript");

function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie != '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = $.trim(cookies[i]);
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) == (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

function runCode(editor) {
    var code = editor.getValue();
    if ($("#animation")) $("#animation").remove();
    code = '<script type="text/javascript" id="animation" \>' + code + ' init(data);</script\>'
    $("body").append(code);
}

editor.commands.addCommand({
    name: 'build',
    bindKey: {win: 'Ctrl-B',  mac: 'Command-B'},
    exec: runCode,
    readOnly: false // false if this command should not apply in readOnly mode
});

editor.commands.addCommand({
    name: 'save',
    bindKey: {win: 'Ctrl-S',  mac: 'Command-S'},
    exec: function(editor) {
        $.ajax({
          type: "POST",
          url: '/save',
          beforeSend: function (xhr) {
            xhr.withCredentials = true;
            xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
          },
          data: {
            code: editor.getValue()
          },
          success: function(uuid) {
            window.location.href = '/' + uuid + '/edit';
          },
        });
    },
    readOnly: false // false if this command should not apply in readOnly mode
});

runCode(editor)