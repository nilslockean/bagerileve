<script>
	import OpeningHours from '$lib/components/OpeningHours.svelte';

	// Get page and layout data from the server
	export let data;
</script>

<h1 class="text-3xl font-bold underline">Hello world!</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<OpeningHours data={data.openingHours} />

<a href="/om">Om</a>
