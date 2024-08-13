<script lang="ts">
	import ButtonLink from '$lib/components/ButtonLink.svelte';
	import H1 from '$lib/components/H1.svelte';
	import H2 from '$lib/components/H2.svelte';
	import H3 from '$lib/components/H3.svelte';
	import Section from '$lib/components/Section.svelte';
</script>

<Section class="lg:py-20 lg:text-center">
	<H1>Veganskt bageri i Malmö</H1>

	<p class="text-lg mb-6 mt-8 max-w-prose lg:mx-auto">
		Nästan hela vårt sortiment är växtbaserat. I standardutbudet kan du välja mellan våra munkar,
		croissanter, pains au chocolats, kanel- och kardemummabullar samt alla våra surdegsbröd. Ibland
		kommer det nya produkter som finns en kort period för att vi får tag på fina råvaror i säsong
		eller helt enkelt för att vi får ett infall och blir sugna på något. Skulle någon produkt inte
		vara växtbaserad skyltas detta noggrant.
	</p>

	<ButtonLink href="#surdeg">Surdegsbröd</ButtonLink>
	<ButtonLink href="#bakverk">Bakverk</ButtonLink>
</Section>

<Section class="max-w-prose mx-0 lg:mx-auto" id="surdeg">
	<H2>Nybakade surdegsbröd direkt från stenugn</H2>
	<!-- svelte-ignore a11y-media-has-caption -->
	<video>
		<source
			src="
			https://cdn.sanity.io/files/mz20cm4o/production/9c057df538547c79bedfa2b06e6f276323deecee.mp4"
			type="video/mp4"
		/>
	</video>

	<p class="mt-4">
		Bröden fermenteras naturligt på traditionellt sätt i ett helt dygn innan de bakas för att
		maximera smaken, näringen och hållbarheten. Våra recept innehåller mycket vatten, vilket ger
		saftiga bröd som är bra för kroppen. Den långa jäsningen och syran från surdegen hjälper till
		med att delvis bryta ner det gluten som finns i degen så det blir lättare för oss att smälta
		det.
	</p>
</Section>

<Section id="bakverk">
	<H2>Växtbaserade bakverk</H2>
	<p class="text-lg">Allt vi bakar är växtbaserat/veganskt.</p>
</Section>

<Section>
	<H3>Berömda munkar</H3>
	<!-- svelte-ignore a11y-media-has-caption -->
	<video>
		<source
			src="
		https://cdn.sanity.io/files/mz20cm4o/production/9c057df538547c79bedfa2b06e6f276323deecee.mp4"
			type="video/mp4"
		/>
	</video>
	<p>
		Varje fredag gör vi en unik munk med extra allt som bara finns den dagen. Den byts ut varje
		vecka och vi berättar på torsdagen vad veckans smak kommer vara.
	</p>
	<ButtonLink href="/bestall" variant="primary">Beställ fredagsmunk</ButtonLink>
</Section>

<style lang="postcss">
	video {
		@apply my-6;
	}
</style>
