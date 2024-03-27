<script lang="ts">
	import Accordion from '$lib/components/Accordion.svelte';
	import ButtonLink from '$lib/components/ButtonLink.svelte';
	import H1 from '$lib/components/H1.svelte';
	import H2 from '$lib/components/H2.svelte';
	import Hr from '$lib/components/Hr.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import IconList from '$lib/components/IconList.svelte';
	import IconListItem from '$lib/components/IconListItem.svelte';
	import Link from '$lib/components/Link.svelte';
	import OpeningHours from '$lib/components/OpeningHours.svelte';
	import P from '$lib/components/P.svelte';
	import PortableTextLink from '$lib/components/PortableTextLink.svelte';
	import Section from '$lib/components/Section.svelte';
	import { IconName } from '$lib/enums/IconName';
	import Phone from '$lib/icons/Phone.svelte';
	import { PortableText } from '@portabletext/svelte';

	export let data;
</script>

<Section>
	<H1>Hör av dig!</H1>
	<p class="text-lg max-w-prose">Men om du har en fråga hittar du säkert svaret här:</p>
</Section>

<Section>
	<H2 class="mb-8">Vanliga frågor</H2>
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

<Section>
	<H2>Öppettider</H2>
	<OpeningHours data={data.openingHours} renderTitle={false} />
</Section>

<Section>
	<H2>Kontaktuppgifter</H2>
	<p class="mb-4">
		Vill du beställa något går det fint att ringa till oss. Vi svarar i telefon tisdag-lördag hela
		dagarna om inget annat anges här.
	</p>
	<p class="mb-4">
		Vi tar inte emot munkbeställningar på fredagar, bara fram till torsdag kväll. Det går inte att
		beställa via e-post.
	</p>
	<IconList>
		<IconListItem icon={IconName.PHONE}>
			<Link href="tel:+46401234567">040-123 45 67</Link>
		</IconListItem>
		<IconListItem icon={IconName.ENVELOPE}>
			<Link href="mailto:hej@bagerileve.se">hej@bagerileve.se</Link>
		</IconListItem>
		<IconListItem icon={IconName.MAP_PIN}>
			<p>Östra Rönneholmsvägen 6 <br />211 47 Malmö</p>
		</IconListItem>
	</IconList>
	<div class="flex flex-wrap gap-2 mt-4">
		<Link href="https://maps.app.goo.gl/bKviQyXD7xwvJLmH6">Google Maps</Link>
		<span>/</span>
		<Link
			href="https://maps.apple.com/?address=%C3%96stra%20R%C3%B6nneholmsv%C3%A4gen%206,%20211%2047%20Malm%C3%B6,%20Sweden&auid=1128191008389929499&ll=55.596641,12.999685&lsp=9902&q=Bageri%20Leve"
			>Apple Maps</Link
		>
	</div>
</Section>
