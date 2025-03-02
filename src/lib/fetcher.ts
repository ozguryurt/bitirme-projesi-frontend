export const fetcher = async (url: string) => {
    const response = await fetch(url, {
        credentials: 'include', // Çerezleri gönder
    });

    if (!response.ok) {
        throw new Error('An error occurred while fetching the data.');
    }

    return response.json();
};