<script>
	import { Share2 } from '@lucide/svelte';
	let { link } = $props();
</script>

<a target="_blank" href={link}>
	<Share2 />
</a>
