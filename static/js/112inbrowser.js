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

function saveCode(editor) {
  var givenuuid = $("#uuid").attr("data-uuid");
  if (!givenuuid) {
    $("#saveModal").click();
  } else {
    $.ajax({
      type: "POST",
      url: '/save',
      beforeSend: function (xhr) {
        xhr.withCredentials = true;
        xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
      },
      data: {
        code: editor.getValue(),
        uuid: givenuuid,
        password: $("#pw").attr("data-pw")
      },
      success: function(uuid) {
        if (uuid == "False") window.location.href = "/"
      },
    });
  }
}

$(document).ready(function() {
  $("#program-name").bind("change paste keyup", function(e) {
    var name = $(this).val();
    var elem = $(this);
    if (!name) {
      elem.parent().addClass("has-error")
      elem.parent().removeClass("has-success")
      return;
    }
    $.ajax({
      type: "POST",
      url: '/checkname',
      beforeSend: function (xhr) {
        xhr.withCredentials = true;
        xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
      },
      data: {
        name: name
      },
      success: function(isTaken) {
        if (isTaken == "False") {
          elem.parent().addClass("has-success");
          elem.parent().removeClass("has-error");
        } else {
          elem.parent().addClass("has-error")
          elem.parent().removeClass("has-success")
        }
      },
    });
  });

  function saveFormSubmit(e) {
    e.preventDefault()
    if (!$("#program-name").parent().hasClass("has-error")) {
      $.ajax({
        type: "POST",
        url: '/save',
        data: {
          code: editor.getValue(),
          uuid: $("#program-name").val(),
          password: $("#program-pw").val(),
        },
        success: function(uuid) {
          window.location.href = '/' + uuid + '/edit';
        },
      });
    }
  }

  $(".saveForm").submit(saveFormSubmit)
  $("#saveModalSaveBtn").click(saveFormSubmit);

  var givenuuid = $("#uuid").attr("data-uuid");


  if (givenuuid) {
    $("#passwordModalBtn").click();

    function pwformSubmit(e) {
      e.preventDefault()
      var pw = $("#enter-pw").val();
      if (!pw) {
        $("#enter-pw").parent().parent().addClass("has-error");
        return;
      }

      $.ajax({
        type: "POST",
        url: '/verifypw',
        data: {
          uuid: givenuuid,
          password: pw,
        },
        success: function(verified) {
          if (verified == "True") {
            $("#passwordModal").modal("hide");
            $("#pw").attr("data-pw", pw);
          } else{
            console.log("failed")
            $("#enter-pw").parent().parent().addClass("has-error");
          }
        },
      });
    }

    $("#pwModalBtn").click(pwformSubmit)
    $(".pw-form").submit(pwformSubmit)
  }
})


editor.commands.addCommand({
    name: 'build',
    bindKey: {win: 'Ctrl-B',  mac: 'Command-B'},
    exec: runCode,
    readOnly: false // false if this command should not apply in readOnly mode
});


editor.commands.addCommand({
    name: 'save',
    bindKey: {win: 'Ctrl-S',  mac: 'Command-S'},
    exec: saveCode,
    readOnly: false // false if this command should not apply in readOnly mode
});

runCode(editor)