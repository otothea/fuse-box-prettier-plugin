class PrettierPlugin {
  constructor(options) {
    this.options = options || {};
    this.test = /.*/;
  }

  init(context) {
    context.allowExtension('*');
  }

  transform(file) {
    if (process.env.NODE_ENV === 'production') {
      return;
    }

    const { format } = require('prettier');
    const { readFileSync, writeFileSync } = require('fs');

    const context = file.context;
    if (context.useCache) {
      if (file.loadFromCache()) {
        return;
      }
    }

    const code = readFileSync(file.relativePath).toString();
    const newCode = format(code, {
      filepath: file.relativePath,
      ...this.options
    });

    if (code !== newCode) {
      writeFileSync(file.relativePath, newCode);
    }
  }
}

module.exports = options => new PrettierPlugin(options);
