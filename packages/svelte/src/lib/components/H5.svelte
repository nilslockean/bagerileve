<script lang="ts">
	import { cn } from '$lib/cn';
</script>

<h5
	{...$$restProps}
	class={cn('uppercase text-base font-futura tracking-wider', $$restProps.class)}
>
	<slot />
</h5>
