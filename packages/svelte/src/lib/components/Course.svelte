<script lang="ts">
	import { cn } from '$lib/cn';
	import type { Course } from '$lib/schemas/CourseSchema';
	import ButtonLink from './ButtonLink.svelte';
	import H2 from './H2.svelte';

	export let course: Course;
</script>

<ButtonLink
	href={course.url}
	class={cn('flex flex-col gap-4 font-sans normal-case mt-0', $$restProps.class)}
>
	<slot />
	<H2 class="text-2xl">
		{course.title}
	</H2>
	<p>{course.dates}</p>
	<p class="underline">Mer info</p>
</ButtonLink>

<!-- https://codepen.io/team/css-tricks/pen/qBdZeNo -->
<!-- <article class="relative">
			<H2 class="text-2xl">
				{nextCourse.title}
			</H2>
			<p>{nextCourse.starts_at}</p>
			<Link href={nextCourse.url}>Boka biljetter</Link>
		</article> -->
