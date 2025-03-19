export const formatDate = (dateString: string): string => {
    const date = new Date(dateString); // Tarih nesnesine dönüştür

    // Tarihi Türkçe olarak formatla
    return date.toLocaleString('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    });
};