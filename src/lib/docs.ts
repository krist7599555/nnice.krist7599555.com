import { pipe } from '@mobily/ts-belt/pipe';
import * as A from '@mobily/ts-belt/Array';
import * as D from '@mobily/ts-belt/Dict';
import {
	object,
	string,
	number,
	nullable,
	flatten,
	array,
	boolean,
	type Output,
	startsWith,
	safeParse
} from 'valibot';

const metadata_schema = object({
	title: string(),
	titlePrev: nullable(string()),
	bookPage: nullable(number()),
	tags: array(string()),
	slug: string(),
	order: number(),
	publish: boolean(),
	href: string([startsWith('/')])
});
type Metadata = Output<typeof metadata_schema>;

export const DOCS = pipe(
	import.meta.glob('../../docs/*.md', { eager: true, exhaustive: true }) as Record<
		string,
		{ default: any; metadata: any }
	>,
	D.toPairs,
	A.map(([filepath, { default: component, metadata: m }]) => {
		const f = filepath.match(/docs\/(\d+)-(.+)\.md$/);
		const href = m.href || `/${m.slug || f?.[2] || ''}`;
		const p = safeParse(metadata_schema, {
			title: m.title || 'untitle',
			titlePrev: m.titlePrev || m.title || 'untitle',
			bookPage: m.bookPage ?? null,
			tags: Array.isArray(m.tags) ? m.tags.map((it: any) => `${it}`) : [],
			slug: m.slug || f?.[2],
			href,
			order: f?.[1] ? +f[1] : -1,
			publish: m.publish ?? true
		});
		if (!p.success) {
			console.error(flatten(p.issues));
			throw new Error(`parse metadata fail on ${filepath} with message "${p.issues[0].message}"`);
		}
		return {
			component: component as import('svelte').ComponentType<any>,
			metadata: p.output
		};
	}),
	A.filter((it) => it.metadata.publish === true),
	A.sortBy((it) => it.metadata.order),
	A.mapWithIndex((idx, it) => {
		it.metadata.order = idx + 1
		return it
	}),
	(arr) =>
		arr.map((route, idx) => {
			return {
				...route,
				paginate: {
					prev: arr[idx - 1]?.metadata as Metadata | undefined,
					next: arr[idx + 1]?.metadata as Metadata | undefined
				}
			};
		})
);
