<script lang="ts">
	interface Props {
		content?: string;
		func: () => void;
	}

	let { content = 'Botón', func }: Props = $props();
</script>

<button
	class="bg-rp-dawn-surface dark:bg-rp-surface hover:bg-rp-dawn-overlay hover:dark:bg-rp-overlay rounded-full px-6 py-2 shadow"
	onclick={func}>{content}</button
>
