<script>
    import { goto } from "$app/navigation";
    let { title, routeName } = $props();
</script>
<button class="w-full text-left pl-2 pt-6 pb-6 border-b-accent border-1" onclick={() => { goto(`/documents/${routeName}`)}}>
    {title}
</button>