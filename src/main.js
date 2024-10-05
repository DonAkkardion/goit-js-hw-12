import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { GetImages } from './js/pixabay-api.js';
import { refreshGallery, renderGallery } from './js/render-functions.js';

const form = document.querySelector('.search-form');
const userInput = document.querySelector('.search-form-input');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');
const loadingText = document.querySelector('.loading-text');
const gallery = document.querySelector('.gallery');

let searchTerm = '';
let currentPage = 1;

form.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', handleLoad);

async function handleSubmit(event) {
  event.preventDefault();
  const searchTerm = userInput.value.trim();

  if (searchTerm === '') {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search term.',
      position: 'topRight',
      backgroundColor: '#EF4040',
      messageColor: '#FFF',
      titleColor: '#FFF',
      iconColor: '#FFF',
      timeout: 5000,
    });
    return;
  }

  userInput.value = '';
  currentPage = 1;
  loader.style.display = 'block';

  refreshGallery();
  await handleSearch(searchTerm, currentPage);
}

async function handleLoad() {
  currentPage++;
  // loadMoreBtn.textContent = 'Loading images...';
  loadMoreBtn.style.display = 'none';
  loadingText.style.display = 'block';
  loader.style.display = 'block';
  loadMoreBtn.disabled = true;
  await handleSearch(searchTerm, currentPage);
  loadMoreBtn.textContent = 'Load more';
  loadMoreBtn.disabled = false;
  loadingText.style.display = 'none';
  loader.style.display = 'none';
}

async function handleSearch(term, page) {
  loader.style.display = 'block';

  try {
    const images = await GetImages(term, page);
    loader.style.display = 'none';

    if (images.length === 0) {
      iziToast.info({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        backgroundColor: '#EF4040',
        messageColor: '#FFF',
        titleColor: '#FFF',
        iconColor: '#FFF',
        timeout: 5000,
      });
    } else {
      renderGallery(images);
      if (currentPage === 1) {
        loadMoreBtn.style.display = 'inline-block';
      }
      gallerySmoothScroll();
      imagesCountControl(images.length);
    }
  } catch (error) {
    loader.style.display = 'none';
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again later.',
      position: 'topRight',
      backgroundColor: '#EF4040',
      messageColor: '#FFF',
      titleColor: '#FFF',
      iconColor: '#FFF',
      timeout: 5000,
    });
    console.error('Error fetching images:', error);
  }
}

function gallerySmoothScroll() {
  const galleryHeight = gallery.getBoundingClientRect().height;
  window.scrollBy({
    top: galleryHeight,
    behavior: 'smooth',
  });
}

function imagesCountControl(imagesCount) {
  const perPage = 15;
  if (imagesCount < perPage) {
    loadMoreBtn.style.display = 'none';
    iziToast.info({
      title: 'Error',
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
      backgroundColor: '#EF4040',
      messageColor: '#FFF',
      titleColor: '#FFF',
      iconColor: '#FFF',
      timeout: 5000,
    });
  } else {
    loadMoreBtn.style.display = 'inline-block';
  }
}
