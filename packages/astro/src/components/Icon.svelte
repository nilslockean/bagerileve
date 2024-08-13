<script lang="ts">
	import { IconName } from '@lib/enums/IconName';
	import Phone from '@lib/icons/Phone.svelte';
	import Plus from '@lib/icons/Plus.svelte';
	import MapPin from '@lib/icons/MapPin.svelte';
	import Envelope from '@lib/icons/Envelope.svelte';
	import type { ComponentType } from 'svelte';

	const iconMap: Record<IconName, ComponentType> = {
		[IconName.PHONE]: Phone,
		[IconName.PLUS]: Plus,
		[IconName.ENVELOPE]: Envelope,
		[IconName.MAP_PIN]: MapPin
	};

	export let name: IconName;

	const Icon = iconMap[name];
</script>

<Icon {...$$restProps} />
