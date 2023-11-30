import type { Plugin } from 'vite';
import type { SourceDescription } from 'rollup';
// import * as path from 'node:path'
import * as mdsvexSlim from './mdsvex-slim-compiler.mjs'


export function mdsvex(option: Partial<mdsvexSlim.MdxsvexOption> = {}): Plugin {
	const checkSource = (source: string) => {
		return source.endsWith('.md')
	};
	return {
		name: 'vite-plugin-mdsvex',
		enforce: 'pre',
		async transform(code, id): Promise<SourceDescription | undefined> {
			if (!checkSource(id)) return undefined
			const out = await mdsvexSlim.compile(code, {
				...option,
				filename: id,
			})
			return {
				code: out.code,
				map: out.map?.toString(),
				moduleSideEffects: false,
			};
		}
	};
}
