<script lang="ts">
import { DOCS } from '$lib/docs.js';
import { MetaTags } from 'svelte-meta-tags'
export let data;
$: doc = DOCS.find((doc) => doc.metadata.href === data.pathname) ?? DOCS[0];
$: fulltitle = `บทความที่ ${doc.metadata.order} เรื่อง ${doc.metadata.title}`
</script>

<MetaTags
	title={doc.metadata.title}
	description="เนื้อหาคำสอนของ อาจารย์น้องไนซ์ {fulltitle}"
/>

<article aria-label="{fulltitle}" title={fulltitle} class="prose mx-auto py-12 px-4">
	<div aria-hidden="true" class="not-sr-only">บทที่ {doc.metadata.order}</div>
	<div id="article-fulltitle" class="sr-only">{fulltitle}</div>
	<h1 aria-labelledby="article-fulltitle" class="not-sr-only">{doc.metadata.title}</h1>
	{#if Array.isArray(doc.metadata.tags) && doc.metadata.tags.length > 0}
		<p class="sr-only">หมวดหมู่บทความ {doc.metadata.tags[0]}</p>
		<div aria-hidden="true" class="not-sr-only mt-2" data-nrm="tags">
			{#each doc.metadata.tags as tag}
				<span
					class="border-current border px-2 py-0.5 text-sm text-primary-500 rounded-md"
					aria-label={tag}>{tag}</span
				>
			{/each}
		</div>
	{/if}
	<svelte:component this={doc.component} />

	<div class="sr-only">จบบทความที่ {doc.metadata.order} เรื่อง {doc.metadata.title}</div>

	<div role="cell" class="mt-12 no-prose mx-auto grid grid-cols-1 gap-4 place-content-center">
		{#if doc.paginate.next}
			{@const r = doc.paginate.next}
			<a
				title="ไปบทความถัดไป บทความที่ {r.order} เรื่อง {r.title}"
				aria-label="ไปบทความถัดไป บทความที่ {r.order} เรื่อง {r.title}"
				href={r.href}
				class="py-4 text-lg border border-current bg-primary-100 font-bold text-primary-600 rounded-md text-center no-underline"
			>
				<span class="text-sm text-stone-700">หน้าถัดไป</span>
				{r.title}
			</a>
		{/if}
	</div>
</article>
