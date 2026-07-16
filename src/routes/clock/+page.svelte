<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	let date = $state(new Date());
	let seconds = $derived(String(date.getSeconds()).padStart(2, '0'));
	let minutes = $derived(String(date.getMinutes()).padStart(2, '0'));
	let hours = $derived(String(date.getHours()).padStart(2, '0'));
	let timeInterval: number;

	onMount(() => {
		timeInterval = window.setInterval(() => {
			date = new Date();
		}, 250);
	});

	onDestroy(() => window.clearInterval(timeInterval));
</script>

<svelte:head>
	<title>Clock | Baconclock</title>
	<link rel="canonical" href="https://baconclock.vercel.app/clock" />
	<meta
		name="description"
		content="Ad-Free online clock with live time display. Accurate, fast, and beautiful digital clock. No ads, no tracking, works offline."
	/>
</svelte:head>

<h1 class="font-clock">{hours}:{minutes}:{seconds}</h1>
