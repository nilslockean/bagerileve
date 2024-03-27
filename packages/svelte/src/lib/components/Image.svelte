<script lang="ts">
	import { cn } from '$lib/cn';
	export let src: string;
	export let alt: string;
</script>

<img
	{...$$restProps}
	class={cn('w-full', $$restProps.class)}
	srcset={`${src}?auto=format&w=1280 1280w, ${src}?auto=format`}
	sizes="(max-width: 640px) 1280px, 100vw"
	src={`${src}?auto=format`}
	{alt}
/>
