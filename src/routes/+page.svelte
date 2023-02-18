<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { fade, fly } from "svelte/transition";
	let time: string;
	let date = new Date();
	let timeInterval: NodeJS.Timer;

	onMount(() => {
		timeInterval = setInterval(() => {
			date = new Date();
			date.toLocaleString('es-ES', { timeZone: 'Europe/Madrid' });
			console.log('uwu');
		}, 250);
		sessionStorage.setItem("lastPage", "clock")
	});
	onDestroy(() => clearInterval(timeInterval));

	$: time =
		date.getHours().toLocaleString('es-ES', {
			minimumIntegerDigits: 2
		}) +
		':' +
		date.getMinutes().toLocaleString('es-ES', {
			minimumIntegerDigits: 2
		}) +
		':' +
		date.getSeconds().toLocaleString('es-ES', {
			minimumIntegerDigits: 2
		});
</script>

<svelte:head>
	<title>Baconclock</title>
</svelte:head>

<h1 in:fly={{x:-40}}>{time}</h1>
