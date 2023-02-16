<script lang="ts">
	import { page } from '$app/stores';
	let current: string;
	$: switch ($page.url.pathname) {
		case '/':
			current = 'clock';
			break;
		case '/timer':
			current = 'timer';
			break;
		case '/chronometer':
			current = 'chrono';
			break;
		default:
			console.error('Esta ruta no existe.');
			break;
	}
</script>

<div>
	<nav>
		<a href="/" class={current === 'clock' ? 'selected' : ''}> Clock </a>
		<a href="/chronometer" class={current === 'chrono' ? 'selected' : ''}> Chronometer </a>
		<a href="/timer" class={current === 'timer' ? 'selected' : ''}> Timer </a>
	</nav>
</div>
<div class="container">
	<slot />
</div>

<style lang="postcss">
	div.container {
		padding-top: 20vh;
		flex-direction: column;
		font-size: clamp(2.25rem, 4vw, 4rem);
		font-weight: 500;
		height: 80vh;
		@media (max-width: 512px) {
			padding-top: 10vh;
			height: 70vh;
		}
	}
	div {
		height: 20vh;
		display: flex;
		align-items: center;
		@media (max-width: 512px) {
			height: 30vh;
		}
		& nav {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 1rem;
			padding: 1.2rem 1rem;
			border-radius: 50px;
			margin: 0 auto;
			background-color: var(--rp-main-overlay);
			@media (max-width: 512px) {
				flex-direction: column;
			}
		}
		& a {
			font-size: larger;
			padding: 0.75rem 2rem;
			border-radius: 40px;
			text-decoration: none;
			transition-property: color background-color;
			transition-duration: 250ms;
			&:hover {
				background-color: var(--rp-main-highlight-med);
			}
		}
		& .selected {
			background-color: var(--rp-main-gold);
			color: var(--rp-main-overlay);
			&:hover {
				background-color: var(--rp-main-gold);
			}
		}
	}
</style>
