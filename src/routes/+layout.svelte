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
		padding-top: 15vh;
		flex-direction: column;
		font-size: 3rem;
		font-weight: 500;
		height: 80vh;
	}
	div {
		height: 20vh;
		display: flex;
		align-items: center;
		& nav {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 1vw;
			padding: 1.25rem 0;
			border-radius: 40px;
			padding: 0 1vw;
			height: 5rem;
			margin: 0 auto;
			background-color: #2d2f31;
		}
		& a {
			font-size: larger;
			padding: 0.75rem 2rem;
			border-radius: 80px;
			text-decoration: none;
			transition-property: color background-color;
			transition-duration: 250ms;
			&:hover {
				background-color: #383b3c;
			}
		}
		& .selected {
			background-color: #004a77;
			color: #c2e7ff;
			&:hover {
				background-color: #0f547d;
			}
		}
	}
</style>
