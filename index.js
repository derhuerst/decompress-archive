'use strict'

const path = require('path')
const {exec} = require('child_process')
const esc = require('any-shell-escape')

const cmds = { // signature: path, dest, filter
	'.zip': (p, d, f) => {
		const cmd = [
			'unzip',
			'-o', // overwrite
			'-d', d // destination dir
		]
		if (f) cmd.push('-j') // flatten
		cmd.push(p) // archive
		return cmd
	},
	'.tar.gz': (p, d, f) => {
		const cmd = [
			'tar',
			'-xz', // extract, gzip
			'-C', d, // destination dir
			'-f', p // archive
		]
		if (f) cmd.push('--strip-components', '10') // flatten by 10 levels
		return cmd
	}
}
const endings = Object.keys(cmds)

const decompress = (src, dest, flatten, cb) => {
	if ('function' === typeof flatten) {
		cb = flatten
		flatten = false
	}

	const file = path.basename(src)
	const ending = endings.find(e => file.slice(-e.length) === e)
	if (!ending) return Promise.reject(new Error('cannot decompress ' + file))
	const cmd = cmds[ending](src, dest, !!flatten)

	exec(esc(cmd), {stdio: 'ignore'}, (err) => cb(err))
}

module.exports = decompress
