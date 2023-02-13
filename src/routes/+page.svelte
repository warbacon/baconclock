<script lang="ts">
	let time: string;
	let date = new Date();
	let timeInterval: boolean | NodeJS.Timer = false;

	if (!timeInterval) {
		timeInterval = setInterval(() => {
			date = new Date();
		}, 250);
	}

	$: time =
		date.getHours().toLocaleString('es-ES', {
			minimumIntegerDigits: 2,
			useGrouping: false
		}) +
		':' +
		date.getMinutes().toLocaleString('es-ES', {
			minimumIntegerDigits: 2,
			useGrouping: false
		}) +
		':' +
		date.getSeconds().toLocaleString('es-ES', {
			minimumIntegerDigits: 2,
			useGrouping: false
		});
</script>

<svelte:head>
	<title>Baconclock</title>
</svelte:head>

<h1>{time}</h1>
