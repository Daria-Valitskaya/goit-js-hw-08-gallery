import gallery from "./gallery-items.js";
const refs = {
  galleryContainer: document.querySelector(".js-gallery"),
  modalWindow: document.querySelector(".js-lightbox"),
  closeButton: document.querySelector('[data-action="close-lightbox"]'),
  currentImage: document.querySelector(".lightbox__image"),
  overlay: document.querySelector(".lightbox__overlay"),
};

const cardsItems = createGalleryItem(gallery);

refs.galleryContainer.insertAdjacentHTML("afterbegin", cardsItems);
refs.galleryContainer.addEventListener("click", onGalleryContainerClick);
refs.closeButton.addEventListener("click", onCloseButtonClick);
refs.overlay.addEventListener("click", onOverlayClick);

function createGalleryItem(galleryItem) {
  return (createGalleryItem = galleryItem.map(
    ({ preview, original, description }) => {
      return `<li class="gallery__item">
    <a
      class="gallery__link"
      href='${original}'>
      <img
        class="gallery__image"
        src='${preview}'
        data-source='${original}'
        alt='${description}'
      />
    </a>
  </li>`;
    }
  )).join("");
}

function onGalleryContainerClick(event) {
  event.preventDefault();
  if (!event.target.classList.contains("gallery__image")) {
    return;
  }
  refs.modalWindow.classList.add("is-open");
  refs.currentImage.src = event.target.dataset.source;
  refs.currentImage.alt = event.target.alt;
  window.addEventListener("keydown", onEscClick);
}
function onCloseButtonClick() {
  window.removeEventListener("keydown", onEscClick);
  refs.modalWindow.classList.remove("is-open");
  refs.currentImage.src = "";
  refs.currentImage.alt = "";
}
function onOverlayClick(event) {
  if (event.currentTarget === event.target) {
    onCloseButtonClick();
  }
}
function onEscClick(event) {
  if (event.code === "Escape") {
    onCloseButtonClick();
  }
}
