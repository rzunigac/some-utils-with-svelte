<script lang="ts">
    let passwordLength = 16;
    let includeUppercase = true;
    let includeLowercase = true;
    let includeNumbers = true;
    let includeSymbols = false;
    let generatedPassword : string;
    let characterSets : string[] = [];

    $: {
        characterSets = [];

        if (includeUppercase) characterSets.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
        if (includeLowercase) characterSets.push('abcdefghijklmnopqrstuvwxyz');
        if (includeNumbers) characterSets.push('0123456789');
        if (includeSymbols) characterSets.push('!@#$%^&*()_+{}[]');

        generatedPassword = generatePassword(passwordLength, characterSets);
    }

    function selectRandomCharacter(characterSet: string): string {
        const randomIndex = crypto.getRandomValues(new Uint32Array(1))[0] % characterSet.length;
        return characterSet[randomIndex];
    }

    function generatePassword(passwordLength : number, characterSets : string[]) {

        generatedPassword = '';

        if (!characterSets.length) {            
            return generatedPassword;
        }

        let password = '';

        for (let i = 0; i < passwordLength; i++) {
            const randomCharacterSet = characterSets[crypto.getRandomValues(new Uint32Array(1))[0] % characterSets.length];
            password += selectRandomCharacter(randomCharacterSet);
        }

        generatedPassword = password;
        return generatedPassword
    }

    function copyToClipboard() {
        navigator.clipboard.writeText(generatedPassword)
            .then(() => {
                alert("Password copied to clipboard!");
            })
            .catch(err => {
                console.error("Could not copy text: ", err);
            });
    }
</script>

<div>
    <label for="length">Password Length: {passwordLength}</label>
    <input type="range" id="length" bind:value={passwordLength} min="8" max="50" />
</div>
<div>
    <label for="">Characters used:</label>
    <label><input type="checkbox" bind:checked={includeUppercase} /> Uppercase</label>
    <label><input type="checkbox" bind:checked={includeLowercase} /> Lowercase</label>
    <label><input type="checkbox" bind:checked={includeNumbers} /> Numbers</label>
    <label><input type="checkbox" bind:checked={includeSymbols} /> Symbols</label>
</div>



<div>
    <input class="password" type="text" bind:value={generatedPassword} readonly />
    <button on:click={() => generatePassword(passwordLength, characterSets)}>Refresh</button>

    <button on:click={copyToClipboard}>Copy</button>
</div>

<style>
    div {
        margin-bottom: 1rem;
    }

    label {
        margin-bottom: 0.5rem;
    }

    input.password {
        font-size: 16px;
        padding: 10px;
        margin-bottom: 1rem;
        width: 75%;
    }
</style>
