import {
  FETCH_SEARCH,
  FETCH_STORAGE,
  API_ADDRESS,
  API_ADDRESS_CURRENT,
  API_ADDRESS_SEARCH,
  API_ADDRESS_LOCATION,
  FETCH_GEOLOCATION,
  KEY_WEATHER
} from "../actions/type";
import axios from "axios";

export const searchCity = cityQuery => {
  return function(dispatch) {
    axios
      .get(`${API_ADDRESS}${KEY_WEATHER}=${cityQuery}`)
      .then(response => {
        if (response.status !== 200) {
          throw new Error("Unsuccessful request to deckofcardsapi.com");
        }
        const cityName = response.data[0].LocalizedName;
        const cityId = response.data[0].AdministrativeArea.ID;
        const cityKey = response.data[0].Key;

        axios
          .get(`${API_ADDRESS_SEARCH}${cityKey}?apikey=${KEY_WEATHER}`)
          .then(response => {
            const forcasts = response.data.DailyForecasts;

            axios
              .get(`${API_ADDRESS_CURRENT}${cityKey}?apikey=${KEY_WEATHER}`)
              .then(response => {
                if (response.status !== 200) {
                  throw new Error("Unsuccessful request to deckofcardsapi.com");
                }

                dispatch({
                  type: FETCH_SEARCH,
                  data: response.data,
                  cityName,
                  cityId,
                  forcasts,
                  cityKey
                });
              });
          });
      })

      .catch(error => {
        alert("this city not found");
      });
  };
};

export const storageAction = cityQuery => {
  return function(dispatch) {
    axios
      .get(`${API_ADDRESS}${KEY_WEATHER}=${cityQuery}`)
      .then(response => {
        if (response.status !== 200) {
          throw new Error("Unsuccessful request to deckofcardsapi.com");
        }
        const cityName = response.data[0].LocalizedName;
        const cityId = response.data[0].AdministrativeArea.ID;
        const cityKey = response.data[0].Key;

        axios
          .get(`${API_ADDRESS_SEARCH}${cityKey}?apikey=${KEY_WEATHER}`)
          .then(response => {
            const forcasts = response.data.DailyForecasts;

            axios
              .get(`${API_ADDRESS_CURRENT}${cityKey}?apikey=${KEY_WEATHER}`)
              .then(response => {
                if (response.status !== 200) {
                  throw new Error("Unsuccessful request to deckofcardsapi.com");
                }

                dispatch({
                  type: FETCH_STORAGE,
                  data: response.data,
                  cityName,
                  cityId,
                  forcasts
                });
              });
          });
      })

      .catch(error => {
        console.log("this city not found");
      });
  };
};

export const geolocationApi = () => {
  function error() {}
  return function(dispatch) {
    navigator.geolocation.getCurrentPosition(success, error);
    function success() {
      navigator.geolocation.watchPosition(position => {
        let location =
          position.coords.latitude + "," + position.coords.longitude;
        axios.get(`${API_ADDRESS_LOCATION}${location}`).then(response => {
          if (response.status !== 200) {
            throw new Error("Unsuccessful request Geolocation");
          }
          const dataLocation = response.data.EnglishName;
          dispatch({
            type: FETCH_GEOLOCATION,
            data: response.data,
            dataLocation
          });
        });
      });
    }
  };
};

export const iconsSwitch1 = param => {
  switch (param) {
    case "Sunny":
      return require("../data/icons/01-s.png");
    case "Clouds and sun":
      return require("../data/icons/04-s.png");
    case "Mostly sunny":
      return require("../data/icons/02-s.png");
    case "Partly sunny":
      return require("../data/icons/03-s.png");
    case "Intermittent clouds":
      return require("../data/icons/04-s.png");
    case "Hazy sunshine":
      return require("../data/icons/05-s.png");
    case "Mostly cloudy":
      return require("../data/icons/06-s.png");
    case "Cloudy":
      return require("../data/icons/07-s.png");
    case "Overcast":
      return require("../data/icons/08-s.png");
    case "Fog":
      return require("../data/icons/11-s.png");
    case "Showers":
      return require("../data/icons/12-s.png");
    case "Mostly cloudy w/ showers":
      return require("../data/icons/13-s.png");
    case "Partly sunny w/ showers":
      return require("../data/icons/14-s.png");
    case "T-Storms":
      return require("../data/icons/15-s.png");
    case "Partly Sunny w/ T-Storms":
      return require("../data/icons/17-s.png");
    case "Rain":
      return require("../data/icons/18-s.png");
    case "Flurries":
      return require("../data/icons/19-s.png");
    case "Partly sunny w/ Flurries":
      return require("../data/icons/21-s.png");
    case "Snow":
      return require("../data/icons/22-s.png");
    case "Ice":
      return require("../data/icons/24-s.png");
    case "Sleet":
      return require("../data/icons/25-s.png");
    case "Freezing Rain":
      return require("../data/icons/26-s.png");
    case "Rain and Snow":
      return require("../data/icons/29-s.png");
    case "Hot":
      return require("../data/icons/30-s.png");
    case "Cold":
      return require("../data/icons/31-s.png");
    case "Windy":
      return require("../data/icons/32-s.png");
    case "Clear":
      return require("../data/icons/33-s.png");
    case "Partly cloudy":
      return require("../data/icons/35-s.png");
    case "Hazy moonlight":
      return require("../data/icons/37-s.png");
    case "Partly cloudy w/ showers":
      return require("../data/icons/39-s.png");
    case "Mostly Cloudy w/ Showers":
      return require("../data/icons/40-s.png");
    case "Partly cloudy w/ T-Storms":
      return require("../data/icons/41-s.png");
    case "Mostly cloudy w/ T-Storms":
      return require("../data/icons/42-s.png");
    case "Mostly cloudy w/ Flurries":
      return require("../data/icons/43-s.png");
    case "Mostly cloudy w/ Snow":
      return require("../data/icons/44-s.png");
    case "Some clouds":
      return require("../data/icons/04-s.png");
    case "Mostly clear":
      return require("../data/icons/02-s.png");
    default:
      return require("../data/icons/06-s.png");
  }
};

export const checkStorage = () => {
  let checkFavorite = JSON.parse(localStorage.getItem("weatherinfo"));

  if (checkFavorite !== null) {
    const doubled = checkFavorite.some(city => city === "yavne");
    return doubled;
  }
  return null;
};
