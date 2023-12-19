
const apiKey = '95ac8ccb25be47deb1b225238231512';
const conditionsUrl = 'https://www.weatherapi.com/docs/conditions.json'

// Элементы страницы
const header = document.querySelector('header');
const container = document.querySelector('.container1 .weather-cards');
const form = document.querySelector('#form');
const input = document.querySelector('.CitynameInput');
let city;
//слушаем отправку

form.onsubmit = function(e){
    e.preventDefault(); //отменяем отправку формы
    
    //берем значение инпута, обрезаем пробелы
    
    city = input.value.trim();
    console.log(city);
    const unsplashUrl = `https://api.unsplash.com/search/photos?client_id=gTh5INn4tv7s-pb4w0ue2Aj6o5p8c9vly1gS467UV8Q&query=${city}`;
    
    

    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
       // получаем ссылку на изображение
    fetch(unsplashUrl).then((response) => {
        return response.json()
    }).then((data) => {
        console.log(data.results);
        console.log(data.results[1].urls.regular);
        pinUrl = data.results[1].urls.regular;
    }) 
    // получаем данные о погоде
    fetch(url).then((response) => {
        return response.json()
    }).then((data) => {
        console.log(data);
        console.log(data.location.name);
        console.log(data.current.temp_c);
        console.log(data.current.condition.text);
        
     

        //отображаем в карточке
        //Разметка для карточки
        const html_card = `<div class="component-1";>
                                
                                <div class="flex-wrapper-one">
                                    <img class="background-image" src="${pinUrl}" alt="City Image">

                                    <p class="temperature">${data.current.temp_c}°</p>
                                    <p class="weather">${data.current.condition.text}</p>
                                    </div>
                                    <p class="city-name">${data.location.name}</p>
                            </div>`
        
        //
        
        //Отображаем карточку 
        container.insertAdjacentHTML('beforeend', html_card);
    })
}