import { json } from '@sveltejs/kit';

export async function POST({request} : {request:any}) {

    const {url} = await request.json();
    console.log(request);

    if (!url) {
        return json(
            { 
                success: false, 
                message: 'URL is required' ,
            }, 
            {status: 400}
        );
    }

    try {
        const response = await fetch(url, { method: 'HEAD' });

        // Convert headers to a plain object
        const headers : any = {};
        response.headers.forEach((value, name) => {
            headers[name] = value;
        });

        return json(
            { 
                success: true, 
                message: 'Ok',
                headers: headers,
            },
            { status: 200}
        );
    } catch (error) {
        return json(
            {
                success: false,
                message: 'Failed to fetch headers' 
            },
            { status: 500}
        );
    }
}

