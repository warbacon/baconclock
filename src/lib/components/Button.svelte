<script lang="ts">
	import { cn } from '$lib/util';
	import { Button } from 'bits-ui';
	import type { Button as ButtonPrimitive } from 'bits-ui';

	type Props = ButtonPrimitive.RootProps;

	let { class: className, children, ...props }: Props = $props();
</script>

<Button.Root
	class={cn(
		'inline-block rounded-full bg-zinc-200 px-6 py-2 font-semibold transition-transform hover:cursor-pointer hover:bg-zinc-300 active:scale-[0.95] dark:bg-zinc-800 hover:dark:bg-zinc-700',
		className
	)}
	{...props}
>
	{@render children?.()}
</Button.Root>
