<script lang="ts">
	import { cn } from '$lib/util';
	import { Button } from 'bits-ui';
	import type { Button as ButtonPrimitive } from 'bits-ui';

	type Props = ButtonPrimitive.RootProps;

	let { class: className, children, ...props }: Props = $props();
</script>

<Button.Root
	class={cn(
		'bg-rp-dawn-surface dark:bg-rp-surface hover:bg-rp-dawn-overlay hover:dark:bg-rp-overlay inline-block rounded-full px-6 py-2 transition-transform hover:cursor-pointer active:scale-[0.95]',
		className
	)}
	{...props}
>
	{@render children?.()}
</Button.Root>
