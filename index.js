'use strict'

const path = require('path')
const {exec} = require('child_process')
const esc = require('any-shell-escape')

const cmds = { // signature: path, dest, filter
	'.zip': (p, d) => [
		'unzip',
		'-j', '-o', // flatten, overwrite
		'-d', d, // destination dir
		p, // archive
	],
	'.tar.gz': (p, d) => [
		'tar', '-xz',
		'--strip-components', '1', // flatten
		'-C', d, // destination dir
		'-f', p, // archive
	]
}
const endings = Object.keys(cmds)

const decompress = (src, dest, cb) => {
	const file = path.basename(src)
	const ending = endings.find(e => file.slice(-e.length) === e)
	if (!ending) return Promise.reject(new Error('cannot decompress ' + file))
	const cmd = cmds[ending](src, dest)

	exec(esc(cmd), {stdio: 'ignore'}, (err) => cb(err))
}

module.exports = decompress
