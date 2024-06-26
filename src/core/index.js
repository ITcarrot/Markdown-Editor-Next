
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

  // Panel registration
  panelController.registerPanel('latex-math-panel', {
    toggle: () => $('#latex-math-panel').toggle(),
    show: () => $('#latex-math-panel').show(),
    hide: () => $('#latex-math-panel').hide()
  });

  panelController.registerPanel('image-panel', {
    toggle: () => $('#image-panel').toggle(),
    show: () => $('#image-panel').show(),
    hide: () => $('#image-panel').hide()
  });

  panelController.registerPanel('printer-panel', {
    toggle: () => $('#printer-panel').toggle(),
    show: () => $('#printer-panel').show(),
    hide: () => $('#printer-panel').hide()
  });

  // Bind buttons to toggle panels
  $('#toggle-latex-math-panel').click(() => panelController.togglePanel('latex-math-panel'));
  $('#toggle-image-panel').click(() => panelController.togglePanel('image-panel'));
  $('#toggle-printer-panel').click(() => panelController.togglePanel('printer-panel'));

  // Hint registration
  hintController.registerHint('saveReminder', () => {
    console.log('Don\'t forget to save your work!');
  });

  // Trigger the hint
  hintController.triggerHint('saveReminder');
};
