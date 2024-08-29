
import axios from 'axios';

const searchImages = async (searchTerm) => {
    let response = await axios.get('https://api.unsplash.com/search/photos?', {
        headers: {
            Authorization: 'Client-ID 8O50V7bNzfKdVixwS9W9nZVdr0VnrCv9gmeimfdvp6Y'
        },
        params: {
            query: searchTerm
        }
    });

    return response.data.results;
}

export default searchImages;
