class PanelController {
  constructor() {
    if (!PanelController.instance) {
      this.panels = {};
      PanelController.instance = this;
    }
    return PanelController.instance;
  }

  registerPanel(name, panel) {
    this.panels[name] = panel;
  }

  togglePanel(name) {
    if (this.panels[name]) {
      this.panels[name].toggle();
    } else {
      console.warn(`Panel ${name} not registered.`);
    }
  }

  setPanel(name, enable) {
    if (this.panels[name]) {
      if (enable) {
        this.panels[name].show();
      } else {
        this.panels[name].hide();
      }
    } else {
      console.warn(`Panel ${name} not registered.`);
    }
  }
}

const panel_controller = new PanelController();

//   export default panelController;