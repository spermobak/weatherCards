const apiKey = '95ac8ccb25be47deb1b225238231512';
// Элементы страницы
const header = document.querySelector('header');
const container = document.querySelector('.container1 .weather-cards');
const form = document.querySelector('#form');
const input = document.querySelector('.CitynameInput');
let cities = []; // Массив для хранения данных о городах

// Функция для получения ссылки на изображение
async function getImageUrl(city) {
    const unsplashUrl = `https://api.unsplash.com/search/photos?client_id=gTh5INn4tv7s-pb4w0ue2Aj6o5p8c9vly1gS467UV8Q&query=${city}`;
    const response = await fetch(unsplashUrl);
    const data = await response.json();
    return data.results[0].urls.regular; // Используем первое изображение
  }
// Функция для обновления данных на карточке
async function updateCard(cityData, cardElement) {
  // Обновление данных на карточке, используя переданный объект cityData
  const imageUrl = await getImageUrl(cityData.name);
  const weatherData = await getWeatherData(cityData.name);

  const html_card = `<div class="component-1">
    <div class="flex-wrapper-one">
        <img class="background-image" src="${imageUrl}" alt="City Image">
        <p class="temperature">${weatherData.current.temp_c}°</p>
        <p class="weather">${weatherData.current.condition.text}</p>
    </div>
    <p class="city-name">${weatherData.location.name}</p>
  </div>`;

  cardElement.innerHTML = html_card;
}
// Функция для сохранения данных в Local Storage
function saveToLocalStorage() {
    localStorage.setItem('cities', JSON.stringify(cities));
  }
  
  // Функция для загрузки данных из Local Storage
  function loadFromLocalStorage() {
    const storedCities = localStorage.getItem('cities');
    return storedCities ? JSON.parse(storedCities) : [];
  }
  
  // ...
  
  // Загрузка сохраненных городов при загрузке страницы
  document.addEventListener('DOMContentLoaded', () => {
    cities = loadFromLocalStorage();
  
    cities.forEach(cityData => {
      const cardElement = document.createElement('div');
      cardElement.classList.add('weather-card');
      container.appendChild(cardElement);
  
      updateCard(cityData, cardElement);
  
      // Устанавливаем интервал для обновления данных каждые 10 секунд
      setInterval(async () => {
        await updateCard(cityData, cardElement);
      }, 10000);
    });
  });
  
  // Функция для удаления всех карточек
  function removeAllCards() {
    container.innerHTML = '';
    cities = [];
    saveToLocalStorage();
  }
// Функция для получения данных о погоде
async function getWeatherData(city) {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
// Функция для добавления нового города
async function addCity(cityName) {
    const imageUrl = await getImageUrl(cityName);
    const weatherData = await getWeatherData(cityName);
  
    const cityData = { name: cityName, imageUrl, weatherData };
    cities.push(cityData);
    saveToLocalStorage();
  
    const cardElement = document.createElement('div');
    cardElement.classList.add('weather-card');
    container.appendChild(cardElement);
  
    updateCard(cityData, cardElement);
  
    // Устанавливаем интервал для обновления данных каждые 10 секунд
    setInterval(async () => {
      await updateCard(cityData, cardElement);
    }, 10000);
  }

// Обработчик отправки формы
form.onsubmit = function (e) {
  e.preventDefault(); // Отменяем отправку

  const cityName = input.value.trim();
  console.log(cityName);

  // Проверяем, есть ли уже такой город в массиве
  const existingCity = cities.find(city => city.name === cityName);

  if (existingCity) {
    console.log('Город уже добавлен');
  } else {
    // Добавляем новый город
    addCity(cityName);
  }
}

// Добавление обработчика на кнопку удаления всех карточек
const removeAllButton = document.querySelector('#removeAllButton');
removeAllButton.addEventListener('click', removeAllCards);