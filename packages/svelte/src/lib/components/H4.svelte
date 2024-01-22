<script lang="ts">
	import { cn } from '$lib/cn';
</script>

<h4 {...$$restProps} class={cn('uppercase text-lg font-futura tracking-wider', $$restProps.class)}>
	<slot />
</h4>
