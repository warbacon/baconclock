<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import TimerInput from '$lib/components/TimerInput.svelte';
	import { formatTime, createKeyboardHandler } from '$lib/utils';

	let inputTime = $state('00:00:00');
	let remaining = $state(0);
	let totalSeconds = $state(0);
	let isRunning = $state(false);

	const isAtZero = $derived(remaining === 0);
	const showInput = $derived(!isRunning && isAtZero);
	const toggleButtonText = $derived(isRunning ? 'Stop' : isAtZero ? 'Start' : 'Continue');
	const time = $derived(showInput ? inputTime : formatTime(remaining));

	beforeNavigate(({ cancel }) => {
		if (
			isRunning &&
			!confirm('Are you sure you want to leave this page? The timer will be stopped.')
		) {
			cancel();
		}
	});

	$effect(() => {
		if (typeof Notification !== 'undefined') {
			Notification.requestPermission();
		}
		return createKeyboardHandler({
			onToggle: toggleTimer,
			onReset: resetTimer
		});
	});

	$effect(() => {
		if (!isRunning) return;

		const startTime = Date.now();
		const id = window.setInterval(() => {
			remaining = Math.max(0, totalSeconds - Math.floor((Date.now() - startTime) / 1000));
			if (remaining === 0) {
				isRunning = false;
				if (Notification.permission === 'granted') {
					new Notification('Baconclock', {
						body: "Time's up!",
						icon: '/favicon-96x96.png'
					});
				}
			}
		}, 1000);

		return () => clearInterval(id);
	});

	function toggleTimer() {
		if (isRunning) {
			isRunning = false;
			return;
		}

		if (isAtZero) {
			const [h = 0, m = 0, s = 0] = inputTime.split(':').map(Number);
			totalSeconds = h * 3600 + m * 60 + s;
			if (totalSeconds === 0) return;
			remaining = totalSeconds;
		} else {
			totalSeconds = remaining;
		}

		isRunning = true;
	}

	function resetTimer() {
		isRunning = false;
		remaining = 0;
		inputTime = '00:00:00';
	}
</script>

<svelte:head>
	<title>{`${isRunning ? `${time} - ` : ''}Timer | Baconclock`}</title>

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
