// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

declare module "*.md" {
	const component: import("svelte").ComponentType
	export default component;
	export const metadata: Record<string, string | number | string[]>;
}

export {};
