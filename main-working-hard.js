const apiKey = '95ac8ccb25be47deb1b225238231512';
const conditionsUrl = 'https://www.weatherapi.com/docs/conditions.json';

// Элементы страницы
const header = document.querySelector('header');
const container = document.querySelector('.container1 .weather-cards');
const form = document.querySelector('#form');
const input = document.querySelector('.CitynameInput');
let city;

// Функция для получения ссылки на изображение
async function getImageUrl(city) {
  const unsplashUrl = `https://api.unsplash.com/search/photos?client_id=gTh5INn4tv7s-pb4w0ue2Aj6o5p8c9vly1gS467UV8Q&query=${city}`;
  const response = await fetch(unsplashUrl);
  const data = await response.json();
  return data.results[0].urls.regular; // Используем первое изображение
}

// Функция для получения данных о погоде
async function getWeatherData(city) {
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// Функция для отображения карточки
function displayCard(data, imageUrl) {
  const html_card = `<div class="component-1">
    <div class="flex-wrapper-one">
        <img class="background-image" src="${imageUrl}" alt="City Image">
        <p class="temperature">${data.current.temp_c}°</p>
        <p class="weather">${data.current.condition.text}</p>
    </div>
    <p class="city-name">${data.location.name}</p>
  </div>`;

  container.insertAdjacentHTML('beforeend', html_card);
}

// Обработчик отправки формы
form.onsubmit = async function (e) {
  e.preventDefault(); // Отменяем отправку

  city = input.value.trim();
  console.log(city);

  try {
    // получаем ссылку на изображение
    const imageUrl = await getImageUrl(city);
    // получаем данные о погоде
    const weatherData = await getWeatherData(city);
    displayCard(weatherData, imageUrl);
  } catch (error) {
    console.error('Произошла ошибка:', error);
  }
}
