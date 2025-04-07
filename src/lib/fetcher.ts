export const fetcher = async (url: string) => {
    const response = await fetch(url, {
        credentials: 'include', // Çerezleri gönder
    });

    return response.json();
};