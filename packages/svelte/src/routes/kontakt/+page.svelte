<script lang="ts">
	import Accordion from '$lib/components/Accordion.svelte';
	import H1 from '$lib/components/H1.svelte';
	import Link from '$lib/components/Link.svelte';
	import P from '$lib/components/P.svelte';
	import PortableTextLink from '$lib/components/PortableTextLink.svelte';
	import Section from '$lib/components/Section.svelte';
	import { PortableText } from '@portabletext/svelte';

	export let data;

	console.log('contact', { data });
</script>

<Section>
	<H1>Hör av dig!</H1>
	<p class="text-lg max-w-prose">Men om du har en fråga hittar du säkert svaret här:</p>
</Section>

<Section>
	{#each data.faq as faq, i}
		<Accordion id={`faq-${i}`} title={faq.question} class="mb-4 last:mb-0">
			<PortableText
				value={faq.answer}
				components={{
					marks: {
						link: PortableTextLink
					},
					block: {
						normal: P
					}
				}}
			/>
		</Accordion>
	{/each}
</Section>
