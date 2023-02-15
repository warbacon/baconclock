<script lang="ts">
	import Button from '../Button.svelte';
	import { onMount } from 'svelte';
	let hours: number;
	let minutes: number;
	let seconds: number;
	let time: any;

	let chronoInterval: any = false;
	let chronoButton = 'Start';

	let chrono = false;

	onMount(() => {
		document.onkeyup = function (e) {
			if (e.key == ' ') {
				toggleChronometer();
			}
		};
		if (sessionStorage.getItem('time') != null && sessionStorage != undefined) {
			time = sessionStorage.getItem('time');
			hours = parseInt(time.substring(0, 2));
			minutes = parseInt(time.substring(3, 5));
			seconds = parseInt(time.substring(6));
		} else {
			time = '00:00:00';
			hours = parseInt(time.substring(0, 2));
			minutes = parseInt(time.substring(3, 5));
			seconds = parseInt(time.substring(6));
		}
	});

	function resetChronometer() {
		if (chronoInterval) {
			toggleChronometer();
		}
		time = '00:00:00';
		hours = parseInt(time.substring(0, 2));
		minutes = parseInt(time.substring(3, 5));
		seconds = parseInt(time.substring(6));
	}

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
		if (seconds >= 60) {
			seconds = 0;
			minutes++;
			if (minutes >= 60) {
				minutes = 0;
				hours++;
			}
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

		sessionStorage.setItem('time', time);
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
	}
</script>

<svelte:head>
	<title>Chronometer</title>
</svelte:head>

{#if time != undefined}
	<h1>{time}</h1>
	{#if time == '00:00:00' && !chronoInterval}
		<Button func={toggleChronometer} content={chronoButton} />
	{:else}
		<div>
			<Button func={resetChronometer} content={'Reset'} />
			<Button func={toggleChronometer} content={chronoButton} />
		</div>
	{/if}
{/if}

<style>
	div {
		display: flex;
		align-items: flex-start;
		gap: 2rem;
	}
</style>
