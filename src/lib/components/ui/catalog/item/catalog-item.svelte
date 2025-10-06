<script>
    let { number, title, filePath } = $props();
</script>
<div class="w-full text-left pl-2 pt-6 pb-6 border-b-accent border-1">
    {number} - {title}
    <a href={filePath}>скачать файл</a>
</div>