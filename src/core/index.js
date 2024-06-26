// const editor_model = require('./models/editor-model.js');
// const event_registry = require('./controllers/event-registry.js');

// const {
//   handleWindowBeforeUnload,
//   handleEditorChange,
//   handleEditorPaste,
//   handleNewFile,
//   handleOpenFile,
//   handleOpenFileChange,
//   handleSaveFile,
//   handleSaveFileChange,
//   handlePrint
// } = require('./models/event-handlers.js');

onload = function () {
  editor_model.setStatusSaved(false);

  event_registry.register('beforeunload', handleWindowBeforeUnload);
  event_registry.register('editorChange', handleEditorChange);
  event_registry.register('editorPaste', handleEditorPaste);
  event_registry.register('newFile', handleNewFile);
  event_registry.register('openFile', handleOpenFile);
  event_registry.register('openFileChange', handleOpenFileChange);
  event_registry.register('saveFile', handleSaveFile);
  event_registry.register('saveFileChange', handleSaveFileChange);
  event_registry.register('print', handlePrint);
  
  event_registry.init();

  // editor = CodeMirror($("#editor")[0], {
  //   mode: "markdown",
  //   theme: "default",
  //   indentUnit: 4,
  //   indentWithTabs: true,
  //   lineWrapping: true,
  //   lineNumbers: true,
  //   autoCloseBrackets: true,
  //   autoCloseTags: true,
  //   matchBrackets: true,
  //   matchTags: true,
  //   foldGutter: true,
  //   gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
  //   scrollPastEnd: true,
  //   highlightSelectionMatches: { annotateScrollbar: true },
  //   styleActiveLine: { nonEmpty: true },
  //   extraKeys: {
  //     "Ctrl-S": (cm) => { $("#save").trigger("click"); },
  //     "Ctrl-/": "toggleComment",
  //     Enter: "newlineAndIndentContinueMarkdownList",
  //     "Ctrl-F": "findPersistent",
  //   },
  // });
};
