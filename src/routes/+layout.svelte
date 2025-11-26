<script lang="ts">
	import '../app.css';

	import '@fontsource/dm-mono/500.css';
	import '@fontsource-variable/dm-sans';

	import NavButton from '../lib/components/NavButton.svelte';
	import type { LayoutProps } from './$types';
	import { onMount, type Component } from 'svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import Clock from '@lucide/svelte/icons/clock';
	import Hourglass from '@lucide/svelte/icons/hourglass';
	import Timer from '@lucide/svelte/icons/timer';
	import type { IconProps } from '@lucide/svelte';

	let { children }: LayoutProps = $props();

	type Route = {
		path: string;
		name: string;
		icon: Component<IconProps, {}, ''>;
	};

	const routes: Route[] = [
		{
			path: 'clock',
			name: 'Clock',
			icon: Clock
		},
		{
			path: 'stopwatch',
			name: 'Stopwatch',
			icon: Timer
		},
		{
			path: 'timer',
			name: 'Timer',
			icon: Hourglass
		}
	] as const;

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

				const keyNumber = parseInt(e.key);
				if (isNaN(keyNumber) || keyNumber < 1 || keyNumber > routes.length) return;

				const route = routes[keyNumber - 1];
				if (route) {
					goto('/' + route.path);
				}
			});
		}
	});
</script>

<header class="flex w-screen justify-center">
	<nav
		class="fixed bottom-0 my-4 flex justify-center gap-2 rounded-full border border-zinc-300 bg-zinc-200 p-2 md:top-0 md:bottom-auto dark:border-zinc-700/70 dark:bg-zinc-800"
	>
		{#each routes as route}
			<NavButton href="/{route.path}" class="flex flex-col items-center md:flex-row md:gap-2">
				<route.icon class="h-5 w-5" />
				<span class="hidden md:inline">{route.name}</span>
			</NavButton>
		{/each}
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
