import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { mdsvex } from './packages/vite-plugin-mdsvex'
import path from 'node:path';

export default defineConfig({
	optimizeDeps: {
		include: ['@mobily/ts-belt'],
		needsInterop: ['@mobily/ts-belt'],
		force: true
	},
	ssr: {
		noExternal: ['@mobily/ts-belt'],
	},
	plugins: [
		mdsvex({
			// prettier-ignore
			custom_containers: [
				{ type: "nice", hName: "Chat", hProperties: { people: "น้องไนซ์", color: "#ffe1a6" } },
				{ type: "mom", hName: "Chat", hProperties: { people: "แม่นก", color: "#ffd3fa" } },
				{ type: "member", hName: "Chat", hProperties: { people: "สมาชิก", color: "#e0e0ff" } },
				{ type: "chat", hName: "Chat", hProperties: { color: "#d3f3cc" } },
			].map(({ type, hName, hProperties }) => ({
				type: type,
				transform(node, config) {
					node.data ??= { hName, hProperties }
					node.data.hName = hName;
					node.data.hProperties = {
						people: config ?? "นิรนาม",
						...hProperties,
					};
				},
			})),
			inject_script: (source) => {
				return `\nimport Chat from "$lib/Chat.svelte";\n` + source;
			},
			inject_frontmatter: (frontmatter, option) => {
				return {
					...frontmatter,
					filename: path.resolve(option.filename ?? '')
				}
			}
		}),
		sveltekit()
	],
	server: {
		fs: {
			allow: ['./docs']
		}
	}
});
