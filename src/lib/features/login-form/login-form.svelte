<script lang="ts">
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabaseClient';
	import { superForm, defaults } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { loginSchema } from '$lib/features/login-form/schema';
	import * as Form from '$lib/components/ui/form/index.js';
	import * as Card from '$lib/components/ui/card/index.js';

	import { Input } from '$lib/components/ui/input';
	import { useSuperForm } from '$lib/utils/useSuperform';
	import { Button } from '$lib/components/ui/button';

	async function signin(email: string, password: string) {
		await supabase.auth.signInWithPassword({ email, password });
		goto('/');
	}

	$effect(() => {
		validateForm().then((response) => {
			isFormCorrect = response.valid;
		});
		$formData;
	});

	let isFormCorrect = $state(false);
	const { formData, form, enhance, reset, tainted, validateForm } = useSuperForm(loginSchema, {
		async afterSubmit(data) {
			console.log('Data valid, do action here', data);
			await signin(data.email, data.password);
		},
	});
</script>

<div class="mx-auto my-auto self-center">
	<Card.Root class="w-full  min-w-sm">
		<Card.Header>
			<Card.Title>Login to your account</Card.Title>
			<Card.Description>Enter your email below to login to your account</Card.Description>
			<Card.Action>
				<Button variant="link">Sign Up</Button>
			</Card.Action>
		</Card.Header>
		<Card.Content>
			<form method="POST" use:enhance>
				<Form.Field {form} name="login">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Email</Form.Label>
							<Input {...props} bind:value={$formData.email} />
						{/snippet}
					</Form.Control>
					<Form.Description>This is your public display name.</Form.Description>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="password">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Password</Form.Label>
							<Input {...props} bind:value={$formData.password} />
						{/snippet}
					</Form.Control>
					<Form.Description>This is your public display name.</Form.Description>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Button disabled={!isFormCorrect}>Submit</Form.Button>
			</form>
		</Card.Content>
	</Card.Root>
</div>
