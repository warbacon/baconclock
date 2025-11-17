<script lang="ts">
	import '../app.css';

	import '@fontsource/dm-mono/500.css';
	import '@fontsource-variable/dm-sans';

	import NavButton from '../lib/components/NavButton.svelte';
	import type { LayoutProps } from './$types';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { resolve } from '$app/paths';
	import Clock from '@lucide/svelte/icons/clock';
	import Hourglass from '@lucide/svelte/icons/hourglass';
	import Timer from '@lucide/svelte/icons/timer';

	let { children }: LayoutProps = $props();

	onMount(() => {
		if (browser) {
			window.addEventListener('keydown', (e: KeyboardEvent) => {
				const target = e.target as HTMLElement;

				if (
					target.closest('input, textarea') ||
					(target.isContentEditable ?? false) ||
					e.ctrlKey ||
					e.altKey
				) {
					return;
				}

				switch (e.key) {
					case '1':
						goto(resolve('/clock'));
						break;
					case '2':
						goto(resolve('/stopwatch'));
						break;
					case '3':
						goto(resolve('/timer'));
						break;
					default:
						return;
				}
			});
		}
	});
</script>

<header class="flex w-screen justify-center">
	<nav
		class="fixed bottom-0 my-4 flex justify-center gap-2 rounded-full bg-zinc-200 p-2 md:top-0 md:bottom-auto dark:bg-zinc-800"
	>
		<NavButton href="/clock" class="flex flex-col items-center md:flex-row md:gap-2">
			<Clock class="h-5 w-5" />
			<span class="hidden md:inline">Clock</span>
		</NavButton>

		<NavButton href="/stopwatch" class="flex flex-col items-center md:flex-row md:gap-2">
			<Timer class="h-5 w-5" />
			<span class="hidden md:inline">Stopwatch</span>
		</NavButton>

		<NavButton href="/timer" class="flex flex-col items-center md:flex-row md:gap-2">
			<Hourglass class="h-5 w-5" />
			<span class="hidden md:inline">Timer</span>
		</NavButton>
	</nav>
</header>

<main class="flex h-dvh w-screen flex-col items-center justify-center">
	{@render children()}
</main>

<style>
	:global(h1, input[type='time']) {
		font-size: clamp(3rem, 16vw, 9rem);
	}
</style>
