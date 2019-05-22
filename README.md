# fuse-box-prettier-plugin

Automatically make your stuff pretty using [Prettier](https://github.com/prettier/prettier).

## Install

```
npm install fuse-box-prettier-plugin
```

## Usage

```
const fsbx = require('fuse-box');
const PrettierPlugin = require('./fuse-box-prettier-plugin');

fsbx.FuseBox.init({
  homeDir: 'src/',
  plugins: [
    ...
    ['.ts|.tsx|.js|.jsx|.css|.scss', PrettierPlugin()],
  ],
}).bundle('> index.js');
```
