<script>
	import H1 from '$lib/components/H1.svelte';
	import H2 from '$lib/components/H2.svelte';
	import Link from '$lib/components/Link.svelte';
	import OpeningHours from '$lib/components/OpeningHours.svelte';
	import Section from '$lib/components/Section.svelte';

	// Get page and layout data from the server
	export let data;
</script>

<Section>
	<H1>En nybakad upplevelse mitt i Malmö</H1>
	<p class="text-lg">Surdegsbröd ur ugnen på eftermiddagen och nästan allt är veganskt.</p>
</Section>

<Section class="pt-0">
	<OpeningHours data={data.openingHours} />
	<Link href="/boka">Beställ fredagsmunk</Link>
</Section>

<Section class="pt-0">
	<p>Nästa kurs här...</p>
</Section>

<Section class="pt-0">
	<p>6 st Instagram-bilder här...</p>
</Section>

<Section>
	<H2>Bageri Leve</H2>
	<p class="text-lg">
		Ett nytänkande bageri mitt i Malmö. Vi har valt att baka på dagen istället för på natten, att
		baka mycket växtbaserade bakverk istället för att låsa fast oss helt i traditionella
		smörbaserade recept och att baka surdegsbröd som man gjorde förr, innan jästen ens var
		uppfunnen.
	</p>
	<Link href="/om">Historien om Leve</Link>
</Section>
