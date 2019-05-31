/*
    Javascript for all the DOM manipulation
*/

const citySearch = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.weather-details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (cityData) => {
    // const cityInfo = cityData.cityInfo;
    // const weather = cityData.weather;
    // destructure above properties
    const {cityInfo, weather} = cityData;

    // update details templater
    details.innerHTML = `
    <h5 class="my-3">${cityInfo.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Imperial.Value}</span>
        <span>&deg;C</span>
    </div>
    `;

    // update day & night. Update icons
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    let timeSrc = null;
    if (weather.IsDayTime) {
        timeSrc = 'img/day.svg';
    }
    else {
        timeSrc = 'img/night.svg';
    }
    time.setAttribute('src', timeSrc);

    // remove the the hidden div if d-none is present
    if(card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }
};

const updateCity = async (city) => {
    //console.log(city);  // debug
    const cityInfo = await getCity(city);
    const weather = await getWeather(cityInfo.Key);

    return{cityInfo, weather};
};

citySearch.addEventListener("submit", e => {
    e.preventDefault();

    // get the city value
    const city = citySearch.city.value.trim();
    citySearch.reset();

    // update UI with the new city information
    updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

    // set local storage
    localStorage.setItem('location', city);

});

if(localStorage.getItem('location')) {
    updateCity(localStorage.getItem('location'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}

