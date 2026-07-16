<script lang="ts">
	import { browser } from '$app/environment';
	import { beforeNavigate } from '$app/navigation';
	import { onDestroy, onMount } from 'svelte';

	import Button from '$lib/components/Button.svelte';
	import TimerInput from '$lib/components/TimerInput.svelte';

	let inputTime = $state('00:00:00');
	let remaining = $state(0);
	let timerInterval = $state(0);

	const isRunning = $derived(timerInterval !== 0);
	const isAtZero = $derived(remaining === 0);
	const showInput = $derived(!isRunning && isAtZero);

	const toggleButtonText = $derived(isRunning ? 'Stop' : isAtZero ? 'Start' : 'Continue');

	const time = $derived.by(() => {
		if (!isRunning && isAtZero) {
			return inputTime;
		}

		const hours = Math.floor(remaining / 3600);
		const minutes = Math.floor((remaining % 3600) / 60);
		const seconds = remaining % 60;

		return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
	});

	onMount(() => {
		document.onkeyup = (e: KeyboardEvent) => {
			switch (e.key) {
				case ' ':
				case 'p':
					e.preventDefault();
					toggleTimer();
					break;

				case 'r':
					e.preventDefault();
					resetTimer();
					break;
			}
		};

		Notification.requestPermission();
	});

	onDestroy(() => clearInterval(timerInterval));

	beforeNavigate(({ cancel }) => {
		if (
			isRunning &&
			!confirm('Are you sure you want to leave this page? The timer will be stopped.')
		) {
			cancel();
		}
	});

	function pad(value: number) {
		return value.toString().padStart(2, '0');
	}

	function toggleTimer() {
		if (isRunning) {
			clearInterval(timerInterval);
			timerInterval = 0;
			return;
		}

		if (isAtZero) {
			const [hours, minutes, seconds] = inputTime.split(':').map(Number);
			remaining = hours * 3600 + minutes * 60 + seconds;
		}

		if (remaining > 0) {
			timerInterval = setInterval(tick, 1000);
		}
	}

	function resetTimer() {
		clearInterval(timerInterval);
		timerInterval = 0;
		remaining = 0;
		inputTime = '00:00:00';
	}

	function tick() {
		if (--remaining > 0) {
			return;
		}

		resetTimer();

		if (Notification.permission === 'granted') {
			new Notification('Baconclock', {
				body: "Time's up!",
				icon: '/favicon-96x96.png'
			});
		}
	}
</script>

<svelte:head>
	<title>{`${browser && isRunning ? `${time} - ` : ''}Timer | Baconclock`}</title>

	<link rel="canonical" href="https://baconclock.vercel.app/timer" />

	<meta
		name="description"
		content="Free online countdown timer with customizable duration. Perfect for cooking, Pomodoro technique, workouts, and study sessions. No ads, no tracking."
	/>
</svelte:head>

<article>
	{#if showInput}
		<TimerInput class="font-clock" bind:value={inputTime} />
	{:else}
		<h1 class="font-clock">{time}</h1>
	{/if}

	{#if !showInput || inputTime !== '00:00:00'}
		<div class="absolute bottom-[25dvh] left-0 flex w-full justify-center gap-4">
			<Button onclick={toggleTimer}>{toggleButtonText}</Button>
			<Button onclick={resetTimer}>Reset</Button>
		</div>
	{/if}
</article>
