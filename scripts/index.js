// Элементы DOM
const profileContainer = document.querySelector('.profile');
const profileEditBtn = profileContainer.querySelector('.profile__edit');
const profileName = profileContainer.querySelector('.profile__name');
const profileDescr = profileContainer.querySelector('.profile__description');
const locationPopupOpenBtn = profileContainer.querySelector('.profile__button');

const profileEditPopup = document.querySelector('.popup_type_edit');
const profileEditPopupCloseBtn =
  profileEditPopup.querySelector('.popup__close');
const profileEditForm = profileEditPopup.querySelector('.form');
const userNameInput = profileEditPopup.querySelector('#user-name');
const userDescrInput = profileEditPopup.querySelector('#user-descr');

const cardsContainer = document.querySelector('.cards');
const cardAddPopup = document.querySelector('.popup_type_add');
const locationNameInput = cardAddPopup.querySelector('#location-name');
const locationImgLinkInput = cardAddPopup.querySelector('#location-img-link');
const cardAddPopupCloseBtn = cardAddPopup.querySelector('.popup__close');
const cardAddForm = cardAddPopup.querySelector('.form');
const imagePopup = document.querySelector('.popup_type_img');
const imagePopupCloseBtn = imagePopup.querySelector('.popup__close');
const imageLeadElement = imagePopup.querySelector('.lead__img');
const figcaptionLeadElement = imagePopup.querySelector('.lead__figcaption');
const cardTemplate = document.querySelector('#card').content;

// Данные
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

// Функции
function openEditProfile() {
  userNameInput.value = profileName.innerText;
  userDescrInput.value = profileDescr.innerText;
  openPopup(profileEditPopup);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function profileEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.innerText = userNameInput.value;
  profileDescr.innerText = userDescrInput.value;
  profileEditPopupClose();
}

function createCardElement(link, title) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__img');
  cardImage.style.backgroundImage = `url(${link})`;
  cardElement.querySelector('.card__title').textContent = title;
  return cardElement;
}

function addImageListener(cardElement, link, title) {
  const cardImage = cardElement.querySelector('.card__img');
  cardImage.addEventListener('click', function () {
    imageLeadElement.src = link;
    figcaptionLeadElement.textContent = title;
    openPopup(imagePopup);
  });
}

function addLikeBtnListener(cardElement) {
  const cardLikeBtn = cardElement.querySelector('.card__like');
  cardLikeBtn.addEventListener('click', function (event) {
    event.target.classList.toggle('card__like_active');
  });
}

function addDeleteBtnListener(cardElement) {
  const cardDeleteBtn = cardElement.querySelector('.card__delete');
  cardDeleteBtn.addEventListener('click', function () {
    cardElement.remove();
  });
}

function initCardList() {
  for (let i = 0; i < initialCards.length; i++) {
    const titleCard = initialCards[i].name;
    const linkImageCard = initialCards[i].link;
    const cardElement = createCardElement(linkImageCard, titleCard);
    addImageListener(cardElement, linkImageCard, titleCard);
    addLikeBtnListener(cardElement);
    addDeleteBtnListener(cardElement);
    cardsContainer.append(cardElement);
  }
}

function cardAdd(evt) {
  evt.preventDefault();
  const titleCard = locationNameInput.value;
  const linkImageCard = locationImgLinkInput.value;
  const cardElement = createCardElement(linkImageCard, titleCard);
  addImageListener(cardElement, linkImageCard, titleCard);
  addLikeBtnListener(cardElement);
  addDeleteBtnListener(cardElement);
  cardsContainer.prepend(cardElement);
  closePopup(cardAddPopup);
  locationNameInput.value = '';
  locationImgLinkInput.value = '';
}

// Обработчики
profileEditBtn.addEventListener('click', openEditProfile);

profileEditPopupCloseBtn.addEventListener('click', function () {
  closePopup(profileEditPopup);
});

profileEditForm.addEventListener('submit', profileEditFormSubmit);

locationPopupOpenBtn.addEventListener('click', function () {
  openPopup(cardAddPopup);
});

cardAddPopupCloseBtn.addEventListener('click', function () {
  closePopup(cardAddPopup);
});

cardAddForm.addEventListener('submit', cardAdd);

imagePopupCloseBtn.addEventListener('click', function () {
  closePopup(imagePopup);
});

initCardList();
