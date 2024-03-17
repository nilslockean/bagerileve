<script lang="ts">
	import Course from '$lib/components/Course.svelte';
	import H1 from '$lib/components/H1.svelte';
	import H2 from '$lib/components/H2.svelte';
	import Section from '$lib/components/Section.svelte';

	export let data;
	const { courses } = data;
	// console.log(data);
</script>

<Section>
	<H1>Du kan baka, du är inte rädd</H1>
	<p class="text-lg max-w-prose">
		Bli bättre på att få till ett gott surdegsbröd ‐ skaffa en djupare förståelse för varför det
		blir som det blir och inte alltid som du tänkt dig och lär dig att göra dina egna recept.
	</p>
</Section>

<Section>
	<H2>Kommande kurser</H2>

	{#if courses.status === 'error'}
		<p>Problem med att hämta kurser:</p>
		<p>{courses.message}</p>
	{/if}

	{#if courses.status === 'success'}
		{#if courses.courses.length === 0}
			<p>Inga kurser inplanerade just nu.</p>
		{/if}

		{#each courses.courses as course}
			<Course {course} class="mt-4 max-w-prose" />
		{/each}
	{/if}
</Section>
