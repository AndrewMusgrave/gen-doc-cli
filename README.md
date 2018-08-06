# gen-doc-cli

Generate documentation from tag based comments. Gendoc will start at the entry point and recursively crawl through all files and directories. The output will be an array of generate docs in `json` format.

## Install

```bash
npm install gen-doc-cli
```

## Usage

```bash
# help message
gendoc -h
gendoc --help

# generate docs
gendoc --entry src\\components --output docs.json
```

## API

### readdirSync(dir, onDir, onFile, ignoreDir)

| Param        | Type                            | Default | Description               |
| ------------ | ------------------------------- | ------- | ------------------------- |
| -h, --help   |                                 |         | displays the help message |
| -e, --entry  | (filePath: string): void or any |         | entry point for gendoc    |
| -o, --output | (filePath: string): void or any |         | output location           |

## Example files

```js
/**
 * @name isFunction
 * @param {function} fn The function to check
 * @returns {boolean} Returns a true if `fn` is a function otherwise false
 * @example
 *  isFunction(null)
 *  // => false
 *
 *  isFunction(() => {})
 *  // => true
 */
const isFunction = fn => {
  return typeof fn === "function";
};

/**
 * @name isObject
 * @param {object} obj The object to check
 * @returns {boolean} Returns a true if `obj` is a object otherwise false
 * @example
 *  isObject(null)
 *  // => false
 *
 *  isObject({})
 *  // => true
 */
const isObject = obj => {
  return obj !== null && !isFunction(obj) && typeof obj === "object";
};

/**
 * @name last
 * @param {array} arr The array to check
 * @returns {array} Returns the last element of `arr`
 * @example
 *  last([])
 *  // => undefined
 *
 *  last([1,2])
 *  // => 2
 */
const last = arr => {
  return arr != null && arr.length ? arr[arr.length - 1] : undefined;
};
```

### TODO
* Add tests
* Support `.gendocrc`
* Support multiple entry points from cmd line
* Add the ability to ignore files or directories
* Add file types

### Issues
* Files without a name may not be accessable e.g. `.example`
* git should be ignored