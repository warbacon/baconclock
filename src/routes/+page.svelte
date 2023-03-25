<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	let time = '00:00:00';
	let date = new Date();
	let timeInterval: any;

	onMount(() => {
		timeInterval = setInterval(() => {
			date = new Date();
		}, 250);
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

<h1>{time}</h1>
