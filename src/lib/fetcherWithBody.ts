export const fetcherWithBody = async (url: string, { arg }: { arg: any }) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(arg),
    });

    return response.json();
};