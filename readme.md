# decompress-archive

**Extract/decompress archives.** Uses native CLI tools such as `unzip` and `tar` and therefore only works in Node.js.

Similar to [decompress](https://github.com/kevva/decompress#decompress-) and [compressjs](https://github.com/cscott/compressjs#compressjs). `decompress-archive` however

- should be faster because it uses native `unzip` etc,
- is more lightweight, but *does not* work in the browser,
- has no command line interface.

[![npm version](https://img.shields.io/npm/v/decompress-archive.svg)](https://www.npmjs.com/package/decompress-archive)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/decompress-archive.svg)
[![chat on gitter](https://badges.gitter.im/derhuerst.svg)](https://gitter.im/derhuerst)


## Installing

```shell
npm install decompress-archive
```


## Usage

```js
const decompress = require('decompress-archive')

decompress('path/to/archive.zip', 'path/to/dest', (err) => {
	if (err) console.error(err)
})
```


## API

```js
decompress(archive, dest, [flatten], cb)
```



## Contributing

If you have a question or have difficulties using `decompress-archive`, please double-check your code and setup first. If you think you have found a bug or want to propose a feature, refer to [the issues page](https://github.com/derhuerst/decompress-archive/issues).
