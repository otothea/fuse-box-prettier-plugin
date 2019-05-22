class PrettierPlugin {
  constructor(options) {
    this.options = options || {};
    this.test = /\.(ts|tsx|js|jsx|css|scss)$/;
  }

  init(context) {
    context.allowExtension('.ts');
    context.allowExtension('.tsx');
    context.allowExtension('.js');
    context.allowExtension('.jsx');
    context.allowExtension('.css');
    context.allowExtension('.scss');
  }

  transform(file) {
    if (process.env.NODE_ENV === 'production') {
      return;
    }

    const {format} = require('prettier');
    const {readFileSync, writeFileSync} = require('fs');

    const context = file.context;
    if (context.useCache) {
      const cached = context.cache.getStaticCache(file);
      if (cached) {
        file.isLoaded = true;
        file.contents = cached.contents;
        return;
      }
    }

    const code = readFileSync(file.relativePath).toString();

    const newCode = format(code, {
      filepath: file.relativePath,
      singleQuote: true,
      trailingComma: 'es5',
      ...this.options,
    });

    if (code !== newCode) writeFileSync(file.relativePath, newCode);
  }
}

module.exports = options => new PrettierPlugin(options);
