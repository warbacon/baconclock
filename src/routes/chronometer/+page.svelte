<script lang="ts">
	import Button from '../Button.svelte';
	import { onMount, onDestroy } from 'svelte';
	let hours: number;
	let minutes: number;
	let seconds: number;
	let time: any;
	let title: string;

	let chronoInterval: any = false;
	let chronoButton = 'Start';

	onMount(() => {
		document.onkeyup = function (e) {
			if (e.key == ' ' || e.key == 'p') {
				startStop();
			}
			if (e.key == 'r') {
				resetChronometer();
			}
		};
		if (sessionStorage.getItem('time') != null && sessionStorage != undefined) {
			time = sessionStorage.getItem('time');
			hours = parseInt(time.substring(0, 2));
			minutes = parseInt(time.substring(3, 5));
			seconds = parseInt(time.substring(6));
			chronoButton = 'Continue';
		} else {
			time = '00:00:00';
			hours = parseInt(time.substring(0, 2));
			minutes = parseInt(time.substring(3, 5));
			seconds = parseInt(time.substring(6));
		}
	});

	onDestroy(() => {
		stopChronometer();
	});

	function startStop() {
		if (chronoInterval) {
			stopChronometer();
			chronoButton = 'Resume';
		} else {
			startChronometer();
			chronoButton = 'Pause';
		}
	}

	function startChronometer() {
		chronoInterval = setInterval(chronometer, 1000);
	}

	function stopChronometer() {
		clearInterval(chronoInterval);
		chronoInterval = false;
	}

	function resetChronometer() {
		if (chronoInterval) {
			stopChronometer();
		}
		chronoButton = 'Start';
		time = '00:00:00';
		hours = parseInt(time.substring(0, 2));
		minutes = parseInt(time.substring(3, 5));
		seconds = parseInt(time.substring(6));
		sessionStorage.removeItem('time');
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

	$: if (!chronoInterval) {
		title = 'Chronometer';
	} else {
		title = time;
	}
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

{#if time != undefined}
	<h1>{time}</h1>
	{#if !chronoInterval && time == '00:00:00'}
		<Button func={startStop} content={chronoButton} />
	{:else}
		<div>
			<Button func={startStop} content={chronoButton} />
			<Button func={resetChronometer} content={'Reset'} />
		</div>
	{/if}
{/if}

<style lang="scss">
	div {
		display: flex;
		align-items: flex-start;
		gap: 2rem;
	}
</style>
