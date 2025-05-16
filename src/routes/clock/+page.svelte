<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	let date = $state(new Date());
	let seconds = $derived(String(date.getSeconds()).padStart(2, '0'));
	let minutes = $derived(String(date.getMinutes()).padStart(2, '0'));
	let hours = $derived(String(date.getHours()).padStart(2, '0'));
	let timeInterval: number;

	onMount(() => {
		timeInterval = setInterval(() => {
			date = new Date();
		}, 250);
	});
	onDestroy(() => clearInterval(timeInterval));
</script>

<svelte:head>
	<title>{hours}:{minutes}:{seconds} - Baconclock</title>
</svelte:head>

<h1 class="font-clock font-bold">{hours}:{minutes}:{seconds}</h1>
