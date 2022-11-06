import axios from "axios";

async function fetchImages(query, page) {
    const apiInstance = axios.create({
        baseURL: 'https://pixabay.com/api/',
        params: {
            key: '30037400-a9b9f26d9bfcaaa08a678cbf5',
            q: `${query}`,
            image_type: 'photo',
            orientation: 'horizontal',
            page: `${page}`,
            per_page: 12,
        },
    });
        
    const { data } = await apiInstance.get();
     
    const images = data.hits;
        
        // const images = data.hits;
        // const totalHits = data.totalHits;
        // const totalPages = totalHits / this.per_page;

        if (!images.length) {
            throw new Error(`Images not found...`)
        }
    return images;
} 

const api = {
    fetchImages
}

export default api;