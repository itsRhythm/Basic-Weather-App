const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const erro404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
    const APIkey = '9f51efdbeb256b9b6666faa6a28c22cb';
    const city = document.querySelector('.search-box input').value;

    if (city == ''){
        return;
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`)
    .then(res => res.json())
    .then(data => display(data))
})

function display(data){
    if (data.cod =='404'){
        container.style.height = "400px";
        weatherBox.classList.remove('active');
        weatherDetails.classList.remove('active');
        erro404.classList.add('active');
        return;
    }

    container.style.height = "555px";
    weatherBox.classList.add('active');
    weatherDetails.classList.add('active');
    erro404.classList.remove('active');


    const image = document.querySelector('.weather-box img');
    const temp = document.querySelector('.weather-box .temperature');
    const des = document.querySelector('.weather-box .description');
    const humidity = document.querySelector('.weather-details .humidity span');
    const wind = document.querySelector('.weather-details .wind span');

    switch (data.weather[0].main){
        case 'Clear':
            image.src = '/images/clear.png';
            break;

        case 'Rain':
            image.src = '/images/rain.png';
            break;

        case 'Snow':
            image.src = '/images/snow.png';
            break;

        case 'Clouds':
            image.src = '/images/cloud.png';
            break;

        case 'Mist':
            image.src = '/images/mist.png';
            break;

        case 'Haze':
            image.src = '/images/mist.png';
            break;
        
        default:
            image.src = '/images/cloud.png';
    }

    temp.innerHTML = `${parseInt(data.main.temp)} <span>°C </span>`;
    des.innerHTML = `${data.weather[0].description}`;
    humidity.innerHTML = `${data.main.humidity}`;
    wind.innerHTML = `${parseInt(data.wind.speed)} Km/h`;
}

