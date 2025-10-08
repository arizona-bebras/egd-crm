<script>
    import { Share2 } from "@lucide/svelte";
    let { link } = $props();
</script>
<a href="{link}">
    <Share2 />
</a>