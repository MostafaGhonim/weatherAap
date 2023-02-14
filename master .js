const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const erorr404 = document.querySelector('.not-found');
console.log(erorr404)

search.addEventListener('click', () => {
    const APIKey = '91ef6b7ed9ba7d45904468a491422d78'
    const city = document.querySelector('.search-box input').value
    if (city === '') {
        const city = document.querySelector('.search-box input').setAttribute('placeholder', "enter the city or country")
        container.style.height = '105px';
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then((response) => response.json())
        .then((json => {
        if (json.cod === '404') {
            container.style.height = '400px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            erorr404.style.display = 'block';
            erorr404.style.opacity = '1';
            erorr404.style.scale = '1';
            erorr404.classList.add('fadeIn');
            return;
            }
        erorr404.style.display = 'none';
        erorr404.classList.remove('fadeIn');
        erorr404.style.opacity = '0';
        erorr404.style.scale = '0';
        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span')
            const wind = document.querySelector('.weather-details .wind span')
        switch (json.weather[0].main) {
            case 'Clear':
                image.src = 'Images/clear.png'
                break;
            
            case 'Rain':
                image.src = 'Images/rain.png'
                break;
            
            case 'Snow':
                image.src = 'Images/snow.png'
                break;
            
            case 'Clouds':
                image.src = 'Images/cloud.png'
                break;
            
            case 'Mist':
                image.src = 'Images/mist.png'
                break;
            
            default:
                image.src = ''
            }
        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${(json.wind.speed).toFixed(0)} Km/h`;


        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '590px'
        }))
        console.clear()
})
