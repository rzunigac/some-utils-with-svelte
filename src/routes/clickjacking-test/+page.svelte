<script lang="ts">
    type HeadersResponse = {
        [key: string]: string;
    };
    let url = 'https://example.com';
    let frame: HTMLIFrameElement;
    let headers: HeadersResponse = {};
    let xfo = '';
    let csp = '';
 
    function testIframing() {
        if (frame) {
            frame.src = url;
        }
    }

    async function checkHeaders() {
        const response = await fetch('/check-headers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url })
        });
        const data = await response.json();
        headers = data.headers;
        xfo = headers['x-frame-options'] || 'Not Set';
        csp = headers['content-security-policy'] || 'Not Set';
    }

    async function handleButtonClick() {
        testIframing();
        await checkHeaders();
    }

 </script>
 
 <svelte:head>
     <title>Clickjacking test app</title>
     <meta name="description" content="About this app" />
 </svelte:head>
 
 <div>
    <h1>Clickjacking Test Tool</h1>

    <div>More info: <a href='https://portswigger.net/web-security/clickjacking'>https://portswigger.net/web-security/clickjacking</a></div>
    
    <div>
        <label for="url">Enter the URL:</label>
        <input id="url" type="text" bind:value={url} placeholder="http://example.com">
        <button on:click={handleButtonClick}>Check</button>
    </div>

    <h2>Results</h2>
    <div>
        <p>X-Frame-Options: {xfo}</p>
        <p>Content-Security-Policy: {csp}</p>

    </div>

    <h2>Headers <span>(may be incomplete)</span></h2>
    <pre>{JSON.stringify(headers, null, 2)}</pre>

    <h2>Iframe embed</h2>
    <iframe bind:this={frame} title="testing frame" width="100%" height="500px"></iframe>


 </div>
 
 <style>
    div {
       margin-bottom: 1rem;
    }
 
    input {
            width: 80%;
    }
 
    label {
       margin-bottom: 0.5rem;
    }

    h2 {
        font-weight: 400;
        font-size: 1.4rem;
    }

    h2 span{
        font-size: 1rem;
    }
 </style>
