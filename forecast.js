/* 
    Contains the javascript for interacting 
    with the weather api in getting data.
*/

const api_key = 'AeAReBSGZacc8GyzZYULIrwKT5qvDUgT';

// get weather information
const getWeather = async (city_Key) => {
    const baseURL = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${city_Key}?apikey=${api_key}`;

    const response = await fetch(baseURL+query);
    const data = await response.json();
    
    return(data[0]);
};

// get City information
const getCity = async (city) => {
    const baseURL = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${api_key}&q=${city}`;

    const response = await fetch(baseURL+query);
    const data = await response.json();

    return(data[0]);
};


