function e(e){return e&&e.__esModule?e.default:e}var r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},o={},n=r.parcelRequired7c6;null==n&&((n=function(e){if(e in t)return t[e].exports;if(e in o){var r=o[e];delete o[e];var n={id:e,exports:{}};return t[e]=n,r.call(n.exports,n,n.exports),n.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,r){o[e]=r},r.parcelRequired7c6=n);var a=n("cNM6c"),l=n("3huUq"),u=n("fxhcZ"),i=n("dwE1g"),d=n("fZKcF"),f=n("50Kfe");const s={searchForm:document.querySelector("#search-form"),input:document.querySelector(".search-form__input"),galleryContainer:document.querySelector(".gallery"),loadMoreBtn:document.querySelector(".load-more")},c=new(0,i.default)({selector:".search-form__button",hidden:!1,text:"Search"}),h=new IntersectionObserver((e=>{for(const r of e)r.isIntersecting&&u.default.pageNumber>1&&u.default.fetchPhoto().then(g)}),{rootMargin:"400px"});function g(r){if(0===r.hits.length)return void a.default.warning("Sorry, there are no images matching your search query. Please try again.");s.galleryContainer.insertAdjacentHTML("beforeend",(0,l.default)(r.hits));if(new(e(d))(".gallery a").refresh(),u.default.viewedPhoto>=r.totalHits)return a.default.warning(`We're sorry, but you've reached the end of search results. Total ${r.totalHits}. `),void h.disconnect();a.default.success(`Hooray! ${u.default.viewedPhoto} images for you from ${r.totalHits} !`)}function y(e){throw a.default.error("Something went wrong. Please try later"),new Error(console.log(e))}s.searchForm.addEventListener("submit",(function(e){if(e.preventDefault(),s.galleryContainer.innerHTML="",u.default.query=e.currentTarget.elements.searchQuery.value.trim(),""===u.default.query)return void a.default.info("No request. Please try again.");u.default.resetPage(),u.default.resetViewedPhoto(),u.default.fetchPhoto().then(g).catch(y).finally(s.searchForm.reset(),c.disabled()),h.observe(s.loadMoreBtn)})),s.input.addEventListener("input",e(f)((()=>c.enable()),300));
//# sourceMappingURL=gallery4.326e3f80.js.map