// const editor_model = require('./editor-model.js');

function handleWindowBeforeUnload() {
  if (editor_model.before_window_unload_message !== null) {
    return editor_model.before_window_unload_message;
  }
}

function handleEditorChange() {
  editor_model.setStatusSaved(false);
  clearTimeout(editor_model.preview_timer);
  editor_model.preview_timer = setTimeout(function () {
    RenderMarkdown($("#editor-preview"), editor_model.editor.getValue());
  }, 500);
}

function handleEditorPaste(editor, e) {
  if (!(e.clipboardData && e.clipboardData.files[0])) {
    return;
  }
  const reader = new FileReader();
  reader.readAsDataURL(e.clipboardData.files[0]);
  reader.onload = function (evt) {
    const str = addImg(evt.target.result);
    editor_model.insertAtCursor("![](" + str + ")");
  };
}

function handleNewFile() {
  editor_model.newFile();
}

function handleOpenFile() {
  if (!editor_model.saved && !confirm("您所编辑的内容尚未保存，是否继续？")) return;
  $("#openFile").val("");
  $("#openFile").trigger("click");
}

function handleOpenFileChange() {
  const newFileEntry = $(this).val();
  editor_model.loadFile(newFileEntry);
}

function handleSaveFile() {
  if (editor_model.FileEntry) editor_model.saveFile();
  else $("#saveFile").trigger("click");
}

function handleSaveFileChange() {
  editor_model.FileEntry = $(this).val();
  if (!/\.[^\s/\\]+$/.test(editor_model.FileEntry)) editor_model.FileEntry += ".md";
  document.title = editor_model.FileEntry;
  $("#filename").text(editor_model.FileEntry);
  editor_model.saveFile();
}

function handlePrint() {
  if (!editor_model.saved) {
    alert("请先保存");
    return;
  }
  window.open("../../plugins/Printer/print.html?" + encodeURI(editor_model.FileEntry));
}

// module.exports = {
//   handleWindowBeforeUnload,
//   handleEditorChange,
//   handleEditorPaste,
//   handleNewFile,
//   handleOpenFile,
//   handleOpenFileChange,
//   handleSaveFile,
//   handleSaveFileChange,
//   handlePrint
// };
