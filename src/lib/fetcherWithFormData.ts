export const fetcherWithFormData = async (url: string, formData: FormData) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: "include",
        body: formData,
    });

    return response.json();
};