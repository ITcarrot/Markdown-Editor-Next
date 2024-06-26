const fs = require('fs');

class EditorModel {
  // Singleton
  constructor() {
    if (!EditorModel.instance) {
      this.editor = null;
      this.saved = false;
      this.preview_timer = -1;
      this.autosave_timer = -1;
      this.FileEntry = null;
      this.before_window_unload_message = null;
      this.initEditor();
      EditorModel.instance = this;
    }
    return EditorModel.instance;
  }

  initEditor() {
    this.editor = CodeMirror($("#Editor")[0], {
      mode: "markdown",
      theme: "default",
      indentUnit: 4,
      indentWithTabs: true,
      lineWrapping: true,
      lineNumbers: true,
      autoCloseBrackets: true,
      autoCloseTags: true,
      matchBrackets: true,
      matchTags: true,
      foldGutter: true,
      gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
      scrollPastEnd: true,
      highlightSelectionMatches: { annotateScrollbar: true },
      styleActiveLine: { nonEmpty: true },
      extraKeys: {
        "Ctrl-S": (cm) => { $("#save").trigger("click"); },
        "Ctrl-/": "toggleComment",
        Enter: "newlineAndIndentContinueMarkdownList",
        "Ctrl-F": "findPersistent",
      },
    });
  }

  setStatusSaved(val) {
    this.saved = val;
    if (val) {
      this.before_window_unload_message = null;
      $("#save-tag").hide();
      clearTimeout(this.autosave_timer);
      this.autosave_timer = -1;
    } else {
      this.before_window_unload_message = "您所编辑的内容尚未保存";
      $("#save-tag").show();
      if (this.FileEntry && this.autosave_timer == -1) {
        this.autosave_timer = setTimeout(this.saveFile.bind(this), 300000);
      }
    }
  }

  saveFile() {
    fs.writeFile(this.FileEntry, this.editor.getValue() + getImgStr(), (err) => {
      if (err) {
        alert("Write failed: " + err);
        return;
      }
      this.setStatusSaved(true);
    });
  }

  loadFile(newFileEntry) {
    fs.readFile(newFileEntry, (err, data) => {
      if (err) {
        alert("Read failed: " + err);
        return;
      }
      this.FileEntry = newFileEntry;
      document.title = this.FileEntry;
      $("#filename").text(this.FileEntry);
      data = imgExtract(String(data));
      this.editor.setValue(data);
      this.setStatusSaved(true);
    });
  }

  newFile() {
    const x = window.screenX + 10;
    const y = window.screenY + 10;
    window.open("../../../index.html", "_blank", "screenX=" + x + ",screenY=" + y);
  }

  insertAtCursor(string) {
    const doc = this.editor.getDoc();
    const cursor = doc.getCursor();
    doc.replaceRange(string, cursor);
  }
}

// 单例模式实例化 EditorModel
const editor_model = new EditorModel();

// module.exports = editor_model;


before_window_unload_message = null;
$(window).on("beforeunload", function () {
  if (before_window_unload_message !== null) {
    return before_window_unload_message;
  }
});

function set_saved(val) {
  saved = val;
  if (val) {
    before_window_unload_message = null;
    $("#save-tag").hide();
    clearTimeout(autosave_timer);
    autosave_timer = -1;
  } else {
    before_window_unload_message = "您所编辑的内容尚未保存";
    $("#save-tag").show();
    if (FileEntry && autosave_timer == -1)
      autosave_timer = setTimeout(save, 300000);
  }
}

function save() {
  fs.writeFile(FileEntry, editor.getValue() + getImgStr(), function (err) {
    if (err) {
      alert("Write failed: " + err);
      return;
    }
  });
  set_saved(true);
}

function InsertAtCursor(string) {
  var doc = editor.getDoc();
  var cursor = doc.getCursor();
  doc.replaceRange(string, cursor);
}

onload = function () {
  // init_editor
  editor = CodeMirror($("#editor")[0], {
    mode: "markdown",
    theme: "default",
    indentUnit: 4,
    indentWithTabs: true,
    lineWrapping: true,
    lineNumbers: true,
    autoCloseBrackets: true,
    autoCloseTags: true,
    matchBrackets: true,
    matchTags: true,
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    scrollPastEnd: true,
    highlightSelectionMatches: { annotateScrollbar: true },
    styleActiveLine: { nonEmpty: true },
    extraKeys: {
      "Ctrl-S": function (cm) {
        $("#save").trigger("click");
      },
      "Ctrl-/": "toggleComment",
      Enter: "newlineAndIndentContinueMarkdownList",
      "Ctrl-F": "findPersistent",
    },
  });
  set_saved(false);
  editor.on("change", function () {
    set_saved(false);
    clearTimeout(preview_timer);
    preview_timer = setTimeout(function () {
      RenderMarkdown($("#editor-preview"), editor.getValue());
    }, 500);
  });
  editor.on("paste", function (editor, e) {
    if (!(e.clipboardData && e.clipboardData.files[0])) {
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(e.clipboardData.files[0]);
    reader.onload = function (evt) {
      str = addImg(evt.target.result);
      InsertAtCursor("![](" + str + ")");
    };
  });
  $("#new").on("click", function () {
    var x = window.screenX + 10;
    var y = window.screenY + 10;
    window.open("../../../index.html", "_blank", "screenX=" + x + ",screenY=" + y);
  });
  $("#open").on("click", function () {
    if (!saved && !confirm("您所编辑的内容尚未保存，是否继续？")) return;
    $("#openFile").val("");
    $("#openFile").trigger("click");
  });
  $("#openFile").on("change", function () {
    var newFileEntry = $(this).val();
    fs.readFile(newFileEntry, function (err, data) {
      if (err) {
        alert("Read failed: " + err);
        return;
      }
      FileEntry = newFileEntry;
      document.title = FileEntry;
      $("#filename").text(FileEntry);
      data = imgExtract(String(data));
      editor.setValue(data);
      set_saved(true);
    });
  });
  $("#save").on("click", function () {
    if (FileEntry) save();
    else $("#saveFile").trigger("click");
  });
  $("#saveFile").on("change", function () {
    FileEntry = $(this).val();
    if (!/\.[^\s/\\]+$/.test(FileEntry)) FileEntry += ".md";
    document.title = FileEntry;
    $("#filename").text(FileEntry);
    save();
  });
  $("#print").on("click", function () {
    if (!saved) {
      alert("请先保存");
      return;
    }
    window.open("../../plugins/Printer/print.html?" + encodeURI(FileEntry));
  });
};

var editor;
var preview_timer = -1;
var autosave_timer = -1;
var FileEntry = null;
var saved;
