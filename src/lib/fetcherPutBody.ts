export const fetcherPutBody = async (url: string, arg: any) => {
    const response = await fetch(url, {
        method: 'PUT',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(arg),
    });

    return response.json();
};