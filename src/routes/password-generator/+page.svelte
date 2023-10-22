<script>
    import Passwordgenerator from './PasswordGenerator.svelte';
</script>

<svelte:head>
	<title>Password Generator</title>
	<meta name="description" content="Random Password Generator page" />
</svelte:head>

<div>
	<h1>Random Password Generator</h1>

	<p>
		This is a random password generator, created just for fun.
	</p>

    <Passwordgenerator />
</div>
