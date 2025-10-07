<script>
    import DocumentDownload from "../../components/ui/documents/document-download.svelte";
    import Redirect from "$lib/components/ui/documents/redirect.svelte";
    let { title, document_link, redirect_link } = $props();
</script>
<div class="flex flex-row items-center justify-between p-4 bg-secondary/50 border-1 border-primary">
    <div class="text-xl font-medium">{title}</div>
    {#if document_link != null}
        <DocumentDownload link={document_link} />
    {/if}
    {#if redirect_link != null}
        <Redirect link={redirect_link} />
    {/if}
</div>