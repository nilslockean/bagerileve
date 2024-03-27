<script lang="ts">
	import type { IconName } from '$lib/enums/IconName';
	import Icon from './Icon.svelte';

	export let icon: IconName;
</script>

<li class="flex items-top gap-2">
	<Icon name={icon} />
	<slot />
</li>
