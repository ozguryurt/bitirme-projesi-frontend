export const fetcherWithPutFormData = async (url: string, formData: FormData) => {
    const response = await fetch(url, {
        method: 'PUT',
        credentials: "include",
        body: formData,
    });

    return response.json();
};