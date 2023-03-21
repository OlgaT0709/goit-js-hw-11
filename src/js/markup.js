import markupTpl from '../templates/markup.hbs';

export default function markup(galleryItems) {
    return galleryItems.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
            markupTpl ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads })).join('');
};

// `<div class="photo-card">
//     <a class="gallery__item" href="${largeImageURL}">
//         <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
//     </a>
//     <div class="info">
//         <p class="info-item">
//             <b>Likes </b></br> ${likes}
//         </p>
//         <p class="info-item">
//             <b>Views </b></br> ${views}
//         </p>
//         <p class="info-item">
//             <b>Comments </b></br> ${ comments }
//         </p >
//         <p class="info-item">
//             <b>Downloads </b></br> ${ downloads }
//         </p >
//     </div >
// </div >`