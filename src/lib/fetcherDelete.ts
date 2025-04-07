export const fetcherDelete = async (url: string, arg: any) => {
    const response = await fetch(url, {
        method: 'DELETE',
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(arg),
    });

    return response.json();
};