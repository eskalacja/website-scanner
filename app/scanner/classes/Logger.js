class Logger {
  constructor(verbose) {
    this.verboseMode = verbose;
    this.console = console;
  }

  verbose(...args) {
    if (!this.verboseMode) {
      return;
    }

    this.console.log(...args);
  }

  out(...args) {
    this.console.log(...args);
  }
}

module.exports = {
  Logger,
};
