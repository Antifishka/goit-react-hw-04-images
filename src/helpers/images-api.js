function fetchImages(query) {
    return fetch(`https://pixabay.com/api/?q=${query}&page=1&key=30037400-a9b9f26d9bfcaaa08a678cbf5&image_type=photo&orientation=horizontal&per_page=12`)
        .then((response) => {
            if (!response.ok) {
            throw new Error(response.status);
            }
            return response.json();
        });
};

const api = {
    fetchImages
}

export default api;