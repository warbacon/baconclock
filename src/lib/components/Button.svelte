<script lang="ts">
	interface Props {
		content?: string;
		func: () => void;
	}

	let { content = 'Botón', func }: Props = $props();
</script>

<button
	class="bg-rp-dawn-surface shadow dark:bg-rp-surface hover:bg-rp-dawn-overlay hover:dark:bg-rp-overlay rounded-full px-6 py-2"
	onclick={func}>{content}</button
>
