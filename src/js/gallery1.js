import notifier from './service/notifler'
import markup from './service/markup'; 
import photoApiService from './PhotoApiService';
import NewBtn from './newbutton';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css"
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const refs = {
    searchForm: document.querySelector('#search-form'),
    input: document.querySelector('.search-form__input'),
    galleryContainer: document.querySelector('.gallery'),
          
};

const loadMoreBtn = new NewBtn({ selector: '.load-more', hidden: true, text: 'Load-more' });
const searchBtn = new NewBtn({ selector: '.search-form__button', hidden: false, text: 'Search' });

refs.searchForm.addEventListener('submit', onSearchSubmit);
loadMoreBtn.button.addEventListener('click', onLoadMoreClick);
refs.input.addEventListener('input', debounce((() => searchBtn.enable()), DEBOUNCE_DELAY) );


function onSearchSubmit(event) {
    event.preventDefault(); // прибираємо дефолтову поведінку
    refs.galleryContainer.innerHTML = ''; // стартово прибираємо розмітку
    loadMoreBtn.hide();
    photoApiService.query = event.currentTarget.elements.searchQuery.value.trim(); //trim прибираються зайві пробіли
    if (photoApiService.query === '') { // перевіряємо чи взагалі щось введено 
        notifier.info("No request. Please try again.")
        return;
    }
    photoApiService.resetPage();
    photoApiService.resetViewedPhoto();

    photoApiService.fetchPhoto()
        .then(appendPhotoMarkUp)
        .finally(refs.searchForm.reset(),
                searchBtn.disabled()
                );
    
}
    
function onLoadMoreClick() {
    
    loadMoreBtn.textContent ('Loading...');
    photoApiService.fetchPhoto().then(appendPhotoMarkUp);
      
     
};

function appendPhotoMarkUp(photo) {
    if (photo.hits.length === 0) { // перевіряємо чи щось знайдено 
        notifier.error("Sorry, there are no images matching your search query. Please try again.")
        return;
    }
    
    refs.galleryContainer.insertAdjacentHTML('beforeend', markup(photo.hits));  

    if (photoApiService.pageNumber > 2) {
        //   плавне прокручування сторінки після запиту і відтворення кожної наступної групи зображень
        const { height: cardHeight } = refs.galleryContainer.firstElementChild.getBoundingClientRect();
        window.scrollBy({
            top: cardHeight * 2,
            behavior: "smooth",
        });
    }

    loadMoreBtn.show();
    loadMoreBtn.textContent ('Load more');   
    
    const gallery = new SimpleLightbox('.gallery a'); // створюємо модалку і передаємо велику картинку
    gallery.refresh(); // Refresh Imag
    
   if (photoApiService.viewedPhoto === photo.totalHits) {
       notifier.warning(`We're sorry, but you've reached the end of search results. Total ${photo.totalHits}. `);
       loadMoreBtn.hide();
       return;
    }
    notifier.success(`Hooray! ${photoApiService.viewedPhoto} images for you from ${photo.totalHits} !`);
}
    //   плавне прокручування сторінки до кінця після запиту і відтворення кожної наступної групи зображень
    // refs.galleryContainer.scrollIntoView({
    // behavior: 'smooth',
    // block: 'end',
    // }); 

    
    

        
       

        

