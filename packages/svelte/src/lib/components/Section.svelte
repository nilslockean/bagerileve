<script lang="ts">
	import { cn } from '$lib/cn';

	export let fullwidth: boolean = false;
</script>

<section
	{...$$restProps}
	class={cn(
		'@container/section',
		{
			'p-6 max-w-screen-2xl mx-auto': !fullwidth
		},
		$$restProps.class
	)}
>
	<slot />
</section>
