import axios from 'axios';

const API_KEY = '46354087-8e1a6a8f4ead0e3d6b452e4d6';
const URL = 'https://pixabay.com/api/';

export async function GetImages(query, page = 1, perPage = 15) {
  const url = `${URL}?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;
  try {
    const response = await axios.get(url);
    if (response.status !== 200) {
      throw new Error('Network response error');
    }
    return response.data.hits;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}
