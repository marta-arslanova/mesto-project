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

function createCard(link, name) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__img');
  const cardLikeBtn = cardElement.querySelector('.card__like');
  const cardDeleteBtn = cardElement.querySelector('.card__delete');
  cardImage.style.backgroundImage = `url(${link})`;
  cardElement.querySelector('.card__title').textContent = name;

  cardImage.addEventListener('click', function () {
    imageLeadElement.src = link;
    imageLeadElement.alt = name;
    figcaptionLeadElement.textContent = name;
    openPopup(imagePopup);
  });
  cardLikeBtn.addEventListener('click', function () {
    cardLikeBtn.classList.toggle('card__like_active');
  });

  cardDeleteBtn.addEventListener('click', function () {
    cardElement.remove();
  });

  return cardElement;
}

function renderCard(image, title, container) {
  const cardElement = createCard(image, title);
  container.append(cardElement);
}

function initCardList() {
  initialCards.forEach(function (card) {
    const titleCard = card.name;
    const linkImageCard = card.link;
    renderCard(linkImageCard, titleCard, cardsContainer);
  });
}

function cardAdd(evt) {
  evt.preventDefault();
  const titleCard = locationNameInput.value;
  const linkImageCard = locationImgLinkInput.value;
  renderCard(linkImageCard, titleCard, cardsContainer);
  closePopup(cardAddPopup);
  cardAddForm.reset();
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
