<script lang="ts">
	import '../styles/global.css';
	import { page } from '$app/stores';

	let current: string;
	$: switch ($page.url.pathname) {
		case '/':
			current = 'clock';
			break;
		case '/timer':
			current = 'timer';
			break;
		case '/stopwatch':
			current = 'stopwatch';
			break;
		default:
			console.error('Esta ruta no existe.');
			break;
	}
</script>

<div>
	<nav>
		<a href="/" class={current === 'clock' ? 'selected' : ''}> Clock </a>
		<a href="/stopwatch" class={current === 'stopwatch' ? 'selected' : ''}> Stopwatch </a>
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
		font-size: clamp(2rem, 9vw, 4.5rem);
		font-weight: 600;
		text-align: center;
		height: 80vh;
		@media (max-width: 512px) {
			padding-top: 6rem;
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
			font-size: larger;
			@media (max-width: 512px) {
				font-size: 1rem;
				flex-direction: column;
			}
		}
		& a {
			padding: 0.75rem 2rem;
			border-radius: 40px;
			text-decoration: none;
			transition-property: color, background-color;
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
