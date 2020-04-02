export const FETCH_WEATHER = "FETCH_WEATHER";
export const FETCH_SEARCH = "FETCH_SEARCH";
export const FETCH_STORAGE = "FETCH_STORAGE";
export const FETCH_GEOLOCATION = "FETCH_GEOLOCATION ";
export const KEY_WEATHER = process.env.REACT_APP_WEATHER_API_KEY;

export const API_ADDRESS =
  "https://dataservice.accuweather.com/locations/v1/cities/search?apikey="; //global constant.. that is the base API address to hit

export const API_ADDRESS_SEARCH =
  "https://dataservice.accuweather.com/forecasts/v1/daily/5day/";

export const API_ADDRESS_CURRENT =
  "https://dataservice.accuweather.com/currentconditions/v1/";

export const API_ADDRESS_LOCATION = `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${KEY_WEATHER}=`;

export const API_AUTOCOMPLETE = `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${KEY_WEATHER}=`;
