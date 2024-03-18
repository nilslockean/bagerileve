<script lang="ts">
	import type { MarkComponentProps } from '@portabletext/svelte';
	import Link from './Link.svelte';

	export let portableText: MarkComponentProps<{
		href: string;
	}>;
</script>

<Link href={portableText.value.href}>
	<slot />
</Link>
