<script lang="ts">
import { cn } from '$lib/cn';
import { DOCS } from '$lib/docs';
import { fade } from 'svelte/transition';
import { ViewVertical } from 'radix-icons-svelte';
import { afterNavigate, onNavigate } from '$app/navigation';

export let data;
let showNav = false;
$: pathname = data.pathname;
$: console.log({showNav})
afterNavigate(() => {
	showNav	= false
})
</script>



<div aria-hidden="true" class="lg:hidden col-span-full border-b p-2">
	<button class="p-2" on:click={() => (showNav = !showNav)}>
		<ViewVertical />
	</button>
</div>
<div class="lg:grid grid-cols-[auto,1fr] relative">
	{#if showNav}
		<!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      class="not-sr-only fixed lg:hidden inset-0 bg-stone-800/60 h-screen"
      transition:fade={{ duration: 200 }}
      on:click|self={() => (showNav = false)}
			on:keypress={() => {}}
    ></div>
  {/if}
	<nav
		aria-label="สารบัญ"
		title="สารบัญ"
		data-nav-show={showNav}
		class={cn(
			'fixed transition-transform lg:translate-x-0 bg-white border-r lg:block px-4 py-12 h-screen w-[300px] overflow-scroll lg:sticky top-0',
			showNav ? 'translate-x-0' : 'translate-x-[-100%]'
		)}
	>
		{#each DOCS as doc}
			{@const m = doc.metadata}
			{@const label = `บทที่ ${m.order} เรื่อง ${m.title}`}
			<a
				title={label}
				aria-label={label}
				data-current-pathname={pathname}
				href={m.href}
				class={cn(
					'flex mt-1.5 gap-1.5 items-start justify-start',
					pathname === m.href ? 'text-primary-600' : ''
				)}
			>
				<span aria-hidden class="not-sr-only w-6 inline-block text-right opacity-50">{m.order}.</span>
				<span aria-hidden class="not-sr-only">{m.title}</span>
			</a>
		{/each}
	</nav>
	<main title="เนื้อหาหลัก">
		<slot />
	</main>
</div>
