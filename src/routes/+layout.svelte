<script lang="ts">
	import './layout.css';

	import '@fontsource/dm-mono/500.css';
	import '@fontsource-variable/dm-sans/wght.css';

	import NavButton from '$lib/components/NavButton.svelte';
	import type { LayoutProps } from './$types';
	import { onMount, type Component } from 'svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { browser } from '$app/environment';
	import { ClockIcon, HourglassIcon, TimerIcon } from 'phosphor-svelte';
	import type { IconComponentProps } from 'phosphor-svelte';

	let { children }: LayoutProps = $props();

	type Route = {
		path: '/clock' | '/stopwatch' | '/timer';
		name: string;
		icon: Component<IconComponentProps, object, ''>;
	};

	const routes: Route[] = [
		{
			path: '/clock',
			name: 'Clock',
			icon: ClockIcon
		},
		{
			path: '/stopwatch',
			name: 'Stopwatch',
			icon: TimerIcon
		},
		{
			path: '/timer',
			name: 'Timer',
			icon: HourglassIcon
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

				const route = routes.at(keyNumber - 1);
				if (route) {
					goto(resolve(route.path));
				}
			});
		}
	});
</script>

<svelte:head>
	<meta charset="utf-8" />
	<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
	<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
	<link rel="shortcut icon" href="/favicon.ico" />
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<meta name="apple-mobile-web-app-title" content="Baconclock" />
	<link rel="manifest" href="/site.webmanifest" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="theme-color" content="#191724" />
	<meta name="color-scheme" content="light dark" />
</svelte:head>

<header class="flex w-screen justify-center">
	<nav
		class="fixed bottom-0 my-4 flex justify-center gap-2 rounded-full border border-zinc-300 bg-zinc-200 p-2 md:top-0 md:bottom-auto dark:border-zinc-700/70 dark:bg-zinc-800"
	>
		{#each routes as route (route.name)}
			<NavButton href={resolve(route.path)} class="flex flex-col items-center md:flex-row md:gap-2">
				<route.icon size={20} weight="bold" />
				<span class="hidden md:inline">{route.name}</span>
			</NavButton>
		{/each}
	</nav>
</header>

<main class="flex h-dvh w-screen flex-col items-center justify-center">
	{@render children()}
</main>
