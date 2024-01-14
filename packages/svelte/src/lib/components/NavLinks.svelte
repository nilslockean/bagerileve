<script lang="ts">
	import Link from './Link.svelte';

	export let links: Array<{
		path: string;
		title: string;
	}>;
	export let className = '';
</script>

{#each links as { path, title }}
	<Link href={path} {className}>{title}</Link>
{/each}
