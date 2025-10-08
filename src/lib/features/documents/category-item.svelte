<script>
	import DocumentDownload from '../../components/ui/documents/document-download.svelte';
	import Redirect from '$lib/components/ui/documents/redirect.svelte';
	import * as Item from '$lib/components/ui/item';
	import { Button } from '$lib/components/ui/button';
	import { Share2 } from '@lucide/svelte';

	let { title, document_link, redirect_link } = $props();
</script>

<Item.Root variant="outline" class="bg-primary rounded-none border-t-0 border-b" size="sm">
	{#snippet child({ props })}
		<a href="#/" {...props}>
			<Item.Media></Item.Media>
			<Item.Content>
				<Item.Title>{title}</Item.Title>
				<!-- <Item.Description class="text-accent font-medium">{0}</Item.Description> -->
			</Item.Content>
			<Item.Actions>
				{#if document_link != null}
					<DocumentDownload link={document_link} />
				{:else if redirect_link}
					<Button href={redirect_link} size="icon">
						<Share2 class="stroke-accent size-6" />
					</Button>
				{/if}
			</Item.Actions>
		</a>
	{/snippet}
</Item.Root>
<!-- <div class="bg-secondary/50 border-primary flex flex-row items-center justify-between border-1 p-4">
	<div class="text-xl font-medium">{title}</div>
</div> -->
