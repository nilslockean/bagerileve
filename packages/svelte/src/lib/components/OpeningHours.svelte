<script lang="ts">
	import type { OpeningHours } from '$lib/schemas/OpeningHoursSchema';

	export let data: OpeningHours;
</script>

<h4 class="uppercase text-lg">{data.title}</h4>
<table class="table-auto">
	{#each data.hours as row}
		<tr class="">
			<td class="py-1">{row.day}</td>
			<td class="text-right py-1">{row.time}</td>
		</tr>
	{/each}
</table>
{#if data.irregular && data.irregular.length > 0}
	<h5 class="uppercase">Avvikande öppettider</h5>
	<table class="table-auto">
		{#each data.irregular as row}
			<tr class="">
				<td class="py-1">{row.date}<br /><small class="opacity-75">{row.name}</small></td>
				<td class="text-right py-1 align-baseline">{row.time}</td>
			</tr>
		{/each}
	</table>
{/if}
