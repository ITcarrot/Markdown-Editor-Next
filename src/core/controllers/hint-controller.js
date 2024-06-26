class HintController {
  constructor() {
    if (!HintController.instance) {
      this.hints = {};
      HintController.instance = this;
    }
    return HintController.instance;
  }

  registerHint(name, hintFunc) {
    this.hints[name] = hintFunc;
  }

  triggerHintFunc(name, hintFunc) {
    if (hintFunc) {
      hintFunc();
    } else if (this.hints[name]) {
      this.hints[name]();
    } else {
      console.warn(`Hint ${name} not registered.`);
    }
  }

  triggerHint(name) {
    if (this.hints[name]) {
      this.hints[name]();
    } else {
      console.warn(`Hint ${name} not registered.`);
    }
  }
}

const hintController = new HintController();
Object.freeze(hintController);

export default hintController;