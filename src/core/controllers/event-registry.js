// const editor_model = require('../models/editor-model.js');

class EventRegistry {
  // Singleton
  constructor() {
    if (!EventRegistry.instance) {
      this.eventMap = {};
      EventRegistry.instance = this;
    }
    return EventRegistry.instance;
  }

  register(event, handler) {
    this.eventMap[event] = handler;
  }

  init() {
    $(window).on("beforeunload", this.eventMap['beforeunload']);

    editor_model.editor.on("change", this.eventMap['editorChange']);
    editor_model.editor.on("paste", this.eventMap['editorPaste']);

    $("#new").on("click", this.eventMap['newFile']);
    $("#open").on("click", this.eventMap['openFile']);
    $("#openFile").on("change", this.eventMap['openFileChange']);
    $("#save").on("click", this.eventMap['saveFile']);
    $("#saveFile").on("change", this.eventMap['saveFileChange']);
    $("#print").on("click", this.eventMap['print']);
  }
}

// 单例模式实例化 EventRegistry
const event_registry = new EventRegistry();

// module.exports = event_registry;
