<script lang="ts">
	import Button from '../Button.svelte';
	import { onMount } from 'svelte';
	let hours = 0;
	let minutes = 0;
	let seconds = 0;
	let time = '00:00:00';
	let chronoInterval: any = false;
	let chronoButton = 'Start';

	let chrono = false;

	onMount(() => {
		document.onkeyup = function (e) {
			if (e.key == ' ') {
				toggleChronometer();
			}
		};
	});

	function toggleChronometer() {
		chrono = !chrono;
		if (chronoButton == 'Start') {
			chronoButton = 'Stop';
		} else {
			chronoButton = 'Start';
		}
	}

	function chronometer() {
		seconds++;
		if (seconds == 60) {
			seconds = 0;
			minutes++;
			if (minutes == 60) hours++;
		}
	}

	$: {
		if (chrono) {
			if (!chronoInterval) {
				chronoInterval = setInterval(chronometer, 1000);
			}
		} else {
			clearInterval(chronoInterval);
			chronoInterval = false;
		}

		time =
			hours.toLocaleString('es-ES', {
				minimumIntegerDigits: 2,
				useGrouping: false
			}) +
			':' +
			minutes.toLocaleString('es-ES', {
				minimumIntegerDigits: 2,
				useGrouping: false
			}) +
			':' +
			seconds.toLocaleString('es-ES', {
				minimumIntegerDigits: 2,
				useGrouping: false
			});
	}
</script>

<svelte:head>
	<title>Chronometer</title>
</svelte:head>

<h1>{time}</h1>
<Button func={toggleChronometer} content={chronoButton} />
