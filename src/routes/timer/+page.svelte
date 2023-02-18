<script lang="ts">
	import Button from '../../components/Button.svelte';

	let toggleButton = 'Start';
	let stopButton = 'Pause';
	let time = '00:00:00';
	let currentTime: string;
	let timerInterval: any = false;
	let hours = 0;
	let minutes = 0;
	let seconds = 0;

	function toggleTimer() {
		if (time != '00:00:00') {
			hours = parseInt(time.substring(0, 2));
			minutes = parseInt(time.substring(3, 5));
			seconds = parseInt(time.substring(6));
			if (timerInterval) {
				toggleButton = 'Start';
				clearInterval(timerInterval);
				timerInterval = false;
				if (currentTime != '00:00:00') {
					hours = 0;
					minutes = 0;
					seconds = 0;
				}
			} else {
				if (stopButton == 'Continue' && toggleButton == 'Stop') {
					toggleButton = 'Start';
					clearInterval(timerInterval);
					timerInterval = false;
					hours = 0;
					minutes = 0;
					seconds = 0;
				} else {
					console.log('Locura');
					toggleButton = 'Stop';
					stopButton = 'Pause';
					timerInterval = setInterval(timer, 1000);
				}
			}
		}
	}

	function pauseTimer() {
		if (timerInterval) {
			stopButton = 'Continue';
			clearInterval(timerInterval);
			timerInterval = false;
		} else {
			toggleButton = 'Stop';
			stopButton = 'Pause';
			timerInterval = setInterval(timer, 1000);
		}
	}

	function timer() {
		if (currentTime == '00:00:00') {
			clearInterval(timerInterval);
			timerInterval = false;
		} else {
			seconds--;
			if (seconds <= -1) {
				seconds = 59;
				minutes--;
				if (minutes <= -1) {
					minutes = 59;
					hours--;
				}
				if (hours <= -1) {
					minutes = 59;
					hours = 0;
				}
			}
		}
	}

	$: {
		currentTime =
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

		if (currentTime == '00:00:00') {
			toggleButton = 'Start';
		}
	}
</script>

<svelte:head>
	<title>Timer</title>
</svelte:head>

{#if currentTime != '00:00:00'}
	<h1>{currentTime}</h1>
	<div>
		<Button func={pauseTimer} content={stopButton} />
		<Button func={toggleTimer} content={toggleButton} />
	</div>
{:else}
	<input type="time" step="1" bind:value={time} min="00:00:00" max="23:59:59" />
	{#if time != '00:00:00'}
		<div>
			<Button func={toggleTimer} content={toggleButton} />
		</div>
	{/if}
{/if}

<style lang="scss">
	div {
		display: flex;
		align-items: flex-start;
		gap: 2rem;
	}
	input[type='time'] {
		font-family: 'Inter';
		font-size: 2em;
		font-weight: 600;
		border: none;
		border-bottom: 2px solid var(--rp-main-highlight-med);
		margin-bottom: 2rem;
		background-color: transparent;
		transition: border-bottom 250ms;
		&:focus {
			outline: transparent;
			border-bottom: 2px solid var(--rp-main-highlight-high);
		}
	}
	input[type='time']::-webkit-calendar-picker-indicator {
		display: none;
	}
</style>
